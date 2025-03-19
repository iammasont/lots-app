// services/file-service.js
// Import app state
import { appState } from '../app.js';
import { showToast } from '../components/common/ui-elements.js';

// Initialize the file service
export function initFileService() {
  console.log('Initializing File Service');
}

// Open an image file
export async function openImageFile() {
  console.log('Opening image file');
  
  // If we're in Electron environment
  if (window.electronAPI && typeof window.electronAPI.openFileDialog === 'function') {
    try {
      const imagePath = await window.electronAPI.openFileDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif'] }]
      });
      
      if (imagePath) {
        console.log("Selected image:", imagePath);
        return `file://${imagePath}`;
      }
    } catch (error) {
      console.error("Error in Electron file dialog:", error);
      return await fallbackFileUpload();
    }
  } else {
    // Browser environment
    console.log("Using browser file input");
    return await fallbackFileUpload();
  }
  
  return null;
}

// Fallback file upload function using HTML input for browser context
function fallbackFileUpload() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        console.log("Selected file:", file.name);
        
        const reader = new FileReader();
        reader.onload = function(event) {
          resolve(event.target.result);
        };
        
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
    
    // Handle cancel case
    input.addEventListener('cancel', function() {
      resolve(null);
    });
    
    input.click();
  });
}

// Save a LUT file
export async function saveLutFile(content, defaultFilename = 'lut.cube') {
  console.log('Saving LUT file');
  
  try {
    // Format the filename
    const filename = defaultFilename.endsWith('.cube') ? defaultFilename : `${defaultFilename}.cube`;
    
    // If we're in Electron environment
    if (window.electronAPI && typeof window.electronAPI.saveLut === 'function') {
      const filePath = await window.electronAPI.saveLut({
        content,
        defaultPath: filename
      });
      
      if (filePath) {
        showToast(`LUT saved to: ${filePath}`, 'success');
        return filePath;
      }
    } else {
      // Browser environment - offer download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast(`LUT downloaded as ${filename}`, 'success');
      return filename;
    }
  } catch (error) {
    console.error('Error saving LUT:', error);
    showToast('Failed to save LUT file', 'error');
    return null;
  }
}

// Load a LUT file
export async function loadLutFile() {
  console.log('Loading LUT file');
  
  // If we're in Electron environment
  if (window.electronAPI && typeof window.electronAPI.openFileDialog === 'function') {
    try {
      const lutPath = await window.electronAPI.openFileDialog({
        properties: ['openFile'],
        filters: [{ name: 'CUBE Files', extensions: ['cube'] }]
      });
      
      if (lutPath) {
        // In a real implementation, we would read the file content here
        console.log("Selected LUT:", lutPath);
        
        // Placeholder for actual file reading logic
        // The content would be returned and parsed elsewhere
        return {
          path: lutPath,
          filename: lutPath.split('/').pop(),
          content: "# Placeholder for actual LUT content"
        };
      }
    } catch (error) {
      console.error("Error in Electron file dialog:", error);
      return null;
    }
  } else {
    // Browser environment
    return await fallbackLutUpload();
  }
  
  return null;
}

// Fallback LUT upload function using HTML input for browser context
function fallbackLutUpload() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cube';
    
    input.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        console.log("Selected LUT file:", file.name);
        
        const reader = new FileReader();
        reader.onload = function(event) {
          resolve({
            filename: file.name,
            content: event.target.result
          });
        };
        
        reader.readAsText(file);
      } else {
        resolve(null);
      }
    });
    
    // Handle cancel case
    input.addEventListener('cancel', function() {
      resolve(null);
    });
    
    input.click();
  });
}

// Export additional utility functions
export {
  fallbackFileUpload,
  fallbackLutUpload
};