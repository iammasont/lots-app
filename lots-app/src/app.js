// Import styles
import './styles/compare.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/tools.css';
import './styles/themes.css';
import './styles/animations.css';

// Import components
import { initCurvesPanel } from './components/curves/curves-panel.js';
import { initBasicCorrections, setupAdvancedControls } from './components/basic-corrections/basic-corrections.js';
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

// Import image processing utilities
import { processImage, applyAdjustmentsToImage } from './models/image-processor.js';

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
    lumetri: {
      exposure: 0,
      contrast: 0,
      highlights: 0,
      shadows: 0,
      whites: 0,
      blacks: 0,
      temperature: 0,
      tint: 0
    }
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
  console.log('Setting up mode toggle...');
  const modeToggle = document.getElementById('mode-toggle');
  const basicControls = document.getElementById('basic-controls');
  const advancedControls = document.getElementById('advanced-controls');
  
  if (!modeToggle) {
    console.error('Mode toggle element not found!');
    return;
  }
  
  if (!basicControls) {
    console.error('Basic controls element not found!');
    return;
  }
  
  if (!advancedControls) {
    console.error('Advanced controls element not found!');
    return;
  }
  
  console.log('Mode toggle elements found, adding event listener...');
  
  modeToggle.addEventListener('change', function() {
    const isAdvancedMode = this.checked;
    console.log(`Mode toggle changed. Advanced mode: ${isAdvancedMode}`);
    
    appState.activeMode = isAdvancedMode ? 'advanced' : 'basic';
    
    console.log(`Switching to ${appState.activeMode} mode`);
    console.log(`Basic controls display: ${isAdvancedMode ? 'none' : 'block'}`);
    console.log(`Advanced controls display: ${isAdvancedMode ? 'block' : 'none'}`);
    
    basicControls.style.display = isAdvancedMode ? 'none' : 'block';
    advancedControls.style.display = isAdvancedMode ? 'block' : 'none';
    
    // When switching to advanced mode, ensure all advanced sections are properly initialized
    if (isAdvancedMode && typeof setupAdvancedControls === 'function') {
      try {
        console.log('Setting up advanced controls...');
        setupAdvancedControls();
        console.log('Advanced controls setup complete');
      } catch (error) {
        console.error('Error setting up advanced controls:', error);
      }
    }
    
    // Apply current image adjustments with the new mode
    if (appState.originalImage && appState.processedImage) {
      console.log('Applying image adjustments after mode switch');
      applyImageAdjustments();
    }
  });
  
  console.log('Mode toggle setup completed');
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
  if (!appState.originalImage) {
    console.warn('No original image to process');
    return;
  }
  
  console.log(`Applying image adjustments in ${appState.activeMode} mode`);
  
  // Actually process the image instead of just logging
  try {
    // Use the image processor to apply adjustments
    const processedImageUrl = processImage(appState.originalImageElement);
    
    // Update the processed image with the new data
    if (processedImageUrl && appState.processedImageElement) {
      appState.processedImageElement.src = processedImageUrl;
      console.log('Processed image updated');
    } else {
      console.warn('Failed to update processed image');
    }
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// In app.js, add a centralized section toggle function
function setupAllSectionToggles() {
  const toggles = document.querySelectorAll('.lumetri-section h3');
  
  toggles.forEach(toggle => {
    // Remove any existing click listeners
    const clone = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(clone, toggle);
    
    // Get the associated content section
    const content = clone.nextElementSibling;
    if (!content || !content.classList.contains('section-content')) {
      console.error('Missing content section for toggle:', clone.id);
      return;
    }
    
    // Add new click listener
    clone.addEventListener('click', () => {
      console.log(`Toggle clicked for: ${clone.id} (centralized handler)`);
      clone.classList.toggle('expanded');
      content.classList.toggle('expanded');
      
      // Force redraw
      content.offsetHeight;
    });
  });


// Add this debugging code to app.js (anywhere after DOM load)
function debugSections() {
  console.log("======= DEBUG SECTIONS =======");
  
  const sections = [
    { toggle: 'basic-correction-toggle', content: 'basic-correction-section' },
    { toggle: 'creative-toggle', content: 'creative-section' },
    { toggle: 'color-wheels-toggle', content: 'color-wheels-section' },
    { toggle: 'curves-toggle', content: 'curves-section' }
  ];
  
  sections.forEach(section => {
    const toggle = document.getElementById(section.toggle);
    const content = document.getElementById(section.content);
    
    console.log(`Toggle [${section.toggle}]: ${toggle ? 'Found' : 'NOT FOUND'}`);
    console.log(`Content [${section.content}]: ${content ? 'Found' : 'NOT FOUND'}`);
    
    if (toggle && content) {
      console.log(`- Toggle has 'expanded' class: ${toggle.classList.contains('expanded')}`);
      console.log(`- Content has 'expanded' class: ${content.classList.contains('expanded')}`);
      console.log(`- Content style.maxHeight: ${content.style.maxHeight}`);
      console.log(`- Content offsetHeight: ${content.offsetHeight}px`);
      console.log(`- Content computedStyle.maxHeight: ${window.getComputedStyle(content).maxHeight}`);
      console.log(`- Content style.display: ${window.getComputedStyle(content).display}`);
    }
  });
  
  console.log("============================");
}

// Call this debugging function after initialization
setTimeout(debugSections, 1000);



// Add this to app.js or create a new file called section-fix.js
function fixSectionToggles() {
  // Remove all existing event listeners by cloning nodes
  function removeExistingListeners(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    return clone;
  }
  
  // Get sections we need to fix
  const sections = [
    { toggle: 'basic-correction-toggle', content: 'basic-correction-section' },
    { toggle: 'creative-toggle', content: 'creative-section' },
    { toggle: 'color-wheels-toggle', content: 'color-wheels-section' },
    { toggle: 'curves-toggle', content: 'curves-section' }
  ];
  
  // Apply the fix to each section
  sections.forEach(section => {
    const toggle = removeExistingListeners(section.toggle);
    const content = document.getElementById(section.content);
    
    if (!toggle || !content) {
      console.error(`Cannot fix section - missing elements: ${section.toggle} or ${section.content}`);
      return;
    }
    
    // Set initial state directly
    if (toggle.classList.contains('expanded')) {
      content.style.display = 'block';
      content.style.maxHeight = '1000px';
      content.style.opacity = '1';
    } else {
      content.style.display = 'none';
      content.style.maxHeight = '0';
      content.style.opacity = '0';
    }
    
    // Add a completely new click handler
    toggle.addEventListener('click', function() {
      console.log(`FIXED handler - Toggle clicked: ${section.toggle}`);
      
      // Toggle expanded class
      this.classList.toggle('expanded');
      
      // Toggle visibility with direct style manipulation
      if (this.classList.contains('expanded')) {
        content.style.display = 'block';
        // Force a reflow before changing properties for animation
        content.offsetHeight;
        content.style.maxHeight = '1000px';
        content.style.opacity = '1';
      } else {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        // Hide after transition completes
        setTimeout(() => {
          if (!this.classList.contains('expanded')) {
            content.style.display = 'none';
          }
        }, 300); // Match your CSS transition duration
      }
    });
    
    console.log(`Fixed toggle handler for: ${section.toggle}`);
  });
  
  console.log("All section toggles have been fixed with direct style manipulation");
}

// Call our fix function after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a short time to ensure all other initialization is done
  setTimeout(fixSectionToggles, 500);
});


function addOverrideStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Override styles to fix section toggling */
    .section-content {
      transition: max-height 0.3s ease, opacity 0.3s ease;
    }
    
    .lumetri-section h3.expanded + .section-content {
      display: block !important;
      max-height: 1000px !important;
      opacity: 1 !important;
      overflow: visible !important;
    }
    
    .lumetri-section h3:not(.expanded) + .section-content {
      max-height: 0 !important;
      opacity: 0 !important;
      overflow: hidden !important;
    }
    
    /* Add a visual indicator for debug purposes */
    .lumetri-section h3::after {
      content: " ▼";
      transition: transform 0.3s ease;
    }
    
    .lumetri-section h3.expanded::after {
      transform: rotate(180deg);
    }
  `;
  
  document.head.appendChild(styleElement);
  console.log("Override styles added to fix section toggling");
}

// Call this immediately
addOverrideStyles();





// Add these emergency buttons as a last resort
setTimeout(addEmergencyToggles, 1000);

  console.log('All section toggles set up in centralized function');
}

// Call this after initializing all components
document.addEventListener('DOMContentLoaded', () => {
  // ... other initialization
  setupAllSectionToggles();
});

// Apply basic mode adjustments
function applyBasicAdjustments() {
  console.log('Applying basic adjustments to image');
  applyAdjustmentsToImage();
}

// Apply advanced mode adjustments
function applyAdvancedAdjustments() {
  console.log('Applying advanced Lumetri-style adjustments to image');
  applyAdjustmentsToImage();
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