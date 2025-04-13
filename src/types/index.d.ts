/**
 * Colors that are provided by the user form the html input
 */
export interface ThemeConfig {
	primary: string;
	background: string;
	accent: string;
	foreground: string;
	border: string;
	borderOpacity: number;
	activityBar: string;
	popover: string;
	coloredCursor: boolean;
	button: string;
	autoAdvancedColors: boolean;
}

export * from "./colors";
