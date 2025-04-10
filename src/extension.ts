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

export function activate(context: vscode.ExtensionContext) {
	console.log("Custom Color Theme extension is now active!");

	let disposable = vscode.commands.registerCommand("customColorTheme.openPicker", () => {
		const panel = vscode.window.createWebviewPanel("colorThemePicker", "Custom Color Theme Generator", vscode.ViewColumn.One, {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "media"))],
		});

		// Initial color theme configuration
		const themeConfig: ColorThemeConfig = {
			color1: "#e4703f",
			color2: "#2b2b2b",
			color3: "#252525",
			color4: "#b8b8b8",
			color5: "#555555",
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
						vscode.window.showInformationMessage("ChromaSkin: custom color theme applied!");
						return;
					case "resetTheme":
						resetColorTheme();
						vscode.window.showInformationMessage("ChromaSkin: theme reset!");
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
	};

	// Update the settings
	config.update("colorCustomizations", colorCustomizations.colorCustomizations, vscode.ConfigurationTarget.Global);
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
	config.update("colorCustomizations", {}, vscode.ConfigurationTarget.Global);
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
