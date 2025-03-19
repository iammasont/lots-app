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
    
    // 1. Apply basic Lumetri adjustments (temperature, exposure, etc.)
    // This would be implemented in a separate module
    
    // 2. Apply color wheels adjustments
    applyColorWheelAdjustments(imageData);
    
    // 3. Apply creative effects (faded film, vibrance)
    applyCreativeEffects(imageData);
    
    // 4. Apply curves adjustments
    if (appState.curvesPanel) {
      applyCurvesToImage(imageData);
    }
    
    // Put the modified image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Return the data URL for the processed image
    return canvas.toDataURL('image/jpeg', 1.0);
  } catch (error) {
    console.error('Error processing advanced image:', error);
    return null;
  }
}

// Process the image based on current app mode
export function processImage(originalImage) {
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
  
  // Process the image
  const processedImageUrl = processImage(originalImage);
  
  if (processedImageUrl) {
    // Update the processed image with the new data
    processedImage.src = processedImageUrl;
  }
}

// Export the image processing functions
export default {
  processImageBasic,
  processImageAdvanced,
  processImage,
  applyAdjustmentsToImage
};