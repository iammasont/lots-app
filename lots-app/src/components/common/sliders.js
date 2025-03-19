// Import app state and functions if needed
import { appState } from '../../app.js';

// Function to set up a generic slider control
export function setupSlider(slider, valueDisplay, params, category, paramName, callback = null) {
  if (!slider || !valueDisplay || !params || !params[category]) return;
  
  // Set initial value from parameters
  slider.value = params[category][paramName];
  
  // Format value display depending on the type of parameter
  updateValueDisplay(valueDisplay, params[category][paramName], paramName);
  
  // Add event listener
  slider.addEventListener('input', () => {
    // Update parameter in state
    params[category][paramName] = parseFloat(slider.value);
    
    // Update display value
    updateValueDisplay(valueDisplay, params[category][paramName], paramName);
    
    // Call callback if provided
    if (callback && typeof callback === 'function') {
      callback();
    }
  });
}

// Function to update value display with formatting
function updateValueDisplay(valueDisplay, value, paramName) {
  // Format based on parameter type
  if (paramName === 'exposure') {
    // Exposure shown with + or - sign
    valueDisplay.textContent = value >= 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
  } else if (['temperature', 'tint', 'contrast', 'highlights', 'shadows', 'whites', 'blacks', 'vibrance', 'tintBalance'].includes(paramName)) {
    // Integer values shown with single decimal
    valueDisplay.textContent = value.toFixed(1);
  } else if (['redBalance', 'greenBalance', 'blueBalance', 'saturation', 'contrast'].includes(paramName)) {
    // Ratio values shown with two decimals
    valueDisplay.textContent = value.toFixed(2);
  } else {
    // Default formatting
    valueDisplay.textContent = value.toFixed(1);
  }
}

// Function to create and set up a range slider dynamically
export function createSlider(container, options) {
  if (!container) return null;
  
  const { 
    id,
    label, 
    min, 
    max, 
    step, 
    initialValue, 
    category, 
    paramName, 
    callback 
  } = options;
  
  // Create the slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';
  
  // Create label
  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', id);
  labelElement.textContent = label;
  
  // Create value display
  const valueDisplay = document.createElement('span');
  valueDisplay.id = `${id}-value`;
  valueDisplay.className = 'parameter-value';
  updateValueDisplay(valueDisplay, initialValue, paramName);
  
  // Add value display to label
  labelElement.appendChild(valueDisplay);
  
  // Create slider
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
  
  // Set up the slider
  if (category && paramName) {
    setupSlider(slider, valueDisplay, appState.currentLutParams, category, paramName, callback);
  }
  
  return {
    container: sliderContainer,
    slider,
    valueDisplay
  };
}

// Reset a slider to its default value
export function resetSlider(slider, valueDisplay, defaultValue, paramName, params, category, callback = null) {
  if (!slider || !valueDisplay || !params || !params[category]) return;
  
  // Set value on slider
  slider.value = defaultValue;
  
  // Update parameter in state
  params[category][paramName] = defaultValue;
  
  // Update display
  updateValueDisplay(valueDisplay, defaultValue, paramName);
  
  // Call callback if provided
  if (callback && typeof callback === 'function') {
    callback();
  }
}

// Export utility functions
export {
  updateValueDisplay
};