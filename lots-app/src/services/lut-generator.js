// services/lut-generator.js
// Import app state and utilities
import { appState } from '../app.js';
import { applyContrast } from '../components/basic-corrections/basic-corrections.js';
import { applyFadedFilm } from '../components/creative/creative-effects.js';
import { applyColorWheels } from '../components/color-wheels/color-wheels.js';
import { interpolateCurve, isLinearCurve } from '../components/curves/curves-panel.js';

// Initialize the LUT generator service
export function initLutGenerator() {
  console.log('Initializing LUT Generator Service');
  
  // Make the generator available globally
  window.generateCubeLUT = generateCubeLUT;
}

// Generate a CUBE format LUT based on current parameters
export function generateCubeLUT() {
  const lutParams = appState.currentLutParams;
  const size = lutParams.size || 32;
  let content = '';
  
  // Header
  content += `# ${lutParams.title}\n`;
  content += '# Generated by LOTS App\n\n';
  content += `LUT_3D_SIZE ${size}\n`;
  content += 'DOMAIN_MIN 0.0 0.0 0.0\n';
  content += 'DOMAIN_MAX 1.0 1.0 1.0\n\n';
  
  // Generate the 3D LUT entries
  const step = 1.0 / (size - 1);
  
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        // Calculate normalized RGB values (0.0 to 1.0)
        let redValue = r * step;
        let greenValue = g * step;
        let blueValue = b * step;
        
        // Apply adjustments based on the current mode
        if (appState.activeMode === 'basic') {
          const result = applyBasicLutAdjustments(redValue, greenValue, blueValue);
          redValue = result.r;
          greenValue = result.g;
          blueValue = result.b;
        } else {
          const result = applyAdvancedLutAdjustments(redValue, greenValue, blueValue);
          redValue = result.r;
          greenValue = result.g;
          blueValue = result.b;
        }
        
        // Clamp values to valid range
        redValue = Math.min(1.0, Math.max(0.0, redValue));
        greenValue = Math.min(1.0, Math.max(0.0, greenValue));
        blueValue = Math.min(1.0, Math.max(0.0, blueValue));
        
        // Add the entry to the LUT
        content += `${redValue.toFixed(6)} ${greenValue.toFixed(6)} ${blueValue.toFixed(6)}\n`;
      }
    }
  }
  
  return content;
}

// Apply basic mode adjustments to a single color point
export function applyBasicLutAdjustments(r, g, b) {
  const params = appState.currentLutParams.basic || {};
  
  // Apply contrast
  r = applyContrast(r, params.contrast || 1.0);
  g = applyContrast(g, params.contrast || 1.0);
  b = applyContrast(b, params.contrast || 1.0);
  
  // Apply color balance
  r *= params.redBalance || 1.0;
  g *= params.greenBalance || 1.0;
  b *= params.blueBalance || 1.0;
  
  // Apply shadow/highlight adjustments
  if (params.shadowsShift && params.highlightsShift) {
    let shadowEffect = Math.pow(1 - Math.max(r, Math.max(g, b)), 2);
    let highlightEffect = Math.pow(Math.max(r, Math.max(g, b)), 2);
    
    r += params.shadowsShift[0] * shadowEffect + params.highlightsShift[0] * highlightEffect;
    g += params.shadowsShift[1] * shadowEffect + params.highlightsShift[1] * highlightEffect;
    b += params.shadowsShift[2] * shadowEffect + params.highlightsShift[2] * highlightEffect;
  }
  
  // Apply saturation
  if (params.saturation !== undefined && params.saturation !== 1.0) {
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = luminance + params.saturation * (r - luminance);
    g = luminance + params.saturation * (g - luminance);
    b = luminance + params.saturation * (b - luminance);
  }
  
  return { r, g, b };
}

// Apply advanced mode adjustments to a single color point
export function applyAdvancedLutAdjustments(r, g, b) {
  const params = appState.currentLutParams;
  
  // 1. Apply temperature and tint
  if (params.lumetri && (params.lumetri.temperature !== 0 || params.lumetri.tint !== 0)) {
    const tempResult = applyTemperatureAndTint(
      r, g, b, 
      params.lumetri.temperature / 150, 
      params.lumetri.tint / 150
    );
    r = tempResult.r;
    g = tempResult.g;
    b = tempResult.b;
  }
  
  // 2. Apply exposure and contrast
  if (params.lumetri) {
    // Apply exposure
    if (params.lumetri.exposure !== 0) {
      const exposureFactor = Math.pow(2, params.lumetri.exposure / 150);
      r *= exposureFactor;
      g *= exposureFactor;
      b *= exposureFactor;
    }
    
    // Apply contrast
    if (params.lumetri.contrast !== 0) {
      const contrastValue = 1 + (params.lumetri.contrast / 150);
      r = applyContrast(r, contrastValue);
      g = applyContrast(g, contrastValue);
      b = applyContrast(b, contrastValue);
    }
  }
  
  // 3. Apply highlights, shadows, whites, blacks adjustments
  if (params.lumetri) {
    const toneResult = applyToneAdjustments(
      r, g, b,
      params.lumetri.highlights / 150,
      params.lumetri.shadows / 150,
      params.lumetri.whites / 150,
      params.lumetri.blacks / 150
    );
    r = toneResult.r;
    g = toneResult.g;
    b = toneResult.b;
  }
  
  // 4. Apply color wheels tinting
  if (params.colorWheels) {
    const shadowTint = params.colorWheels.shadowTint;
    const highlightTint = params.colorWheels.highlightTint;
    const tintBalance = params.colorWheels.tintBalance / 150;
    
    if (shadowTint.r !== 128 || shadowTint.g !== 128 || shadowTint.b !== 128 ||
        highlightTint.r !== 128 || highlightTint.g !== 128 || highlightTint.b !== 128 ||
        tintBalance !== 0) {
      
      const colorWheelResult = applyColorWheels(r, g, b, shadowTint, highlightTint, tintBalance);
      r = colorWheelResult.r;
      g = colorWheelResult.g;
      b = colorWheelResult.b;
    }
  }
  
  // 5. Apply curves
  if (params.curves) {
    // Apply RGB curve first
    const rgbPoints = params.curves.rgb;
    if (rgbPoints) {
      r = interpolateCurve(rgbPoints, r);
      g = interpolateCurve(rgbPoints, g);
      b = interpolateCurve(rgbPoints, b);
    }
    
    // Apply individual channel curves if not linear
    if (params.curves.red && !isLinearCurve(params.curves.red)) {
      r = interpolateCurve(params.curves.red, r);
    }
    
    if (params.curves.green && !isLinearCurve(params.curves.green)) {
      g = interpolateCurve(params.curves.green, g);
    }
    
    if (params.curves.blue && !isLinearCurve(params.curves.blue)) {
      b = interpolateCurve(params.curves.blue, b);
    }
  }
  
  // 6. Apply creative effects (vibrance, saturation, faded film)
  if (params.creative) {
    // Apply vibrance
    if (params.creative.vibrance !== 0) {
      const vibranceAmount = params.creative.vibrance / 150;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);
      const saturationLevel = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
      const vibranceEffect = vibranceAmount * (1 - saturationLevel);
      
      r = luminance + (r - luminance) * (1 + vibranceEffect);
      g = luminance + (g - luminance) * (1 + vibranceEffect);
      b = luminance + (b - luminance) * (1 + vibranceEffect);
    }
    
    // Apply faded film effect
    if (params.creative.fadedFilm > 0) {
      const fadedResult = applyFadedFilm(r, g, b, params.creative.fadedFilm / 100);
      r = fadedResult.r;
      g = fadedResult.g;
      b = fadedResult.b;
    }
  }
  
  return { r, g, b };
}

// Apply temperature and tint adjustments
export function applyTemperatureAndTint(r, g, b, temperature, tint) {
  // Temperature: blue-yellow shift
  // Positive = cooler (more blue), Negative = warmer (more yellow)
  const tempFactor = temperature;
  
  // Tint: green-magenta shift
  // Positive = more magenta, Negative = more green
  const tintFactor = tint;
  
  // Apply temperature (blue-yellow balance)
  if (tempFactor < 0) {
    // Warmer: boost red/green, reduce blue
    r = r * (1 - tempFactor * 0.4);
    g = g * (1 - tempFactor * 0.2);
    b = b * (1 + tempFactor * 0.6);
  } else if (tempFactor > 0) {
    // Cooler: boost blue, reduce red/green
    r = r * (1 - tempFactor * 0.4);
    g = g * (1 - tempFactor * 0.2);
    b = b * (1 + tempFactor * 0.6);
  }
  
  // Apply tint (green-magenta balance)
  if (tintFactor > 0) {
    // More magenta: boost red and blue, reduce green
    r = r * (1 + tintFactor * 0.3);
    g = g * (1 - tintFactor * 0.3);
    b = b * (1 + tintFactor * 0.3);
  } else if (tintFactor < 0) {
    // More green: boost green, reduce red and blue
    r = r * (1 + tintFactor * 0.3);
    g = g * (1 - tintFactor * 0.3);
    b = b * (1 + tintFactor * 0.3);
  }
  
  return { r, g, b };
}

// Apply tone adjustments (highlights, shadows, whites, blacks)
export function applyToneAdjustments(r, g, b, highlights, shadows, whites, blacks) {
  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Apply highlights adjustment (affects brighter areas)
  let highlightEffect = Math.pow(luminance, 2) * highlights;
  
  // Apply shadows adjustment (affects darker areas)
  let shadowEffect = Math.pow(1 - luminance, 2) * shadows;
  
  // Apply whites adjustment (affects the brightest areas)
  let whitesEffect = Math.pow(luminance, 4) * whites;
  
  // Apply blacks adjustment (affects the darkest areas)
  let blacksEffect = Math.pow(1 - luminance, 4) * blacks;
  
  // Combine all adjustments
  const totalEffect = highlightEffect + shadowEffect + whitesEffect + blacksEffect;
  
  // Apply the combined effect to RGB channels
  r += totalEffect;
  g += totalEffect;
  b += totalEffect;
  
  return { r, g, b };
}