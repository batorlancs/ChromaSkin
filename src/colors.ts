import { ThemeConfig } from "./types";
import { adjustColor, blendColors, getLightestColor, hexToHexAlpha, isDarkMode, whiteOrBlackText } from "./utils";

export function getColors(provided: ThemeConfig) {
	const isDark = isDarkMode(provided.background);
	const { primary, background, accent, foreground, border, borderOpacity } = provided;

	const themeWithAuto = {
		...provided,
		activityBar: provided.autoAdvancedColors ? accent : provided.activityBar,
		popover: provided.autoAdvancedColors ? adjustColor(accent, 0, 0, 5) : provided.popover,
		button: provided.autoAdvancedColors ? adjustColor(primary, 0, -5, 5) : provided.button,
	};

	const darkOtherColors = {
		blue: {
			soft: "#8db9e2",
			default: "#75beff",
			hover: "#5599ff",
			active: "#3377ff",
		},
		red: {
			soft: "#ff6b6b",
			default: "#ff5555",
			hover: "#ff3333",
			active: "#ff1111",
		},
		green: {
			soft: "#a3d9b1",
			default: "#73c991",
			hover: "#55b37d",
			active: "#33995d",
		},
		yellow: {
			soft: "#e2c08d",
			default: "#ffd700",
			hover: "#ffb300",
			active: "#ff9900",
		},
		orange: {
			soft: "#ffb366",
			default: "#ff9100",
			hover: "#ff7700",
			active: "#ff5500",
		},
		purple: {
			soft: "#c5a9c4",
			default: "#b48ead",
			hover: "#997799",
			active: "#806680",
		},
	};

	const lightOtherColors = {
		blue: {
			soft: "#4b6b96",
			default: "#1e68ba",
			hover: "#0e56a8",
			active: "#084890",
		},
		red: {
			soft: "#d43d3d",
			default: "#cc2222",
			hover: "#b51919",
			active: "#9e0e0e",
		},
		green: {
			soft: "#508c5e",
			default: "#2e7d42",
			hover: "#1b6330",
			active: "#0e4f23",
		},
		yellow: {
			soft: "#b28506",
			default: "#9c7100",
			hover: "#855e00",
			active: "#704d00",
		},
		orange: {
			soft: "#cc6a00",
			default: "#b35600",
			hover: "#994700",
			active: "#803a00",
		},
		purple: {
			soft: "#7e5680",
			default: "#67446a",
			hover: "#553457",
			active: "#442743",
		},
	};

	const defaults = {
		transparent: "#00000000",
		other: isDark ? darkOtherColors : lightOtherColors,
	};

	// Button
	const buttonBackground = themeWithAuto.button;
	const buttonForeground = whiteOrBlackText(buttonBackground);
	const secondaryBackground = adjustColor(getLightestColor([accent, background]), 0, 0, 10);
	const button = {
		background: buttonBackground,
		foreground: buttonForeground,
		hoverBackground: adjustColor(buttonBackground, 0, 0, -5),
		border: defaults.transparent,
		separator: whiteOrBlackText(buttonBackground, 0.25),
		secondaryBackground: secondaryBackground,
		secondaryForeground: whiteOrBlackText(secondaryBackground, 0.75),
		secondaryHoverBackground: adjustColor(secondaryBackground, 0, 0, 5),
	};

	// Badge
	const badge = {
		background: primary,
		foreground: whiteOrBlackText(primary, 0.9),
	};

	// Activity Bar
	const activityBar = {
		background: themeWithAuto.activityBar,
		inactiveForeground: hexToHexAlpha(foreground, 0.38),
		foreground: hexToHexAlpha(foreground, 0.83),
		badgeForeground: badge.foreground,
		badgeBackground: badge.background,
		activeBorder: hexToHexAlpha(foreground, 0.68),
		border: border,
		activeBackground: hexToHexAlpha(foreground, 0.04),
	};
	const activityBarBadge = {
		foreground: badge.foreground,
		background: badge.background,
	};

	// Profiles
	const profileBadge = {
		background: badge.foreground,
		foreground: badge.background,
	};

	// Side Bar
	const sideBar = {
		background: accent,
		border: border,
		foreground: adjustColor(foreground, 0, 0, -15),
	};
	const sideBarTitle = {
		foreground: adjustColor(foreground, 0, 0, -5),
		border: defaults.transparent,
		background: defaults.transparent,
	};
	const sideBarSectionHeader = {
		background: accent,
		foreground: adjustColor(foreground, 0, 0, -15),
		border: hexToHexAlpha(foreground, 0.06),
	};
	const sideBarStickyScroll = {
		border: border,
		background: accent,
		shadow: adjustColor(background, 0, 0, -5),
	};

	// Panel
	const panel = {
		background: accent,
		border: border,
		dropBackground: adjustColor(accent, 0, 0, 25),
		stickyScroll: {
			border: border,
		},
		section: {
			border: adjustColor(accent, 0, 0, 15),
			dropBackground: adjustColor(accent, 0, 0, 25),
		},
		title: {
			inactiveForeground: adjustColor(foreground, 0, 0, -30),
			activeBorder: primary,
			activeForeground: foreground,
		},
	};
	// Status Bar
	const statusBarBackground = accent;
	const statusBar = {
		background: statusBarBackground,
		foreground: hexToHexAlpha(foreground, 0.5),
		border: border,
		debuggingBackground: adjustColor(statusBarBackground, 0, 0, 10),
		debuggingForeground: hexToHexAlpha(foreground, 0.75),
		debuggingBorder: border,
		noFolderBackground: statusBarBackground,
		itemHoverBackground: adjustColor(statusBarBackground, 0, 0, 5),
		itemRemoteBackground: adjustColor(statusBarBackground, 0, 0, 5),
		itemRemoteForeground: whiteOrBlackText(adjustColor(statusBarBackground, 0, 0, 5), 0.75),
		itemRemoteHoverBackground: button.background,
		itemRemoteHoverForeground: whiteOrBlackText(button.background),
	};

	// Cursor
	const cursor = {
		foreground: provided.coloredCursor ? primary : foreground,
	};

	// based on borderOpacity get a value between 0 and 50 (50% of the input value)
	const borderOpacityValue = Math.min(50, Math.max(0, borderOpacity * 0.5));

	const popoverBackground = themeWithAuto.popover;
	const popoverForeground = adjustColor(foreground, 0, 0, -10);
	const widget = {
		background: popoverBackground,
		foreground: popoverForeground,
		focusBackground: adjustColor(popoverBackground, 0, 0, 5),
		focusForeground: popoverForeground,
		border: adjustColor(popoverBackground, 0, 0, borderOpacityValue),
		shadow: adjustColor(accent, 0, 0, -5),
	};

	const popover = {
		background: popoverBackground,
		foreground: popoverForeground,
		focusBackground: adjustColor(popoverBackground, 0, 0, 5),
		focusForeground: popoverForeground,
		border: adjustColor(popoverBackground, 0, 0, borderOpacityValue),
	};

	// Git
	const gitOpacity = 0.6;
	const git = {
		ignoredResourceForeground: hexToHexAlpha(foreground, 0.16),
		modifiedResourceForeground: blendColors(defaults.other.orange.default, foreground, gitOpacity),
		deletedResourceForeground: blendColors(defaults.other.red.default, foreground, gitOpacity),
		untrackedResourceForeground: blendColors(defaults.other.green.default, foreground, gitOpacity),
		addedResourceForeground: blendColors(defaults.other.green.default, foreground, gitOpacity),
		conflictingResourceForeground: blendColors(defaults.other.yellow.default, foreground, gitOpacity),
		submoduleResourceForeground: blendColors(defaults.other.blue.default, foreground, gitOpacity),
		stageModifiedResourceForeground: blendColors(defaults.other.orange.default, foreground, gitOpacity),
		stageDeletedResourceForeground: blendColors(defaults.other.red.default, foreground, gitOpacity),
	};

	// Editor
	const editor = {
		background: background,
		foreground: foreground,
		selectionBackground: hexToHexAlpha(foreground, 0.12),
		selectionHighlightBackground: hexToHexAlpha(foreground, 0.08),
		inactiveSelectionBackground: hexToHexAlpha(foreground, 0.06),
		lineHighlightBorder: `${foreground}00`,
		lineHighlightBackground: hexToHexAlpha(foreground, 0.04),
		lineNumber: {
			foreground: hexToHexAlpha(foreground, 0.18),
			activeForeground: hexToHexAlpha(foreground, 0.59),
		},
		gutter: {
			background: background,
		},
		bracketMatch: {
			background: hexToHexAlpha(foreground, 0.05),
			border: hexToHexAlpha(foreground, 0.16),
		},
		stickyScroll: {
			border: adjustColor(background, 0, 0, 10),
			shadow: adjustColor(background, 0, 0, -5),
			background: background,
		},
		stickyScrollHover: {
			background: adjustColor(background, 0, 0, 3),
		},
		indentGuide: {
			activeBackground1: hexToHexAlpha(foreground, 0.22),
			background1: hexToHexAlpha(foreground, 0.1),
		},
		selectionForeground: foreground,
		selectionHighlightBorder: hexToHexAlpha(foreground, 0),
		wordHighlightBackground: hexToHexAlpha(foreground, 0.08),
		wordHighlightBorder: hexToHexAlpha(foreground, 0),
		wordHighlightStrongBackground: hexToHexAlpha(foreground, 0.12),
		wordHighlightStrongBorder: hexToHexAlpha(foreground, 0),
		wordHighlightTextBackground: hexToHexAlpha(foreground, 0.06),
		wordHighlightTextBorder: hexToHexAlpha(foreground, 0),
		findMatchBackground: hexToHexAlpha(foreground, 0.2),
		findMatchForeground: foreground,
		findMatchHighlightBackground: hexToHexAlpha(foreground, 0.15),
		findMatchHighlightForeground: foreground,
		findRangeHighlightBackground: hexToHexAlpha(foreground, 0.05),
		findMatchBorder: hexToHexAlpha(foreground, 0),
		findMatchHighlightBorder: hexToHexAlpha(foreground, 0),
		findRangeHighlightBorder: hexToHexAlpha(foreground, 0),
		hoverHighlightBackground: hexToHexAlpha(foreground, 0.08),
		linkActiveForeground: primary,
		unicodeHighlightBorder: hexToHexAlpha(defaults.other.yellow.default, 0.5),
		unicodeHighlightBackground: hexToHexAlpha(defaults.other.yellow.default, 0.2),
		symbolHighlightBackground: hexToHexAlpha(foreground, 0.1),
		symbolHighlightBorder: hexToHexAlpha(foreground, 0),
		whitespace: hexToHexAlpha(foreground, 0.15),
		indentGuideBackground: hexToHexAlpha(foreground, 0.08),
		indentGuideActiveBackground: hexToHexAlpha(foreground, 0.25),
		inlayHintBackground: hexToHexAlpha(foreground, 0.08),
		inlayHintForeground: hexToHexAlpha(foreground, 0.8),
		inlayHintTypeBackground: hexToHexAlpha(defaults.other.blue.default, 0.08),
		inlayHintTypeForeground: hexToHexAlpha(defaults.other.blue.default, 0.8),
		inlayHintParameterBackground: hexToHexAlpha(defaults.other.orange.default, 0.08),
		inlayHintParameterForeground: hexToHexAlpha(defaults.other.orange.default, 0.8),
		rulerForeground: hexToHexAlpha(foreground, 0.15),
		codeLensForeground: hexToHexAlpha(foreground, 0.5),
		linkedEditingBackground: hexToHexAlpha(primary, 0.1),
	};

	return {
		theme: themeWithAuto,
		colors: {
			...provided,
			button,
			defaults,
			popover,
			badge,
			activityBar,
			activityBarBadge,
			profileBadge,
			sideBar,
			sideBarTitle,
			sideBarSectionHeader,
			sideBarStickyScroll,
			statusBar,
			panel,
			cursor,
			widget,
			git,
			editor,
		},
	};
}
