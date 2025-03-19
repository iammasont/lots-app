// Import styles
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/comparison.css';
import './styles/tools.css';
import './styles/themes.css';
import './styles/animations.css';

// Import components
import { initCurvesPanel } from './components/curves/curves-panel.js';
import { initBasicCorrections } from './components/basic-corrections/basic-corrections.js';
import { initCreativeEffects } from './components/creative/creative-effects.js';
import { initColorWheels } from './components/color-wheels/color-wheels.js';
import { initImageComparison } from './components/image-preview/image-comparison.js';
import { initPreviewController } from './components/image-preview/preview-controller.js';
import { initPresets } from './components/presets/presets.js';
import { initUiElements } from './components/common/ui-elements.js';

// Import services
import { initFileService } from './services/file-service.js';
import { initLutGenerator } from './services/lut-generator.js';
import { initExportService } from './services/export-service.js';

// App state
let appState = {
  activeMode: 'basic', // 'basic' or 'advanced'
  originalImage: null,
  processedImage: null,
  currentLutParams: {
    // Basic parameters
    size: 32,
    title: "Signature Look",
    contrast: 1.2,
    saturation: 1.15,
    redBalance: 1.05,
    greenBalance: 0.95,
    blueBalance: 1.1,
    shadowsShift: [0.05, 0.0, -0.05],
    highlightsShift: [0.03, 0.03, 0.0],
    
    // Advanced parameters will be added by the respective modules
  }
};

// Initialize the application
function initApp() {
  console.log('LOTS App initializing...');
  
  // Make app state available globally for modules
  window.appState = appState;
  
  // Initialize UI components
  initUiElements();
  initBasicCorrections();
  initCreativeEffects();
  initColorWheels();
  initCurvesPanel();
  initImageComparison();
  initPreviewController();
  initPresets();
  
  // Initialize services
  initFileService();
  initLutGenerator();
  initExportService();
  
  // Set up mode toggle
  setupModeToggle();
  
  // Set up window control buttons
  setupWindowControls();
  
  console.log('LOTS App initialized successfully');
}

// Set up mode toggle (basic/advanced)
function setupModeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  const basicControls = document.getElementById('basic-controls');
  const advancedControls = document.getElementById('advanced-controls');
  
  if (modeToggle) {
    modeToggle.addEventListener('change', function() {
      const isAdvancedMode = this.checked;
      appState.activeMode = isAdvancedMode ? 'advanced' : 'basic';
      
      if (basicControls && advancedControls) {
        console.log(`Switching to ${appState.activeMode} mode`);
        basicControls.style.display = isAdvancedMode ? 'none' : 'block';
        advancedControls.style.display = isAdvancedMode ? 'block' : 'none';
        
        // Apply current image adjustments with the new mode
        if (appState.originalImage && appState.processedImage) {
          applyImageAdjustments();
        }
      }
    });
  }
}

// Set up window control buttons for Electron
function setupWindowControls() {
  const minimizeBtn = document.getElementById('minimize-btn');
  const maximizeBtn = document.getElementById('maximize-btn');
  const closeBtn = document.getElementById('close-btn');
  
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('minimize');
      }
    });
  }
  
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('maximize');
      }
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('close');
      }
    });
  }
}

// Apply adjustments to image based on current mode and parameters
function applyImageAdjustments() {
  // This function will be called by other modules
  // It coordinates the image processing pipeline
  
  if (!appState.originalImage) return;
  
  console.log('Applying image adjustments');
  
  // Delegate to the appropriate processor based on mode
  if (appState.activeMode === 'basic') {
    applyBasicAdjustments();
  } else {
    applyAdvancedAdjustments();
  }
}

// Apply basic mode adjustments
function applyBasicAdjustments() {
  // This will be implemented with imported functions from image-processor.js
  console.log('Applying basic adjustments to image');
  
  // Will use the basic parameters from appState.currentLutParams
  // The actual implementation will be moved to the appropriate module
}

// Apply advanced mode adjustments
function applyAdvancedAdjustments() {
  // This will be implemented with imported functions 
  console.log('Applying advanced Lumetri-style adjustments to image');
  
  // Will use the advanced parameters from appState.currentLutParams
  // The actual implementation will be moved to the appropriate module
}

// Make certain functions available globally
window.applyImageAdjustments = applyImageAdjustments;

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export functions for use in other modules
export { 
  appState,
  applyImageAdjustments,
  applyBasicAdjustments,
  applyAdvancedAdjustments
};