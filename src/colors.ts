import { ThemeConfig } from "./types";
import { adjustColor, blendColors, getLightestColor, hexToHexAlpha, isDarkMode, whiteOrBlackText } from "./utils";

export function getColors(provided: ThemeConfig) {
	const { primary, background, accent, foreground, border, borderOpacity, optionalEditorForeground } = provided;
	const isDark = isDarkMode(provided.background);
	const contrastTextColor = isDark ? "#ffffff" : "#000000";
	const primaryForeground = adjustColor(primary, 0, 0, 0, { minLightness: isDark ? 0.54 : 0, maxLightness: isDark ? 1 : 0.46 });

	const themeWithAuto = {
		...provided,
		activityBar: provided.autoAdvancedColors ? accent : provided.activityBar,
		popover: provided.autoAdvancedColors ? adjustColor(accent, 0, 0, 5) : provided.popover,
		button: provided.autoAdvancedColors ? primary : provided.button,
		indicator: provided.autoAdvancedColors ? foreground : provided.indicator,
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
			soft: "#b3d9a3",
			default: "#8ac973",
			hover: "#73b355",
			active: "#5d9933",
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
		inactiveForeground: hexToHexAlpha(foreground, 0.35),
		foreground: hexToHexAlpha(foreground, 1),
		badgeForeground: badge.foreground,
		badgeBackground: badge.background,
		// activeBorder: hexToHexAlpha(themeWithAuto.indicator, 0.68),
		activeBorder: themeWithAuto.indicator,
		border: border,
		activeBackground: border === accent ? defaults.transparent : hexToHexAlpha(foreground, 0.04),
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
		foreground: provided.coloredCursor ? primaryForeground : foreground,
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
		border: hexToHexAlpha(adjustColor(popoverBackground, 0, 0, borderOpacityValue, { saturation: 0.7 }), 0.6),
		shadow: hexToHexAlpha(adjustColor(popoverBackground, 0, 0, -10, { saturation: 0.4 }), 0.5),
	};

	const popover = {
		background: popoverBackground,
		foreground: popoverForeground,
		focusBackground: adjustColor(popoverBackground, 0, 0, 5),
		focusForeground: popoverForeground,
		border: adjustColor(popoverBackground, 0, 0, borderOpacityValue, { saturation: 0.7 }),
	};

	// Git
	const gitOpacity = 0.65;
	const git = {
		ignoredResourceForeground: hexToHexAlpha(foreground, 0.25),
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
	const editorContrastTextColor = contrastTextColor;
	const editor = {
		background: background,
		foreground: optionalEditorForeground,
		selectionBackground: hexToHexAlpha(editorContrastTextColor, 0.12),
		selectionHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.08),
		inactiveSelectionBackground: hexToHexAlpha(editorContrastTextColor, 0.06),
		lineHighlightBorder: defaults.transparent,
		lineHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.04),
		lineNumber: {
			foreground: hexToHexAlpha(editorContrastTextColor, 0.18),
			activeForeground: hexToHexAlpha(editorContrastTextColor, 0.59),
		},
		gutter: {
			background: background,
		},
		bracketMatch: {
			background: hexToHexAlpha(editorContrastTextColor, 0.06),
			border: hexToHexAlpha(editorContrastTextColor, 0.12),
		},
		stickyScroll: {
			border: adjustColor(background, 0, 0, 5),
			shadow: adjustColor(background, 0, 0, -3),
			background: background,
		},
		stickyScrollHover: {
			background: adjustColor(background, 0, 0, 3),
		},
		indentGuide: {
			activeBackground1: hexToHexAlpha(editorContrastTextColor, 0.22),
			background1: hexToHexAlpha(editorContrastTextColor, 0.1),
		},
		selectionForeground: "default",
		selectionHighlightBorder: hexToHexAlpha(editorContrastTextColor, 0),
		wordHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.1),
		wordHighlightBorder: hexToHexAlpha(editorContrastTextColor, 0),
		wordHighlightStrongBackground: hexToHexAlpha(editorContrastTextColor, 0.13),
		wordHighlightStrongBorder: hexToHexAlpha(editorContrastTextColor, 0),
		wordHighlightTextBackground: hexToHexAlpha(editorContrastTextColor, 0.1),
		wordHighlightTextBorder: hexToHexAlpha(editorContrastTextColor, 0),
		findMatchBackground: hexToHexAlpha(editorContrastTextColor, 0.15),
		findMatchForeground: "default",
		findMatchHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.15),
		findMatchHighlightForeground: "default",
		findRangeHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.1),
		findMatchBorder: hexToHexAlpha(editorContrastTextColor, 0.65),
		findMatchHighlightBorder: hexToHexAlpha(editorContrastTextColor, 0.1),
		findRangeHighlightBorder: hexToHexAlpha(editorContrastTextColor, 0.1),
		hoverHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.08),
		linkActiveForeground: primaryForeground,
		unicodeHighlightBorder: hexToHexAlpha(defaults.other.yellow.default, 0.5),
		unicodeHighlightBackground: hexToHexAlpha(defaults.other.yellow.default, 0.2),
		symbolHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.1),
		symbolHighlightBorder: hexToHexAlpha(editorContrastTextColor, 0),
		whitespace: hexToHexAlpha(editorContrastTextColor, 0.15),
		indentGuideBackground: hexToHexAlpha(editorContrastTextColor, 0.08),
		indentGuideActiveBackground: hexToHexAlpha(editorContrastTextColor, 0.25),
		inlayHintBackground: hexToHexAlpha(editorContrastTextColor, 0.08),
		inlayHintForeground: hexToHexAlpha(editorContrastTextColor, 0.8),
		inlayHintTypeBackground: hexToHexAlpha(defaults.other.blue.default, 0.08),
		inlayHintTypeForeground: hexToHexAlpha(defaults.other.blue.default, 0.8),
		inlayHintParameterBackground: hexToHexAlpha(defaults.other.orange.default, 0.08),
		inlayHintParameterForeground: hexToHexAlpha(defaults.other.orange.default, 0.8),
		rulerForeground: hexToHexAlpha(editorContrastTextColor, 0.15),
		codeLensForeground: hexToHexAlpha(editorContrastTextColor, 0.5),
		linkedEditingBackground: hexToHexAlpha(primaryForeground, 0.1),
		foldBackground: adjustColor(background, 0, 0, 5),
		foldPlaceholderForeground: hexToHexAlpha(editorContrastTextColor, 0.5),
		rangeHighlightBackground: hexToHexAlpha(editorContrastTextColor, 0.08),
		rangeHighlightBorder: defaults.transparent,
	};

	let editorGroupBorder = border;
	if (border === background) {
		if (border === accent) {
			editorGroupBorder = adjustColor(background, 0, 0, 5);
		} else {
			editorGroupBorder = accent;
		}
	}
	const editorGroup = {
		border: editorGroupBorder,
	};

	const diffEditor = {
		// Text changes
		insertedTextBackground: hexToHexAlpha(defaults.other.green.default, 0.15),
		removedTextBackground: hexToHexAlpha(defaults.other.red.default, 0.15),

		// Lines
		insertedLineBackground: hexToHexAlpha(defaults.other.green.default, 0.1),
		removedLineBackground: hexToHexAlpha(defaults.other.red.default, 0.1),

		// Gutter
		border: border,
		diagonalFill: hexToHexAlpha(foreground, 0.05),

		// Unchanged regions
		unchangedRegionBackground: adjustColor(background, 0, 0, 3),
		unchangedRegionForeground: "default",
		unchangedRegionShadow: adjustColor(background, 0, 0, -5),
		unchangedCodeBackground: background,

		// Gutter colors
		"gutter.insertedLineBackground": hexToHexAlpha(defaults.other.green.default, 0.1),
		"gutter.removedLineBackground": hexToHexAlpha(defaults.other.red.default, 0.1),

		// Overview ruler colors
		"overview.insertedForeground": "default",
		"overview.removedForeground": "default",

		// Move colors
		"move.border": hexToHexAlpha(defaults.other.blue.default, 0.5),
		"moveActive.border": defaults.other.blue.default,

		// Multi diff editor
		"multi.headerBackground": accent,
		"multi.background": background,
		"multi.border": border,
	};

	const inlineEdit = {
		gutterIndicator: {
			primaryBorder: hexToHexAlpha(primary, 0.5),
			primaryForeground: hexToHexAlpha(primary, 0.8),
			primaryBackground: hexToHexAlpha(primary, 0.1),
			secondaryBorder: hexToHexAlpha(defaults.other.purple.default, 0.5),
			secondaryForeground: hexToHexAlpha(defaults.other.purple.default, 0.8),
			secondaryBackground: hexToHexAlpha(defaults.other.purple.default, 0.1),
			successfulBorder: hexToHexAlpha(defaults.other.green.default, 0.5),
			successfulForeground: hexToHexAlpha(defaults.other.green.default, 0.8),
			successfulBackground: hexToHexAlpha(defaults.other.green.default, 0.1),
			background: hexToHexAlpha(foreground, 0.05),
		},
		originalBackground: hexToHexAlpha(defaults.other.red.default, 0.08),
		modifiedBackground: hexToHexAlpha(defaults.other.green.default, 0.08),
		originalChangedLineBackground: hexToHexAlpha(defaults.other.red.default, 0.12),
		originalChangedTextBackground: hexToHexAlpha(defaults.other.red.default, 0.15),
		modifiedChangedLineBackground: hexToHexAlpha(defaults.other.green.default, 0.12),
		modifiedChangedTextBackground: hexToHexAlpha(defaults.other.green.default, 0.15),
		originalBorder: hexToHexAlpha(defaults.other.red.default, 0.4),
		modifiedBorder: hexToHexAlpha(defaults.other.green.default, 0.4),
		tabWillAcceptModifiedBorder: hexToHexAlpha(defaults.other.green.active, 0.6),
		tabWillAcceptOriginalBorder: hexToHexAlpha(defaults.other.red.active, 0.6),
	};

	return {
		theme: themeWithAuto,
		colors: {
			...provided,
			primaryForeground,
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
			diffEditor,
			inlineEdit,
			editorGroup,
		},
	};
}
