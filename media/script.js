// media/script.js
(function () {
	// Get vscode API
	const vscode = acquireVsCodeApi();

	// Initialize the UI
	function initializeUI() {
		// Update intensity value display
		const intensitySlider = document.getElementById("intensity");
		const intensityValue = document.getElementById("intensity-value");
		intensitySlider.addEventListener("input", () => {
			intensityValue.textContent = intensitySlider.value;
		});

		// Advanced colors toggle
		const autoAdvancedColors = document.getElementById("autoAdvancedColors");
		const advancedColorsContainer = document.getElementById("advanced-colors-container");

		autoAdvancedColors.addEventListener("change", () => {
			advancedColorsContainer.classList.toggle("enabled", !autoAdvancedColors.checked);
			// if (autoAdvancedColors.checked) {
			// 	// When automatic is enabled, set colors based on accent color
			// 	const accentColor = document.getElementById("color3").value;
			// 	document.getElementById("activityBarColor").value = accentColor;
			// 	document.getElementById("popoverColor").value = accentColor;
			// 	document.getElementById("buttonColor").value = primaryColor;
			// }
		});

		// Initial state
		advancedColorsContainer.classList.toggle("enabled", !autoAdvancedColors.checked);

		// Apply theme button click handler
		document.getElementById("apply-button").addEventListener("click", applyTheme);
		document.getElementById("reset-button").addEventListener("click", resetTheme);
	}

	// Apply theme function
	function applyTheme() {
		const autoAdvancedColors = document.getElementById("autoAdvancedColors").checked;
		const accentColor = document.getElementById("color3").value;

		const themeConfig = {
			primary: document.getElementById("color1").value,
			background: document.getElementById("color2").value,
			accent: accentColor,
			foreground: document.getElementById("color4").value,
			border: document.getElementById("color5").value,
			activityBar: autoAdvancedColors ? accentColor : document.getElementById("activityBarColor").value,
			popover: autoAdvancedColors ? accentColor : document.getElementById("popoverColor").value,
			button: autoAdvancedColors ? accentColor : document.getElementById("buttonColor").value,
			coloredCursor: document.getElementById("coloredCursor").checked,
			borderOpacity: parseInt(document.getElementById("intensity").value),
			autoAdvancedColors: autoAdvancedColors,
		};

		// Send message to extension
		vscode.postMessage({
			command: "applyTheme",
			themeConfig: themeConfig,
		});
	}

	// Reset theme function
	function resetTheme() {
		vscode.postMessage({
			command: "resetTheme",
		});
	}

    function setTheme(themeConfig) {
        document.getElementById("color1").value = themeConfig.primary;
        document.getElementById("color2").value = themeConfig.background;
        document.getElementById("color3").value = themeConfig.accent;
        document.getElementById("color4").value = themeConfig.foreground;
        document.getElementById("color5").value = themeConfig.border;
        document.getElementById("activityBarColor").value = themeConfig.activityBar;
        document.getElementById("popoverColor").value = themeConfig.popover;
        document.getElementById("buttonColor").value = themeConfig.button;
        document.getElementById("coloredCursor").checked = themeConfig.coloredCursor;
        document.getElementById("intensity").value = themeConfig.borderOpacity;
        document.getElementById("intensity-value").textContent = themeConfig.borderOpacity;
        document.getElementById("autoAdvancedColors").checked = themeConfig.autoAdvancedColors;
    }

	window.addEventListener("message", (event) => {
		const message = event.data;
		if (message.command === "set-colors") {
			setTheme(message.themeConfig);
		}
	});

	// Initialize when DOM is ready
	document.addEventListener("DOMContentLoaded", initializeUI);
})();
