// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { generateWorkbenchTheme } from "./generator";
import { ThemeConfig } from "./types";
import { getTokenColorCustomizations } from "./tokenizer";

class ChromaSkinExtension {
	private activePanel: vscode.WebviewPanel | undefined;
	private context: vscode.ExtensionContext;
	private readonly DEFAULT_THEME_CONFIG: ThemeConfig = {
		// color pickers
		primary: "#c089f0",
		background: "#2b2b2b",
		accent: "#252525",
		foreground: "#b8b8b8",
		border: "#454545",
		activityBar: "#252525",
		popover: "#252525",
		button: "#c089f0",
		// slider
		borderOpacity: 30,
		// checkbox
		coloredCursor: true,
		autoAdvancedColors: true,
		editorHighlighting: true,
		syntaxCommentsOverwrite: true,
		// optional color pickers
		optionalEditorForeground: "default",
	};

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	public activate() {
		// clear global state
		// this.context.globalState.update("chromaskin-theme-config", null);

		console.log("ChromaSkin: activated!");
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
			light: vscode.Uri.file(path.join(this.context.extensionPath, "resources", "chromaskin-lightmode.png")),
			dark: vscode.Uri.file(path.join(this.context.extensionPath, "resources", "chromaskin-darkmode.png")),
		};

		const themeConfig: ThemeConfig = this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") || this.DEFAULT_THEME_CONFIG;
		const { theme } = generateWorkbenchTheme(themeConfig);

		this.activePanel.webview.html = this.getWebviewContent(this.context, this.activePanel.webview, theme);

		this.activePanel.webview.onDidReceiveMessage(
			(message) => this.handleWebviewMessage(message),
			undefined,
			this.context.subscriptions
		);

		this.activePanel.onDidChangeViewState((event) => {
			if (this.activePanel?.visible) {
				const themeConfig: ThemeConfig =
					this.context.globalState.get<ThemeConfig>("chromaskin-theme-config") || this.DEFAULT_THEME_CONFIG;
				const { theme } = generateWorkbenchTheme(themeConfig);
				this.activePanel.webview.postMessage({
					command: "set-colors",
					themeConfig: theme,
				});
			}
		});
	}

	private handleWebviewMessage(message: any) {
		switch (message.command) {
			case "applyTheme":
				this.applyColorTheme(message.themeConfig);
				vscode.window.showInformationMessage("ChromaSkin: Custom Theme Applied!");
				break;
			case "resetTheme":
				this.resetColorTheme();
				vscode.window.showInformationMessage("ChromaSkin: Theme Reset!");
				break;
			case "exportTheme":
				this.exportTheme(message.themeConfig);
				vscode.window.showInformationMessage("ChromaSkin: Theme Exported!");
				break;
			case "importTheme":
				this.importTheme(message.themeConfig);
				vscode.window.showInformationMessage("ChromaSkin: Theme Imported!");
				break;
			case "showError":
				vscode.window.showErrorMessage(`ChromaSkin: ${message.message}`);
				break;
			case "showInfo":
				vscode.window.showInformationMessage(`ChromaSkin: ${message.message}`);
				break;
			case "hideInfoMessage":
				this.context.globalState.update("chromaskin-hide-info-message", true);
				break;
		}
	}

	private applyColorTheme(themeConfig: ThemeConfig) {
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

		if (themeConfig.autoAdvancedColors && this.activePanel) {
			this.activePanel.webview.postMessage({
				command: "set-colors",
				themeConfig: theme,
			});
		}

		// persist theme config (needed for web view change)
		this.context.globalState.update("chromaskin-theme-config", themeConfig);
		console.log("ChromaSkin: Theme Config Saved!");
	}

	private resetColorTheme() {
		vscode.workspace.getConfiguration("workbench").update("colorCustomizations", {}, vscode.ConfigurationTarget.Global);
		vscode.workspace.getConfiguration("editor").update("tokenColorCustomizations", {}, vscode.ConfigurationTarget.Global);
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
			coloredCursor: themeConfig.coloredCursor,
			borderOpacity: themeConfig.borderOpacity,
			autoAdvancedColors: themeConfig.autoAdvancedColors,
			editorHighlighting: themeConfig.editorHighlighting,
			syntaxCommentsOverwrite: themeConfig.syntaxCommentsOverwrite,
			optionalEditorForeground: themeConfig.optionalEditorForeground,
			hideInfoMessage: this.context.globalState.get("chromaskin-hide-info-message") === true,
		});
	}
}

export function activate(context: vscode.ExtensionContext) {
	new ChromaSkinExtension(context).activate();
}

export function deactivate() {}
