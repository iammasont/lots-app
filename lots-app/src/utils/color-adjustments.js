// src/utils/color-adjustments.js

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
  
  // Apply vibrance and saturation adjustments
  export function applyVibranceAndSaturation(r, g, b, vibrance, saturation) {
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    // Calculate saturation level to determine vibrance effect
    const maxChannel = Math.max(r, g, b);
    const minChannel = Math.min(r, g, b);
    const saturationLevel = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
    
    // Apply vibrance (affects less saturated colors more)
    const vibranceEffect = vibrance * (1 - saturationLevel);
    
    // Combine vibrance and regular saturation
    const totalSaturationFactor = saturation + vibranceEffect;
    
    // Apply the combined saturation
    r = luminance + totalSaturationFactor * (r - luminance);
    g = luminance + totalSaturationFactor * (g - luminance);
    b = luminance + totalSaturationFactor * (b - luminance);
    
    return { r, g, b };
  }