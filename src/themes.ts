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
				"primary": "#bf8045",
				"background": "#2b2b2b",
				"accent": "#252525",
				"foreground": "#bdbdbd",
				"border": "#1a1a1a",
				"activityBar": "#252525",
				"popover": "#252525",
				"button": "#252525",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		},
		{
			name: "Default (Inverted)",
			description: "The default theme for VSCode",
			config: {
				"primary": "#bf8045",
				"background": "#252525",
				"accent": "#2b2b2b",
				"foreground": "#bdbdbd",
				"border": "#1a1a1a",
				"activityBar": "#2b2b2b",
				"popover": "#2b2b2b",
				"button": "#2b2b2b",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		},
		{
			name: "Default Dimmed",
			description: "The default theme for VSCode",
			config: {
				"primary": "#bf8045",
				"background": "#2b2b2b",
				"accent": "#252525",
				"foreground": "#bdbdbd",
				"border": "#3b3b3b",
				"activityBar": "#252525",
				"popover": "#252525",
				"button": "#252525",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		},
		{
			name: "Default Borderless",
			description: "The default theme for VSCode",
			config: {
				"primary": "#bf8045",
				"background": "#2b2b2b",
				"accent": "#212121",
				"foreground": "#bdbdbd",
				"border": "#252525",
				"activityBar": "#212121",
				"popover": "#212121",
				"button": "#212121",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		},
		{
			name: "Default Lighter",
			description: "The default theme for VSCode",
			config: {
				"primary": "#bf8045",
				"background": "#2b2b2b",
				"accent": "#363636",
				"foreground": "#bdbdbd",
				"border": "#252525",
				"activityBar": "#363636",
				"popover": "#363636",
				"button": "#363636",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		},
		{
			name: "Default Darker",
			description: "The default theme for VSCode",
			config: {
				"primary": "#bf8045",
				"background": "#1c1c1c",
				"accent": "#141414",
				"foreground": "#bdbdbd",
				"border": "#0d0d0d",
				"activityBar": "#141414",
				"popover": "#141414",
				"button": "#141414",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bdbdbd"
			}
		}
	],
	popular: [
		{
			name: "Dark Modern",
			description: "A dark modern theme for VSCode",
			config: {
				"primary": "#0078d4",
				"background": "#1f1f1f",
				"accent": "#181818",
				"foreground": "#d1d1d1",
				"border": "#2b2b2b",
				"activityBar": "#181818",
				"popover": "#2e2e2e",
				"button": "#1c425e",
				"coloredCursor": false,
				"borderOpacity": 25,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#bdbdbd",
				"indicator": "#c3834a"
			}
		},
		{
			name: "Dark Modern (Inverted)",
			description: "A dark modern theme for VSCode",
			config: {
				"primary": "#0078d4",
				"background": "#181818",
				"accent": "#1f1f1f",
				"foreground": "#d1d1d1",
				"border": "#2b2b2b",
				"activityBar": "#1f1f1f",
				"popover": "#2e2e2e",
				"button": "#1c425e",
				"coloredCursor": false,
				"borderOpacity": 25,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#bdbdbd",
				"indicator": "#c3834a"
			}		
		},
		{
			name: "Darcula",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#0e639c",
				"background": "#242424",
				"accent": "#2d2d2d",
				"foreground": "#c7c7c7",
				"border": "#242424",
				"activityBar": "#2d2d2d",
				"popover": "#2e2e2e",
				"button": "#0e639c",
				"coloredCursor": false,
				"borderOpacity": 25,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": false,
				"optionalEditorForeground": "default",
				"indicator": "#c7c7c7"
			}
		},
		{
			name: "Tokyo Night",
			description: "A monokai theme for VSCode",
			config: {
				"primary": "#3d59a1",
				"background": "#1a1b26",
				"accent": "#16161e",
				"foreground": "#989eb3",
				"border": "#101014",
				"activityBar": "#16161e",
				"popover": "#16161e",
				"button": "#16161e",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#989eb3"
			}
		},
		{
			name: "Tokyo Night Storm",
			description: "A monokai theme for VSCode",
			config: {
				"primary": "#3a5394",
				"background": "#24283b",
				"accent": "#1f2335",
				"foreground": "#999fb8",
				"border": "#1b1e2e",
				"activityBar": "#1f2335",
				"popover": "#232734",
				"button": "#3a5394",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#7490d8"
			}
		},
		{
			name: "Night Owl",
			description: "A night owl theme for VSCode",
			config: {
				"primary": "#674ca4",
				"background": "#011627",
				"accent": "#031c30",
				"foreground": "#b0bec9",
				"border": "#031c30",
				"activityBar": "#031c30",
				"popover": "#052a48",
				"button": "#114c78",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": false,
				"optionalEditorForeground": "default",
				"indicator": "#c792ea"
			}
		},
		{
			name: "Ayu Mirage (Bordered)",
			description: "A ayu mirage theme for VSCode",
			config: {
				"primary": "#ffcc66",
				"background": "#242936",
				"accent": "#1f2430",
				"foreground": "#949dad",
				"border": "#171b24",
				"activityBar": "#242936",
				"popover": "#1f2532",
				"button": "#ffcc66",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#ffcc66"
			}
		},
		{
			name: "Ayu Dark (Bordered)",
			description: "A ayu mirage theme for VSCode",
			config: {
				"primary": "#e6b450",
				"background": "#0d1017",
				"accent": "#0b0e14",
				"foreground": "#9b9fa6",
				"border": "#1e232b",
				"activityBar": "#0b0e14",
				"popover": "#141924",
				"button": "#e6b450",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#e6b450"
			}
		},
		{
			name: "Dracula",
			description: "A dracula theme for VSCode",
			config: {
				"primary": "#ff79c6",
				"background": "#282a36",
				"accent": "#21222c",
				"foreground": "#cfcbd2",
				"border": "#21222c",
				"activityBar": "#282a36",
				"popover": "#2c2d3a",
				"button": "#44475a",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": false,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#dbdbdc",
				"indicator": "#ff79c6"
			}
		},
		{
			name: "Gatito",
			description: "A gatito theme for VSCode",
			config: {
				"primary": "#5986b3",
				"background": "#242b2e",
				"accent": "#1d2325",
				"foreground": "#c4c4c4",
				"border": "#30373a",
				"activityBar": "#1d2325",
				"popover": "#1d2325",
				"button": "#a94348",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#dbdbdc",
				"indicator": "#717b7f"
			}
		},
		{
			name: "Cobalt2",
			description: "A cobalt2 theme for VSCode",
			config: {
				"primary": "#ffc600",
				"background": "#193549",
				"accent": "#15232d",
				"foreground": "#cccccc",
				"border": "#0d161c",
				"activityBar": "#122738",
				"popover": "#122738",
				"button": "#ffc600",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#ffc600"
			}
		},
		{
			name: "Firefox",
			description: "A firefox theme for VSCode",
			config: {
				"primary": "#0a84ff",
				"background": "#2a2a2e",
				"accent": "#1b1b1d",
				"foreground": "#c4c4c4",
				"border": "#3c3c3d",
				"activityBar": "#1b1b1d",
				"popover": "#27272a",
				"button": "#474748",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#dbdbdc",
				"indicator": "#c4c4c4"
			}
		},
		{
			name: "Nord",
			description: "A nord theme for VSCode",
			config: {
				"primary": "#82b6c6",
				"background": "#2e3440",
				"accent": "#242932",
				"foreground": "#dbdbdb",
				"border": "#3b4252",
				"activityBar": "#242932",
				"popover": "#3a4150",
				"button": "#82b6c6",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#82b6c6"
			}
		}
	],
	monokai: [
		{
			name: "Monokai Pro",
			description: "A monokai theme for VSCode",
			config: {
				"primary": "#ffd866",
				"background": "#2d2a2e",
				"accent": "#221f22",
				"foreground": "#cfcfcf",
				"border": "#19181a",
				"activityBar": "#221f22",
				"popover": "#3d383d",
				"button": "#403e41",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bababa"
			}
		},
		{
			name: "Monokai Pro (Filter Machine)",
			description: "A dimmed monokai theme for VSCode",
			config: {
				"primary": "#ffed72",
				"background": "#273136",
				"accent": "#1d2528",
				"foreground": "#cfcfcf",
				"border": "#161b1e",
				"activityBar": "#1d2528",
				"popover": "#323e43",
				"button": "#3a4449",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bababa"
			  }
		},
		{
			name: "Monokai Pro (Filter Octagon)",
			description: "A dimmed monokai theme for VSCode",
			config: {
				"primary": "#ffd76d",
				"background": "#282a3a",
				"accent": "#1e1f2b",
				"foreground": "#cfcfcf",
				"border": "#161821",
				"activityBar": "#1e1f2b",
				"popover": "#333448",
				"button": "#3a3d4b",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#b8b8b8"
			}
		},
		{
			name: "Monokai Pro (Filter Spectrum)",
			description: "A dimmed monokai theme for VSCode",
			config: {
				"primary": "#f9cc6c",
				"background": "#2c2525",
				"accent": "#211c1c",
				"foreground": "#cfcfcf",
				"border": "#191515",
				"activityBar": "#211c1c",
				"popover": "#3c3434",
				"button": "#403838",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bfbfbf"
			}
		},
		{
			name: "Monokai Pro (Filter Ristretto)",
			description: "A dimmed monokai theme for VSCode",
			config: {
				"primary": "#fce566",
				"background": "#222222",
				"accent": "#191919",
				"foreground": "#cfcfcf",
				"border": "#131313",
				"activityBar": "#191919",
				"popover": "#2e2e2e",
				"button": "#363537",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#cfcfcf"
			}
		},
	],
	github: [
		{
			name: "Github Dark",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#0366d6",
				"background": "#24292e",
				"accent": "#1f2428",
				"foreground": "#c5c7c9",
				"border": "#181c20",
				"activityBar": "#24292e",
				"popover": "#2f363c",
				"button": "#176f2c",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#f9826c"
			}
		},
		{
			name: "Github Dark (Inverted)",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#0366d6",
				"background": "#1f2428",
				"accent": "#24292e",
				"foreground": "#c5c7c9",
				"border": "#181c20",
				"activityBar": "#24292e",
				"popover": "#2f363c",
				"button": "#176f2c",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#f9826c"
			}
		},
		{
			name: "Github Dark Default",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#1f6feb",
				"background": "#0d1117",
				"accent": "#010409",
				"foreground": "#c4c4c4",
				"border": "#30363d",
				"activityBar": "#0d1117",
				"popover": "#161b22",
				"button": "#238636",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#f78166"
			}
		},
		{
			name: "Github Dark Dimmed",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#316dca",
				"background": "#22272e",
				"accent": "#1c2128",
				"foreground": "#c5c7c9",
				"border": "#444c56",
				"activityBar": "#22272e",
				"popover": "#2f3641",
				"button": "#347d39",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 3,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#ec775c"
			}
		},
		{
			name: "Github Copilot",
			description: "A theme for VSCode",
			config: {
				"primary": "#89ddff",
				"background": "#232a2f",
				"accent": "#1a2023",
				"foreground": "#c2cad0",
				"border": "#101416",
				"activityBar": "#1a2023",
				"popover": "#2d3539",
				"button": "#ffea6b",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#ffea6b"
			}
		}
	],
	oneDark: [
		{
			name: "One Dark Pro",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#4d78cc",
				"background": "#282c34",
				"accent": "#21252b",
				"foreground": "#cfcfcf",
				"border": "#21252b",
				"activityBar": "#21252b",
				"popover": "#1f2329",
				"button": "#404754",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#b0b0b0"
			  }
		},
		{
			name: "One Dark Pro Darker",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#4d78cc",
				"background": "#23272e",
				"accent": "#1e2227",
				"foreground": "#cccccc",
				"border": "#1e2227",
				"activityBar": "#1e2227",
				"popover": "#1e2329",
				"button": "#404754",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#cccccc"
			}
		},
		{
			name: "One Dark Pro Flat",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#21252b",
				"background": "#282c34",
				"accent": "#282c34",
				"foreground": "#cccccc",
				"border": "#23252c",
				"activityBar": "#282c34",
				"popover": "#21242c",
				"button": "#404754",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#cccccc"
			}
		},
		{
			name: "One Dark Pro Night Flat",
			description: "A dark theme for VSCode",
			config: {
				"primary": "#4d78cc",
				"background": "#16191d",
				"accent": "#16191d",
				"foreground": "#c4c4c4",
				"border": "#37393d",
				"activityBar": "#16191d",
				"popover": "#21262c",
				"button": "#404754",
				"coloredCursor": false,
				"borderOpacity": 20,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#b8b8b8"
			}
		}
	],
	catpuccin: [
		{
			name: "Catpuccin Mocha",
			description: "A catpuccin theme for VSCode",
			config: {
				"primary": "#cba6f7",
				"background": "#1e1e2e",
				"accent": "#181825",
				"foreground": "#c4c2c7",
				"border": "#181825",
				"activityBar": "#181825",
				"popover": "#1b1b2c",
				"button": "#cba6f7",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#cdd6f4",
				"indicator": "#cba6f7"
			}
		},
		{
			name: "Catpuccin Macchiato",
			description: "A catpuccin theme for VSCode",
			config: {
				"primary": "#c6a0f6",
				"background": "#24273a",
				"accent": "#1e2030",
				"foreground": "#c4c2c7",
				"border": "#1e2030",
				"activityBar": "#1e2030",
				"popover": "#272a3f",
				"button": "#c6a0f6",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#cdd6f4",
				"indicator": "#c6a0f6"
			}
		},
		{
			name: "Catpuccin Frappe",
			description: "A catpuccin theme for VSCode",
			config: {
				"primary": "#ca9ee6",
				"background": "#303446",
				"accent": "#232634",
				"foreground": "#c1bdc7",
				"border": "#232634",
				"activityBar": "#232634",
				"popover": "#323449",
				"button": "#ca9ee6",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#cdd6f4",
				"indicator": "#ca9ee6"
			}
		},
		{
			name: "Catpuccin Graphite",
			description: "A catpuccin theme for VSCode",
			config: {
				"primary": "#ca9ee6",
				"background": "#2f2f37",
				"accent": "#232329",
				"foreground": "#cfcbd2",
				"border": "#232329",
				"activityBar": "#232329",
				"popover": "#2d2d34",
				"button": "#ca9ee6",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "#dbdbdc",
				"indicator": "#ca9ee6"
			}
		}
	],
	"tutorial": [
		{
			name: "Tutorial (Basic)",
			description: "Use this theme to check the basic colors of the theme",
			config: {
				"primary": "#4ca45d",
				"background": "#252a3c",
				"accent": "#432323",
				"foreground": "#bac054",
				"border": "#377a7b",
				"activityBar": "#432323",
				"popover": "#432323",
				"button": "#432323",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": true,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bac054"
			}
		},
		{
			name: "Tutorial (Advanced)",
			description: "Use this theme to check the advanced colors of the theme",
			config: {
				"primary": "#e8e9e8",
				"background": "#1f1f1f",
				"accent": "#1f1f1f",
				"foreground": "#c7c7c7",
				"border": "#2b2b2b",
				"activityBar": "#26325e",
				"popover": "#8e3333",
				"button": "#3d8a3d",
				"coloredCursor": false,
				"borderOpacity": 30,
				"commentOpacity": 4,
				"autoAdvancedColors": false,
				"editorHighlighting": true,
				"syntaxCommentsOverwrite": true,
				"optionalEditorForeground": "default",
				"indicator": "#bb56c8"
			}
		}
	]
};

export default themes;
