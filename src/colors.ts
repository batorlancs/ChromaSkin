import { ProvidedColors } from "./types";
import { adjustColor, hexToHexAlpha } from "./utils";

interface DerivedColors {
	buttonBackground: string;
	buttonHoverBackground: string;
	selectionBackground: string;
	borderColor: string;
	activeBorder: string;
	inactiveBorder: string;
	popoverBackground: string;
}

export function getColors(provided: ProvidedColors): DerivedColors {
	const derived: DerivedColors = {
		buttonBackground: adjustColor(provided.primary, 0, -30, 0),
		buttonHoverBackground: adjustColor(provided.primary, 0, -50, 0),
		selectionBackground: hexToHexAlpha(provided.primary, 0.15),
		borderColor: provided.border,
		activeBorder: provided.border,
		inactiveBorder: provided.border,
		popoverBackground: adjustColor(provided.background, 0, 0, 10),
	};
	return derived;
}
