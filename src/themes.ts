import { ThemeConfig } from "./types";

interface PredefinedTheme {
	name: string;
	description: string;
	config: ThemeConfig;
}

export function getPredefinedTheme(category: string, index: number): PredefinedTheme {
	return themes[category][index];
}

const themes: Record<string, PredefinedTheme[]> = {
	default: [
		{
			name: "Default",
			description: "The default theme for VSCode",
			config: {
				primary: "#c089f0",
				background: "#2b2b2b",
				accent: "#252525",
				foreground: "#b8b8b8",
				border: "#454545",
				activityBar: "#252525",
				popover: "#252525",
				button: "#c089f0",
				indicator: "#b8b8b8",
				borderOpacity: 30,
				commentOpacity: 4,
				coloredCursor: false,
				autoAdvancedColors: true,
				editorHighlighting: true,
				syntaxCommentsOverwrite: true,
				optionalEditorForeground: "default",
			},
		},
	],
	grayscale: [
		{
			name: "Dimmed",
			description: "A dimmed theme for VSCode",
			config: {
				primary: "#4CAF50",
				background: "#2b2b2b",
				accent: "#252525",
				foreground: "#b8b8b8",
				border: "#454545",
				activityBar: "#252525",
				popover: "#252525",
				button: "#4CAF50",
				indicator: "#b8b8b8",
				borderOpacity: 30,
				commentOpacity: 4,
				coloredCursor: false,
				autoAdvancedColors: true,
				editorHighlighting: true,
				syntaxCommentsOverwrite: true,
				optionalEditorForeground: "default",
			},
		},
		{
			name: "Less Dimmed",
			description: "A less dimmed theme for VSCode",
			config: {
				primary: "#4CAF50",
				background: "#2b2b2b",
				accent: "#252525",
				foreground: "#b8b8b8",
				border: "#454545",
				activityBar: "#252525",
				popover: "#252525",
				button: "#4CAF50",
				indicator: "#b8b8b8",
				borderOpacity: 30,
				commentOpacity: 4,
				coloredCursor: false,
				autoAdvancedColors: true,
				editorHighlighting: true,
				syntaxCommentsOverwrite: true,
				optionalEditorForeground: "default",
			},
		},
	],
};

export default themes;
