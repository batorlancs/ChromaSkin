// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { generateWorkbenchTheme } from "./generator";
import { ThemeConfig } from "./types";


let activePanel: vscode.WebviewPanel | undefined;
let extensionContext: vscode.ExtensionContext | undefined;
const DEFAULT_THEME_CONFIG: ThemeConfig = {
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
};

/**
 * This method is called when the extension is activated.
 * @param context vscode.ExtensionContext
 */
export function activate(context: vscode.ExtensionContext) {
	console.log("ChromaSkin: activated!");
	extensionContext = context;

	let disposable = vscode.commands.registerCommand("chromaskin.openPicker", () => {
		activePanel = vscode.window.createWebviewPanel("colorThemePicker", "ChromaSkin: Theme Generator", vscode.ViewColumn.One, {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "media"))],
		});
		activePanel.iconPath = {
			light: vscode.Uri.file(path.join(context.extensionPath, "resources", "chromaskin-lightmode.png")),
			dark: vscode.Uri.file(path.join(context.extensionPath, "resources", "chromaskin-darkmode.png")),
		};

		// Initial color theme configuration
		const themeConfig: ThemeConfig = context.globalState.get<ThemeConfig>("chromaskin-theme-config") || DEFAULT_THEME_CONFIG;
		const { theme } = generateWorkbenchTheme(themeConfig);

		// Set the webview's HTML content
		activePanel.webview.html = getWebviewContent(context, activePanel.webview, theme);

		// Handle messages from the webview
		activePanel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case "applyTheme":
						applyColorTheme(message.themeConfig);
						vscode.window.showInformationMessage("ChromaSkin: Custom Color Theme Applied!");
						return;
					case "resetTheme":
						resetColorTheme();
						vscode.window.showInformationMessage("ChromaSkin: Theme Reset!");
						return;
				}
			},
			undefined,
			context.subscriptions
		);

		// Handle visibility changes
        activePanel.onDidChangeViewState((event) => {
            if (activePanel?.visible) {
				const themeConfig: ThemeConfig = context.globalState.get<ThemeConfig>("chromaskin-theme-config") || DEFAULT_THEME_CONFIG;
				const { theme } = generateWorkbenchTheme(themeConfig);
				activePanel.webview.postMessage({
					command: "set-colors",
					themeConfig: theme,
				});
            }
        });
	});

	context.subscriptions.push(disposable);
}

/**
 * This function applies the color theme to the VSCode settings.
 * It updates the color customizations in the user's settings.
 *
 * This is called when the user clicks the "Apply" button in the webview.
 *
 * @param themeConfig ColorThemeConfig
 * @returns void
 */
function applyColorTheme(themeConfig: ThemeConfig) {
	// Get the current config
	const config = vscode.workspace.getConfiguration("workbench");
	const editorConfig = vscode.workspace.getConfiguration("editor");

	const { data, theme } = generateWorkbenchTheme(themeConfig);

	const colorCustomizations = {
		colorCustomizations: data,
		tokenColorCustomizations: {
			textMateRules: [
				{
					scope: ["comment", "comment.block", "comment.line", "comment.block.documentation", "punctuation.definition.comment"],
					settings: {
						foreground: "#FFFFFF30",
					},
				},
			],
		},
	};

	// Update both color and token customizations
	config.update("colorCustomizations", colorCustomizations.colorCustomizations, vscode.ConfigurationTarget.Global);
	editorConfig.update("tokenColorCustomizations", colorCustomizations.tokenColorCustomizations, vscode.ConfigurationTarget.Global);

	if (themeConfig.autoAdvancedColors && activePanel) {
		activePanel.webview.postMessage({
			command: "set-colors",
			themeConfig: theme,
		});
	}

	// Save to global state
	if (extensionContext) {
		extensionContext.globalState.update("chromaskin-theme-config", themeConfig);
		console.log("ChromaSkin: Theme Config Saved!");
	}
}

/**
 * This function resets the color theme to the default values.
 * It updates the color customizations in the user's settings.
 *
 * This is called when the user clicks the "Reset" button in the webview.
 * @returns void
 */
function resetColorTheme() {
	const config = vscode.workspace.getConfiguration("workbench");
	const editorConfig = vscode.workspace.getConfiguration("editor");
	config.update("colorCustomizations", {}, vscode.ConfigurationTarget.Global);
	editorConfig.update("tokenColorCustomizations", {}, vscode.ConfigurationTarget.Global);
}

/**
 * Get the HTML content for the webview
 * @param context vscode.ExtensionContext
 * @param webview vscode.Webview
 * @param themeConfig ColorThemeConfig
 * @returns the HTML content as a string
 */
function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, themeConfig: ThemeConfig): string {
	// Get paths to our external files
	const stylesPath = vscode.Uri.file(path.join(context.extensionPath, "media", "styles.css"));
	const scriptPath = vscode.Uri.file(path.join(context.extensionPath, "media", "script.js"));

	// Convert the URIs to a string form that can be used in the webview
	const stylesUri = webview.asWebviewUri(stylesPath);
	const scriptUri = webview.asWebviewUri(scriptPath);

	// Read Handlebars template
	const templatePath = path.join(context.extensionPath, "media", "index.hbs");
	const templateSource = fs.readFileSync(templatePath, "utf8");

	// Compile the template
	const template = Handlebars.compile(templateSource);

	// Render the template with data
	const htmlContent = template({
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
	});

	return htmlContent;
}

export function deactivate() {}
