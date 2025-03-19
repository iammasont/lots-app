// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Initialize the Color Wheels component
export function initColorWheels() {
  console.log('Initializing Color Wheels');
  
  // Initialize color wheel parameters if not present
  if (!appState.currentLutParams.colorWheels) {
    appState.currentLutParams.colorWheels = {
      shadowTint: { r: 128, g: 128, b: 128 }, // Middle gray = no tint
      highlightTint: { r: 128, g: 128, b: 128 }, // Middle gray = no tint
      tintBalance: 0 // Range: -150 to 150
    };
  }
  
  // Get DOM references
  const shadowColorWheel = document.getElementById('shadow-color-wheel');
  const highlightColorWheel = document.getElementById('highlight-color-wheel');
  const tintBalanceSlider = document.getElementById('tint-balance');
  const tintBalanceValue = document.getElementById('tint-balance-value');
  
  // Setup color wheels
  if (shadowColorWheel) {
    setupColorWheel(shadowColorWheel, 'shadowTint');
  }
  
  if (highlightColorWheel) {
    setupColorWheel(highlightColorWheel, 'highlightTint');
  }
  
  // Setup tint balance slider
  if (tintBalanceSlider && tintBalanceValue) {
    // Set initial value
    tintBalanceSlider.value = appState.currentLutParams.colorWheels.tintBalance;
    tintBalanceValue.textContent = appState.currentLutParams.colorWheels.tintBalance.toFixed(1);
    
    // Add event listener
    tintBalanceSlider.addEventListener('input', () => {
      appState.currentLutParams.colorWheels.tintBalance = parseFloat(tintBalanceSlider.value);
      tintBalanceValue.textContent = appState.currentLutParams.colorWheels.tintBalance.toFixed(1);
      applyImageAdjustments();
    });
  }
  
  // Setup reset button
  const resetButton = document.querySelector('.reset-btn[data-section="colorWheels"]');
  if (resetButton) {
    resetButton.addEventListener('click', resetColorWheels);
  }
  
  // Set up section toggle
  setupSectionToggle('color-wheels-toggle', 'color-wheels-section');
}

// Set up a color wheel control
function setupColorWheel(wheel, paramName) {
  if (!wheel) return;
  
  // Clear any existing content
  wheel.innerHTML = '';
  
  // Create a canvas-based color wheel
  const canvas = document.createElement('canvas');
  canvas.width = wheel.clientWidth || 80;
  canvas.height = wheel.clientHeight || 80;
  wheel.appendChild(canvas);
  
  // Use CSS-based color wheel instead of canvas
  wheel.style.background = "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)";
  wheel.style.backgroundImage = "radial-gradient(circle at center, white 0%, rgba(255, 255, 255, 0) 70%), conic-gradient(red, yellow, lime, cyan, blue, magenta, red)";
  
  // Add indicator for current position
  const indicator = document.createElement('div');
  indicator.className = 'wheel-indicator';
  wheel.appendChild(indicator);
  
  // Get current tint value
  const tintValue = appState.currentLutParams.colorWheels[paramName];
  
  // Position indicator based on current tint value
  const centerX = wheel.clientWidth / 2;
  const centerY = wheel.clientHeight / 2;
  const maxDistance = Math.min(centerX, centerY) - 2;
  
  // Calculate position from tint values
  // Convert from 0-255 range to -1 to 1 range (128 is center/neutral)
  const normalizedR = (tintValue.r - 128) / 128;
  const normalizedG = (tintValue.g - 128) / 128;
  const normalizedB = (tintValue.b - 128) / 128;
  
  // Estimate hue and saturation from RGB (simplified)
  let saturation = Math.sqrt(normalizedR*normalizedR + normalizedG*normalizedG + normalizedB*normalizedB);
  saturation = Math.min(1, saturation); // Clamp to 1
  
  // This is a simplified conversion - a complete RGB to HSV would be more accurate
  let hue = 0;
  if (saturation > 0) {
    // Rough estimation of hue angle based on RGB values
    hue = Math.atan2(normalizedG, normalizedR);
    if (normalizedB > Math.max(normalizedR, normalizedG)) {
      hue = Math.PI + Math.atan2(normalizedB, -normalizedR);
    }
    // Convert to 0-2PI range
    if (hue < 0) hue += 2 * Math.PI;
  }
  
  // Calculate x,y position on wheel
  const x = Math.cos(hue) * saturation * maxDistance;
  const y = Math.sin(hue) * saturation * maxDistance;
  
  // Position indicator
  setWheelIndicatorPosition(wheel, indicator, x, y);
  
  // Track if mouse is down
  let isMouseDown = false;
  
  // Handle mouse interactions
  wheel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    updateWheelFromEvent(e);
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    updateWheelFromEvent(e);
  });
  
  document.addEventListener('mouseup', () => {
    isMouseDown = false;
  });
  
  wheel.addEventListener('click', updateWheelFromEvent);
  
  function updateWheelFromEvent(e) {
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Get coordinates relative to center
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    // Calculate distance from center (for saturation)
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.min(centerX, centerY) - 2;
    
    // Limit to wheel boundary
    if (distance <= maxDistance) {
      // Update indicator position
      setWheelIndicatorPosition(wheel, indicator, x, y);
      
      // Calculate angle (for hue)
      let angle = Math.atan2(y, x);
      if (angle < 0) angle += 2 * Math.PI;
      
      // Normalize distance to 0-1
      const normalizedDistance = distance / maxDistance;
      
      // Calculate color based on position
      const hue = angle / (2 * Math.PI);
      const saturation = normalizedDistance;
      const rgb = hsvToRgb(hue, saturation, 1.0);
      
      // Map RGB (0-255) to tint adjustments (64-192, where 128 is neutral)
      // We use a narrower range to avoid extreme adjustments
      const mappedR = Math.round(128 + (rgb.r - 128) * saturation);
      const mappedG = Math.round(128 + (rgb.g - 128) * saturation);
      const mappedB = Math.round(128 + (rgb.b - 128) * saturation);
      
      // Update the parameter
      appState.currentLutParams.colorWheels[paramName] = { r: mappedR, g: mappedG, b: mappedB };
      
      // Apply the adjustment to the image
      applyImageAdjustments();
    }
  }
}

// Reset color wheels to default values
function resetColorWheels() {
  // Reset to neutral tints
  appState.currentLutParams.colorWheels.shadowTint = { r: 128, g: 128, b: 128 };
  appState.currentLutParams.colorWheels.highlightTint = { r: 128, g: 128, b: 128 };
  appState.currentLutParams.colorWheels.tintBalance = 0;
  
  // Update UI
  const tintBalanceSlider = document.getElementById('tint-balance');
  const tintBalanceValue = document.getElementById('tint-balance-value');
  
  if (tintBalanceSlider) tintBalanceSlider.value = 0;
  if (tintBalanceValue) tintBalanceValue.textContent = '0.0';
  
  // Reset wheel indicators
  const shadowColorWheel = document.getElementById('shadow-color-wheel');
  const highlightColorWheel = document.getElementById('highlight-color-wheel');
  
  if (shadowColorWheel) {
    const shadowIndicator = shadowColorWheel.querySelector('.wheel-indicator');
    if (shadowIndicator) {
      setWheelIndicatorPosition(shadowColorWheel, shadowIndicator, 0, 0);
    }
  }
  
  if (highlightColorWheel) {
    const highlightIndicator = highlightColorWheel.querySelector('.wheel-indicator');
    if (highlightIndicator) {
      setWheelIndicatorPosition(highlightColorWheel, highlightIndicator, 0, 0);
    }
  }
  
  // Apply changes to image
  applyImageAdjustments();
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

// Helper for setting wheel indicator position
function setWheelIndicatorPosition(wheel, indicator, x, y) {
  const centerX = wheel.clientWidth / 2;
  const centerY = wheel.clientHeight / 2;
  
  indicator.style.left = `${centerX + x}px`;
  indicator.style.top = `${centerY + y}px`;
}

// Convert HSV (0-1 ranges) to RGB (0-255)
function hsvToRgb(h, s, v) {
  let r, g, b;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Apply color wheel tinting to an image
export function applyColorWheelAdjustments(imageData) {
  const params = appState.currentLutParams.colorWheels;
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Get RGB values and normalize to 0-1
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    
    // Apply color wheels tinting
    const result = applyColorWheels(r, g, b, params.shadowTint, params.highlightTint, params.tintBalance / 150);
    
    // Clamp values to valid range
    data[i] = Math.round(Math.min(1.0, Math.max(0.0, result.r)) * 255);
    data[i + 1] = Math.round(Math.min(1.0, Math.max(0.0, result.g)) * 255);
    data[i + 2] = Math.round(Math.min(1.0, Math.max(0.0, result.b)) * 255);
    // Alpha channel (data[i + 3]) remains unchanged
  }
  
  return imageData;
}

// Apply color wheels (shadow and highlight tinting)
function applyColorWheels(r, g, b, shadowTint, highlightTint, tintBalance) {
  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Calculate shadow and highlight influence based on luminance
  let shadowInfluence = Math.pow(1 - luminance, 2);
  let highlightInfluence = Math.pow(luminance, 2);
  
  // Apply tint balance to adjust the crossover point
  if (tintBalance > 0) {
    // Shift influence towards highlights
    shadowInfluence *= (1 - tintBalance);
    highlightInfluence = highlightInfluence * (1 - tintBalance) + tintBalance;
  } else if (tintBalance < 0) {
    // Shift influence towards shadows
    highlightInfluence *= (1 + tintBalance);
    shadowInfluence = shadowInfluence * (1 + tintBalance) - tintBalance;
  }
  
  // Convert shadow tint from 0-255 to -1 to 1 range (128 is neutral)
  const shadowR = (shadowTint.r - 128) / 128;
  const shadowG = (shadowTint.g - 128) / 128;
  const shadowB = (shadowTint.b - 128) / 128;
  
  // Convert highlight tint from 0-255 to -1 to 1 range (128 is neutral)
  const highlightR = (highlightTint.r - 128) / 128;
  const highlightG = (highlightTint.g - 128) / 128;
  const highlightB = (highlightTint.b - 128) / 128;
  
  // Apply shadow tint
  r += shadowR * shadowInfluence * 0.5;
  g += shadowG * shadowInfluence * 0.5;
  b += shadowB * shadowInfluence * 0.5;
  
  // Apply highlight tint
  r += highlightR * highlightInfluence * 0.5;
  g += highlightG * highlightInfluence * 0.5;
  b += highlightB * highlightInfluence * 0.5;
  
  return { r, g, b };
}

// Export functions for use in other modules
export {
  hsvToRgb,
  applyColorWheels
};