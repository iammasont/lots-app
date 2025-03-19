// Import app state and services
import { appState } from '../app.js';
import { saveLutFile } from './file-service.js';
import { generateCubeLUT } from './lut-generator.js';
import { showToast, showConfirmDialog } from '../components/common/ui-elements.js';

// Initialize the export service
export function initExportService() {
  console.log('Initializing Export Service');
  
  // Set up export buttons
  setupExportButtons();
}

// Set up export button click handlers
function setupExportButtons() {
  const saveLutBtn = document.getElementById('save-lut-btn');
  const saveLutBtnAdvanced = document.getElementById('save-lut-btn-advanced');
  
  if (saveLutBtn) {
    saveLutBtn.addEventListener('click', handleExportLut);
  }
  
  if (saveLutBtnAdvanced) {
    saveLutBtnAdvanced.addEventListener('click', handleExportLut);
  }
}

// Handle the LUT export button click
async function handleExportLut() {
  console.log('Exporting LUT');
  
  try {
    // Generate the LUT content
    const lutContent = generateCubeLUT();
    
    // Format filename from title
    const defaultFilename = formatFilename(appState.currentLutParams.title);
    
    // Save the file
    const result = await saveLutFile(lutContent, defaultFilename);
    
    if (result) {
      console.log('LUT exported successfully');
    } else {
      console.warn('LUT export was cancelled or failed');
    }
  } catch (error) {
    console.error('Error exporting LUT:', error);
    showToast('Failed to export LUT: ' + error.message, 'error');
  }
}

// Format a filename from the LUT title
function formatFilename(title) {
  if (!title) return 'lut.cube';
  
  // Replace spaces with underscores and remove special characters
  let filename = title.replace(/\s+/g, '_')
                      .replace(/[^a-zA-Z0-9_-]/g, '')
                      .toLowerCase();
  
  // Add .cube extension if not present
  if (!filename.endsWith('.cube')) {
    filename += '.cube';
  }
  
  return filename;
}

// Export the current image with adjustments applied
export async function exportProcessedImage() {
  console.log('Exporting processed image');
  
  if (!appState.processedImageElement) {
    showToast('No processed image to export', 'error');
    return null;
  }
  
  try {
    // Get the processed image source (already contains the applied adjustments)
    const imageDataUrl = appState.processedImageElement.src;
    
    // In Electron environment, we would save the file using Electron APIs
    if (window.electronAPI && typeof window.electronAPI.saveImage === 'function') {
      const defaultName = 'processed_image.jpg';
      
      const filePath = await window.electronAPI.saveImage({
        dataUrl: imageDataUrl,
        defaultPath: defaultName
      });
      
      if (filePath) {
        showToast(`Image saved to: ${filePath}`, 'success');
        return filePath;
      }
    } else {
      // Browser environment - offer download
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'processed_image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      showToast('Image downloaded', 'success');
      return 'processed_image.jpg';
    }
  } catch (error) {
    console.error('Error exporting image:', error);
    showToast('Failed to export image', 'error');
    return null;
  }
}

// Export all settings as a preset file
export async function exportPreset() {
  console.log('Exporting preset');
  
  try {
    // Create a preset object with current settings
    const preset = {
      name: appState.currentLutParams.title || 'Unnamed Preset',
      basic: { ...appState.currentLutParams.basic },
      advanced: {
        lumetri: appState.currentLutParams.lumetri ? { ...appState.currentLutParams.lumetri } : null,
        colorWheels: appState.currentLutParams.colorWheels ? { ...appState.currentLutParams.colorWheels } : null,
        curves: appState.currentLutParams.curves ? { ...appState.currentLutParams.curves } : null
      },
      version: '1.0'
    };
    
    // Convert to JSON
    const presetJson = JSON.stringify(preset, null, 2);
    
    // Format filename
    const defaultFilename = `${formatFilename(preset.name).replace('.cube', '')}.lotspreset`;
    
    // Save the file using Electron or browser download
    if (window.electronAPI && typeof window.electronAPI.savePreset === 'function') {
      const filePath = await window.electronAPI.savePreset({
        content: presetJson,
        defaultPath: defaultFilename
      });
      
      if (filePath) {
        showToast(`Preset saved to: ${filePath}`, 'success');
        return filePath;
      }
    } else {
      // Browser environment - offer download
      const blob = new Blob([presetJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = defaultFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast(`Preset downloaded as ${defaultFilename}`, 'success');
      return defaultFilename;
    }
  } catch (error) {
    console.error('Error exporting preset:', error);
    showToast('Failed to export preset', 'error');
    return null;
  }};
