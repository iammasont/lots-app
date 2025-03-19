// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Define built-in presets
const builtInPresets = {
  "custom": {
    contrast: 1.2,
    saturation: 1.15,
    redBalance: 1.05,
    greenBalance: 0.95,
    blueBalance: 1.1,
    shadowsShift: [0.05, 0.0, -0.05],
    highlightsShift: [0.03, 0.03, 0.0]
  },
  "warm": {
    contrast: 1.1,
    saturation: 0.9,
    redBalance: 1.15,
    greenBalance: 0.95,
    blueBalance: 0.85,
    shadowsShift: [0.08, 0.02, -0.05],
    highlightsShift: [0.05, 0.0, -0.05]
  },
  "cool": {
    contrast: 1.3,
    saturation: 0.85,
    redBalance: 0.9,
    greenBalance: 1.0,
    blueBalance: 1.2,
    shadowsShift: [-0.03, 0.0, 0.08],
    highlightsShift: [0.0, 0.0, 0.03]
  },
  "bw": {
    contrast: 1.5,
    saturation: 0.0,
    redBalance: 0.33,
    greenBalance: 0.33,
    blueBalance: 0.33,
    shadowsShift: [-0.05, -0.05, -0.05],
    highlightsShift: [0.05, 0.05, 0.05]
  },
  "film": {
    contrast: 0.9,
    saturation: 0.8,
    redBalance: 1.1,
    greenBalance: 1.05,
    blueBalance: 0.9,
    shadowsShift: [0.1, 0.05, 0.0],
    highlightsShift: [-0.02, -0.02, 0.05]
  }
};

// Initialize user presets
let userPresets = {};

// Initialize the Presets component
export function initPresets() {
  console.log('Initializing Presets');
  
  // Initialize preset buttons
  const presetButtons = document.querySelectorAll('.preset-btn');
  
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      presetButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get preset id from button id
      const presetId = btn.id.split('-')[1];
      
      // Apply the preset
      applyPreset(presetId);
    });
  });
  
  // Load any saved user presets
  loadUserPresets();
}

// Apply a preset by its ID
function applyPreset(presetId) {
  // Look for preset in built-in presets first, then user presets
  const preset = builtInPresets[presetId] || userPresets[presetId];
  
  if (!preset) {
    console.warn(`Preset '${presetId}' not found`);
    return;
  }
  
  console.log(`Applying preset: ${presetId}`);
  
  // Store the active preset ID
  appState.activePresetId = presetId;
  
  // Apply preset to basic parameters
  if (!appState.currentLutParams.basic) {
    appState.currentLutParams.basic = {};
  }
  
  // Copy preset values to app state
  appState.currentLutParams.basic.contrast = preset.contrast;
  appState.currentLutParams.basic.saturation = preset.saturation;
  appState.currentLutParams.basic.redBalance = preset.redBalance;
  appState.currentLutParams.basic.greenBalance = preset.greenBalance;
  appState.currentLutParams.basic.blueBalance = preset.blueBalance;
  
  // Set shadows and highlights shift if present
  if (preset.shadowsShift) {
    appState.currentLutParams.basic.shadowsShift = [...preset.shadowsShift];
  }
  
  if (preset.highlightsShift) {
    appState.currentLutParams.basic.highlightsShift = [...preset.highlightsShift];
  }
  
  // If advanced parameters are in the preset, apply them too
  if (preset.advanced) {
    applyAdvancedPreset(preset.advanced);
  }
  
  // Update UI sliders to reflect new values
  updateSlidersFromPreset();
  
  // Apply adjustments to image
  applyImageAdjustments();
}

// Apply advanced preset parameters if present
function applyAdvancedPreset(advancedParams) {
  // Apply Lumetri-style parameters if they exist in the preset
  if (advancedParams.temperature !== undefined && appState.currentLutParams.lumetri) {
    appState.currentLutParams.lumetri.temperature = advancedParams.temperature;
  }
  
  if (advancedParams.tint !== undefined && appState.currentLutParams.lumetri) {
    appState.currentLutParams.lumetri.tint = advancedParams.tint;
  }
  
  // Add more advanced parameters as needed
}

// Update UI sliders to reflect preset values
function updateSlidersFromPreset() {
  const params = appState.currentLutParams.basic;
  
  // Update basic sliders
  updateSlider('contrast', params.contrast);
  updateSlider('saturation', params.saturation);
  updateSlider('red-balance', params.redBalance);
  updateSlider('green-balance', params.greenBalance);
  updateSlider('blue-balance', params.blueBalance);
}

// Helper to update a slider and its value display
function updateSlider(sliderId, value) {
  const slider = document.getElementById(sliderId);
  const valueDisplay = document.getElementById(`${sliderId}-value`);
  
  if (slider) {
    slider.value = value;
  }
  
  if (valueDisplay) {
    valueDisplay.textContent = value.toFixed(2);
  }
}

// Save the current settings as a user preset
export function saveCurrentAsPreset(presetName) {
  if (!presetName) return;
  
  // Create a preset from current settings
  const newPreset = {
    contrast: appState.currentLutParams.basic.contrast,
    saturation: appState.currentLutParams.basic.saturation,
    redBalance: appState.currentLutParams.basic.redBalance,
    greenBalance: appState.currentLutParams.basic.greenBalance,
    blueBalance: appState.currentLutParams.basic.blueBalance
  };
  
  // Add shadows and highlights shift if present
  if (appState.currentLutParams.basic.shadowsShift) {
    newPreset.shadowsShift = [...appState.currentLutParams.basic.shadowsShift];
  }
  
  if (appState.currentLutParams.basic.highlightsShift) {
    newPreset.highlightsShift = [...appState.currentLutParams.basic.highlightsShift];
  }
  
  // Add advanced parameters if in advanced mode
  if (appState.activeMode === 'advanced' && appState.currentLutParams.lumetri) {
    newPreset.advanced = {
      temperature: appState.currentLutParams.lumetri.temperature,
      tint: appState.currentLutParams.lumetri.tint,
      // Add other advanced parameters
    };
  }
  
  // Save to user presets
  userPresets[presetName] = newPreset;
  
  // Save to local storage
  saveUserPresets();
  
  // Add the preset to UI
  addPresetToUI(presetName);
  
  console.log(`Saved preset: ${presetName}`);
}

// Add a user preset to the UI
function addPresetToUI(presetName) {
  // This function would add a new preset button to the UI
  // Implementation would depend on how you want to handle user presets in the UI
  console.log(`Added preset to UI: ${presetName}`);
}

// Save user presets to local storage
function saveUserPresets() {
  try {
    localStorage.setItem('lotsAppUserPresets', JSON.stringify(userPresets));
  } catch (error) {
    console.error('Failed to save user presets:', error);
  }
}

// Load user presets from local storage
function loadUserPresets() {
  try {
    const savedPresets = localStorage.getItem('lotsAppUserPresets');
    if (savedPresets) {
      userPresets = JSON.parse(savedPresets);
      console.log('Loaded user presets:', Object.keys(userPresets));
    }
  } catch (error) {
    console.error('Failed to load user presets:', error);
  }
}

// Export functions and constants
export {
  builtInPresets,
  userPresets,
  applyPreset
};