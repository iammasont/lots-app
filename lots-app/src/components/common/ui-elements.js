// components/common/ui-elements.js
// Import app state if needed
import { appState } from '../../app.js';

// Initialize common UI elements
export function initUiElements() {
  console.log('Initializing UI Elements');
  
  // Initialize modal functionality
  initModals();
  
  // Initialize expandable sections
  initExpandableSections();
  
  // Initialize window control buttons
  initWindowControls();
  
  console.log('UI Elements initialization complete');
}

// Initialize modal dialogs
function initModals() {
  console.log('Setting up modal dialogs');
  // Code Preview Modal
  const viewCodeBtn = document.getElementById('view-code-btn');
  const viewCodeBtnAdvanced = document.getElementById('view-code-btn-advanced');
  const codeModal = document.getElementById('code-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  if (!viewCodeBtn) console.warn('View code button not found');
  if (!viewCodeBtnAdvanced) console.warn('Advanced view code button not found');
  if (!codeModal) console.warn('Code modal not found');
  if (!closeModalBtn) console.warn('Close modal button not found');
  
  if (viewCodeBtn && codeModal) {
    viewCodeBtn.addEventListener('click', () => {
      // Update the code preview with current LUT
      updateLUTPreview(true);
      // Show the modal
      codeModal.style.display = 'block';
    });
  }
  
  if (viewCodeBtnAdvanced && codeModal) {
    viewCodeBtnAdvanced.addEventListener('click', () => {
      // Update the code preview with current LUT
      updateLUTPreview(true);
      // Show the modal
      codeModal.style.display = 'block';
    });
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      // Hide any open modal
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        modal.style.display = 'none';
      });
    });
  }
  
  // Close modals when clicking outside content
  window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

// Update LUT preview in code modal
export function updateLUTPreview(fullPreview = false) {
  const lutPreview = document.getElementById('lut-preview');
  if (!lutPreview) {
    console.warn('LUT preview element not found');
    return;
  }
  
  // Get LUT content from generator (to be implemented)
  let lutContent = "# LUT Preview will be generated here";
  
  // In the future, we'll call the actual LUT generator:
  if (window.generateCubeLUT) {
    lutContent = window.generateCubeLUT();
  }
  
  if (fullPreview) {
    // Show the full LUT content in the modal
    lutPreview.textContent = lutContent;
  } else {
    // Just show a preview sample
    lutPreview.textContent = lutContent.slice(0, 500) + '...';
  }
}

// Initialize expandable sections - FIXED VERSION
function initExpandableSections() {
  console.log('Initializing expandable sections');
  
  // Define sections to initialize as expanded or collapsed
  const sections = [
    { toggle: 'basic-correction-toggle', content: 'basic-correction-section', expanded: true },
    { toggle: 'creative-toggle', content: 'creative-section', expanded: false },
    { toggle: 'color-wheels-toggle', content: 'color-wheels-section', expanded: false },
    { toggle: 'curves-toggle', content: 'curves-section', expanded: false }
  ];
  
  sections.forEach(section => {
    const toggle = document.getElementById(section.toggle);
    const content = document.getElementById(section.content);
    
    if (!toggle) {
      console.error(`Toggle element not found: #${section.toggle}`);
      return;
    }
    
    if (!content) {
      console.error(`Content element not found: #${section.content}`);
      return;
    }
    
    console.log(`Setting up section: ${section.toggle} (expanded: ${section.expanded})`);
    
    // Set initial state
    if (section.expanded) {
      toggle.classList.add('expanded');
      content.classList.add('expanded');
      content.style.display = 'block';
      content.style.maxHeight = 'none'; // Allow full height initially
    } else {
      toggle.classList.remove('expanded');
      content.classList.remove('expanded');
      content.style.display = 'none';
      content.style.maxHeight = '0';
    }
    
    // Add click event listener
    toggle.addEventListener('click', () => {
      console.log(`Toggle clicked for: ${section.toggle}`);
      
      // Toggle expanded state
      const isExpanding = !toggle.classList.contains('expanded');
      
      // Update toggle class
      toggle.classList.toggle('expanded');
      
      // Update content
      if (isExpanding) {
        // Expanding
        content.style.display = 'block';
        // Use setTimeout to allow display change to take effect first
        setTimeout(() => {
          content.classList.add('expanded');
          content.style.maxHeight = 'none';
        }, 10);
        console.log(`Expanding section: ${section.content}`);
      } else {
        // Collapsing
        content.classList.remove('expanded');
        content.style.maxHeight = '0';
        // Use setTimeout to allow transition to complete before hiding
        setTimeout(() => {
          content.style.display = 'none';
        }, 300); // Match the transition duration in CSS
        console.log(`Collapsing section: ${section.content}`);
      }
    });
  });
}

// Initialize window control buttons for Electron
function initWindowControls() {
  const minimizeBtn = document.getElementById('minimize-btn');
  const maximizeBtn = document.getElementById('maximize-btn');
  const closeBtn = document.getElementById('close-btn');
  
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('minimize');
      }
    });
  }
  
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('maximize');
      }
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (window.electronAPI) {
        window.electronAPI.windowControl('close');
      }
    });
  }
}

// Create a simple toast notification
export function showToast(message, type = 'info', duration = 3000) {
  console.log(`Toast notification: ${message} (${type})`);
  
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, duration);
  
  return toast;
}

// Create a confirmation dialog
export function showConfirmDialog(message, onConfirm, onCancel) {
  // Create dialog
  const dialogOverlay = document.createElement('div');
  dialogOverlay.className = 'dialog-overlay';
  
  const dialogBox = document.createElement('div');
  dialogBox.className = 'dialog-box';
  
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'dialog-buttons';
  
  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'primary';
  confirmBtn.textContent = 'Confirm';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  
  // Add elements to DOM
  buttonsContainer.appendChild(cancelBtn);
  buttonsContainer.appendChild(confirmBtn);
  
  dialogBox.appendChild(messageEl);
  dialogBox.appendChild(buttonsContainer);
  
  dialogOverlay.appendChild(dialogBox);
  document.body.appendChild(dialogOverlay);
  
  // Add event listeners
  confirmBtn.addEventListener('click', () => {
    if (onConfirm) onConfirm();
    document.body.removeChild(dialogOverlay);
  });
  
  cancelBtn.addEventListener('click', () => {
    if (onCancel) onCancel();
    document.body.removeChild(dialogOverlay);
  });
  
  // Also close on overlay click
  dialogOverlay.addEventListener('click', (e) => {
    if (e.target === dialogOverlay) {
      if (onCancel) onCancel();
      document.body.removeChild(dialogOverlay);
    }
  });
  
  return dialogOverlay;
}