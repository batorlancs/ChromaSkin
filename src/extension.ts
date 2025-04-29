// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { generateWorkbenchTheme } from "./generator";
import { ThemeConfig } from "./types";
import { getTokenColorCustomizations } from "./tokenizer";
import themes, { getPredefinedTheme } from "./themes";
import { UserThemeManager } from "./userThemes";
import { UserSettingsManager } from "./userSettingsManager";

class ChromaSkinExtension {
	private activePanel: vscode.WebviewPanel | undefined;
	private context: vscode.ExtensionContext;
	private previousBreadcrumbsState: boolean | undefined;
	private isPanelVisiblePrev: boolean = false;
	private isPanelActivePrev: boolean = false;
	private readonly DEFAULT_THEME_CONFIG: ThemeConfig = themes["default"][0].config;
	private userThemeManager: UserThemeManager;
	private userSettingsManager: UserSettingsManager;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.userThemeManager = new UserThemeManager(context);
		this.userSettingsManager = new UserSettingsManager(context);
	}

	private isDevMode(): boolean {
		return this.context.extensionMode === vscode.ExtensionMode.Development;
	}

	private clearAllGlobalState() {
		console.log("ChromaSkin: Clearing all global state (except initial settings)!");
		this.context.globalState.update("chromaskin-theme-config", null);
		this.context.globalState.update("chromaskin-theme-config-unapplied", null);
		this.context.globalState.update("chromaskin-hide-info-message", null);
	}

	public activate() {
		// clear global state
		console.log("ChromaSkin: activated!");
		if (this.isDevMode()) {
			console.log("ChromaSkin: Running in development mode!");
			this.clearAllGlobalState();
		}
		const disposable = vscode.commands.registerCommand("chromaskin.openThemeGenerator", () => {
			this.openThemeGenerator();
		});
		this.context.subscriptions.push(disposable);
	}

	private openThemeGenerator() {
		this.activePanel = vscode.window.createWebviewPanel(
			"chromaskin-theme-generator",
			"ChromaSkin: Theme Generator",
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, "media"))],
			}
		);
		this.activePanel.iconPath = {
			light: vscode.Uri.file(path.join(this.context.extensionPath, "resources", "chromaskin.png")),
			dark: vscode.Uri.file(path.join(this.context.extensionPath, "resources", "chromaskin.png")),
		};
		const themeConfig: ThemeConfig = this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") || this.DEFAULT_THEME_CONFIG;
		const { theme } = generateWorkbenchTheme(themeConfig);

		this.activePanel.webview.html = this.getWebviewContent(this.context, this.activePanel.webview, theme);

		this.activePanel.webview.onDidReceiveMessage(
			async (message) => {
				switch (message.command) {
					case "applyTheme":
						this.applyColorTheme(message.themeConfig);
						vscode.window.showInformationMessage("ChromaSkin: Custom Theme Applied! 🎨");
						break;
					case "applyPredefinedTheme":
						const { config } = getPredefinedTheme(message.category, message.index);
						this.applyColorTheme(config);
						vscode.window.showInformationMessage("ChromaSkin: Predefined Theme Applied! 🎨");
						break;
					case "resetTheme":
						this.resetColorTheme();
						vscode.window.showInformationMessage("ChromaSkin: Theme Reset! 🔄");
						break;
					case "resetColors":
						this.resetColors();
						vscode.window.showInformationMessage("ChromaSkin: Colors Reset! 🔄");
						break;
					case "exportTheme":
						this.exportTheme(message.themeConfig);
						vscode.window.showInformationMessage("ChromaSkin: Theme Exported! 📤");
						break;
					case "importTheme":
						this.importTheme(message.themeConfig);
						vscode.window.showInformationMessage("ChromaSkin: Theme Imported! 📥");
						break;
					case "showError":
						vscode.window.showErrorMessage(`ChromaSkin: ${message.message}`);
						break;
					case "showInfo":
						vscode.window.showInformationMessage(`ChromaSkin: ${message.message}`);
						break;
					case "hideInfoMessage":
						console.log("ChromaSkin: GOT HIDING INFO MESSAGE!");
						this.context.globalState.update("chromaskin-hide-info-message", true);
						break;
					case "saveUserTheme":
						const savedTheme = this.userThemeManager.saveTheme(message.name, message.description, message.themeConfig);
						this.reloadWebview();
						vscode.window.showInformationMessage(`ChromaSkin: Theme "${message.name}" saved! 💾`);
						break;
					case "deleteUserTheme":
						const deleted = this.userThemeManager.deleteTheme(message.themeId);
						if (deleted) {
							this.reloadWebview();
							vscode.window.showInformationMessage(`ChromaSkin: Theme deleted! 🗑️`);
						}
						break;
					case "applyUserTheme":
						const theme = this.userThemeManager.getTheme(message.themeId);
						if (theme) {
							this.applyColorTheme(theme.config);
							vscode.window.showInformationMessage("ChromaSkin: Saved Theme Applied! 🎨");
						} else {
							vscode.window.showErrorMessage("ChromaSkin: Theme not found! 🚫");
						}
						break;
					case "confirmDeleteTheme": {
						const themeId = message.themeId;
						vscode.window
							.showWarningMessage("Are you sure you want to delete this theme?", "Delete", "Cancel")
							.then((selection) => {
								if (selection === "Delete") {
									this.userThemeManager.deleteTheme(themeId);
									this.reloadWebview();
									vscode.window.showInformationMessage("ChromaSkin: Theme deleted! 🗑️");
								}
							});
						break;
					}
					case "saveCurrentState":
						// Save the current state without applying it as a theme
						this.saveCurrentState(message.themeConfig);
						break;
					case "exportOriginalSettings":
						this.exportOriginalSettings();
						break;
					case "exportPreviousSettings":
						const prevSettings = this.userSettingsManager.getPreviousSettings();
						if (prevSettings) {
							const document = JSON.stringify(prevSettings, null, 2);
							vscode.workspace
								.openTextDocument({ content: document, language: "json" })
								.then((doc) => vscode.window.showTextDocument(doc));
						} else {
							vscode.window.showInformationMessage("No previous settings found.");
						}
						break;
				}
			},
			undefined,
			this.context.subscriptions
		);

		this.activePanel.onDidChangeViewState((event) => {
			// If the panel is visible after being hidden, apply the theme
			// console.log("ChromaSkin: Panel state changed!", this.activePanel?.visible, this.activePanel?.active, this.isPanelVisiblePrev, this.isPanelActivePrev);
			if (this.activePanel?.visible && this.activePanel?.active && !(this.isPanelVisiblePrev && !this.isPanelActivePrev)) {
				// console.log("ChromaSkin: Applying theme, because panel is visible and active!");
				const themeConfig: ThemeConfig =
					this.context.globalState.get<ThemeConfig>("chromaskin-theme-config-unapplied") ||
					this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") ||
					this.DEFAULT_THEME_CONFIG;
				const { theme } = generateWorkbenchTheme(themeConfig);
				this.activePanel.webview.postMessage({
					command: "set-colors",
					themeConfig: theme,
				});

				const hideInfoMessage = this.context.globalState.get<boolean>("chromaskin-hide-info-message");
				if (hideInfoMessage) {
					this.activePanel.webview.postMessage({
						command: "hide-info-message",
					});
				}
			}
			this.isPanelVisiblePrev = this.activePanel?.visible || false;
			this.isPanelActivePrev = this.activePanel?.active || false;
		});
	}

	private applyColorTheme(themeConfig: ThemeConfig, saveConfig: boolean = true) {
		// Save initial settings before applying first theme
		this.userSettingsManager.saveInitialSettings();

		// Save current settings before applying new theme
		this.userSettingsManager.saveCurrentSettings();

		// Store current breadcrumbs state before changing it
		this.previousBreadcrumbsState = vscode.workspace.getConfiguration("breadcrumbs").get("enabled");

		// color customizations
		const { data: colorCustomizations, theme } = generateWorkbenchTheme(themeConfig);
		const tokenColorCustomizations = getTokenColorCustomizations(themeConfig);

		// update configurations
		vscode.workspace
			.getConfiguration("workbench")
			.update("colorCustomizations", colorCustomizations, vscode.ConfigurationTarget.Global);
		vscode.workspace
			.getConfiguration("editor")
			.update("tokenColorCustomizations", tokenColorCustomizations, vscode.ConfigurationTarget.Global);
		// Hide breadcrumbs
		vscode.workspace.getConfiguration("breadcrumbs").update("enabled", false, vscode.ConfigurationTarget.Global);

		// if (themeConfig.autoAdvancedColors && this.activePanel) {
		this.activePanel?.webview.postMessage({
			command: "set-colors",
			themeConfig: theme,
		});
		// }

		// persist theme config (needed for web view change)
		this.context.globalState.update("chromaskin-theme-config", themeConfig);
		console.log("ChromaSkin: Theme Config Saved!");
	}

	private resetColors() {
		const themeConfig: ThemeConfig = this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") || this.DEFAULT_THEME_CONFIG;
		const { data: colorCustomizations, theme } = generateWorkbenchTheme(themeConfig);
		const tokenColorCustomizations = getTokenColorCustomizations(themeConfig);
		this.activePanel?.webview.postMessage({
			command: "set-colors",
			themeConfig: theme,
		});
	}

	private resetColorTheme() {
		// Restore initial user settings
		this.userSettingsManager.restoreInitialSettings();
		// vscode.workspace.getConfiguration("workbench").update("colorCustomizations", {}, vscode.ConfigurationTarget.Global);
		// vscode.workspace.getConfiguration("editor").update("tokenColorCustomizations", {}, vscode.ConfigurationTarget.Global);

		// Restore breadcrumbs to previous state if it was previously stored
		if (this.previousBreadcrumbsState !== undefined) {
			vscode.workspace
				.getConfiguration("breadcrumbs")
				.update("enabled", this.previousBreadcrumbsState, vscode.ConfigurationTarget.Global);
			this.previousBreadcrumbsState = undefined;
		}

		console.log("ChromaSkin: Theme Reset!");
	}

	private exportTheme(themeConfig: ThemeConfig) {
		vscode.window
			.showSaveDialog({
				defaultUri: vscode.Uri.file("chromaskin-theme.json"),
				filters: {
					"JSON files": ["json"],
				},
			})
			.then((fileUri) => {
				if (fileUri) {
					const content = JSON.stringify(themeConfig, null, 2);
					fs.writeFileSync(fileUri.fsPath, content);
					vscode.window.showInformationMessage("ChromaSkin: Theme exported successfully!");
				}
			});
	}

	private importTheme(themeConfig: ThemeConfig) {
		this.applyColorTheme(themeConfig);

		// Update the webview with the new theme
		if (this.activePanel) {
			this.activePanel.webview.postMessage({
				command: "set-colors",
				themeConfig: themeConfig,
			});
		}

		vscode.window.showInformationMessage("ChromaSkin: Theme imported successfully!");
	}

	private reloadWebview() {
		const themeConfig: ThemeConfig = this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") || this.DEFAULT_THEME_CONFIG;
		const { theme } = generateWorkbenchTheme(themeConfig);

		if (this.activePanel) {
			this.activePanel.webview.html = this.getWebviewContent(this.context, this.activePanel.webview, theme);
		}
	}

	private getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, themeConfig: ThemeConfig): string {
		const stylesPath = vscode.Uri.file(path.join(context.extensionPath, "media", "styles.css"));
		const scriptPath = vscode.Uri.file(path.join(context.extensionPath, "media", "script.js"));

		const stylesUri = webview.asWebviewUri(stylesPath);
		const scriptUri = webview.asWebviewUri(scriptPath);

		const templatePath = path.join(context.extensionPath, "media", "index.hbs");
		const templateSource = fs.readFileSync(templatePath, "utf8");

		Handlebars.registerHelper("eq", (a, b) => a === b);
		const template = Handlebars.compile(templateSource);

		return template({
			stylesUri: stylesUri.toString(),
			scriptUri: scriptUri.toString(),
			primary: themeConfig.primary,
			background: themeConfig.background,
			accent: themeConfig.accent,
			foreground: themeConfig.foreground,
			border: themeConfig.border,
			activityBar: themeConfig.activityBar,
			popover: themeConfig.popover,
			button: themeConfig.button,
			indicator: themeConfig.indicator,
			coloredCursor: themeConfig.coloredCursor,
			borderOpacity: themeConfig.borderOpacity,
			commentOpacity: themeConfig.commentOpacity,
			autoAdvancedColors: themeConfig.autoAdvancedColors,
			editorHighlighting: themeConfig.editorHighlighting,
			syntaxCommentsOverwrite: themeConfig.syntaxCommentsOverwrite,
			optionalEditorForeground: themeConfig.optionalEditorForeground,
			hideInfoMessage: this.context.globalState.get("chromaskin-hide-info-message") === true,
			userThemes: this.userThemeManager.getAllThemes(),
			themes,
		});
	}

	private saveCurrentState(themeConfig: ThemeConfig) {
		// Only save to global state, don't apply to VS Code's theme
		this.context.globalState.update("chromaskin-theme-config-unapplied", themeConfig);
		console.log("ChromaSkin: Current state saved");
	}

	private exportOriginalSettings() {
		const initialSettings = this.userSettingsManager.getInitialSettings();

		if (!initialSettings) {
			vscode.window.showInformationMessage("No original settings found.");
			return;
		}

		// Show JSON in a new document
		const document = JSON.stringify(initialSettings, null, 2);
		vscode.workspace.openTextDocument({ content: document, language: "json" }).then((doc) => vscode.window.showTextDocument(doc));
	}
}

export function activate(context: vscode.ExtensionContext) {
	new ChromaSkinExtension(context).activate();
}

export function deactivate() {}
