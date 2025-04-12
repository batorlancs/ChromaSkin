export interface ColorsButton {
	background: string;
	hoverBackground: string;
	selectionBackground: string;
}

export interface ColorsBorder {
	borderColor: string;
	activeBorder: string;
	inactiveBorder: string;
}

/**
 * Colors that are generated from the provided colors
 */
export interface Colors {
	button: ColorsButton;
	border: ColorsBorder;
}
