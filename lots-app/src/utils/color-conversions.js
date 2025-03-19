// Color conversion utility functions

// Convert RGB to HSL
export function rgbToHsl(r, g, b) {
    // Normalize RGB values to 0-1 range if they're in 0-255
    r = (r > 1) ? r / 255 : r;
    g = (g > 1) ? g / 255 : g;
    b = (b > 1) ? b / 255 : b;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      // Achromatic (gray)
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return { h, s, l };
  }
  
  // Convert HSL to RGB
  export function hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
      // Achromatic (gray)
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    // By default, return 0-1 range values
    return { r, g, b };
  }
  
  // Convert RGB to HSV
  export function rgbToHsv(r, g, b) {
    // Normalize RGB values to 0-1 range if they're in 0-255
    r = (r > 1) ? r / 255 : r;
    g = (g > 1) ? g / 255 : g;
    b = (b > 1) ? b / 255 : b;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;
    
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    
    if (max === min) {
      // Achromatic (gray)
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return { h, s, v };
  }
  
  // Convert HSV to RGB
  export function hsvToRgb(h, s, v) {
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
    
    // By default, return 0-1 range values
    return { r, g, b };
  }
  
  // Convert RGB to temperature (approximation)
  export function rgbToTemperature(r, g, b) {
    // Normalize RGB values to 0-1 range if they're in 0-255
    r = (r > 1) ? r / 255 : r;
    g = (g > 1) ? g / 255 : g;
    b = (b > 1) ? b / 255 : b;
    
    // This is a rough approximation - accurate calculation would be more complex
    const rg = r / g;
    
    // Low RG ratio means cooler (bluer) light
    // High RG ratio means warmer (redder) light
    if (rg > 1) {
      // Warmer (yellowish-red)
      return 2000 + (rg * 2000);
    } else {
      // Cooler (blueish)
      return 6500 + ((1/rg - 1) * 10000);
    }
  }
  
  // Convert temperature to RGB (approximation)
  export function temperatureToRgb(kelvin) {
    let r, g, b;
    
    // Clamp temperature values
    kelvin = Math.max(1000, Math.min(40000, kelvin));
    
    // Approximation from http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
    kelvin = kelvin / 100;
    
    // Red calculation
    if (kelvin <= 66) {
      r = 255;
    } else {
      r = kelvin - 60;
      r = 329.698727446 * Math.pow(r, -0.1332047592);
      r = Math.max(0, Math.min(255, r));
    }
    
    // Green calculation
    if (kelvin <= 66) {
      g = kelvin;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;
    } else {
      g = kelvin - 60;
      g = 288.1221695283 * Math.pow(g, -0.0755148492);
    }
    g = Math.max(0, Math.min(255, g));
    
    // Blue calculation
    if (kelvin >= 66) {
      b = 255;
    } else if (kelvin <= 19) {
      b = 0;
    } else {
      b = kelvin - 10;
      b = 138.5177312231 * Math.log(b) - 305.0447927307;
      b = Math.max(0, Math.min(255, b));
    }
    
    // Normalize to 0-1 range
    return { r: r/255, g: g/255, b: b/255 };
  }
  
  // Calculate luminance from RGB
  export function calculateLuminance(r, g, b) {
    // Normalize RGB values to 0-1 range if they're in 0-255
    r = (r > 1) ? r / 255 : r;
    g = (g > 1) ? g / 255 : g;
    b = (b > 1) ? b / 255 : b;
    
    // Standard luminance formula
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  
  // Convert RGB to YUV
  export function rgbToYuv(r, g, b) {
    // Normalize RGB values to 0-1 range if they're in 0-255
    r = (r > 1) ? r / 255 : r;
    g = (g > 1) ? g / 255 : g;
    b = (b > 1) ? b / 255 : b;
    
    // RGB to YUV conversion
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const u = 0.492 * (b - y);
    const v = 0.877 * (r - y);
    
    return { y, u, v };
  }
  
  // Convert YUV to RGB
  export function yuvToRgb(y, u, v) {
    // YUV to RGB conversion
    const r = y + 1.14 * v;
    const g = y - 0.39 * u - 0.58 * v;
    const b = y + 2.03 * u;
    
    // Clamp values to 0-1 range
    return {
      r: Math.max(0, Math.min(1, r)),
      g: Math.max(0, Math.min(1, g)),
      b: Math.max(0, Math.min(1, b))
    };
  }
  
  // Export all utility functions
  export default {
    rgbToHsl,
    hslToRgb,
    rgbToHsv,
    hsvToRgb,
    rgbToTemperature,
    temperatureToRgb,
    calculateLuminance,
    rgbToYuv,
    yuvToRgb
  };