// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Initialize the Basic Corrections component
export function initBasicCorrections() {
  console.log('Initializing Basic Corrections');
  
  // Initialize basic correction parameters if not present
  if (!appState.currentLutParams.basic) {
    appState.currentLutParams.basic = {
      contrast: 1.2,
      saturation: 1.15,
      redBalance: 1.05,
      greenBalance: 0.95,
      blueBalance: 1.1
    };
  }
  
  // Get slider references
  const contrastSlider = document.getElementById('contrast');
  const saturationSlider = document.getElementById('saturation');
  const redBalanceSlider = document.getElementById('red-balance');
  const greenBalanceSlider = document.getElementById('green-balance');
  const blueBalanceSlider = document.getElementById('blue-balance');
  
  // Display value references
  const contrastValue = document.getElementById('contrast-value');
  const saturationValue = document.getElementById('saturation-value');
  const redBalanceValue = document.getElementById('red-balance-value');
  const greenBalanceValue = document.getElementById('green-balance-value');
  const blueBalanceValue = document.getElementById('blue-balance-value');
  
  // Set up event listeners for sliders
  setupSlider(contrastSlider, contrastValue, 'contrast');
  setupSlider(saturationSlider, saturationValue, 'saturation');
  setupSlider(redBalanceSlider, redBalanceValue, 'redBalance');
  setupSlider(greenBalanceSlider, greenBalanceValue, 'greenBalance');
  setupSlider(blueBalanceSlider, blueBalanceValue, 'blueBalance');
  
  // Initialize LUT title and size controls
  initTitleAndSizeControls();
}

// Set up a slider control with its value display
function setupSlider(slider, valueDisplay, paramName) {
  if (!slider || !valueDisplay) return;
  
  // Set initial value from app state
  slider.value = appState.currentLutParams.basic[paramName];
  valueDisplay.textContent = appState.currentLutParams.basic[paramName].toFixed(2);
  
  // Add event listener
  slider.addEventListener('input', () => {
    // Update parameter in app state
    appState.currentLutParams.basic[paramName] = parseFloat(slider.value);
    
    // Update display value
    valueDisplay.textContent = appState.currentLutParams.basic[paramName].toFixed(2);
    
    // Apply adjustments to image
    applyImageAdjustments();
  });
}

// Initialize title and LUT size controls
function initTitleAndSizeControls() {
  const titleInput = document.getElementById('title');
  const lutSizeSelect = document.getElementById('lut-size');
  
  if (titleInput) {
    // Set initial value
    titleInput.value = appState.currentLutParams.title || "Signature Look";
    
    // Add event listener
    titleInput.addEventListener('input', () => {
      appState.currentLutParams.title = titleInput.value;
    });
  }
  
  if (lutSizeSelect) {
    // Set initial value
    lutSizeSelect.value = appState.currentLutParams.size || "32";
    
    // Add event listener
    lutSizeSelect.addEventListener('change', () => {
      appState.currentLutParams.size = parseInt(lutSizeSelect.value);
    });
  }
}

// Apply the basic corrections to an image
export function applyBasicCorrections(imageData) {
  const params = appState.currentLutParams.basic;
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Get RGB values (0-255) and normalize to 0-1
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    
    // Apply contrast
    r = applyContrast(r, params.contrast);
    g = applyContrast(g, params.contrast);
    b = applyContrast(b, params.contrast);
    
    // Apply color balance
    r *= params.redBalance;
    g *= params.greenBalance;
    b *= params.blueBalance;
    
    // Apply saturation
    if (params.saturation !== 1.0) {
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r = luminance + params.saturation * (r - luminance);
      g = luminance + params.saturation * (g - luminance);
      b = luminance + params.saturation * (b - luminance);
    }
    
    // Apply shadow/highlight adjustments (if defined)
    if (params.shadowsShift && params.highlightsShift) {
      let shadowEffect = Math.pow(1 - Math.max(r, Math.max(g, b)), 2);
      let highlightEffect = Math.pow(Math.max(r, Math.max(g, b)), 2);
      
      r += params.shadowsShift[0] * shadowEffect + params.highlightsShift[0] * highlightEffect;
      g += params.shadowsShift[1] * shadowEffect + params.highlightsShift[1] * highlightEffect;
      b += params.shadowsShift[2] * shadowEffect + params.highlightsShift[2] * highlightEffect;
    }
    
    // Clamp values to valid range (0-1)
    r = Math.min(1.0, Math.max(0.0, r));
    g = Math.min(1.0, Math.max(0.0, g));
    b = Math.min(1.0, Math.max(0.0, b));
    
    // Convert back to 0-255 range and update pixel data
    data[i] = Math.round(r * 255);
    data[i + 1] = Math.round(g * 255);
    data[i + 2] = Math.round(b * 255);
    // Alpha channel (data[i + 3]) remains unchanged
  }
  
  return imageData;
}

// Helper function to apply contrast
function applyContrast(value, contrast) {
  return 0.5 + (value - 0.5) * contrast;
}

// Export functions and constants
export {
    applyContrast
};