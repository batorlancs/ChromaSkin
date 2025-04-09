// src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface ColorThemeConfig {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  intensity: number;
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Custom Color Theme extension is now active!');

  let disposable = vscode.commands.registerCommand('customColorTheme.openPicker', () => {
    const panel = vscode.window.createWebviewPanel(
      'colorThemePicker',
      'Custom Color Theme Generator',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'media'))
        ]
      }
    );

    // Initial color theme configuration
    const themeConfig: ColorThemeConfig = {
      color1: '#ff0000',  // Red
      color2: '#00ff00',  // Green
      color3: '#0000ff',  // Blue
      color4: '#ffff00',  // Yellow
      intensity: 50
    };

    // Set the webview's HTML content
    panel.webview.html = getWebviewContent(context, panel.webview, themeConfig);

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'applyTheme':
            applyColorTheme(message.themeConfig);
            vscode.window.showInformationMessage('Custom color theme applied!');
            return;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

function applyColorTheme(themeConfig: ColorThemeConfig) {
  // Get the current config
  const config = vscode.workspace.getConfiguration('workbench');
  
  // Factor to adjust colors based on intensity (0-1)
  const intensityFactor = themeConfig.intensity / 100;
  
  // Apply the custom theme to the workbench colors
  const colorCustomizations = {
    "colorCustomizations": {
      "editor.background": adjustColorIntensity(themeConfig.color1, intensityFactor),
      "activityBar.background": adjustColorIntensity(themeConfig.color2, intensityFactor),
      "sideBar.background": adjustColorIntensity(themeConfig.color3, intensityFactor),
      "statusBar.background": adjustColorIntensity(themeConfig.color4, intensityFactor)
    }
  };
  
  // Update the settings
  config.update('colorCustomizations', colorCustomizations.colorCustomizations, vscode.ConfigurationTarget.Global);
}

// Helper function to adjust color based on intensity
function adjustColorIntensity(hexColor: string, intensity: number): string {
  // Parse the hex color
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Adjust the color based on intensity
  const adjustedR = Math.min(255, Math.floor(r * intensity));
  const adjustedG = Math.min(255, Math.floor(g * intensity));
  const adjustedB = Math.min(255, Math.floor(b * intensity));
  
  // Convert back to hex
  const adjustedHex = '#' + 
    adjustedR.toString(16).padStart(2, '0') +
    adjustedG.toString(16).padStart(2, '0') +
    adjustedB.toString(16).padStart(2, '0');
  
  return adjustedHex;
}

function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, themeConfig: ColorThemeConfig): string {
  // Get paths to our external files
  const stylesPath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'styles.css'));
  const scriptPath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'script.js'));
  
  // Convert the URIs to a string form that can be used in the webview
  const stylesUri = webview.asWebviewUri(stylesPath);
  const scriptUri = webview.asWebviewUri(scriptPath);
  
  // Read HTML template
  const htmlPath = path.join(context.extensionPath, 'media', 'index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace placeholders with actual values
  htmlContent = htmlContent
    .replace(/\${stylesUri}/g, stylesUri.toString())
    .replace(/\${scriptUri}/g, scriptUri.toString())
    .replace(/\${color1}/g, themeConfig.color1)
    .replace(/\${color2}/g, themeConfig.color2)
    .replace(/\${color3}/g, themeConfig.color3)
    .replace(/\${color4}/g, themeConfig.color4)
    .replace(/\${intensity}/g, themeConfig.intensity.toString());
  
  return htmlContent;
}

export function deactivate() {}