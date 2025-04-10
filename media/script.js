// media/script.js
(function() {
    // Get vscode API
    const vscode = acquireVsCodeApi();
    
    // Initialize the UI
    function initializeUI() {        
        // Update intensity value display
        const intensitySlider = document.getElementById('intensity');
        const intensityValue = document.getElementById('intensity-value');
        intensitySlider.addEventListener('input', () => {
            intensityValue.textContent = intensitySlider.value;
        });
        
        // Apply theme button click handler
        document.getElementById('apply-button').addEventListener('click', applyTheme);
        document.getElementById('reset-button').addEventListener('click', resetTheme);
    }
    
    // Apply theme function
    function applyTheme() {
        const themeConfig = {
            color1: document.getElementById('color1').value,
            color2: document.getElementById('color2').value,
            color3: document.getElementById('color3').value,
            color4: document.getElementById('color4').value,
            color5: document.getElementById('color5').value,
            intensity: parseInt(document.getElementById('intensity').value)
        };
        
        // Send message to extension
        vscode.postMessage({
            command: 'applyTheme',
            themeConfig: themeConfig
        });
    }

    // Reset theme function
    function resetTheme() {
        vscode.postMessage({
            command: 'resetTheme',
        });
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeUI);
})();