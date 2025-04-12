import { ThemeConfig } from "./types";
import { adjustColor, blendColors, hexToHexAlpha, isDarkMode, whiteOrBlackText } from "./utils";


export function getColors(provided: ThemeConfig) {
	// const derived = {
	// 	buttonBackground: adjustColor(provided.primary, 0, -30, 0),
	// 	buttonHoverBackground: adjustColor(provided.primary, 0, -50, 0),
	// 	selectionBackground: hexToHexAlpha(provided.primary, 0.15),
	// 	borderColor: provided.border,
	// 	activeBorder: provided.border,
	// 	inactiveBorder: provided.border,
	// 	popoverBackground: adjustColor(provided.background, 0, 0, 10),
	// };

    const isDark = isDarkMode(provided.background)

    const {
        primary,
        background,
        accent,
        foreground,
        border,
        borderOpacity,
    } = provided

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
    }

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
    }

    console.log("isDark", isDark)

    const defaults = {
        transparent: "#00000000",
        other: isDark ? darkOtherColors : lightOtherColors
    }

    // Button
    const buttonBackground = adjustColor(primary, 0, -25, 0)
    const buttonForeground = whiteOrBlackText(buttonBackground)
    const button = {
        background: buttonBackground,
        foreground: buttonForeground,
        hoverBackground: adjustColor(buttonBackground, 0, 0, -5),
        border: defaults.transparent,
        separator: whiteOrBlackText(buttonBackground, 0.4),
        secondaryBackground: hexToHexAlpha(foreground, 0.2),
        secondaryForeground: buttonForeground,
        secondaryHoverBackground: hexToHexAlpha(foreground, 0.3)
    }

    // Badge
    const badge = {
        background: primary,
        foreground: whiteOrBlackText(primary, 0.9),
    }

    // Activity Bar
    const activityBar = {
        background: provided.inverseActivityBar ? background : accent,
        inactiveForeground: hexToHexAlpha(foreground, 0.38),
        foreground: hexToHexAlpha(foreground, 0.83),
        badgeForeground: badge.foreground,
        badgeBackground: badge.background,
        activeBorder: hexToHexAlpha(foreground, 0.68),
        border: border,
        activeBackground: hexToHexAlpha(foreground, 0.04),
    }
    const activityBarBadge = {
        foreground: badge.foreground,
        background: badge.background,
    }
    
    // Profiles
    const profileBadge = {
        background: badge.foreground,
        foreground: badge.background,
    }

    // Side Bar
    const sideBar = {
        background: accent,
        border: border,
        foreground: adjustColor(foreground, 0, 0, -15),
    }
    const sideBarTitle = {
        foreground: adjustColor(foreground, 0, 0, -5),
        border: defaults.transparent,
        background: defaults.transparent,
    }
    const sideBarSectionHeader = {
        background: accent,
        foreground: adjustColor(foreground, 0, 0, -15),
        border: hexToHexAlpha(foreground, 0.06),
    }
    const sideBarStickyScroll = {
        border: border,
        background: accent,
        shadow: adjustColor(background, 0, 0, -5),
    }

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
        }
    }
    // Status Bar
    const statusBarBackground = accent
    const statusBar = {
        background: statusBarBackground,
        foreground: hexToHexAlpha(foreground, 0.5),
        border: border,
        debuggingBackground: defaults.transparent,
        debuggingForeground: foreground,
        debuggingBorder: border,
        noFolderBackground: statusBarBackground,
        itemHoverBackground: adjustColor(statusBarBackground, 0, 0, 5),
        itemRemoteBackground: adjustColor(statusBarBackground, 0, 0, 5),
        itemRemoteForeground: primary,
        itemRemoteHoverBackground: button.background,
        itemRemoteHoverForeground: whiteOrBlackText(button.background),
    }

    // Cursor
    const cursor = {
        foreground: primary,
    }

    // based on borderOpacity get a value between 0 and 50 (50% of the input value)
    const borderOpacityValue = Math.min(50, Math.max(0, borderOpacity * 0.5))
    

    const popoverBackground = adjustColor(accent, 0, 0, 5)
    const popoverForeground = adjustColor(foreground, 0, 0, -10)
    const widget = {
        background: popoverBackground,
        foreground: popoverForeground,
        focusBackground: adjustColor(popoverBackground, 0, 0, 5),
        focusForeground: popoverForeground,
        border: adjustColor(popoverBackground, 0, 0, borderOpacityValue),
        shadow: adjustColor(accent, 0, 0, -5),
    }

    const popover = {
        background: popoverBackground,
        foreground: popoverForeground,
        focusBackground: adjustColor(popoverBackground, 0, 0, 5),
        focusForeground: popoverForeground,
        border: adjustColor(popoverBackground, 0, 0, borderOpacityValue),
    }


    // Git
    const gitOpacity = 0.6
    const git = {
        ignoredResourceForeground: hexToHexAlpha(foreground, 0.16),
        modifiedResourceForeground: blendColors(defaults.other.orange.default, foreground, gitOpacity),
        deletedResourceForeground: blendColors(defaults.other.red.default, foreground, gitOpacity),
        untrackedResourceForeground: blendColors(defaults.other.green.default, foreground, gitOpacity),
        addedResourceForeground: blendColors(defaults.other.green.default, foreground, gitOpacity),
        conflictingResourceForeground: blendColors(defaults.other.yellow.default, foreground, gitOpacity),
        submoduleResourceForeground: blendColors(defaults.other.blue.default, foreground, gitOpacity),
        stageModifiedResourceForeground: blendColors(defaults.other.orange.default, foreground, gitOpacity),
        stageDeletedResourceForeground: blendColors(defaults.other.red.default, foreground, gitOpacity)
    }

	return {
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
    };
}
