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

		// Update comment opacity value display
		const commentOpacitySlider = document.getElementById("commentOpacity");
		const commentOpacityValue = document.getElementById("commentOpacity-value");
		commentOpacitySlider.addEventListener("input", () => {
			commentOpacityValue.textContent = commentOpacitySlider.value;
		});

		// Advanced colors toggle
		const autoAdvancedColors = document.getElementById("autoAdvancedColors");
		const advancedColorsContainer = document.getElementById("advanced-colors-container");

		autoAdvancedColors.addEventListener("change", () => {
			advancedColorsContainer.classList.toggle("enabled", !autoAdvancedColors.checked);
		});

		// Initial state
		advancedColorsContainer.classList.toggle("enabled", !autoAdvancedColors.checked);

		// Add close button handler for the info message
		const infoMessageCloseBtn = document.getElementById("info-message-close");
		const infoMessage = document.querySelector(".info-message.warning");
		if (infoMessageCloseBtn && infoMessage) {
			infoMessageCloseBtn.addEventListener("click", () => {
				infoMessage.style.display = "none";
				vscode.postMessage({
					command: "hideInfoMessage",
				});
			});
		}

		// --- Reusable Optional Color Picker Logic ---
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const toggle = container.querySelector(".optional-toggle");
			const colorInputContainer = container.querySelector(".optional-input-container");
			const colorInput = container.querySelector(".optional-color-input");

			// Function to update state based on toggle
			const updateOptionalState = () => {
				const useDefault = toggle.checked;
				container.classList.toggle("is-default", useDefault);
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

		// Add events for dropdown menu
		const menuButton = document.getElementById("menu-button");
		const dropdownMenu = document.getElementById("dropdown-menu");

		// Toggle dropdown menu
		menuButton.addEventListener("click", (e) => {
			e.stopPropagation();
			dropdownMenu.classList.toggle("active");
		});

		// Close dropdown when clicking elsewhere
		document.addEventListener("click", () => {
			dropdownMenu.classList.remove("active");
		});

		// Prevent dropdown from closing when clicking inside it
		dropdownMenu.addEventListener("click", (e) => {
			e.stopPropagation();
		});

		// Setup dropdown menu items
		document.getElementById("export-file").addEventListener("click", exportTheme);
		document.getElementById("copy-clipboard").addEventListener("click", copyToClipboard);
		document.getElementById("import-file").addEventListener("click", importThemeFile);
		document.getElementById("import-clipboard").addEventListener("click", showImportModal);

		// Handle file selection
		document.getElementById("import-file-input").addEventListener("change", handleFileSelect);

		// Import modal
		const importModalOverlay = document.getElementById("import-modal-overlay");
		document.getElementById("import-modal-cancel").addEventListener("click", () => {
			importModalOverlay.classList.remove("active");
		});
		document.getElementById("import-modal-apply").addEventListener("click", importFromClipboard);

		// Setup predefined themes
		document.querySelectorAll('.theme-item').forEach(item => {
			item.addEventListener('click', function() {
				const category = this.getAttribute('data-theme-category');
				const index = parseInt(this.getAttribute('data-theme-index'));
				
				// Ask the extension to apply the predefined theme
				vscode.postMessage({
					command: 'applyPredefinedTheme',
					category: category,
					index: index
				});
			});
		});
	}

	// Apply theme function
	function applyTheme() {
		const themeConfig = getThemeFromElements();

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

	function getThemeFromElements() {
		const autoAdvancedColors = document.getElementById("autoAdvancedColors").checked;
		const accentColor = document.getElementById("color3").value;
		const foreground = document.getElementById("color4").value;
		const isOptionalEditorForegroundChecked = document.getElementById("optionalEditorForeground-default-toggle").checked;
		return {
			primary: document.getElementById("color1").value,
			background: document.getElementById("color2").value,
			accent: accentColor,
			foreground: foreground,
			border: document.getElementById("color5").value,
			activityBar: autoAdvancedColors ? accentColor : document.getElementById("activityBarColor").value,
			popover: autoAdvancedColors ? accentColor : document.getElementById("popoverColor").value,
			button: autoAdvancedColors ? accentColor : document.getElementById("buttonColor").value,
			coloredCursor: document.getElementById("coloredCursor").checked,
			borderOpacity: parseInt(document.getElementById("intensity").value),
			commentOpacity: parseInt(document.getElementById("commentOpacity").value),
			autoAdvancedColors: autoAdvancedColors,
			editorHighlighting: document.getElementById("editorHighlighting").checked,
			syntaxCommentsOverwrite: document.getElementById("syntaxCommentsOverwrite").checked,
			optionalEditorForeground: isOptionalEditorForegroundChecked
				? "default"
				: document.getElementById("optionalEditorForeground").value,
			indicator: autoAdvancedColors ? foreground : document.getElementById("indicatorColor").value,
		};
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
		document.getElementById("indicatorColor").value = themeConfig.indicator;
		document.getElementById("commentOpacity").value = themeConfig.commentOpacity;
		document.getElementById("commentOpacity-value").textContent = themeConfig.commentOpacity;

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
		} else if (message.command === "hide-info-message") {
			const infoMessage = document.querySelector(".info-message.warning");
			if (infoMessage) {
				infoMessage.style.display = "none";
			}
		} else if (message.command === "setPredefinedTheme") {
			setTheme(message.themeConfig);
		}
	});

	// Initialize when DOM is ready
	document.addEventListener("DOMContentLoaded", initializeUI);

	// Export theme function
	function exportTheme() {
		const themeConfig = getThemeFromElements();
		document.getElementById("dropdown-menu").classList.remove("active");

		// Add optional color picker values
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const settingName = container.dataset.settingName;
			if (settingName) {
				const toggle = container.querySelector(".optional-toggle");
				const colorInput = container.querySelector(".optional-color-input");
				themeConfig[settingName] = toggle.checked ? "default" : colorInput.value;
			}
		});

		// Ask extension to handle the export
		vscode.postMessage({
			command: "exportTheme",
			themeConfig: themeConfig,
		});
	}

	// Copy theme to clipboard
	function copyToClipboard() {
		const themeConfig = getThemeFromElements();
		document.getElementById("dropdown-menu").classList.remove("active");

		// Add optional color picker values
		document.querySelectorAll(".optional-color-picker-container").forEach((container) => {
			const settingName = container.dataset.settingName;
			if (settingName) {
				const toggle = container.querySelector(".optional-toggle");
				const colorInput = container.querySelector(".optional-color-input");
				themeConfig[settingName] = toggle.checked ? "default" : colorInput.value;
			}
		});

		// Convert to JSON and copy to clipboard
		const jsonString = JSON.stringify(themeConfig, null, 2);

		// Use the clipboard API
		navigator.clipboard
			.writeText(jsonString)
			.then(() => {
				vscode.postMessage({
					command: "showInfo",
					message: "Theme JSON copied to clipboard",
				});
			})
			.catch((err) => {
				vscode.postMessage({
					command: "showError",
					message: "Failed to copy to clipboard: " + err,
				});
			});
	}

	// Import theme from file
	function importThemeFile() {
		document.getElementById("dropdown-menu").classList.remove("active");
		document.getElementById("import-file-input").click();
	}

	// Handle file selection
	function handleFileSelect(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const themeConfig = JSON.parse(e.target.result);
				vscode.postMessage({
					command: "importTheme",
					themeConfig: themeConfig,
				});
			} catch (error) {
				vscode.postMessage({
					command: "showError",
					message: "Invalid theme configuration file",
				});
			}
		};
		reader.readAsText(file);
		// Reset file input so same file can be selected again
		event.target.value = "";
	}

	// Show import modal for pasting JSON
	function showImportModal() {
		document.getElementById("dropdown-menu").classList.remove("active");
		document.getElementById("import-json-textarea").value = "";
		document.getElementById("import-modal-overlay").classList.add("active");
	}

	// Import theme from clipboard (pasted in modal)
	function importFromClipboard() {
		const jsonText = document.getElementById("import-json-textarea").value.trim();
		document.getElementById("import-modal-overlay").classList.remove("active");

		if (!jsonText) {
			vscode.postMessage({
				command: "showError",
				message: "No JSON provided",
			});
			return;
		}

		try {
			const themeConfig = JSON.parse(jsonText);
			vscode.postMessage({
				command: "importTheme",
				themeConfig: themeConfig,
			});
		} catch (error) {
			vscode.postMessage({
				command: "showError",
				message: "Invalid JSON format",
			});
		}
	}
})();
