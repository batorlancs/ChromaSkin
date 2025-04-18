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

		// --- Reusable Optional Color Picker Logic ---
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const toggle = container.querySelector(".optional-toggle");
			const colorInputContainer = container.querySelector(".optional-input-container");
			const colorInput = container.querySelector(".optional-color-input");

			// Function to update state based on toggle
			const updateOptionalState = () => {
				const useDefault = toggle.checked;
				container.classList.toggle("is-default", useDefault);
				// Optional: Reset color visually when switching to default
				// if (useDefault) {
				//     colorInput.value = '#808080'; // Or another default visual indicator
				// }
			};

			// Add event listener to the toggle
			toggle.addEventListener("change", updateOptionalState);

			// Set initial state
			updateOptionalState();
		});
		// --- End Optional Color Picker Logic ---

		// Apply theme button click handler
		document.getElementById("apply-button").addEventListener("click", applyTheme);
		document.getElementById("reset-button").addEventListener("click", resetTheme);
	}

	// Apply theme function
	function applyTheme() {
		const autoAdvancedColors = document.getElementById("autoAdvancedColors").checked;
		const accentColor = document.getElementById("color3").value;
		const isOptionalEditorForegroundChecked = document.getElementById("optionalEditorForeground-default-toggle").checked;


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
			editorHighlighting: document.getElementById("editorHighlighting").checked,
			syntaxCommentsOverwrite: document.getElementById("syntaxCommentsOverwrite").checked,
			optionalEditorForeground: isOptionalEditorForegroundChecked ? "default" : document.getElementById("optionalEditorForeground").value,
		};

		// --- Add Optional Color Picker Values ---
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const settingName = container.dataset.settingName; // Get name from data attribute
			if (settingName) {
				const toggle = container.querySelector(".optional-toggle");
				const colorInput = container.querySelector(".optional-color-input");
				if (toggle.checked) {
					themeConfig[settingName] = "default"; // Use "default" string
				} else {
					themeConfig[settingName] = colorInput.value; // Use selected color
				}
			}
		});
		// --- End Optional Color Picker Values ---

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
		document.getElementById("editorHighlighting").checked = themeConfig.editorHighlighting;
		document.getElementById("syntaxCommentsOverwrite").checked = themeConfig.syntaxCommentsOverwrite;

		// Set the optional editor foreground color
		const isOptionalEditorForegroundChecked = document.getElementById("optionalEditorForeground-default-toggle").checked;
		document.getElementById("optionalEditorForeground-default-toggle").checked = isOptionalEditorForegroundChecked;
		if (isOptionalEditorForegroundChecked) {
			document.getElementById("optionalEditorForeground").value = "#808080";
		} else {
			document.getElementById("optionalEditorForeground").value = themeConfig.optionalEditorForeground;
		}

		// --- Set Optional Color Picker States ---
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const settingName = container.dataset.settingName;
			if (settingName && themeConfig.hasOwnProperty(settingName)) {
				const toggle = container.querySelector(".optional-toggle");
				const colorInput = container.querySelector(".optional-color-input");
				const value = themeConfig[settingName];

				if (value === "default") {
					toggle.checked = true;
					colorInput.value = "#808080";
				} else {
					toggle.checked = false;
					colorInput.value = value;
				}

				// Trigger update to apply class changes
				const updateOptionalState = () => {
					container.classList.toggle("is-default", toggle.checked);
				};
				updateOptionalState(); // Apply initial state correctly
			}
		});
		// --- End Set Optional Color Picker States ---

		// Update advanced colors container state AFTER setting autoAdvancedColors checkbox
		const autoAdvancedColors = document.getElementById("autoAdvancedColors");
		const advancedColorsContainer = document.getElementById("advanced-colors-container");
		advancedColorsContainer.classList.toggle("enabled", !autoAdvancedColors.checked);
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
