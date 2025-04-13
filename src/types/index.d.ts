/**
 * Colors that are provided by the user form the html input
 */
export interface ThemeConfig {
	// color pickers
	primary: string;
	background: string;
	accent: string;
	foreground: string;
	border: string;
	activityBar: string;
	popover: string;
	button: string;
	// slider
	borderOpacity: number;
	// checkbox
	autoAdvancedColors: boolean;
	coloredCursor: boolean;
	editorHighlighting: boolean;
}

export * from "./colors";
