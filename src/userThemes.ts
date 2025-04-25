import * as vscode from "vscode";
import { ThemeConfig } from "./types";

export interface UserTheme {
	id: string;
	name: string;
	description: string;
	config: ThemeConfig;
	dateCreated: string;
}

export class UserThemeManager {
	private context: vscode.ExtensionContext;
	private static readonly STORAGE_KEY = "chromaskin-user-saved-themes";

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	public getAllThemes(): UserTheme[] {
		return this.context.globalState.get<UserTheme[]>(UserThemeManager.STORAGE_KEY, []);
	}

	public getTheme(id: string): UserTheme | undefined {
		const themes = this.getAllThemes();
		return themes.find((theme) => theme.id === id);
	}

	public saveTheme(name: string, description: string, config: ThemeConfig): UserTheme {
		const themes = this.getAllThemes();

		// Create a new theme with unique ID
		const newTheme: UserTheme = {
			id: this.generateId(),
			name,
			description,
			config,
			dateCreated: new Date().toISOString(),
		};

		// Add to list and save
		themes.push(newTheme);
		this.context.globalState.update(UserThemeManager.STORAGE_KEY, themes);

		return newTheme;
	}

	public deleteTheme(id: string): boolean {
		const themes = this.getAllThemes();
		const filteredThemes = themes.filter((theme) => theme.id !== id);

		if (filteredThemes.length !== themes.length) {
			this.context.globalState.update(UserThemeManager.STORAGE_KEY, filteredThemes);
			return true;
		}

		return false;
	}

	private generateId(): string {
		return "user-" + Math.random().toString(36).substring(2, 9);
	}
}
