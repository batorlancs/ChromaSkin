interface DerivedColors {
	buttonBackground: string;
	buttonHoverBackground: string;
	selectionBackground: string;
	borderColor: string;
	activeBorder: string;
	inactiveBorder: string;
      popoverBackground: string;
}

/**
 * VS Code Theme Generator
 *
 * This class generates a VS Code theme based on the base colors provided.
 */
class VSCodeThemeGenerator {
	public primaryColor: string;
	public backgroundColor: string;
	public sidebarColor: string;
	public textColor: string;
	public borderColor: string;
	public borderOpacity: number;
	private derivedColors: DerivedColors;
      private defaultColors = {
            transparent: "#00000000",
      }

	constructor() {
		// Default base colors
		this.primaryColor = "#8e8eff"; // Primary accent color (links, buttons)
		this.backgroundColor = "#2b2b2b"; // Main editor background
		this.sidebarColor = "#252525"; // Sidebar background
		this.textColor = "#FFFFFF"; // Main text color
		this.borderColor = "#555555"; // Border color throughout the theme
		this.borderOpacity = 75; // Border opacity (0-100)

		// Derived colors will be calculated
		this.derivedColors = {
			buttonBackground: "",
			buttonHoverBackground: "",
			selectionBackground: "",
			borderColor: "",
			activeBorder: "",
			inactiveBorder: "",
			popoverBackground: "",
		};
	}

	// Calculate derived colors based on the primary colors
	calculateDerivedColors() {
		// Button colors
		this.derivedColors.buttonBackground = this.adjustColor(this.primaryColor, 0, -30, 0); // Slightly darker primary
		this.derivedColors.buttonHoverBackground = this.adjustColor(this.primaryColor, 0, -50, 0); // Even darker for hover

		// Selection colors
		this.derivedColors.selectionBackground = this.hexToRgba(this.primaryColor, 0.15); // Selection with transparency

		// Border colors based on opacity
		this.derivedColors.borderColor = `#${this.hexToRgb(this.borderColor)
			.map((c) =>
				Math.round((c * this.borderOpacity) / 100)
					.toString(16)
					.padStart(2, "0")
			)
			.join("")}`;

		// Accent colors
		this.derivedColors.activeBorder = this.borderColor;
		this.derivedColors.inactiveBorder = this.borderColor;
		this.derivedColors.popoverBackground = this.adjustColor(this.backgroundColor, 0, 0, 10);
	}

	// Helper: Ensure hex colors always have # prefix
	ensureHexPrefix(hex: string): string {
		if (!hex) return "#000000";
		return hex.startsWith("#") ? hex : `#${hex}`;
	}

	// Helper: Convert hex to RGB
	hexToRgb(hex: string): number[] {
		const sanitizedHex = this.ensureHexPrefix(hex).replace("#", "");
		return [
			parseInt(sanitizedHex.substring(0, 2), 16),
			parseInt(sanitizedHex.substring(2, 4), 16),
			parseInt(sanitizedHex.substring(4, 6), 16),
		];
	}

	// Helper: Convert hex to RGBA string - replace with hex alpha version
	hexToRgba(hex: string, alpha: number): string {
		const rgb = this.hexToRgb(this.ensureHexPrefix(hex));
		// Convert to hex with alpha instead of rgba string
		const alphaHex = Math.round(alpha * 255)
			.toString(16)
			.padStart(2, "0");
		return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}${alphaHex}`;
	}

	// Helper: Adjust color (HSL adjustment)
	adjustColor(hex: string, hChange: number, sChange: number, lChange: number): string {
		const hsl = this.hexToHsl(this.ensureHexPrefix(hex));
		hsl[0] = Math.max(0, Math.min(360, hsl[0] + hChange));
		hsl[1] = Math.max(0, Math.min(100, hsl[1] + sChange));
		hsl[2] = Math.max(0, Math.min(100, hsl[2] + lChange));
		return this.hslToHex(hsl);
	}

	whiteOrBlackText(hex: string, soften: number = 0): string {
		const hsl = this.hexToHsl(this.ensureHexPrefix(hex));
		return hsl[2] > 50 ? this.adjustColor("#000000", 0, 0, soften) : this.adjustColor("#ffffff", 0, 0, -soften);
	}

	// Helper: Convert hex to HSL
	hexToHsl(hex: string): number[] {
		let r = 0,
			g = 0,
			b = 0;
		const rgb = this.hexToRgb(hex);
		r = rgb[0] / 255;
		g = rgb[1] / 255;
		b = rgb[2] / 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0,
			s = 0,
			l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}

			h *= 60;
		}

		return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
	}

	// Helper: Convert HSL to hex
	hslToHex(hsl: number[]): string {
		const h = hsl[0] / 360;
		const s = hsl[1] / 100;
		const l = hsl[2] / 100;

		let r, g, b;

		if (s === 0) {
			r = g = b = l;
		} else {
			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;

			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		const toHex = (x: number) => {
			// Ensure the value is between 0-255 before converting to hex
			const val = Math.max(0, Math.min(255, Math.round(x * 255)));
			const hex = val.toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};

		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	// Set user preferences
	setColors(
		primaryColor: string,
		backgroundColor: string,
		sidebarColor: string,
		textColor: string,
		borderColor: string,
		borderOpacity: number
	) {
		if (primaryColor) {
			this.primaryColor = this.ensureHexPrefix(primaryColor);
		}
		if (backgroundColor) this.backgroundColor = this.ensureHexPrefix(backgroundColor);
		if (sidebarColor) this.sidebarColor = this.ensureHexPrefix(sidebarColor);
		if (textColor) this.textColor = this.ensureHexPrefix(textColor);
		if (borderColor) this.borderColor = this.ensureHexPrefix(borderColor);
		if (borderOpacity !== undefined) this.borderOpacity = Math.max(0, Math.min(100, borderOpacity));

		this.calculateDerivedColors();
	}

	// Generate the theme JSON
	generateTheme(themeName: string = "Monokai Pro (Filter Octagon)"): Record<string, any> {
		// Ensure derived colors are calculated
		this.calculateDerivedColors();

		return {
                  // Contrast colors
                  "contrastActiveBorder": this.defaultColors.transparent,
                  "contrastBorder": this.defaultColors.transparent,

                  // Base colors
                  focusBorder: "#8e8eff00",
                  foreground: this.textColor,
                  disabledForeground: this.hexToRgba(this.textColor, 0.3),
                  "widget.border": this.hexToRgba(this.derivedColors.borderColor, 0.75),
                  "widget.shadow": this.adjustColor(this.backgroundColor, 0, 0, -5),
                  "selection.background": this.derivedColors.selectionBackground,
                  descriptionForeground: this.adjustColor(this.textColor, 0, 0, -10),
                  errorForeground: "#ff6b6b",
                  "icon.foreground": this.textColor,
                  "sash.hoverBorder": this.derivedColors.borderColor,

                  // Window borders
                  "window.activeBorder": this.derivedColors.borderColor,
                  "window.inactiveBorder": this.backgroundColor,

                  // Text colors
                  "textBlockQuote.background": this.hexToRgba(this.adjustColor(this.backgroundColor, 0, 0, 10), 0.37),
                  "textBlockQuote.border": this.borderColor,
                  "textCodeBlock.background": this.backgroundColor,
                  "textLink.activeForeground": this.adjustColor(this.primaryColor, 0, 0, 10),
                  "textLink.foreground": this.primaryColor,
                  "textPreformat.foreground": this.textColor,
                  "textPreformat.background": this.hexToRgba(this.adjustColor(this.backgroundColor, 0, 0, 10), 0.37),
                  "textSeparator.foreground": this.textColor,

                  // Action colors
                  "toolbar.activeBackground": this.hexToRgba(this.adjustColor(this.backgroundColor, 0, 0, 10), 0.37),
                  "toolbar.hoverBackground": this.hexToRgba(this.adjustColor(this.backgroundColor, 0, 0, 10), 0.37),
                  "toolbar.hoverOutline": "#55555500",
                  "editorActionList.background": this.derivedColors.popoverBackground,
                  "editorActionList.foreground": this.adjustColor(this.textColor, 0, 0, -10),
                  "editorActionList.focusBackground": this.adjustColor(this.derivedColors.popoverBackground, 0, 0, 10),
                  "editorActionList.focusForeground": this.textColor,

                  // Button control
                  "button.background": this.derivedColors.buttonBackground,
                  "button.foreground": this.whiteOrBlackText(this.derivedColors.buttonBackground),
                  "button.hoverBackground": this.derivedColors.buttonHoverBackground,
                  "button.border": this.defaultColors.transparent,
                  "button.separator": this.whiteOrBlackText(this.derivedColors.buttonBackground, 50),
                  "button.secondaryBackground": "#636363",
                  "button.secondaryForeground": this.whiteOrBlackText(this.derivedColors.buttonBackground),
                  "button.secondaryHoverBackground": "#555555",
                  "checkbox.foreground": this.primaryColor,
                  "checkbox.background": this.backgroundColor,
                  "checkbox.border": this.derivedColors.borderColor,
                  "radio.activeForeground": this.primaryColor,
                  "radio.activeBackground": this.derivedColors.buttonBackground,
                  "radio.activeBorder": this.borderColor,
                  "radio.inactiveBorder": this.derivedColors.borderColor,
                  "radio.inactivateHoverBackground": this.derivedColors.buttonHoverBackground,

                  // Dropdown control
                  "dropdown.background": this.backgroundColor,
                  "dropdown.listBackground": this.adjustColor(this.backgroundColor, 0, 0, 5),
                  "dropdown.border": this.derivedColors.borderColor,
                  "dropdown.foreground": this.textColor,

                  // Input control
                  "input.background": this.backgroundColor,
                  "input.foreground": this.textColor,
                  "input.border": this.hexToRgba(this.derivedColors.borderColor, 0.78),
                  "input.placeholderForeground": this.adjustColor(this.textColor, 0, 0, -10),
                  "inputOption.activeBackground": this.hexToRgba(this.primaryColor, 0.3),
                  "inputOption.activeBorder": this.primaryColor,
                  "inputOption.activeForeground": this.textColor,
                  "inputOption.hoverBackground": this.hexToRgba(this.primaryColor, 0.2),
                  "inputValidation.errorBackground": this.hexToRgba("#ff5555", 0.1),
                  "inputValidation.errorForeground": "#ff5555",
                  "inputValidation.errorBorder": "#ff5555",
                  "inputValidation.infoBackground": this.hexToRgba("#75beff", 0.1),
                  "inputValidation.infoForeground": "#75beff",
                  "inputValidation.infoBorder": "#75beff",
                  "inputValidation.warningBackground": this.hexToRgba("#ff9100", 0.1),
                  "inputValidation.warningForeground": "#ff9100",
                  "inputValidation.warningBorder": "#ff9100",

                  // Scrollbar control
                  // "scrollbar.shadow": `${this.adjustColor(this.backgroundColor, 0, 0, -5)}00`,
                  "scrollbar.shadow": this.backgroundColor,
                  "scrollbarSlider.background": this.hexToRgba(this.textColor, 0.21),
                  "scrollbarSlider.activeBackground": this.hexToRgba(this.textColor, 0.31),
                  "scrollbarSlider.hoverBackground": this.hexToRgba(this.textColor, 0.26),

                  // Badge
                  "badge.background": this.primaryColor,
                  "badge.foreground": this.whiteOrBlackText(this.primaryColor),

                  // Progress bar
                  "progressBar.background": this.primaryColor,

                  // Lists and trees
                  "list.hoverBackground": this.hexToRgba(this.textColor, 0.04),
                  "list.hoverForeground": this.textColor,
                  "list.activeSelectionBackground": this.hexToRgba(this.textColor, 0.07),
                  "list.activeSelectionForeground": this.textColor,
                  "list.inactiveSelectionBackground": this.hexToRgba(this.textColor, 0.04),
                  "list.inactiveSelectionForeground": this.hexToRgba(this.textColor, 0.71),
                  "list.focusBackground": this.hexToRgba(this.primaryColor, 0.07),
                  "list.focusForeground": this.textColor,
                  "list.inactiveFocusBackground": this.hexToRgba(this.primaryColor, 0.08),
                  "list.focusAndSelectionOutline": `${this.derivedColors.borderColor}00`,
                  "list.dropBackground": this.hexToRgba(this.adjustColor(this.primaryColor, 0, -20, -20), 0.28),
                  "tree.indentGuidesStroke": `${this.textColor}00`,
                  "tree.inactiveIndentGuidesStroke": `${this.textColor}00`,

                  // Activity bar
                  "activityBar.background": this.sidebarColor,
                  "activityBar.inactiveForeground": this.hexToRgba(this.textColor, 0.38),
                  "activityBar.foreground": this.hexToRgba(this.textColor, 0.83),
                  "activityBarBadge.foreground": this.whiteOrBlackText(this.primaryColor),
                  "activityBarBadge.background": this.primaryColor,
                  "activityBar.activeBorder": this.hexToRgba(this.textColor, 0.68),
                  "activityBar.border": this.borderColor,
                  "activityBar.activeBackground": this.hexToRgba(this.textColor, 0.04),

                  // Profiles
                  "profileBadge.background": this.primaryColor,
                  "profileBadge.foreground": this.whiteOrBlackText(this.primaryColor),
                  "profiles.sashBorder": this.derivedColors.borderColor,

                  // Side Bar
                  "sideBar.background": this.sidebarColor,
                  "sideBar.border": this.borderColor,
                  "sideBar.foreground": this.adjustColor(this.textColor, 0, 0, -15),
                  "sideBarTitle.foreground": this.adjustColor(this.textColor, 0, 0, -5),
                  "sideBarTitle.border": "#00000000",
                  "sideBarTitle.background": "#00000000",
                  "sideBarSectionHeader.background": this.sidebarColor,
                  "sideBarSectionHeader.foreground": this.adjustColor(this.textColor, 0, 0, -15),
                  "sideBarSectionHeader.border": this.hexToRgba(this.textColor, 0.06),
                  "sideBarStickyScroll.border": this.borderColor,
                  "sideBarStickyScroll.background": this.sidebarColor,
                  "sideBarStickyScroll.shadow": this.adjustColor(this.backgroundColor, 0, 0, -5),

                  // Minimap
                  "minimap.foregroundOpacity": "#00000065",
                  "minimap.background": this.backgroundColor,

                  // Editor Groups and Tabs
                  "editorGroup.border": this.borderColor,
                  "editorGroup.emptyBackground": this.backgroundColor,
                  "editorGroupHeader.tabsBackground": this.sidebarColor,
                  "editorGroupHeader.tabsBorder": this.sidebarColor,
                  "editorGroupHeader.noTabsBackground": this.sidebarColor,
                  "editorGroupHeader.border": this.borderColor,
                  "editorGroup.dropBackground": this.hexToRgba(this.primaryColor, 0.07),

                  "tab.border": this.borderColor,
                  "tab.hoverBorder": "default",
                  "tab.activeBackground": this.backgroundColor,
                  "tab.inactiveBackground": `${this.sidebarColor}00`,
                  "tab.activeForeground": this.textColor,
                  "tab.inactiveForeground": this.textColor,
                  "tab.activeBorder": this.backgroundColor,
                  "tab.hoverBackground": this.defaultColors.transparent,
                  "tab.hoverForeground": this.textColor,
                  "tab.activeBorderTop": this.textColor,
                  "tab.unfocusedActiveBorder": this.backgroundColor,
                  "tab.unfocusedActiveBorderTop": this.adjustColor(this.textColor, 0, 0, -40),
                  "tab.unfocusedActiveBackground": this.backgroundColor,
                  "tab.unfocusedHoverBackground": this.sidebarColor,
                  "tab.unfocusedHoverForeground": this.textColor,
                  "tab.unfocusedInactiveBackground": this.sidebarColor,
                  "tab.unfocusedInactiveForeground": this.textColor,
                  "tab.unfocusedHoverBorder": "default",
                  "tab.dragAndDropBorder": this.hexToRgba(this.textColor, 0.52),

                  // Editor colors
                  "editorLineNumber.foreground": this.hexToRgba(this.textColor, 0.18),
                  "editorLineNumber.activeForeground": this.hexToRgba(this.textColor, 0.59),
                  "editorGutter.background": this.backgroundColor,
                  "editor.background": this.backgroundColor,
                  "editor.selectionBackground": this.derivedColors.selectionBackground,
                  "editor.selectionHighlightBackground": this.hexToRgba(this.primaryColor, 0.33),
                  "editor.inactiveSelectionBackground": this.hexToRgba(this.adjustColor(this.primaryColor, 0, -20, -20), 0.33),
                  "editorBracketMatch.background": this.hexToRgba(this.textColor, 0.05),
                  "editorBracketMatch.border": this.hexToRgba(this.textColor, 0.16),
                  "editorStickyScroll.border": this.adjustColor(this.backgroundColor, 0, 0, 10),
                  "editorStickyScroll.shadow": this.adjustColor(this.backgroundColor, 0, 0, -5),
                  "editorStickyScroll.background": this.backgroundColor,
                  "editorStickyScrollHover.background": this.adjustColor(this.backgroundColor, 0, 0, 3),
                  "editor.lineHighlightBorder": `${this.textColor}00`,
                  "editor.lineHighlightBackground": this.hexToRgba(this.textColor, 0.04),
                  "editorIndentGuide.activeBackground1": this.hexToRgba(this.textColor, 0.16),
                  "editorIndentGuide.background1": this.hexToRgba(this.textColor, 0.04),
                  // Overview ruler
                  "editorOverviewRuler.border": this.backgroundColor,
                  "editorOverviewRuler.background": this.backgroundColor,
                  "editorOverviewRuler.activeBorder": this.borderColor,
                  "editorOverviewRuler.activeBackground": this.hexToRgba(this.textColor, 0.04),
                  "editorOverviewRuler.findMatchBorder": this.primaryColor,
                  "editorOverviewRuler.findMatchBackground": this.hexToRgba(this.primaryColor, 0.33),
                  "editorOverviewRuler.findMatchForeground": this.hexToRgba(this.primaryColor, 0.5),
                  "editorOverviewRuler.rangeHighlightForeground": this.hexToRgba(this.primaryColor, 0.4),
                  "editorOverviewRuler.selectionHighlightForeground": this.hexToRgba(this.primaryColor, 0.3),
                  "editorOverviewRuler.wordHighlightForeground": this.hexToRgba(this.textColor, 0.3),
                  "editorOverviewRuler.wordHighlightStrongForeground": this.hexToRgba(this.textColor, 0.5),
                  "editorOverviewRuler.wordHighlightTextForeground": this.hexToRgba(this.textColor, 0.4),
                  "editorOverviewRuler.modifiedForeground": "#e2c08d",
                  "editorOverviewRuler.addedForeground": "#73c991",
                  "editorOverviewRuler.deletedForeground": "#ff6b6b",
                  "editorOverviewRuler.errorForeground": "#ff5555",
                  "editorOverviewRuler.warningForeground": "#ff9100",
                  "editorOverviewRuler.infoForeground": "#75beff",
                  "editorOverviewRuler.bracketMatchForeground": this.hexToRgba(this.textColor, 0.3),
                  "editorOverviewRuler.inlineChatInserted": "#73c99180",
                  "editorOverviewRuler.inlineChatRemoved": "#ff6b6b80",

                  // Diff editor
                  "diffEditor.border": this.borderColor,

                  // Editor widget
                  "editorWidget.background": this.adjustColor(this.backgroundColor, 0, 0, 5),
                  "editorWidget.foreground": this.textColor,
                  "editorWidget.border": this.derivedColors.borderColor,

                  // Panel colors
                  "panelTitle.inactiveForeground": this.adjustColor(this.textColor, 0, 0, -30),
                  "panelTitle.activeBorder": this.primaryColor,
                  "panelTitle.activeForeground": this.textColor,
                  "panel.background": this.sidebarColor,
                  "panel.border": this.borderColor,
                  "panelSection.border": this.adjustColor(this.sidebarColor, 0, 0, 15),
                  "panelSection.dropBackground": this.adjustColor(this.sidebarColor, 0, 0, 25),
                  "panelStickyScroll.border": this.borderColor,

                  // Status Bar colors
                  "statusBar.background": this.sidebarColor,
                  "statusBar.foreground": this.hexToRgba(this.textColor, 0.5),
                  "statusBar.debuggingBackground": this.defaultColors.transparent,
                  "statusBar.debuggingForeground": this.textColor,
                  "statusBar.debuggingBorder": this.borderColor,
                  "statusBarItem.hoverBackground": this.adjustColor(this.sidebarColor, 0, 0, 5),
                  "statusBar.noFolderBackground": this.sidebarColor,
                  "statusBar.border": this.borderColor,
                  "statusBarItem.remoteBackground": this.adjustColor(this.sidebarColor, 0, 0, 5),
                  "statusBarItem.remoteForeground": this.primaryColor,
                  "statusBarItem.remoteHoverBackground": this.derivedColors.buttonBackground,
                  "statusBarItem.remoteHoverForeground": this.whiteOrBlackText(this.derivedColors.buttonBackground),

                  // Title Bar colors
                  "titleBar.activeBackground": this.sidebarColor,
                  "titleBar.inactiveBackground": this.sidebarColor,
                  "titleBar.border": this.borderColor,
                  "titleBar.activeForeground": this.textColor,
                  "titleBar.inactiveForeground": this.adjustColor(this.textColor, 0, 0, -30),

                  // Menu Bar colors
                  "menubar.selectionForeground": this.textColor,
                  "menubar.selectionBackground": this.hexToRgba(this.textColor, 0.09),
                  "menubar.selectionHoverBackground": this.adjustColor(this.sidebarColor, 0, 0, 15),
                  "menu.background": this.adjustColor(this.sidebarColor, 0, 0, 3),
                  "menu.border": this.derivedColors.borderColor,
                  "menu.foreground": this.textColor,
                  "menu.selectionBackground": this.hexToRgba(this.textColor, 0.09),
                  "menu.selectionForeground": this.textColor,
                  "menu.separatorBackground": this.adjustColor(this.textColor, 0, 0, -20),

                  // Command Center
                  "commandCenter.background": this.sidebarColor,
                  "commandCenter.border": this.hexToRgba(this.borderColor, 0.5),
                  "commandCenter.activeBackground": this.backgroundColor,
                  "commandCenter.inactiveBorder": this.backgroundColor,
                  "commandCenter.foreground": this.textColor,
                  "commandCenter.activeForeground": this.textColor,
                  "commandCenter.inactiveForeground": this.hexToRgba(this.textColor, 0.5),
                  "commandCenter.activeBorder": this.borderColor,
                  "commandCenter.debuggingBackground": this.sidebarColor,

                  // Notification colors
                  "notificationCenter.border": this.borderColor,
                  "notificationCenterHeader.foreground": this.textColor,
                  "notificationCenterHeader.background": this.sidebarColor,
                  "notifications.background": this.sidebarColor,
                  "notifications.border": this.borderColor,
                  "notifications.foreground": this.textColor,
                  "notificationToast.border": this.borderColor,
                  "notificationLink.foreground": this.primaryColor,
                  "notificationsErrorIcon.foreground": "#ff5555",
                  "notificationsWarningIcon.foreground": "#ff9100",
                  "notificationsInfoIcon.foreground": "#75beff",

                  // Banner colors
                  "banner.background": this.adjustColor(this.sidebarColor, 0, 0, 15),
                  "banner.foreground": this.textColor,

                  // Extensions colors
                  "extensionButton.prominentForeground": this.whiteOrBlackText(this.derivedColors.buttonBackground),
                  "extensionButton.prominentBackground": this.derivedColors.buttonBackground,
                  "extensionButton.prominentHoverBackground": this.derivedColors.buttonHoverBackground,
                  "extensionButton.background": this.derivedColors.buttonBackground,
                  "extensionButton.foreground": this.whiteOrBlackText(this.derivedColors.buttonBackground),
                  "extensionButton.hoverBackground": this.derivedColors.buttonHoverBackground,
                  "extensionButton.separator": this.whiteOrBlackText(this.derivedColors.buttonBackground, 50),
                  "extensionBadge.remoteBackground": this.primaryColor,
                  "extensionBadge.remoteForeground": this.whiteOrBlackText(this.primaryColor),
                  "extensionIcon.starForeground": "#FFD700",

                  // Quick picker colors
                  "pickerGroup.border": this.hexToRgba(this.textColor, 0.15),
                  "quickInputList.focusBackground": this.adjustColor(this.sidebarColor, 0, 0, 15),
                  "quickInputList.focusForeground": this.textColor,
                  "quickInput.background": this.adjustColor(this.sidebarColor, 0, 0, 8),
                  "quickInput.foreground": this.hexToRgba(this.textColor, 0.47),
                  "quickInputTitle.background": this.adjustColor(this.sidebarColor, 0, 0, 5),

                  // Editor Widgets
                  "editorHoverWidget.background": this.adjustColor(this.sidebarColor, 0, 0, 5),
                  "editorHoverWidget.border": this.derivedColors.borderColor,
                  "editorHoverWidget.foreground": this.hexToRgba(this.textColor, 0.77),
                  "editorSuggestWidget.background": this.adjustColor(this.sidebarColor, 0, 0, 8),
                  "editorSuggestWidget.selectedBackground": this.hexToRgba(this.textColor, 0.06),
                  "editorSuggestWidget.border": this.hexToRgba(this.textColor, 0.08),

                  // Integrated Terminal colors
                  "terminal.background": this.sidebarColor,
                  "terminal.border": `${this.textColor}00`,

                  // Breadcrumbs colors
                  "breadcrumb.background": this.backgroundColor,
                  "breadcrumb.focusForeground": this.hexToRgba(this.textColor, 0.85),
                  "breadcrumb.activeSelectionForeground": this.textColor,

                  // Other
                  "sideBySideEditor.horizontalBorder": this.borderColor,
                  "sideBySideEditor.verticalBorder": this.borderColor,

                  // Git
                  "gitDecoration.ignoredResourceForeground": this.hexToRgba(this.textColor, 0.16),
                  "gitDecoration.modifiedResourceForeground": "#e2c08d",
                  "gitDecoration.deletedResourceForeground": "#ff6b6b",
                  "gitDecoration.untrackedResourceForeground": "#73c991",
                  "gitDecoration.conflictingResourceForeground": "#ff8800",
                  "gitDecoration.submoduleResourceForeground": "#8db9e2",
                  "gitDecoration.stageModifiedResourceForeground": "#e2c08d99",
                  "gitDecoration.stageDeletedResourceForeground": "#ff6b6b99",
                  "gitDecoration.addedResourceForeground": "#73c991",

                  // Additional editor colors
                  "editor.findMatchBackground": this.hexToRgba(this.primaryColor, 0.4),
                  "editor.findMatchHighlightBackground": this.hexToRgba(this.primaryColor, 0.25),
                  "editor.wordHighlightBackground": this.hexToRgba(this.textColor, 0.1),
                  "editor.wordHighlightStrongBackground": this.hexToRgba(this.textColor, 0.15),
                  "editorCursor.foreground": this.primaryColor,
                  "editorWarning.foreground": "#ff9100",
                  "editorError.foreground": "#ff5555",
                  "editorInfo.foreground": "#75beff",
                  "editorHint.foreground": "#75beff99",

                  // Peek view colors
                  "peekView.border": this.derivedColors.borderColor,
                  "peekViewEditor.background": this.adjustColor(this.backgroundColor, 0, 0, -5),
                  "peekViewResult.background": this.adjustColor(this.backgroundColor, 0, 0, -8),
                  "peekViewTitle.background": this.adjustColor(this.backgroundColor, 0, 0, -3),

                  // Debug colors
                  // "debugToolBar.background": this.sidebarColor,
                  // "debugToolBar.border": this.derivedColors.borderColor,
                  // "debugIcon.breakpointForeground": "#ff5555",
                  // "debugIcon.startForeground": "#73c991",
                  "debugToolBar.background": this.sidebarColor,
                  "debugToolBar.border": this.derivedColors.borderColor,
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
                  "debugConsole.sourceForeground": this.hexToRgba(this.textColor, 0.9),
                  "debugConsoleInputIcon.foreground": this.primaryColor,

                  // // Welcome page
                  // "welcomePage.background": this.backgroundColor,
                  // "welcomePage.tileBackground": this.sidebarColor,
                  // "welcomePage.tileBorder": this.derivedColors.borderColor,
                  // "welcomePage.tileHoverBackground": this.adjustColor(this.sidebarColor, 0, 0, 5),

                  // Settings
                  // "settings.headerForeground": this.textColor,
                  // "settings.modifiedItemIndicator": this.primaryColor,
                  // "settings.checkboxBackground": this.backgroundColor,
                  // "settings.textInputBackground": this.backgroundColor,
                  // "settings.numberInputBackground": this.backgroundColor,
                  // "settings.dropdownBackground": this.backgroundColor,
                  "settings.headerForeground": this.textColor,
                  "settings.modifiedItemIndicator": this.primaryColor,
                  "settings.checkboxBackground": this.backgroundColor,
                  "settings.checkboxForeground": this.textColor,
                  "settings.checkboxBorder": this.derivedColors.borderColor,
                  "settings.textInputBackground": this.backgroundColor,
                  "settings.textInputForeground": this.textColor,
                  "settings.textInputBorder": this.derivedColors.borderColor,
                  "settings.numberInputBackground": this.backgroundColor,
                  "settings.numberInputForeground": this.textColor,
                  "settings.numberInputBorder": this.derivedColors.borderColor,
                  "settings.dropdownBackground": this.backgroundColor,
                  "settings.dropdownForeground": this.textColor,
                  "settings.dropdownBorder": this.derivedColors.borderColor,
                  "settings.dropdownListBorder": this.derivedColors.borderColor,
                  "settings.rowHoverBackground": this.hexToRgba(this.textColor, 0.05),
                  "settings.focusedRowBackground": this.hexToRgba(this.primaryColor, 0.1),
                  "settings.focusedRowBorder": this.hexToRgba(this.primaryColor, 0.4),
                  "settings.headerBorder": this.derivedColors.borderColor,
                  "settings.sashBorder": this.derivedColors.borderColor,
                  "settings.settingsHeaderHoverForeground": this.textColor,


                  // Breadcrumbs
                  "breadcrumbPicker.background": this.sidebarColor,

                  // Symbol Icons
                  "symbolIcon.classForeground": "#ff9100",
                  "symbolIcon.functionForeground": "#75beff",
                  "symbolIcon.variableForeground": "#ff5555",
                  "symbolIcon.propertyForeground": "#73c991",

                  // Testing
                  "testing.iconFailed": "#ff5555",
                  "testing.iconPassed": "#73c991",
                  "testing.iconSkipped": "#75beff",
                  "testing.peekBorder": this.derivedColors.borderColor,

                  // Notebook
                  "notebook.cellBorderColor": this.derivedColors.borderColor,
                  "notebook.selectedCellBackground": this.hexToRgba(this.textColor, 0.1),
                  "notebook.focusedCellBorder": this.primaryColor,

                  // Charts
                  "charts.foreground": this.textColor,
                  "charts.lines": this.hexToRgba(this.textColor, 0.5),
                  "charts.red": "#ff5555",
                  "charts.blue": "#75beff",
                  "charts.yellow": "#ffd700",
                  "charts.green": "#73c991",
                  "charts.purple": "#b48ead",
                  "charts.orange": "#ff9100",

                  // Ports
                  "ports.iconRunningProcessForeground": "#73c991",

                  // Comments
                  "editorGutter.commentRangeForeground": this.hexToRgba(this.textColor, 0.3),

                  // Merge conflicts
                  "merge.currentHeaderBackground": this.hexToRgba("#73c991", 0.3),
                  "merge.incomingHeaderBackground": this.hexToRgba("#75beff", 0.3),
                  "merge.commonHeaderBackground": this.hexToRgba(this.textColor, 0.1),

                  // Snippets
                  "editor.snippetTabstopHighlightBackground": this.hexToRgba(this.primaryColor, 0.2),
                  "editor.snippetFinalTabstopHighlightBackground": this.hexToRgba("#73c991", 0.2),
                        
		};
	}
}


export { VSCodeThemeGenerator, DerivedColors };