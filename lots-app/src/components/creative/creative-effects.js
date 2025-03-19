// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Initialize the Creative Effects component
export function initCreativeEffects() {
  console.log('Initializing Creative Effects');
  
  // Initialize creative effect parameters if not present
  if (!appState.currentLutParams.creative) {
    appState.currentLutParams.creative = {
      fadedFilm: 0,
      vibrance: 0
    };
  }
  
  // Get slider references
  const fadedFilmSlider = document.getElementById('faded-film');
  const vibranceSlider = document.getElementById('vibrance');
  
  // Display value references
  const fadedFilmValue = document.getElementById('faded-film-value');
  const vibranceValue = document.getElementById('vibrance-value');
  
  // Set up event listeners for sliders
  setupSlider(fadedFilmSlider, fadedFilmValue, 'fadedFilm');
  setupSlider(vibranceSlider, vibranceValue, 'vibrance');
  
  // Set up section toggle
  setupSectionToggle('creative-toggle', 'creative-section');
}

// Set up a slider control with its value display
function setupSlider(slider, valueDisplay, paramName) {
  if (!slider || !valueDisplay) return;
  
  // Set initial value from app state
  slider.value = appState.currentLutParams.creative[paramName];
  valueDisplay.textContent = appState.currentLutParams.creative[paramName].toFixed(1);
  
  // Add event listener
  slider.addEventListener('input', () => {
    // Update parameter in app state
    appState.currentLutParams.creative[paramName] = parseFloat(slider.value);
    
    // Update display value
    valueDisplay.textContent = appState.currentLutParams.creative[paramName].toFixed(1);
    
    // Apply adjustments to image
    applyImageAdjustments();
  });
}

// Set up section toggle for expandable sections
function setupSectionToggle(toggleId, sectionId) {
  const toggle = document.getElementById(toggleId);
  const section = document.getElementById(sectionId);
  
  if (toggle && section) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('expanded');
      section.classList.toggle('expanded');
    });
  }
}

// Apply creative effects to image data
export function applyCreativeEffects(imageData) {
  const params = appState.currentLutParams.creative;
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Get RGB values (0-255) and normalize to 0-1
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    
    // Apply vibrance if enabled
    if (params.vibrance !== 0) {
      const result = applyVibrance(r, g, b, params.vibrance / 150);
      r = result.r;
      g = result.g;
      b = result.b;
    }
    
    // Apply faded film effect if enabled
    if (params.fadedFilm > 0) {
      const result = applyFadedFilm(r, g, b, params.fadedFilm / 100);
      r = result.r;
      g = result.g;
      b = result.b;
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

// Apply vibrance adjustment
function applyVibrance(r, g, b, amount) {
  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Calculate saturation level to determine vibrance effect
  const maxChannel = Math.max(r, g, b);
  const minChannel = Math.min(r, g, b);
  const saturationLevel = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
  
  // Apply vibrance (affects less saturated colors more)
  const vibranceEffect = amount * (1 - saturationLevel);
  
  // Apply the effect to each channel
  r = luminance + (r - luminance) * (1 + vibranceEffect);
  g = luminance + (g - luminance) * (1 + vibranceEffect);
  b = luminance + (b - luminance) * (1 + vibranceEffect);
  
  return { r, g, b };
}

// Apply faded film effect
function applyFadedFilm(r, g, b, amount) {
  // Faded film effect reduces contrast and slightly shifts the black point
  const fadeAmount = amount * 0.5; // Adjust the strength
  
  // Reduce contrast
  r = r * (1 - fadeAmount) + 0.5 * fadeAmount;
  g = g * (1 - fadeAmount) + 0.5 * fadeAmount;
  b = b * (1 - fadeAmount) + 0.5 * fadeAmount;
  
  // Add a slight shift to the black point
  const blackShift = amount * 0.1;
  r += blackShift;
  g += blackShift;
  b += blackShift;
  
  return { r, g, b };
}

// Export functions and utilities
export {
  applyVibrance,
  applyFadedFilm
};