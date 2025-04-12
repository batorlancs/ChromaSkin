import { getColors } from "./colors";
import { ThemeConfig } from "./types";
import { adjustColor, hexToHexAlpha, whiteOrBlackText } from "./utils";

// Generate the theme JSON
export function generateWorkbenchTheme(provided: ThemeConfig): Record<string, any> {
	const colors = getColors(provided);

	return {
		// Contrast colors
		contrastActiveBorder: colors.defaults.transparent,
		contrastBorder: colors.defaults.transparent,

		// Base colors
		focusBorder: "#8e8eff00",
		foreground: colors.foreground,
		disabledForeground: hexToHexAlpha(colors.foreground, 0.3),
		"widget.border": hexToHexAlpha(colors.widget.border, 0.6),
		"widget.shadow": colors.defaults.transparent,
		"selection.background": hexToHexAlpha(provided.primary, 0.15),
		descriptionForeground: adjustColor(colors.foreground, 0, 0, -10),
		errorForeground: colors.defaults.other.red.default,
		"icon.foreground": colors.foreground,
		"sash.hoverBorder": colors.border,

		// Window borders
		"window.activeBorder": colors.border,
		"window.inactiveBorder": colors.background,

		// Text colors
		"textBlockQuote.background": hexToHexAlpha(adjustColor(colors.background, 0, 0, 10), 0.37),
		"textBlockQuote.border": colors.border,
		"textCodeBlock.background": colors.background,
		"textLink.activeForeground": adjustColor(colors.primary, 0, 0, 10),
		"textLink.foreground": colors.primary,
		"textPreformat.foreground": colors.foreground,
		"textPreformat.background": hexToHexAlpha(adjustColor(colors.background, 0, 0, 10), 0.37),
		"textSeparator.foreground": colors.foreground,

		// Action colors
		"toolbar.activeBackground": hexToHexAlpha(adjustColor(colors.background, 0, 0, 10), 0.37),
		"toolbar.hoverBackground": hexToHexAlpha(adjustColor(colors.background, 0, 0, 10), 0.37),
		"toolbar.hoverOutline": "#55555500",
		"editorActionList.background": colors.popover.background,
		"editorActionList.foreground": colors.popover.foreground,
		"editorActionList.focusBackground": colors.popover.focusBackground,
		"editorActionList.focusForeground": colors.popover.focusForeground,

		// Button control
		"button.background": colors.button.background,
		"button.foreground": colors.button.foreground,
		"button.hoverBackground": colors.button.hoverBackground,
		"button.border": colors.defaults.transparent,
		"button.separator": colors.button.separator,
		"button.secondaryBackground": colors.button.secondaryBackground,
		"button.secondaryForeground": colors.button.secondaryForeground,
		"button.secondaryHoverBackground": colors.button.secondaryHoverBackground,
		"checkbox.foreground": colors.primary,
		"checkbox.background": colors.background,
		"checkbox.border": colors.border,
		"radio.activeForeground": colors.primary,
		"radio.activeBackground": colors.button.background,
		"radio.activeBorder": colors.border,
		"radio.inactiveBorder": colors.border,
		"radio.inactivateHoverBackground": colors.button.hoverBackground,

		// Dropdown control
		"dropdown.background": colors.background,
		"dropdown.listBackground": adjustColor(colors.background, 0, 0, 5),
		"dropdown.border": colors.border,
		"dropdown.foreground": colors.foreground,

		// Input control
		"input.background": colors.background,
		"input.foreground": colors.foreground,
		"input.border": hexToHexAlpha(colors.border, 0.78),
		"input.placeholderForeground": adjustColor(colors.foreground, 0, 0, -10),
		"inputOption.activeBackground": hexToHexAlpha(colors.primary, 0.3),
		"inputOption.activeBorder": colors.primary,
		"inputOption.activeForeground": colors.foreground,
		"inputOption.hoverBackground": hexToHexAlpha(colors.primary, 0.2),
		"inputValidation.errorBackground": hexToHexAlpha(colors.defaults.other.red.default, 0.1),
		"inputValidation.errorForeground": colors.defaults.other.red.default,
		"inputValidation.errorBorder": colors.defaults.other.red.default,
		"inputValidation.infoBackground": hexToHexAlpha(colors.defaults.other.blue.default, 0.1),
		"inputValidation.infoForeground": colors.defaults.other.blue.default,
		"inputValidation.infoBorder": colors.defaults.other.blue.default,
		"inputValidation.warningBackground": hexToHexAlpha(colors.defaults.other.yellow.default, 0.1),
		"inputValidation.warningForeground": colors.defaults.other.yellow.default,
		"inputValidation.warningBorder": colors.defaults.other.yellow.default,

		// Scrollbar control
		"scrollbar.shadow": `${adjustColor(colors.background, 0, 0, -5)}00`,
		"scrollbarSlider.background": hexToHexAlpha(colors.foreground, 0.21),
		"scrollbarSlider.activeBackground": hexToHexAlpha(colors.foreground, 0.31),
		"scrollbarSlider.hoverBackground": hexToHexAlpha(colors.foreground, 0.26),

		// Badge
		"badge.background": colors.badge.background,
		"badge.foreground": colors.badge.foreground,

		// Progress bar
		"progressBar.background": colors.primary,

		// Lists and trees
		"list.hoverBackground": hexToHexAlpha(colors.foreground, 0.04),
		"list.hoverForeground": colors.foreground,
		"list.activeSelectionBackground": hexToHexAlpha(colors.foreground, 0.07),
		"list.activeSelectionForeground": colors.foreground,
		"list.inactiveSelectionBackground": hexToHexAlpha(colors.foreground, 0.04),
		"list.inactiveSelectionForeground": hexToHexAlpha(colors.foreground, 0.71),
		"list.focusBackground": hexToHexAlpha(colors.primary, 0.07),
		"list.focusForeground": colors.foreground,
		"list.inactiveFocusBackground": hexToHexAlpha(colors.primary, 0.08),
		"list.focusAndSelectionOutline": colors.defaults.transparent,
		"list.dropBackground": hexToHexAlpha(adjustColor(colors.primary, 0, -20, -20), 0.28),
		"list.highlightForeground": adjustColor(colors.foreground, 0, 0, 20),
		"tree.indentGuidesStroke": colors.defaults.transparent,
		"tree.inactiveIndentGuidesStroke": colors.defaults.transparent,

		// Activity bar
		"activityBar.background": colors.activityBar.background,
		"activityBar.inactiveForeground": colors.activityBar.inactiveForeground,
		"activityBar.foreground": colors.activityBar.foreground,
		"activityBar.activeBorder": colors.activityBar.activeBorder,
		"activityBar.border": colors.activityBar.border,
		"activityBar.activeBackground": colors.activityBar.activeBackground,
		"activityBarBadge.foreground": colors.activityBar.badgeForeground,
		"activityBarBadge.background": colors.primary,

		// Profiles
		"profileBadge.background": colors.profileBadge.background,
		"profileBadge.foreground": colors.profileBadge.foreground,
		"profiles.sashBorder": colors.border,

		// Side Bar
		"sideBar.background": colors.sideBar.background,
		"sideBar.border": colors.sideBar.border,
		"sideBar.foreground": colors.sideBar.foreground,
		"sideBarTitle.foreground": colors.sideBarTitle.foreground,
		"sideBarTitle.border": colors.sideBarTitle.border,
		"sideBarTitle.background": colors.sideBarTitle.background,
		"sideBarSectionHeader.background": colors.sideBar.background,
		"sideBarSectionHeader.foreground": colors.sideBar.foreground,
		"sideBarSectionHeader.border": colors.sideBarSectionHeader.border,
		"sideBarStickyScroll.border": colors.sideBarStickyScroll.border,
		"sideBarStickyScroll.background": colors.sideBarStickyScroll.background,
		"sideBarStickyScroll.shadow": colors.sideBarStickyScroll.shadow,

		// Minimap
		"minimap.foregroundOpacity": hexToHexAlpha(colors.background, 0.5),
		"minimap.background": colors.background,

		// Editor Groups and Tabs
		"editorGroup.border": colors.border,
		"editorGroup.emptyBackground": colors.background,
		"editorGroupHeader.tabsBackground": colors.sideBar.background,
		"editorGroupHeader.tabsBorder": colors.sideBar.background,
		"editorGroupHeader.noTabsBackground": colors.sideBar.background,
		"editorGroupHeader.border": colors.border,	
		"editorGroup.dropBackground": hexToHexAlpha(colors.primary, 0.07),

		"tab.border": colors.border,
		"tab.hoverBorder": "default",
		"tab.activeBackground": colors.background,
		"tab.inactiveBackground": colors.defaults.transparent,
		"tab.activeForeground": colors.foreground,
		"tab.inactiveForeground": colors.foreground,
		"tab.activeBorder": colors.background,
		"tab.hoverBackground": colors.defaults.transparent,
		"tab.hoverForeground": colors.foreground,
		"tab.activeBorderTop": colors.foreground,
		"tab.unfocusedActiveBorder": colors.background,
		"tab.unfocusedActiveBorderTop": hexToHexAlpha(colors.foreground, 0.4),
		"tab.unfocusedActiveBackground": colors.background,
		"tab.unfocusedActiveForeground": colors.foreground,
		"tab.unfocusedHoverBackground": colors.sideBar.background,
		"tab.unfocusedHoverForeground": colors.foreground,
		"tab.unfocusedInactiveBackground": colors.sideBar.background,
		"tab.unfocusedInactiveForeground": colors.foreground,
		"tab.unfocusedHoverBorder": "default",
		"tab.dragAndDropBorder": hexToHexAlpha(colors.foreground, 0.52),

		// Editor colors
		"editorLineNumber.foreground": hexToHexAlpha(colors.foreground, 0.18),
		"editorLineNumber.activeForeground": hexToHexAlpha(colors.foreground, 0.59),
		"editorGutter.background": colors.background,
		"editor.background": colors.background,
		"editor.selectionBackground": hexToHexAlpha(colors.primary, 0.15),
		"editor.selectionHighlightBackground": hexToHexAlpha(colors.primary, 0.25),
		"editor.inactiveSelectionBackground": hexToHexAlpha(adjustColor(colors.primary, 0, -20, -20), 0.20),
		"editorBracketMatch.background": hexToHexAlpha(colors.foreground, 0.05),
		"editorBracketMatch.border": hexToHexAlpha(colors.foreground, 0.16),
		"editorStickyScroll.border": adjustColor(colors.background, 0, 0, 10),
		"editorStickyScroll.shadow": adjustColor(colors.background, 0, 0, -5),
		"editorStickyScroll.background": colors.background,
		"editorStickyScrollHover.background": adjustColor(colors.background, 0, 0, 3),
		"editor.lineHighlightBorder": `${colors.foreground}00`,
		"editor.lineHighlightBackground": hexToHexAlpha(colors.foreground, 0.04),
		"editorIndentGuide.activeBackground1": hexToHexAlpha(colors.foreground, 0.22),
		"editorIndentGuide.background1": hexToHexAlpha(colors.foreground, 0.10),
		// Overview ruler
		"editorOverviewRuler.border": hexToHexAlpha(colors.foreground, 0.075),
		"editorOverviewRuler.background": colors.background,
		"editorOverviewRuler.activeBorder": colors.border,
		"editorOverviewRuler.activeBackground": hexToHexAlpha(colors.foreground, 0.04),
		"editorOverviewRuler.findMatchBorder": colors.primary,
		"editorOverviewRuler.findMatchBackground": hexToHexAlpha(colors.primary, 0.33),
		"editorOverviewRuler.findMatchForeground": hexToHexAlpha(colors.primary, 0.5),
		"editorOverviewRuler.rangeHighlightForeground": hexToHexAlpha(colors.primary, 0.4),
		"editorOverviewRuler.selectionHighlightForeground": hexToHexAlpha(colors.primary, 0.3),
		"editorOverviewRuler.wordHighlightForeground": hexToHexAlpha(colors.foreground, 0.3),
		"editorOverviewRuler.wordHighlightStrongForeground": hexToHexAlpha(colors.foreground, 0.5),
		"editorOverviewRuler.wordHighlightTextForeground": hexToHexAlpha(colors.foreground, 0.4),
		"editorOverviewRuler.modifiedForeground": "#e2c08d",
		"editorOverviewRuler.addedForeground": "#73c991",
		"editorOverviewRuler.deletedForeground": "#ff6b6b",
		"editorOverviewRuler.errorForeground": "#ff5555",
		"editorOverviewRuler.warningForeground": "#ff9100",
		"editorOverviewRuler.infoForeground": "#75beff",
		"editorOverviewRuler.bracketMatchForeground": hexToHexAlpha(colors.foreground, 0.3),
		"editorOverviewRuler.inlineChatInserted": "#73c99180",
		"editorOverviewRuler.inlineChatRemoved": "#ff6b6b80",

		// Diff editor
		"diffEditor.border": colors.border,

		// Editor widget
		"editorWidget.background": adjustColor(colors.background, 0, 0, 5),
		"editorWidget.foreground": colors.foreground,
		"editorWidget.border": colors.border,

		// Panel colors
		"panelTitle.inactiveForeground": colors.panel.title.inactiveForeground,
		"panelTitle.activeBorder": colors.panel.title.activeBorder,
		"panelTitle.activeForeground": colors.panel.title.activeForeground,
		"panel.background": colors.panel.background,
		"panel.border": colors.panel.border,
		"panelSection.border": colors.panel.section.border,
		"panelSection.dropBackground": colors.panel.section.dropBackground,
		"panelStickyScroll.border": colors.panel.stickyScroll.border,

		// Status Bar colors
		"statusBar.background": colors.statusBar.background,
		"statusBar.foreground": colors.statusBar.foreground,
		"statusBar.debuggingBackground": colors.statusBar.debuggingBackground,
		"statusBar.debuggingForeground": colors.statusBar.debuggingForeground,
		"statusBar.debuggingBorder": colors.statusBar.debuggingBorder,
		"statusBarItem.hoverBackground": colors.statusBar.itemHoverBackground,
		"statusBar.noFolderBackground": colors.statusBar.noFolderBackground,
		"statusBar.border": colors.statusBar.border,
		"statusBarItem.remoteBackground": colors.statusBar.itemRemoteBackground,
		"statusBarItem.remoteForeground": colors.statusBar.itemRemoteForeground,
		"statusBarItem.remoteHoverBackground": colors.statusBar.itemRemoteHoverBackground,
		"statusBarItem.remoteHoverForeground": colors.statusBar.itemRemoteHoverForeground,

		// Title Bar colors
		"titleBar.activeBackground": colors.accent,
		"titleBar.inactiveBackground": colors.accent,
		"titleBar.border": colors.border,
		"titleBar.activeForeground": colors.foreground,
		"titleBar.inactiveForeground": adjustColor(colors.foreground, 0, 0, -30),

		// Menu Bar colors
		"menubar.selectionForeground": colors.foreground,
		"menubar.selectionBackground": hexToHexAlpha(colors.foreground, 0.09),
		"menubar.selectionHoverBackground": adjustColor(colors.accent, 0, 0, 15),
		"menu.background": adjustColor(colors.accent, 0, 0, 3),
		"menu.border": colors.border,
		"menu.foreground": colors.foreground,
		"menu.selectionBackground": hexToHexAlpha(colors.foreground, 0.09),
		"menu.selectionForeground": colors.foreground,
		"menu.separatorBackground": adjustColor(colors.accent, 0, 0, 10),

		// Command Center
		"commandCenter.background": colors.accent,
		"commandCenter.border": hexToHexAlpha(colors.border, 0.5),
		"commandCenter.activeBackground": colors.background,
		"commandCenter.inactiveBorder": hexToHexAlpha(colors.border, 0.5),
		"commandCenter.foreground": colors.foreground,
		"commandCenter.activeForeground": colors.foreground,
		"commandCenter.inactiveForeground": hexToHexAlpha(colors.foreground, 0.5),
		"commandCenter.activeBorder": colors.border,
		"commandCenter.debuggingBackground": colors.accent,

		// Notification colors
		"notificationCenter.border": colors.border,
		"notificationCenterHeader.foreground": colors.foreground,
		"notificationCenterHeader.background": colors.accent,
		"notifications.background": colors.accent,
		"notifications.border": colors.border,
		"notifications.foreground": colors.foreground,
		"notificationToast.border": colors.border,
		"notificationLink.foreground": colors.primary,
		"notificationsErrorIcon.foreground": colors.defaults.other.red.default,
		"notificationsWarningIcon.foreground": colors.defaults.other.yellow.default,
		"notificationsInfoIcon.foreground": colors.defaults.other.blue.default,

		// Banner colors
		"banner.background": adjustColor(colors.accent, 0, 0, 15),
		"banner.foreground": colors.foreground,

		// Extensions colors
		"extensionButton.prominentForeground": whiteOrBlackText(colors.button.background),
		"extensionButton.prominentBackground": colors.button.background,
		"extensionButton.prominentHoverBackground": colors.button.hoverBackground,
		"extensionButton.background": colors.button.background,
		"extensionButton.foreground": whiteOrBlackText(colors.button.background),
		"extensionButton.hoverBackground": colors.button.hoverBackground,
		"extensionButton.separator": whiteOrBlackText(colors.button.background, 0.4),
		"extensionBadge.remoteBackground": colors.primary,
		"extensionBadge.remoteForeground": whiteOrBlackText(colors.primary),
		"extensionIcon.starForeground": colors.defaults.other.yellow.default,
		"extensionIcon.verifiedForeground": colors.primary,
		"extensionIcon.preReleaseForeground": colors.primary,
		"extensionIcon.sponsorForeground": colors.primary,
		"extensionIcon.privateForeground": colors.primary,

		// Quick picker colors
		"pickerGroup.border": hexToHexAlpha(colors.foreground, 0.15),
		"quickInputList.focusBackground": adjustColor(colors.popover.background, 0, 0, 6),
		"quickInputList.focusForeground": colors.popover.foreground,
		"quickInput.background": colors.popover.background,
		"quickInput.foreground": colors.popover.foreground,
		"quickInputTitle.background": adjustColor(colors.popover.background, 0, 0, -5),

		// Editor Widgets
		"editorHoverWidget.background": colors.widget.background,
		"editorHoverWidget.border": colors.widget.border,
		"editorHoverWidget.foreground": colors.widget.foreground,
		"editorSuggestWidget.background": colors.widget.background,
		"editorSuggestWidget.selectedBackground": hexToHexAlpha(colors.foreground, 0.06),
		"editorSuggestWidget.border": hexToHexAlpha(colors.widget.border, 0.5),

		// Integrated Terminal colors
		"terminal.background": colors.accent,
		"terminal.border": `${colors.foreground}00`,

		// Breadcrumbs colors
		"breadcrumb.background": colors.background,
		"breadcrumb.focusForeground": hexToHexAlpha(colors.foreground, 0.85),
		"breadcrumb.activeSelectionForeground": colors.foreground,

		// Other
		"sideBySideEditor.horizontalBorder": colors.border,
		"sideBySideEditor.verticalBorder": colors.border,

		// Git
		"gitDecoration.ignoredResourceForeground": colors.git.ignoredResourceForeground,
		"gitDecoration.modifiedResourceForeground": colors.git.modifiedResourceForeground,
		"gitDecoration.deletedResourceForeground": colors.git.deletedResourceForeground,
		"gitDecoration.untrackedResourceForeground": colors.git.untrackedResourceForeground,
		"gitDecoration.conflictingResourceForeground": colors.git.conflictingResourceForeground,
		"gitDecoration.submoduleResourceForeground": colors.git.submoduleResourceForeground,
		"gitDecoration.stageModifiedResourceForeground": colors.git.stageModifiedResourceForeground,
		"gitDecoration.stageDeletedResourceForeground": colors.git.stageDeletedResourceForeground,
		"gitDecoration.addedResourceForeground": colors.git.addedResourceForeground,

		// Additional editor colors
		"editorCursor.foreground": colors.cursor.foreground,
		"editorWarning.foreground": "#ff9100",
		"editorError.foreground": colors.defaults.other.red.default,
		"editorInfo.foreground": colors.defaults.other.blue.default,
		"editorHint.foreground": hexToHexAlpha(colors.defaults.other.blue.default, 0.6),

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
		"peekView.border": colors.border,
		"peekViewEditor.background": adjustColor(colors.background, 0, 0, -5),
		"peekViewResult.background": adjustColor(colors.background, 0, 0, -8),
		"peekViewTitle.background": adjustColor(colors.background, 0, 0, -3),

		// Debug colors
		"debugToolBar.background": colors.accent,
		"debugToolBar.border": colors.border,
		"debugIcon.breakpointForeground": colors.defaults.other.red.default,
		"debugIcon.breakpointDisabledForeground": hexToHexAlpha(colors.defaults.other.red.default, 0.8),
		"debugIcon.breakpointUnverifiedForeground": colors.defaults.other.yellow.default,
		"debugIcon.breakpointCurrentStackframeForeground": colors.defaults.other.yellow.default,
		"debugIcon.breakpointStackframeForeground": colors.defaults.other.yellow.default,
		"debugIcon.startForeground": colors.defaults.other.green.default,
		"debugIcon.pauseForeground": colors.defaults.other.yellow.default,
		"debugIcon.stopForeground": colors.defaults.other.red.default,
		"debugIcon.disconnectForeground": colors.defaults.other.red.default,
		"debugIcon.restartForeground": colors.defaults.other.green.default,
		"debugIcon.stepOverForeground": colors.defaults.other.blue.default,
		"debugIcon.stepIntoForeground": colors.defaults.other.blue.default,
		"debugIcon.stepOutForeground": colors.defaults.other.blue.default,
		"debugIcon.continueForeground": colors.defaults.other.green.default,
		"debugIcon.stepBackForeground": colors.defaults.other.blue.default,
		"debugConsole.infoForeground": colors.defaults.other.blue.default,
		"debugConsole.warningForeground": colors.defaults.other.yellow.default,
		"debugConsole.errorForeground": colors.defaults.other.red.default,
		"debugConsole.sourceForeground": hexToHexAlpha(colors.foreground, 0.9),
		"debugConsoleInputIcon.foreground": colors.primary,

		// // Welcome page
		// "welcomePage.background": backgroundColor,
		// "welcomePage.tileBackground": sidebarColor,
		// "welcomePage.tileBorder": derivedColors.borderColor,
		// "welcomePage.tileHoverBackground": adjustColor(sidebarColor, 0, 0, 5),

		// Settings
		"settings.headerForeground": colors.foreground,
		"settings.modifiedItemIndicator": colors.primary,
		"settings.checkboxBackground": colors.background,
		"settings.checkboxForeground": colors.foreground,
		"settings.checkboxBorder": colors.border,
		"settings.textInputBackground": colors.background,
		"settings.textInputForeground": colors.foreground,
		"settings.textInputBorder": colors.border,
		"settings.numberInputBackground": colors.background,
		"settings.numberInputForeground": colors.foreground,
		"settings.numberInputBorder": colors.border,
		"settings.dropdownBackground": colors.background,
		"settings.dropdownForeground": colors.foreground,
		"settings.dropdownBorder": colors.border,
		"settings.dropdownListBorder": colors.border,
		"settings.rowHoverBackground": hexToHexAlpha(colors.foreground, 0.05),
		"settings.focusedRowBackground": hexToHexAlpha(colors.primary, 0.1),
		"settings.focusedRowBorder": hexToHexAlpha(colors.primary, 0.4),
		"settings.headerBorder": colors.border,
		"settings.sashBorder": colors.border,
		"settings.settingsHeaderHoverForeground": colors.foreground,

		// Breadcrumbs
		"breadcrumbPicker.background": colors.accent,

		// Symbol Icons
		"symbolIcon.classForeground": colors.defaults.other.orange.default,
		"symbolIcon.functionForeground": colors.defaults.other.blue.default,
		"symbolIcon.variableForeground": colors.defaults.other.red.default,
		"symbolIcon.propertyForeground": colors.defaults.other.green.default,

		// Testing
		"testing.iconFailed": colors.defaults.other.red.default,
		"testing.iconPassed": colors.defaults.other.green.default,
		"testing.iconSkipped": colors.defaults.other.blue.default,
		"testing.peekBorder": colors.border,

		// Notebook
		"notebook.cellBorderColor": colors.border,
		"notebook.selectedCellBackground": hexToHexAlpha(colors.foreground, 0.1),
		"notebook.focusedCellBorder": colors.primary,

		// Charts
		"charts.foreground": colors.foreground,
		"charts.lines": hexToHexAlpha(colors.foreground, 0.5),
		"charts.red": colors.defaults.other.red.default,
		"charts.blue": colors.defaults.other.blue.default,
		"charts.yellow": colors.defaults.other.yellow.default,
		"charts.green": colors.defaults.other.green.default,
		"charts.purple": colors.defaults.other.purple.default,
		"charts.orange": colors.defaults.other.orange.default,

		// Ports
		"ports.iconRunningProcessForeground": colors.defaults.other.green.default,

		// Comments
		"editorGutter.commentRangeForeground": hexToHexAlpha(colors.foreground, 0.3),

		// Merge conflicts
		"merge.currentHeaderBackground": hexToHexAlpha(colors.defaults.other.green.default, 0.3),
		"merge.incomingHeaderBackground": hexToHexAlpha(colors.defaults.other.blue.default, 0.3),
		"merge.commonHeaderBackground": hexToHexAlpha(colors.foreground, 0.1),

		// Snippets
		"editor.snippetTabstopHighlightBackground": hexToHexAlpha(colors.primary, 0.2),
		"editor.snippetFinalTabstopHighlightBackground": hexToHexAlpha(colors.defaults.other.green.default, 0.2),
	};
}
