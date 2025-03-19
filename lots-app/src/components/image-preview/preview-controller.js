// Import utilities if needed
import { appState, applyImageAdjustments } from '../../app.js';

// Keep track of slider position
let currentSliderPosition = 50;

// Initialize the preview controller
export function initPreviewController() {
  console.log('Initializing Preview Controller');
  
  // Get DOM elements
  const originalImage = document.getElementById('original-image');
  const processedImage = document.getElementById('processed-image');
  const originalPlaceholder = document.getElementById('original-placeholder');
  const comparisonContainer = document.getElementById('comparison-container');
  const imageUploadBtn = document.getElementById('image-upload-btn');
  
  // Store references to the DOM elements in the global app state
  appState.originalImageElement = originalImage;
  appState.processedImageElement = processedImage;
  
  // Set up view toggle buttons
  setupViewToggleButtons();
  
  // Set up image upload button
  if (imageUploadBtn) {
    imageUploadBtn.addEventListener('click', handleImageUpload);
  }
  
  // Set up image load handler
  if (originalImage) {
    originalImage.onload = () => {
      console.log("Image loaded successfully");
      
      // Store the image in app state
      appState.originalImage = originalImage;
      appState.processedImage = processedImage;
      
      // Hide placeholder, show comparison container
      if (originalPlaceholder) originalPlaceholder.style.display = 'none';
      if (comparisonContainer) comparisonContainer.style.display = 'block';
      
      // Initialize comparison slider
      initComparisonSlider();
      
      // Apply adjustments to process the image
      applyImageAdjustments();
    };
  }
}

// Set up view toggle buttons (split, before, after)
function setupViewToggleButtons() {
  const viewSplitBtn = document.getElementById('view-split');
  const viewBeforeBtn = document.getElementById('view-before');
  const viewAfterBtn = document.getElementById('view-after');
  
  if (viewSplitBtn) {
    viewSplitBtn.addEventListener('click', () => {
      setViewMode('split');
    });
  }
  
  if (viewBeforeBtn) {
    viewBeforeBtn.addEventListener('click', () => {
      setViewMode('before');
    });
  }
  
  if (viewAfterBtn) {
    viewAfterBtn.addEventListener('click', () => {
      setViewMode('after');
    });
  }
}

// Handle image upload functionality
function handleImageUpload() {
  console.log("Image upload button clicked");
  
  // In Electron environment
  if (window.electronAPI && typeof window.electronAPI.openFileDialog === 'function') {
    window.electronAPI.openFileDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp'] }]
    }).then(imagePath => {
      if (imagePath) {
        console.log("Selected image:", imagePath);
        appState.originalImageElement.src = `file://${imagePath}`;
      }
    }).catch(error => {
      console.error("Error in Electron file dialog:", error);
      fallbackFileUpload();
    });
  } else {
    // Browser environment
    console.log("Using browser file input");
    fallbackFileUpload();
  }
}

// Fallback file upload function using HTML input for browser context
function fallbackFileUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      console.log("Selected file:", file.name);
      
      const reader = new FileReader();
      reader.onload = function(event) {
        appState.originalImageElement.src = event.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  input.click();
}

// Initialize comparison slider functionality
function initComparisonSlider() {
  const comparisonContainer = document.getElementById('comparison-container');
  const originalImageContainer = document.getElementById('original-image-container');
  const comparisonSlider = document.getElementById('comparison-slider');
  const verticalDivider = document.getElementById('vertical-divider');
  
  let isSliding = false;
  let startX = 0;
  let startPercent = 50;

  // Function to update slider position
  function updateSliderPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));
    
    // Store the current position
    currentSliderPosition = percent;
    
    // Update the clip-path of the original image container
    originalImageContainer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    
    // Update slider position
    comparisonSlider.style.left = percent + '%';
    
    // Update vertical divider position
    verticalDivider.style.left = percent + '%';
  }

  // Handle mouse events
  comparisonSlider.addEventListener('mousedown', (e) => {
    isSliding = true;
    startX = e.clientX;
    
    // Get current slider position
    const sliderLeft = parseFloat(comparisonSlider.style.left) || currentSliderPosition;
    startPercent = sliderLeft;
    
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    
    const rect = comparisonContainer.getBoundingClientRect();
    const deltaX = e.clientX - startX;
    const deltaPercent = (deltaX / rect.width) * 100;
    
    updateSliderPosition(startPercent + deltaPercent);
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    isSliding = false;
  });

  // Handle touch events
  comparisonSlider.addEventListener('touchstart', (e) => {
    isSliding = true;
    startX = e.touches[0].clientX;
    
    // Get current slider position
    const sliderLeft = parseFloat(comparisonSlider.style.left) || currentSliderPosition;
    startPercent = sliderLeft;
    
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    
    const rect = comparisonContainer.getBoundingClientRect();
    const deltaX = e.touches[0].clientX - startX;
    const deltaPercent = (deltaX / rect.width) * 100;
    
    updateSliderPosition(startPercent + deltaPercent);
    e.preventDefault();
  });

  document.addEventListener('touchend', () => {
    isSliding = false;
  });

  // Click anywhere in container to move slider
  comparisonContainer.addEventListener('click', (e) => {
    if (e.target.closest('.toggle-view') || e.target.closest('.slider-handle')) return;
    
    const rect = comparisonContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    
    updateSliderPosition(percent);
  });

  // Initialize with 50/50 split or restore previous position
  updateSliderPosition(currentSliderPosition);
}

// Set view mode (split, before, after)
function setViewMode(mode, resetPosition = true) {
  const viewSplitBtn = document.getElementById('view-split');
  const viewBeforeBtn = document.getElementById('view-before');
  const viewAfterBtn = document.getElementById('view-after');
  const originalImageContainer = document.getElementById('original-image-container');
  const comparisonSlider = document.getElementById('comparison-slider');
  const verticalDivider = document.getElementById('vertical-divider');
  
  // Reset all buttons
  viewSplitBtn.classList.remove('active');
  viewBeforeBtn.classList.remove('active');
  viewAfterBtn.classList.remove('active');
  
  switch (mode) {
    case 'split':
      viewSplitBtn.classList.add('active');
      
      // If resetPosition is true, set to 50/50 split; otherwise keep current position
      if (resetPosition) {
        currentSliderPosition = 50;
      }
      
      // Position elements based on current slider position
      originalImageContainer.style.clipPath = `inset(0 ${100 - currentSliderPosition}% 0 0)`;
      verticalDivider.style.left = `${currentSliderPosition}%`;
      comparisonSlider.style.left = `${currentSliderPosition}%`;
      
      // Make everything visible
      comparisonSlider.style.display = 'block';
      originalImageContainer.style.display = 'block';
      verticalDivider.style.display = 'block'; // Show divider
      break;
      
    case 'before':
      viewBeforeBtn.classList.add('active');
      
      // Show full original image
      originalImageContainer.style.clipPath = 'inset(0 0 0 0)';
      
      // Hide slider and divider
      comparisonSlider.style.display = 'none';
      verticalDivider.style.display = 'none'; // Hide divider
      originalImageContainer.style.display = 'block';
      break;
      
    case 'after':
      viewAfterBtn.classList.add('active');
      
      // Hide original image completely
      originalImageContainer.style.display = 'none';
      
      // Hide slider and divider
      comparisonSlider.style.display = 'none';
      verticalDivider.style.display = 'none'; // Hide divider
      break;
  }
}

// Export functions that may be needed by other modules
export {
  setViewMode,
  currentSliderPosition
};