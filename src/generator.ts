import { getColors } from "./colors";
import { ProvidedColors } from "./types";
import { adjustColor, hexToHexAlpha, whiteOrBlackText } from "./utils";

// Generate the theme JSON
export function generateWorkbenchTheme(provided: ProvidedColors): Record<string, any> {
	const textColor = provided.text;
	const backgroundColor = provided.background;
	const sidebarColor = provided.accent;
	const primaryColor = provided.primary;
	const borderColor = provided.border;

	const derivedColors = getColors(provided);
	const defaultColors = {
		transparent: "#00000000",
	};

	return {
		// Contrast colors
		contrastActiveBorder: defaultColors.transparent,
		contrastBorder: defaultColors.transparent,

		// Base colors
		focusBorder: "#8e8eff00",
		foreground: textColor,
		disabledForeground: hexToHexAlpha(textColor, 0.3),
		"widget.border": hexToHexAlpha(derivedColors.borderColor, 0.75),
		"widget.shadow": adjustColor(backgroundColor, 0, 0, -5),
		"selection.background": derivedColors.selectionBackground,
		descriptionForeground: adjustColor(textColor, 0, 0, -10),
		errorForeground: "#ff6b6b",
		"icon.foreground": textColor,
		"sash.hoverBorder": derivedColors.borderColor,

		// Window borders
		"window.activeBorder": derivedColors.borderColor,
		"window.inactiveBorder": backgroundColor,

		// Text colors
		"textBlockQuote.background": hexToHexAlpha(adjustColor(backgroundColor, 0, 0, 10), 0.37),
		"textBlockQuote.border": borderColor,
		"textCodeBlock.background": backgroundColor,
		"textLink.activeForeground": adjustColor(primaryColor, 0, 0, 10),
		"textLink.foreground": primaryColor,
		"textPreformat.foreground": textColor,
		"textPreformat.background": hexToHexAlpha(adjustColor(backgroundColor, 0, 0, 10), 0.37),
		"textSeparator.foreground": textColor,

		// Action colors
		"toolbar.activeBackground": hexToHexAlpha(adjustColor(backgroundColor, 0, 0, 10), 0.37),
		"toolbar.hoverBackground": hexToHexAlpha(adjustColor(backgroundColor, 0, 0, 10), 0.37),
		"toolbar.hoverOutline": "#55555500",
		"editorActionList.background": derivedColors.popoverBackground,
		"editorActionList.foreground": adjustColor(textColor, 0, 0, -10),
		"editorActionList.focusBackground": adjustColor(derivedColors.popoverBackground, 0, 0, 10),
		"editorActionList.focusForeground": textColor,

		// Button control
		"button.background": derivedColors.buttonBackground,
		"button.foreground": whiteOrBlackText(derivedColors.buttonBackground),
		"button.hoverBackground": derivedColors.buttonHoverBackground,
		"button.border": defaultColors.transparent,
		"button.separator": whiteOrBlackText(derivedColors.buttonBackground, 50),
		"button.secondaryBackground": "#636363",
		"button.secondaryForeground": whiteOrBlackText(derivedColors.buttonBackground),
		"button.secondaryHoverBackground": "#555555",
		"checkbox.foreground": primaryColor,
		"checkbox.background": backgroundColor,
		"checkbox.border": derivedColors.borderColor,
		"radio.activeForeground": primaryColor,
		"radio.activeBackground": derivedColors.buttonBackground,
		"radio.activeBorder": borderColor,
		"radio.inactiveBorder": derivedColors.borderColor,
		"radio.inactivateHoverBackground": derivedColors.buttonHoverBackground,

		// Dropdown control
		"dropdown.background": backgroundColor,
		"dropdown.listBackground": adjustColor(backgroundColor, 0, 0, 5),
		"dropdown.border": derivedColors.borderColor,
		"dropdown.foreground": textColor,

		// Input control
		"input.background": backgroundColor,
		"input.foreground": textColor,
		"input.border": hexToHexAlpha(derivedColors.borderColor, 0.78),
		"input.placeholderForeground": adjustColor(textColor, 0, 0, -10),
		"inputOption.activeBackground": hexToHexAlpha(primaryColor, 0.3),
		"inputOption.activeBorder": primaryColor,
		"inputOption.activeForeground": textColor,
		"inputOption.hoverBackground": hexToHexAlpha(primaryColor, 0.2),
		"inputValidation.errorBackground": hexToHexAlpha("#ff5555", 0.1),
		"inputValidation.errorForeground": "#ff5555",
		"inputValidation.errorBorder": "#ff5555",
		"inputValidation.infoBackground": hexToHexAlpha("#75beff", 0.1),
		"inputValidation.infoForeground": "#75beff",
		"inputValidation.infoBorder": "#75beff",
		"inputValidation.warningBackground": hexToHexAlpha("#ff9100", 0.1),
		"inputValidation.warningForeground": "#ff9100",
		"inputValidation.warningBorder": "#ff9100",

		// Scrollbar control
		// "scrollbar.shadow": `${adjustColor(backgroundColor, 0, 0, -5)}00`,
		"scrollbar.shadow": backgroundColor,
		"scrollbarSlider.background": hexToHexAlpha(textColor, 0.21),
		"scrollbarSlider.activeBackground": hexToHexAlpha(textColor, 0.31),
		"scrollbarSlider.hoverBackground": hexToHexAlpha(textColor, 0.26),

		// Badge
		"badge.background": primaryColor,
		"badge.foreground": whiteOrBlackText(primaryColor),

		// Progress bar
		"progressBar.background": primaryColor,

		// Lists and trees
		"list.hoverBackground": hexToHexAlpha(textColor, 0.04),
		"list.hoverForeground": textColor,
		"list.activeSelectionBackground": hexToHexAlpha(textColor, 0.07),
		"list.activeSelectionForeground": textColor,
		"list.inactiveSelectionBackground": hexToHexAlpha(textColor, 0.04),
		"list.inactiveSelectionForeground": hexToHexAlpha(textColor, 0.71),
		"list.focusBackground": hexToHexAlpha(primaryColor, 0.07),
		"list.focusForeground": textColor,
		"list.inactiveFocusBackground": hexToHexAlpha(primaryColor, 0.08),
		"list.focusAndSelectionOutline": `${derivedColors.borderColor}00`,
		"list.dropBackground": hexToHexAlpha(adjustColor(primaryColor, 0, -20, -20), 0.28),
		"list.highlightForeground": adjustColor(textColor, 0, 0, 20),
		"tree.indentGuidesStroke": `${textColor}00`,
		"tree.inactiveIndentGuidesStroke": `${textColor}00`,

		// Activity bar
		"activityBar.background": sidebarColor,
		"activityBar.inactiveForeground": hexToHexAlpha(textColor, 0.38),
		"activityBar.foreground": hexToHexAlpha(textColor, 0.83),
		"activityBarBadge.foreground": whiteOrBlackText(primaryColor),
		"activityBarBadge.background": primaryColor,
		"activityBar.activeBorder": hexToHexAlpha(textColor, 0.68),
		"activityBar.border": borderColor,
		"activityBar.activeBackground": hexToHexAlpha(textColor, 0.04),

		// Profiles
		"profileBadge.background": primaryColor,
		"profileBadge.foreground": whiteOrBlackText(primaryColor),
		"profiles.sashBorder": derivedColors.borderColor,

		// Side Bar
		"sideBar.background": sidebarColor,
		"sideBar.border": borderColor,
		"sideBar.foreground": adjustColor(textColor, 0, 0, -15),
		"sideBarTitle.foreground": adjustColor(textColor, 0, 0, -5),
		"sideBarTitle.border": "#00000000",
		"sideBarTitle.background": "#00000000",
		"sideBarSectionHeader.background": sidebarColor,
		"sideBarSectionHeader.foreground": adjustColor(textColor, 0, 0, -15),
		"sideBarSectionHeader.border": hexToHexAlpha(textColor, 0.06),
		"sideBarStickyScroll.border": borderColor,
		"sideBarStickyScroll.background": sidebarColor,
		"sideBarStickyScroll.shadow": adjustColor(backgroundColor, 0, 0, -5),

		// Minimap
		"minimap.foregroundOpacity": "#00000065",
		"minimap.background": backgroundColor,

		// Editor Groups and Tabs
		"editorGroup.border": borderColor,
		"editorGroup.emptyBackground": backgroundColor,
		"editorGroupHeader.tabsBackground": sidebarColor,
		"editorGroupHeader.tabsBorder": sidebarColor,
		"editorGroupHeader.noTabsBackground": sidebarColor,
		"editorGroupHeader.border": borderColor,
		"editorGroup.dropBackground": hexToHexAlpha(primaryColor, 0.07),

		"tab.border": borderColor,
		"tab.hoverBorder": "default",
		"tab.activeBackground": backgroundColor,
		"tab.inactiveBackground": `${sidebarColor}00`,
		"tab.activeForeground": textColor,
		"tab.inactiveForeground": textColor,
		"tab.activeBorder": backgroundColor,
		"tab.hoverBackground": defaultColors.transparent,
		"tab.hoverForeground": textColor,
		"tab.activeBorderTop": textColor,
		"tab.unfocusedActiveBorder": backgroundColor,
		"tab.unfocusedActiveBorderTop": hexToHexAlpha(textColor, 0.4),
		"tab.unfocusedActiveBackground": backgroundColor,
		"tab.unfocusedActiveForeground": textColor,
		"tab.unfocusedHoverBackground": sidebarColor,
		"tab.unfocusedHoverForeground": textColor,
		"tab.unfocusedInactiveBackground": sidebarColor,
		"tab.unfocusedInactiveForeground": textColor,
		"tab.unfocusedHoverBorder": "default",
		"tab.dragAndDropBorder": hexToHexAlpha(textColor, 0.52),

		// Editor colors
		"editorLineNumber.foreground": hexToHexAlpha(textColor, 0.18),
		"editorLineNumber.activeForeground": hexToHexAlpha(textColor, 0.59),
		"editorGutter.background": backgroundColor,
		"editor.background": backgroundColor,
		"editor.selectionBackground": derivedColors.selectionBackground,
		"editor.selectionHighlightBackground": hexToHexAlpha(primaryColor, 0.33),
		"editor.inactiveSelectionBackground": hexToHexAlpha(adjustColor(primaryColor, 0, -20, -20), 0.33),
		"editorBracketMatch.background": hexToHexAlpha(textColor, 0.05),
		"editorBracketMatch.border": hexToHexAlpha(textColor, 0.16),
		"editorStickyScroll.border": adjustColor(backgroundColor, 0, 0, 10),
		"editorStickyScroll.shadow": adjustColor(backgroundColor, 0, 0, -5),
		"editorStickyScroll.background": backgroundColor,
		"editorStickyScrollHover.background": adjustColor(backgroundColor, 0, 0, 3),
		"editor.lineHighlightBorder": `${textColor}00`,
		"editor.lineHighlightBackground": hexToHexAlpha(textColor, 0.04),
		"editorIndentGuide.activeBackground1": hexToHexAlpha(textColor, 0.28),
		"editorIndentGuide.background1": hexToHexAlpha(textColor, 0.12),
		// Overview ruler
		"editorOverviewRuler.border": backgroundColor,
		"editorOverviewRuler.background": backgroundColor,
		"editorOverviewRuler.activeBorder": borderColor,
		"editorOverviewRuler.activeBackground": hexToHexAlpha(textColor, 0.04),
		"editorOverviewRuler.findMatchBorder": primaryColor,
		"editorOverviewRuler.findMatchBackground": hexToHexAlpha(primaryColor, 0.33),
		"editorOverviewRuler.findMatchForeground": hexToHexAlpha(primaryColor, 0.5),
		"editorOverviewRuler.rangeHighlightForeground": hexToHexAlpha(primaryColor, 0.4),
		"editorOverviewRuler.selectionHighlightForeground": hexToHexAlpha(primaryColor, 0.3),
		"editorOverviewRuler.wordHighlightForeground": hexToHexAlpha(textColor, 0.3),
		"editorOverviewRuler.wordHighlightStrongForeground": hexToHexAlpha(textColor, 0.5),
		"editorOverviewRuler.wordHighlightTextForeground": hexToHexAlpha(textColor, 0.4),
		"editorOverviewRuler.modifiedForeground": "#e2c08d",
		"editorOverviewRuler.addedForeground": "#73c991",
		"editorOverviewRuler.deletedForeground": "#ff6b6b",
		"editorOverviewRuler.errorForeground": "#ff5555",
		"editorOverviewRuler.warningForeground": "#ff9100",
		"editorOverviewRuler.infoForeground": "#75beff",
		"editorOverviewRuler.bracketMatchForeground": hexToHexAlpha(textColor, 0.3),
		"editorOverviewRuler.inlineChatInserted": "#73c99180",
		"editorOverviewRuler.inlineChatRemoved": "#ff6b6b80",

		// Diff editor
		"diffEditor.border": borderColor,

		// Editor widget
		"editorWidget.background": adjustColor(backgroundColor, 0, 0, 5),
		"editorWidget.foreground": textColor,
		"editorWidget.border": derivedColors.borderColor,

		// Panel colors
		"panelTitle.inactiveForeground": adjustColor(textColor, 0, 0, -30),
		"panelTitle.activeBorder": primaryColor,
		"panelTitle.activeForeground": textColor,
		"panel.background": sidebarColor,
		"panel.border": borderColor,
		"panelSection.border": adjustColor(sidebarColor, 0, 0, 15),
		"panelSection.dropBackground": adjustColor(sidebarColor, 0, 0, 25),
		"panelStickyScroll.border": borderColor,

		// Status Bar colors
		"statusBar.background": sidebarColor,
		"statusBar.foreground": hexToHexAlpha(textColor, 0.5),
		"statusBar.debuggingBackground": defaultColors.transparent,
		"statusBar.debuggingForeground": textColor,
		"statusBar.debuggingBorder": borderColor,
		"statusBarItem.hoverBackground": adjustColor(sidebarColor, 0, 0, 5),
		"statusBar.noFolderBackground": sidebarColor,
		"statusBar.border": borderColor,
		"statusBarItem.remoteBackground": adjustColor(sidebarColor, 0, 0, 5),
		"statusBarItem.remoteForeground": primaryColor,
		"statusBarItem.remoteHoverBackground": derivedColors.buttonBackground,
		"statusBarItem.remoteHoverForeground": whiteOrBlackText(derivedColors.buttonBackground),

		// Title Bar colors
		"titleBar.activeBackground": sidebarColor,
		"titleBar.inactiveBackground": sidebarColor,
		"titleBar.border": borderColor,
		"titleBar.activeForeground": textColor,
		"titleBar.inactiveForeground": adjustColor(textColor, 0, 0, -30),

		// Menu Bar colors
		"menubar.selectionForeground": textColor,
		"menubar.selectionBackground": hexToHexAlpha(textColor, 0.09),
		"menubar.selectionHoverBackground": adjustColor(sidebarColor, 0, 0, 15),
		"menu.background": adjustColor(sidebarColor, 0, 0, 3),
		"menu.border": derivedColors.borderColor,
		"menu.foreground": textColor,
		"menu.selectionBackground": hexToHexAlpha(textColor, 0.09),
		"menu.selectionForeground": textColor,
		"menu.separatorBackground": adjustColor(textColor, 0, 0, -20),

		// Command Center
		"commandCenter.background": sidebarColor,
		"commandCenter.border": hexToHexAlpha(borderColor, 0.5),
		"commandCenter.activeBackground": backgroundColor,
		"commandCenter.inactiveBorder": backgroundColor,
		"commandCenter.foreground": textColor,
		"commandCenter.activeForeground": textColor,
		"commandCenter.inactiveForeground": hexToHexAlpha(textColor, 0.5),
		"commandCenter.activeBorder": borderColor,
		"commandCenter.debuggingBackground": sidebarColor,

		// Notification colors
		"notificationCenter.border": borderColor,
		"notificationCenterHeader.foreground": textColor,
		"notificationCenterHeader.background": sidebarColor,
		"notifications.background": sidebarColor,
		"notifications.border": borderColor,
		"notifications.foreground": textColor,
		"notificationToast.border": borderColor,
		"notificationLink.foreground": primaryColor,
		"notificationsErrorIcon.foreground": "#ff5555",
		"notificationsWarningIcon.foreground": "#ff9100",
		"notificationsInfoIcon.foreground": "#75beff",

		// Banner colors
		"banner.background": adjustColor(sidebarColor, 0, 0, 15),
		"banner.foreground": textColor,

		// Extensions colors
		"extensionButton.prominentForeground": whiteOrBlackText(derivedColors.buttonBackground),
		"extensionButton.prominentBackground": derivedColors.buttonBackground,
		"extensionButton.prominentHoverBackground": derivedColors.buttonHoverBackground,
		"extensionButton.background": derivedColors.buttonBackground,
		"extensionButton.foreground": whiteOrBlackText(derivedColors.buttonBackground),
		"extensionButton.hoverBackground": derivedColors.buttonHoverBackground,
		"extensionButton.separator": whiteOrBlackText(derivedColors.buttonBackground, 50),
		"extensionBadge.remoteBackground": primaryColor,
		"extensionBadge.remoteForeground": whiteOrBlackText(primaryColor),
		"extensionIcon.starForeground": "#FFD700",

		// Quick picker colors
		"pickerGroup.border": hexToHexAlpha(textColor, 0.15),
		"quickInputList.focusBackground": adjustColor(sidebarColor, 0, 0, 15),
		"quickInputList.focusForeground": textColor,
		"quickInput.background": adjustColor(sidebarColor, 0, 0, 8),
		"quickInput.foreground": hexToHexAlpha(textColor, 0.47),
		"quickInputTitle.background": adjustColor(sidebarColor, 0, 0, 5),

		// Editor Widgets
		"editorHoverWidget.background": adjustColor(sidebarColor, 0, 0, 5),
		"editorHoverWidget.border": derivedColors.borderColor,
		"editorHoverWidget.foreground": hexToHexAlpha(textColor, 0.77),
		"editorSuggestWidget.background": adjustColor(sidebarColor, 0, 0, 8),
		"editorSuggestWidget.selectedBackground": hexToHexAlpha(textColor, 0.06),
		"editorSuggestWidget.border": hexToHexAlpha(textColor, 0.08),

		// Integrated Terminal colors
		"terminal.background": sidebarColor,
		"terminal.border": `${textColor}00`,

		// Breadcrumbs colors
		"breadcrumb.background": backgroundColor,
		"breadcrumb.focusForeground": hexToHexAlpha(textColor, 0.85),
		"breadcrumb.activeSelectionForeground": textColor,

		// Other
		"sideBySideEditor.horizontalBorder": borderColor,
		"sideBySideEditor.verticalBorder": borderColor,

		// Git
		"gitDecoration.ignoredResourceForeground": hexToHexAlpha(textColor, 0.16),
		"gitDecoration.modifiedResourceForeground": "#e2c08d",
		"gitDecoration.deletedResourceForeground": "#ff6b6b",
		"gitDecoration.untrackedResourceForeground": "#73c991",
		"gitDecoration.conflictingResourceForeground": "#ff8800",
		"gitDecoration.submoduleResourceForeground": "#8db9e2",
		"gitDecoration.stageModifiedResourceForeground": "#e2c08d99",
		"gitDecoration.stageDeletedResourceForeground": "#ff6b6b99",
		"gitDecoration.addedResourceForeground": "#73c991",

		// Additional editor colors
		"editorCursor.foreground": primaryColor,
		"editorWarning.foreground": "#ff9100",
		"editorError.foreground": "#ff5555",
		"editorInfo.foreground": "#75beff",
		"editorHint.foreground": "#75beff99",

		// // Word highlighting
		// "editor.wordHighlightBackground": backgroundColor,
		// "editor.wordHighlightStrongBackground":hexToHexAlpha(textColor, 0.1),
		// "editor.wordHighlightBorder":hexToHexAlpha(textColor, 0),
		// "editor.wordHighlightStrongBorder":hexToHexAlpha(textColor, 0),
		// "editor.wordHighlightTextBackground":hexToHexAlpha(textColor, 0.07),
		// "editor.wordHighlightTextBorder":hexToHexAlpha(textColor, 0),
		// // Match highlighting
		// "editor.findMatchBackground": backgroundColor,
		// "editor.findMatchHighlightBackground":hexToHexAlpha(primaryColor, 0.25),
		// "editor.findMatchHighlightBorder":hexToHexAlpha(primaryColor, 0.2),
		// "editor.findRangeHighlightBackground":hexToHexAlpha(textColor, 0.05),
		// "editor.findRangeHighlightBorder":hexToHexAlpha(textColor, 0.1),

		// Peek view colors
		"peekView.border": derivedColors.borderColor,
		"peekViewEditor.background": adjustColor(backgroundColor, 0, 0, -5),
		"peekViewResult.background": adjustColor(backgroundColor, 0, 0, -8),
		"peekViewTitle.background": adjustColor(backgroundColor, 0, 0, -3),

		// Debug colors
		"debugToolBar.background": sidebarColor,
		"debugToolBar.border": derivedColors.borderColor,
		"debugIcon.breakpointForeground": "#ff5555",
		"debugIcon.breakpointDisabledForeground": "#ff555580",
		"debugIcon.breakpointUnverifiedForeground": "#ff9100",
		"debugIcon.breakpointCurrentStackframeForeground": "#ffcc44",
		"debugIcon.breakpointStackframeForeground": "#ffd700",
		"debugIcon.startForeground": "#73c991",
		"debugIcon.pauseForeground": "#ffd700",
		"debugIcon.stopForeground": "#ff5555",
		"debugIcon.disconnectForeground": "#ff8080",
		"debugIcon.restartForeground": "#73c991",
		"debugIcon.stepOverForeground": "#75beff",
		"debugIcon.stepIntoForeground": "#75beff",
		"debugIcon.stepOutForeground": "#75beff",
		"debugIcon.continueForeground": "#73c991",
		"debugIcon.stepBackForeground": "#75beff",
		"debugConsole.infoForeground": "#75beff",
		"debugConsole.warningForeground": "#ff9100",
		"debugConsole.errorForeground": "#ff5555",
		"debugConsole.sourceForeground": hexToHexAlpha(textColor, 0.9),
		"debugConsoleInputIcon.foreground": primaryColor,

		// // Welcome page
		// "welcomePage.background": backgroundColor,
		// "welcomePage.tileBackground": sidebarColor,
		// "welcomePage.tileBorder": derivedColors.borderColor,
		// "welcomePage.tileHoverBackground": adjustColor(sidebarColor, 0, 0, 5),

		// Settings
		"settings.headerForeground": textColor,
		"settings.modifiedItemIndicator": primaryColor,
		"settings.checkboxBackground": backgroundColor,
		"settings.checkboxForeground": textColor,
		"settings.checkboxBorder": derivedColors.borderColor,
		"settings.textInputBackground": backgroundColor,
		"settings.textInputForeground": textColor,
		"settings.textInputBorder": derivedColors.borderColor,
		"settings.numberInputBackground": backgroundColor,
		"settings.numberInputForeground": textColor,
		"settings.numberInputBorder": derivedColors.borderColor,
		"settings.dropdownBackground": backgroundColor,
		"settings.dropdownForeground": textColor,
		"settings.dropdownBorder": derivedColors.borderColor,
		"settings.dropdownListBorder": derivedColors.borderColor,
		"settings.rowHoverBackground": hexToHexAlpha(textColor, 0.05),
		"settings.focusedRowBackground": hexToHexAlpha(primaryColor, 0.1),
		"settings.focusedRowBorder": hexToHexAlpha(primaryColor, 0.4),
		"settings.headerBorder": derivedColors.borderColor,
		"settings.sashBorder": derivedColors.borderColor,
		"settings.settingsHeaderHoverForeground": textColor,

		// Breadcrumbs
		"breadcrumbPicker.background": sidebarColor,

		// Symbol Icons
		"symbolIcon.classForeground": "#ff9100",
		"symbolIcon.functionForeground": "#75beff",
		"symbolIcon.variableForeground": "#ff5555",
		"symbolIcon.propertyForeground": "#73c991",

		// Testing
		"testing.iconFailed": "#ff5555",
		"testing.iconPassed": "#73c991",
		"testing.iconSkipped": "#75beff",
		"testing.peekBorder": derivedColors.borderColor,

		// Notebook
		"notebook.cellBorderColor": derivedColors.borderColor,
		"notebook.selectedCellBackground": hexToHexAlpha(textColor, 0.1),
		"notebook.focusedCellBorder": primaryColor,

		// Charts
		"charts.foreground": textColor,
		"charts.lines": hexToHexAlpha(textColor, 0.5),
		"charts.red": "#ff5555",
		"charts.blue": "#75beff",
		"charts.yellow": "#ffd700",
		"charts.green": "#73c991",
		"charts.purple": "#b48ead",
		"charts.orange": "#ff9100",

		// Ports
		"ports.iconRunningProcessForeground": "#73c991",

		// Comments
		"editorGutter.commentRangeForeground": hexToHexAlpha(textColor, 0.3),

		// Merge conflicts
		"merge.currentHeaderBackground": hexToHexAlpha("#73c991", 0.3),
		"merge.incomingHeaderBackground": hexToHexAlpha("#75beff", 0.3),
		"merge.commonHeaderBackground": hexToHexAlpha(textColor, 0.1),

		// Snippets
		"editor.snippetTabstopHighlightBackground": hexToHexAlpha(primaryColor, 0.2),
		"editor.snippetFinalTabstopHighlightBackground": hexToHexAlpha("#73c991", 0.2),
	};
}
