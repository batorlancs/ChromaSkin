import * as vscode from "vscode";

/**
 * Interface to store both workbench color customizations and token color customizations
 */
export interface UserColorSettings {
	workbenchColorCustomizations?: object;
	tokenColorCustomizations?: object;
}

/**
 * Manages the user's color customization settings, preserving original state
 * and allowing restoration of previous settings
 */
export class UserSettingsManager {
	private context: vscode.ExtensionContext;
	private static readonly INITIAL_SETTINGS_KEY = "chromaskin-initial-settings";
	private static readonly PREVIOUS_SETTINGS_KEY = "chromaskin-previous-settings";

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	/**
	 * Saves the user's current color settings before first theme application
	 * Only saves if settings haven't been saved before
	 */
	public saveInitialSettings(): void {
		// Only save initial settings if they don't exist yet
		if (!this.context.globalState.get(UserSettingsManager.INITIAL_SETTINGS_KEY)) {
			const currentSettings = this.getCurrentColorSettings();
			this.context.globalState.update(UserSettingsManager.INITIAL_SETTINGS_KEY, currentSettings);
			console.log("ChromaSkin: Initial user settings saved");
		}
	}

	/**
	 * Saves the user's current color settings before applying a new theme
	 */
	public saveCurrentSettings(): void {
		const currentSettings = this.getCurrentColorSettings();
		this.context.globalState.update(UserSettingsManager.PREVIOUS_SETTINGS_KEY, currentSettings);
		console.log("ChromaSkin: Current user settings saved");
	}

	/**
	 * Gets the user's current color customization settings from VS Code configuration
	 */
	private getCurrentColorSettings(): UserColorSettings {
		const config = vscode.workspace.getConfiguration();

		return {
			workbenchColorCustomizations: config.get("workbench.colorCustomizations"),
			tokenColorCustomizations: config.get("editor.tokenColorCustomizations"),
		};
	}

	/**
	 * Gets the user's initial saved settings (before any theme was applied)
	 */
	public getInitialSettings(): UserColorSettings | undefined {
		return this.context.globalState.get<UserColorSettings>(UserSettingsManager.INITIAL_SETTINGS_KEY);
	}

	/**
	 * Gets the user's previously saved settings
	 */
	public getPreviousSettings(): UserColorSettings | undefined {
		return this.context.globalState.get<UserColorSettings>(UserSettingsManager.PREVIOUS_SETTINGS_KEY);
	}

	/**
	 * Restores the user's initial color settings
	 */
	public async restoreInitialSettings(): Promise<void> {
		const initialSettings = this.getInitialSettings();
		if (initialSettings) {
			const config = vscode.workspace.getConfiguration();

			await config.update(
				"workbench.colorCustomizations",
				initialSettings.workbenchColorCustomizations,
				vscode.ConfigurationTarget.Global
			);

			await config.update(
				"editor.tokenColorCustomizations",
				initialSettings.tokenColorCustomizations,
				vscode.ConfigurationTarget.Global
			);

			console.log("ChromaSkin: Initial user settings restored");
		} else {
			// If there are no initial settings, just clear everything
			this.clearColorSettings();
		}
	}

	/**
	 * Clears all color customization settings
	 */
	private async clearColorSettings(): Promise<void> {
		const config = vscode.workspace.getConfiguration();

		await config.update("workbench.colorCustomizations", {}, vscode.ConfigurationTarget.Global);

		await config.update("editor.tokenColorCustomizations", {}, vscode.ConfigurationTarget.Global);

		console.log("ChromaSkin: Color settings cleared");
	}
}
