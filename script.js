function deleteUserTheme(themeId) {
    console.log("DELETING USER THEME", themeId);
    
    // Ask the VS Code extension to show a confirmation dialog
    vscode.postMessage({
        command: "confirmDeleteTheme",
        themeId: themeId
    });
    
    // The actual deletion will happen when the extension responds
} 