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
  
  // Initialize advanced parameters if not present
  if (!appState.currentLutParams.lumetri) {
    appState.currentLutParams.lumetri = {
      exposure: 0,
      contrast: 0,
      highlights: 0,
      shadows: 0,
      whites: 0,
      blacks: 0,
      temperature: 0,
      tint: 0
    };
  }
  
  // Set up basic mode controls
  setupBasicControls();
  
  // Initialize LUT title and size controls
  initTitleAndSizeControls();
  
  console.log('Basic Corrections initialized successfully');
}

// Set up basic mode slider controls
function setupBasicControls() {
  console.log('Setting up basic controls');
  
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
  
  // Report missing elements
  if (!contrastSlider) console.warn('Contrast slider not found');
  if (!saturationSlider) console.warn('Saturation slider not found');
  if (!redBalanceSlider) console.warn('Red balance slider not found');
  if (!greenBalanceSlider) console.warn('Green balance slider not found');
  if (!blueBalanceSlider) console.warn('Blue balance slider not found');
  
  // Set up event listeners for sliders
  setupSlider(contrastSlider, contrastValue, 'contrast');
  setupSlider(saturationSlider, saturationValue, 'saturation');
  setupSlider(redBalanceSlider, redBalanceValue, 'redBalance');
  setupSlider(greenBalanceSlider, greenBalanceValue, 'greenBalance');
  setupSlider(blueBalanceSlider, blueBalanceValue, 'blueBalance');
  
  console.log('Basic controls setup complete');
}

// Set up advanced mode controls
export function setupAdvancedControls() {
  console.log('Setting up advanced mode controls...');
  
  const basicCorrectionSection = document.getElementById('basic-correction-section');
  if (!basicCorrectionSection) {
    console.error('Basic correction section element not found in DOM!');
    return;
  }
  
  console.log('Clearing existing content in basic correction section');
  // Clear any existing content
  basicCorrectionSection.innerHTML = '';
  
  // Create advanced basic correction controls
  console.log('Creating advanced sliders...');
  
  // Create exposure control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'exposure-advanced',
    label: 'Exposure',
    min: -5,
    max: 5,
    step: 0.1,
    initialValue: appState.currentLutParams.lumetri.exposure || 0,
    paramName: 'exposure'
  });
  
  // Create contrast control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'contrast-advanced',
    label: 'Contrast',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.contrast || 0,
    paramName: 'contrast'
  });
  
  // Create highlights control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'highlights-advanced',
    label: 'Highlights',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.highlights || 0,
    paramName: 'highlights'
  });
  
  // Create shadows control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'shadows-advanced',
    label: 'Shadows',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.shadows || 0,
    paramName: 'shadows'
  });
  
  // Create whites control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'whites-advanced',
    label: 'Whites',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.whites || 0,
    paramName: 'whites'
  });
  
  // Create blacks control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'blacks-advanced',
    label: 'Blacks',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.blacks || 0,
    paramName: 'blacks'
  });
  
  // Create temperature control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'temperature-advanced',
    label: 'Temperature',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.temperature || 0,
    paramName: 'temperature'
  });
  
  // Create tint control
  createAdvancedSlider(basicCorrectionSection, {
    id: 'tint-advanced',
    label: 'Tint',
    min: -100,
    max: 100,
    step: 1,
    initialValue: appState.currentLutParams.lumetri.tint || 0,
    paramName: 'tint'
  });
  
  console.log('Adding reset button');
  // Add reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.className = 'reset-btn';
  resetButton.addEventListener('click', resetAdvancedControls);
  basicCorrectionSection.appendChild(resetButton);
  
  console.log('Advanced controls setup complete');
}

// Helper function to create advanced slider controls
function createAdvancedSlider(container, options) {
  if (!container) {
    console.error('Cannot create slider: container is null');
    return;
  }
  
  const { id, label, min, max, step, initialValue, paramName } = options;
  console.log(`Creating advanced slider: ${id} for ${paramName}`);
  
  // Create container for the slider
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'control-group';
  
  // Create label element
  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', id);
  labelElement.textContent = label + ' ';
  
  // Create value display
  const valueDisplay = document.createElement('span');
  valueDisplay.id = `${id}-value`;
  valueDisplay.className = 'parameter-value';
  valueDisplay.textContent = initialValue.toFixed(1);
  
  // Append value display to label
  labelElement.appendChild(valueDisplay);
  
  // Create slider input
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = id;
  slider.min = min;
  slider.max = max;
  slider.step = step;
  slider.value = initialValue;
  
  // Add elements to container
  sliderContainer.appendChild(labelElement);
  sliderContainer.appendChild(slider);
  container.appendChild(sliderContainer);
  
  // Set up event listener
  slider.addEventListener('input', () => {
    // Ensure lumetri object exists
    if (!appState.currentLutParams.lumetri) {
      appState.currentLutParams.lumetri = {};
    }
    
    // Update parameter value
    appState.currentLutParams.lumetri[paramName] = parseFloat(slider.value);
    
    // Update display value
    valueDisplay.textContent = parseFloat(slider.value).toFixed(1);
    
    console.log(`Advanced parameter updated: ${paramName} = ${slider.value}`);
    
    // Apply changes to image
    applyImageAdjustments();
  });
  
  return { slider, valueDisplay };
}

// Reset all advanced controls to their default values
function resetAdvancedControls() {
  console.log('Resetting advanced controls to defaults');
  
  // Reset all lumetri parameters to default values
  appState.currentLutParams.lumetri = {
    exposure: 0,
    contrast: 0,
    highlights: 0,
    shadows: 0,
    whites: 0,
    blacks: 0,
    temperature: 0,
    tint: 0
  };
  
  // Update all slider controls to match reset values
  const sliders = document.querySelectorAll('#basic-correction-section input[type="range"]');
  sliders.forEach(slider => {
    const paramName = slider.id.split('-')[0]; // Extract parameter name from id
    slider.value = appState.currentLutParams.lumetri[paramName] || 0;
    
    // Update value display
    const valueDisplay = document.getElementById(`${slider.id}-value`);
    if (valueDisplay) {
      valueDisplay.textContent = '0.0';
    }
  });
  
  // Apply changes
  applyImageAdjustments();
}

// Set up a slider control with its value display for basic mode
function setupSlider(slider, valueDisplay, paramName) {
  if (!slider || !valueDisplay) {
    console.warn(`Cannot set up slider: ${paramName} - missing elements`);
    return;
  }
  
  // Set initial value from app state
  slider.value = appState.currentLutParams.basic[paramName];
  valueDisplay.textContent = appState.currentLutParams.basic[paramName].toFixed(2);
  
  // Add event listener
  slider.addEventListener('input', () => {
    // Update parameter in app state
    appState.currentLutParams.basic[paramName] = parseFloat(slider.value);
    
    // Update display value
    valueDisplay.textContent = appState.currentLutParams.basic[paramName].toFixed(2);
    
    console.log(`Basic parameter updated: ${paramName} = ${slider.value}`);
    
    // Apply adjustments to image
    applyImageAdjustments();
  });
}

// Initialize title and LUT size controls
function initTitleAndSizeControls() {
  console.log('Initializing title and LUT size controls');
  
  const titleInput = document.getElementById('title');
  const lutSizeSelect = document.getElementById('lut-size');
  
  if (!titleInput) console.warn('Title input not found');
  if (!lutSizeSelect) console.warn('LUT size select not found');
  
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