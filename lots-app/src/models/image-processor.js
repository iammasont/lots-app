// models/image-processor.js
// Import necessary functions from other modules
import { appState } from '../app.js';
import { applyBasicCorrections } from '../components/basic-corrections/basic-corrections.js';
import { applyCreativeEffects } from '../components/creative/creative-effects.js';
import { applyColorWheelAdjustments } from '../components/color-wheels/color-wheels.js';
import { applyCurvesToImage } from '../components/curves/curves-panel.js';

// Process an image with current adjustments in basic mode
export function processImageBasic(originalImage) {
  console.log('Processing image with basic adjustments');
  
  if (!originalImage) {
    console.error('No image to process');
    return null;
  }
  
  try {
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;
    
    // Draw the original image onto the canvas
    ctx.drawImage(originalImage, 0, 0);
    
    // Get the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply basic corrections
    applyBasicCorrections(imageData);
    
    // Put the modified image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Return the data URL for the processed image
    return canvas.toDataURL('image/jpeg', 1.0);
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

// Process an image with current adjustments in advanced mode
export function processImageAdvanced(originalImage) {
  console.log('Processing image with advanced adjustments');
  console.log('Advanced parameters:', JSON.stringify(appState.currentLutParams.lumetri, null, 2));
  
  if (!originalImage) {
    console.error('No image to process');
    return null;
  }
  
  try {
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;
    
    // Draw the original image onto the canvas
    ctx.drawImage(originalImage, 0, 0);
    
    // Get the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Apply adjustments in sequence
    console.log('Applying advanced adjustments in sequence');
    
    // 1. First apply basic corrections as a base
    console.log('1. Applying basic corrections');
    applyBasicCorrections(imageData);
    
    // 2. Apply Lumetri adjustments
    console.log('2. Applying Lumetri adjustments');
    applyLumetriAdjustments(imageData);
    
    // 3. Apply color wheels adjustments
    console.log('3. Applying color wheels adjustments');
    applyColorWheelAdjustments(imageData);
    
    // 4. Apply creative effects (faded film, vibrance)
    console.log('4. Applying creative effects');
    applyCreativeEffects(imageData);
    
    // 5. Apply curves adjustments
    console.log('5. Applying curves adjustments');
    if (appState.curvesPanel) {
      applyCurvesToImage(imageData);
    } else {
      console.warn('Curves panel not available, skipping curves adjustments');
    }
    
    // Put the modified image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    
    console.log('Advanced processing complete');
    
    // Return the data URL for the processed image
    return canvas.toDataURL('image/jpeg', 1.0);
  } catch (error) {
    console.error('Error processing advanced image:', error);
    return null;
  }
}

// Apply Lumetri-style adjustments to image data
function applyLumetriAdjustments(imageData) {
  if (!appState.currentLutParams.lumetri) {
    console.warn('No Lumetri parameters available');
    return imageData;
  }
  
  const lumetri = appState.currentLutParams.lumetri;
  const data = imageData.data;
  
  console.log('Applying Lumetri adjustments with params:', 
    `exposure: ${lumetri.exposure}, `,
    `contrast: ${lumetri.contrast}, `,
    `highlights: ${lumetri.highlights}, `,
    `shadows: ${lumetri.shadows}, `,
    `whites: ${lumetri.whites}, `,
    `blacks: ${lumetri.blacks}, `,
    `temperature: ${lumetri.temperature}, `,
    `tint: ${lumetri.tint}`);
  
  for (let i = 0; i < data.length; i += 4) {
    // Get RGB values (0-255) and normalize to 0-1
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    
    // Apply exposure (exponential)
    if (lumetri.exposure !== 0) {
      const exposureFactor = Math.pow(2, lumetri.exposure / 2); // Adjust scaling
      r *= exposureFactor;
      g *= exposureFactor;
      b *= exposureFactor;
    }
    
    // Apply contrast
    if (lumetri.contrast !== 0) {
      const contrastFactor = 1 + (lumetri.contrast / 100); // Scale from -100..100 to appropriate range
      const midpoint = 0.5;
      r = midpoint + (r - midpoint) * contrastFactor;
      g = midpoint + (g - midpoint) * contrastFactor;
      b = midpoint + (b - midpoint) * contrastFactor;
    }
    
    // Calculate luminance for shadows/highlights adjustments
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    // Apply highlights adjustments
    if (lumetri.highlights !== 0) {
      const highlightInfluence = Math.pow(luminance, 2); // Affects brighter areas more
      const adjustment = (lumetri.highlights / 100) * 0.5; // Scale appropriately
      r += adjustment * highlightInfluence;
      g += adjustment * highlightInfluence;
      b += adjustment * highlightInfluence;
    }
    
    // Apply shadows adjustments
    if (lumetri.shadows !== 0) {
      const shadowInfluence = Math.pow(1 - luminance, 2); // Affects darker areas more
      const adjustment = (lumetri.shadows / 100) * 0.5; // Scale appropriately
      r += adjustment * shadowInfluence;
      g += adjustment * shadowInfluence;
      b += adjustment * shadowInfluence;
    }
    
    // Apply whites/blacks adjustments
    if (lumetri.whites !== 0) {
      const whitesInfluence = Math.pow(luminance, 4); // Affects only the brightest areas
      const adjustment = (lumetri.whites / 100) * 0.5;
      r += adjustment * whitesInfluence;
      g += adjustment * whitesInfluence;
      b += adjustment * whitesInfluence;
    }
    
    if (lumetri.blacks !== 0) {
      const blacksInfluence = Math.pow(1 - luminance, 4); // Affects only the darkest areas
      const adjustment = (lumetri.blacks / 100) * 0.5;
      r += adjustment * blacksInfluence;
      g += adjustment * blacksInfluence;
      b += adjustment * blacksInfluence;
    }
    
    // Apply temperature and tint
    if (lumetri.temperature !== 0 || lumetri.tint !== 0) {
      // Temperature: blue-yellow shift
      const temp = lumetri.temperature / 100; // Scale to -1..1
      if (temp < 0) {
        // Warmer (more yellow)
        r *= (1 - temp * 0.2);
        g *= (1 - temp * 0.1);
        b *= (1 + temp * 0.3);
      } else {
        // Cooler (more blue)
        r *= (1 - temp * 0.2);
        g *= (1 - temp * 0.1);
        b *= (1 + temp * 0.3);
      }
      
      // Tint: green-magenta shift
      const tintVal = lumetri.tint / 100; // Scale to -1..1
      if (tintVal > 0) {
        // More magenta
        r *= (1 + tintVal * 0.1);
        g *= (1 - tintVal * 0.1);
        b *= (1 + tintVal * 0.1);
      } else {
        // More green
        r *= (1 + tintVal * 0.1);
        g *= (1 - tintVal * 0.1);
        b *= (1 + tintVal * 0.1);
      }
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

// Process the image based on current app mode
export function processImage(originalImage) {
  console.log(`Processing image in ${appState.activeMode} mode`);
  
  if (appState.activeMode === 'basic') {
    return processImageBasic(originalImage);
  } else {
    return processImageAdvanced(originalImage);
  }
}

// Apply the current adjustments to the displayed image
export function applyAdjustmentsToImage() {
  const originalImage = appState.originalImageElement;
  const processedImage = appState.processedImageElement;
  
  if (!originalImage || !processedImage) {
    console.warn('Image elements not available');
    return;
  }
  
  console.log('Applying adjustments to image');
  
  // Process the image
  const processedImageUrl = processImage(originalImage);
  
  if (processedImageUrl) {
    // Update the processed image with the new data
    processedImage.src = processedImageUrl;
    console.log('Processed image updated successfully');
  } else {
    console.error('Failed to process image');
  }
}

// Export the image processing functions
export default {
  processImageBasic,
  processImageAdvanced,
  processImage,
  applyAdjustmentsToImage
};