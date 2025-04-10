// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { VSCodeThemeGenerator } from "./generator";

interface ColorThemeConfig {
	color1: string;
	color2: string;
	color3: string;
	color4: string;
	color5: string;
	intensity: number;
}

/**
 * This method is called when the extension is activated.
 * @param context vscode.ExtensionContext
 */
export function activate(context: vscode.ExtensionContext) {
	console.log("ChromaSkin extension is now active!");

	let disposable = vscode.commands.registerCommand("chromaskin.openPicker", () => {
		const panel = vscode.window.createWebviewPanel("colorThemePicker", "ChromaSkin: Theme Generator", vscode.ViewColumn.One, {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "media"))],
		});
		panel.iconPath = {
			light: vscode.Uri.file(path.join(context.extensionPath, "resources", "chromaskin-lightmode.png")),
			dark: vscode.Uri.file(path.join(context.extensionPath, "resources", "chromaskin-darkmode.png")),
		};

		// Initial color theme configuration
		const themeConfig: ColorThemeConfig = {
			color1: "#c089f0",
			color2: "#2b2b2b",
			color3: "#252525",
			color4: "#b8b8b8",
			color5: "#454545",
			intensity: 100,
		};

		// Set the webview's HTML content
		panel.webview.html = getWebviewContent(context, panel.webview, themeConfig);

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
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
function applyColorTheme(themeConfig: ColorThemeConfig) {
	// Get the current config
	const config = vscode.workspace.getConfiguration("workbench");
    const editorConfig = vscode.workspace.getConfiguration("editor");

	const generator = new VSCodeThemeGenerator();
	generator.setColors(
		themeConfig.color1,
		themeConfig.color2,
		themeConfig.color3,
		themeConfig.color4,
		themeConfig.color5,
		themeConfig.intensity
	);

	const colorCustomizations = {
		colorCustomizations: generator.generateTheme(),
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
function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, themeConfig: ColorThemeConfig): string {
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
		color1: themeConfig.color1,
		color2: themeConfig.color2,
		color3: themeConfig.color3,
		color4: themeConfig.color4,
		color5: themeConfig.color5,
		intensity: themeConfig.intensity,
	});

	return htmlContent;
}

export function deactivate() {}
