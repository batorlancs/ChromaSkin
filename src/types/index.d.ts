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
    inverseActivityBar: boolean;
}

export * from "./colors";
