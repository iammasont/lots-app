/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lots-app/src/app.js":
/*!*****************************!*\
  !*** ./lots-app/src/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appState: () => (/* binding */ appState),
/* harmony export */   applyAdvancedAdjustments: () => (/* binding */ applyAdvancedAdjustments),
/* harmony export */   applyBasicAdjustments: () => (/* binding */ applyBasicAdjustments),
/* harmony export */   applyImageAdjustments: () => (/* binding */ applyImageAdjustments)
/* harmony export */ });
/* harmony import */ var _styles_compare_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/compare.css */ "./lots-app/src/styles/compare.css");
/* harmony import */ var _styles_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/base.css */ "./lots-app/src/styles/base.css");
/* harmony import */ var _styles_layout_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/layout.css */ "./lots-app/src/styles/layout.css");
/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/components.css */ "./lots-app/src/styles/components.css");
/* harmony import */ var _styles_tools_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/tools.css */ "./lots-app/src/styles/tools.css");
/* harmony import */ var _styles_themes_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/themes.css */ "./lots-app/src/styles/themes.css");
/* harmony import */ var _styles_animations_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/animations.css */ "./lots-app/src/styles/animations.css");
/* harmony import */ var _components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/curves/curves-panel.js */ "./lots-app/src/components/curves/curves-panel.js");
/* harmony import */ var _components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/basic-corrections/basic-corrections.js */ "./lots-app/src/components/basic-corrections/basic-corrections.js");
/* harmony import */ var _components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/creative/creative-effects.js */ "./lots-app/src/components/creative/creative-effects.js");
/* harmony import */ var _components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/color-wheels/color-wheels.js */ "./lots-app/src/components/color-wheels/color-wheels.js");
/* harmony import */ var _components_image_preview_image_comparison_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/image-preview/image-comparison.js */ "./lots-app/src/components/image-preview/image-comparison.js");
/* harmony import */ var _components_image_preview_preview_controller_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/image-preview/preview-controller.js */ "./lots-app/src/components/image-preview/preview-controller.js");
/* harmony import */ var _components_presets_presets_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/presets/presets.js */ "./lots-app/src/components/presets/presets.js");
/* harmony import */ var _components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/common/ui-elements.js */ "./lots-app/src/components/common/ui-elements.js");
/* harmony import */ var _services_file_service_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/file-service.js */ "./lots-app/src/services/file-service.js");
/* harmony import */ var _services_lut_generator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/lut-generator.js */ "./lots-app/src/services/lut-generator.js");
/* harmony import */ var _services_export_service_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/export-service.js */ "./lots-app/src/services/export-service.js");
/* harmony import */ var _models_image_processor_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./models/image-processor.js */ "./lots-app/src/models/image-processor.js");
// Import styles








// Import components









// Import services




// Import image processing utilities


// App state
var appState = {
  activeMode: 'basic',
  // 'basic' or 'advanced'
  originalImage: null,
  processedImage: null,
  currentLutParams: {
    // Basic parameters
    size: 32,
    title: "Signature Look",
    contrast: 1.2,
    saturation: 1.15,
    redBalance: 1.05,
    greenBalance: 0.95,
    blueBalance: 1.1,
    shadowsShift: [0.05, 0.0, -0.05],
    highlightsShift: [0.03, 0.03, 0.0]

    // Advanced parameters will be added by the respective modules
  }
};

// Initialize the application
function initApp() {
  console.log('LOTS App initializing...');

  // Make app state available globally for modules
  window.appState = appState;

  // Initialize UI components
  (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_14__.initUiElements)();
  (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_8__.initBasicCorrections)();
  (0,_components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_9__.initCreativeEffects)();
  (0,_components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_10__.initColorWheels)();
  (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_7__.initCurvesPanel)();
  (0,_components_image_preview_image_comparison_js__WEBPACK_IMPORTED_MODULE_11__.initImageComparison)();
  (0,_components_image_preview_preview_controller_js__WEBPACK_IMPORTED_MODULE_12__.initPreviewController)();
  (0,_components_presets_presets_js__WEBPACK_IMPORTED_MODULE_13__.initPresets)();

  // Initialize services
  (0,_services_file_service_js__WEBPACK_IMPORTED_MODULE_15__.initFileService)();
  (0,_services_lut_generator_js__WEBPACK_IMPORTED_MODULE_16__.initLutGenerator)();
  (0,_services_export_service_js__WEBPACK_IMPORTED_MODULE_17__.initExportService)();

  // Set up mode toggle
  setupModeToggle();

  // Set up window control buttons
  setupWindowControls();
  console.log('LOTS App initialized successfully');
}

// Set up mode toggle (basic/advanced)
function setupModeToggle() {
  var modeToggle = document.getElementById('mode-toggle');
  var basicControls = document.getElementById('basic-controls');
  var advancedControls = document.getElementById('advanced-controls');
  if (modeToggle) {
    modeToggle.addEventListener('change', function () {
      var isAdvancedMode = this.checked;
      appState.activeMode = isAdvancedMode ? 'advanced' : 'basic';
      if (basicControls && advancedControls) {
        console.log("Switching to ".concat(appState.activeMode, " mode"));
        basicControls.style.display = isAdvancedMode ? 'none' : 'block';
        advancedControls.style.display = isAdvancedMode ? 'block' : 'none';

        // Apply current image adjustments with the new mode
        if (appState.originalImage && appState.processedImage) {
          applyImageAdjustments();
        }
      }
    });
  }
}

// Set up window control buttons for Electron
function setupWindowControls() {
  var minimizeBtn = document.getElementById('minimize-btn');
  var maximizeBtn = document.getElementById('maximize-btn');
  var closeBtn = document.getElementById('close-btn');
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('minimize');
      }
    });
  }
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('maximize');
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('close');
      }
    });
  }
}

// Apply adjustments to image based on current mode and parameters
function applyImageAdjustments() {
  if (!appState.originalImage) return;
  console.log('Applying image adjustments');

  // Actually process the image instead of just logging
  try {
    // Use the image processor to apply adjustments
    var processedImageUrl = (0,_models_image_processor_js__WEBPACK_IMPORTED_MODULE_18__.processImage)(appState.originalImageElement);

    // Update the processed image with the new data
    if (processedImageUrl && appState.processedImageElement) {
      appState.processedImageElement.src = processedImageUrl;
    }
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// Apply basic mode adjustments
function applyBasicAdjustments() {
  console.log('Applying basic adjustments to image');
  (0,_models_image_processor_js__WEBPACK_IMPORTED_MODULE_18__.applyAdjustmentsToImage)();
}

// Apply advanced mode adjustments
function applyAdvancedAdjustments() {
  console.log('Applying advanced Lumetri-style adjustments to image');
  (0,_models_image_processor_js__WEBPACK_IMPORTED_MODULE_18__.applyAdjustmentsToImage)();
}

// Make certain functions available globally
window.applyImageAdjustments = applyImageAdjustments;

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export functions for use in other modules


/***/ }),

/***/ "./lots-app/src/components/basic-corrections/basic-corrections.js":
/*!************************************************************************!*\
  !*** ./lots-app/src/components/basic-corrections/basic-corrections.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyBasicCorrections: () => (/* binding */ applyBasicCorrections),
/* harmony export */   applyContrast: () => (/* binding */ applyContrast),
/* harmony export */   initBasicCorrections: () => (/* binding */ initBasicCorrections)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// Import app state and functions


// Initialize the Basic Corrections component
function initBasicCorrections() {
  console.log('Initializing Basic Corrections');

  // Initialize basic correction parameters if not present
  if (!_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic = {
      contrast: 1.2,
      saturation: 1.15,
      redBalance: 1.05,
      greenBalance: 0.95,
      blueBalance: 1.1
    };
  }

  // Get slider references
  var contrastSlider = document.getElementById('contrast');
  var saturationSlider = document.getElementById('saturation');
  var redBalanceSlider = document.getElementById('red-balance');
  var greenBalanceSlider = document.getElementById('green-balance');
  var blueBalanceSlider = document.getElementById('blue-balance');

  // Display value references
  var contrastValue = document.getElementById('contrast-value');
  var saturationValue = document.getElementById('saturation-value');
  var redBalanceValue = document.getElementById('red-balance-value');
  var greenBalanceValue = document.getElementById('green-balance-value');
  var blueBalanceValue = document.getElementById('blue-balance-value');

  // Set up event listeners for sliders
  setupSlider(contrastSlider, contrastValue, 'contrast');
  setupSlider(saturationSlider, saturationValue, 'saturation');
  setupSlider(redBalanceSlider, redBalanceValue, 'redBalance');
  setupSlider(greenBalanceSlider, greenBalanceValue, 'greenBalance');
  setupSlider(blueBalanceSlider, blueBalanceValue, 'blueBalance');

  // Initialize LUT title and size controls
  initTitleAndSizeControls();
}

// Set up a slider control with its value display
function setupSlider(slider, valueDisplay, paramName) {
  if (!slider || !valueDisplay) return;

  // Set initial value from app state
  slider.value = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic[paramName];
  valueDisplay.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic[paramName].toFixed(2);

  // Add event listener
  slider.addEventListener('input', function () {
    // Update parameter in app state
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic[paramName] = parseFloat(slider.value);

    // Update display value
    valueDisplay.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic[paramName].toFixed(2);

    // Apply adjustments to image
    (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
  });
}

// Initialize title and LUT size controls
function initTitleAndSizeControls() {
  var titleInput = document.getElementById('title');
  var lutSizeSelect = document.getElementById('lut-size');
  if (titleInput) {
    // Set initial value
    titleInput.value = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.title || "Signature Look";

    // Add event listener
    titleInput.addEventListener('input', function () {
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.title = titleInput.value;
    });
  }
  if (lutSizeSelect) {
    // Set initial value
    lutSizeSelect.value = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.size || "32";

    // Add event listener
    lutSizeSelect.addEventListener('change', function () {
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.size = parseInt(lutSizeSelect.value);
    });
  }
}

// Apply the basic corrections to an image
function applyBasicCorrections(imageData) {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic;
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    // Get RGB values (0-255) and normalize to 0-1
    var r = data[i] / 255;
    var g = data[i + 1] / 255;
    var b = data[i + 2] / 255;

    // Apply contrast
    r = applyContrast(r, params.contrast);
    g = applyContrast(g, params.contrast);
    b = applyContrast(b, params.contrast);

    // Apply color balance
    r *= params.redBalance;
    g *= params.greenBalance;
    b *= params.blueBalance;

    // Apply saturation
    if (params.saturation !== 1.0) {
      var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r = luminance + params.saturation * (r - luminance);
      g = luminance + params.saturation * (g - luminance);
      b = luminance + params.saturation * (b - luminance);
    }

    // Apply shadow/highlight adjustments (if defined)
    if (params.shadowsShift && params.highlightsShift) {
      var shadowEffect = Math.pow(1 - Math.max(r, Math.max(g, b)), 2);
      var highlightEffect = Math.pow(Math.max(r, Math.max(g, b)), 2);
      r += params.shadowsShift[0] * shadowEffect + params.highlightsShift[0] * highlightEffect;
      g += params.shadowsShift[1] * shadowEffect + params.highlightsShift[1] * highlightEffect;
      b += params.shadowsShift[2] * shadowEffect + params.highlightsShift[2] * highlightEffect;
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

// Helper function to apply contrast
function applyContrast(value, contrast) {
  return 0.5 + (value - 0.5) * contrast;
}

// Export functions and constants


/***/ }),

/***/ "./lots-app/src/components/color-wheels/color-wheels.js":
/*!**************************************************************!*\
  !*** ./lots-app/src/components/color-wheels/color-wheels.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyColorWheelAdjustments: () => (/* binding */ applyColorWheelAdjustments),
/* harmony export */   applyColorWheels: () => (/* binding */ applyColorWheels),
/* harmony export */   hsvToRgb: () => (/* binding */ hsvToRgb),
/* harmony export */   initColorWheels: () => (/* binding */ initColorWheels)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// Import app state and functions


// Initialize the Color Wheels component
function initColorWheels() {
  console.log('Initializing Color Wheels');

  // Initialize color wheel parameters if not present
  if (!_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels = {
      shadowTint: {
        r: 128,
        g: 128,
        b: 128
      },
      // Middle gray = no tint
      highlightTint: {
        r: 128,
        g: 128,
        b: 128
      },
      // Middle gray = no tint
      tintBalance: 0 // Range: -150 to 150
    };
  }

  // Get DOM references
  var shadowColorWheel = document.getElementById('shadow-color-wheel');
  var highlightColorWheel = document.getElementById('highlight-color-wheel');
  var tintBalanceSlider = document.getElementById('tint-balance');
  var tintBalanceValue = document.getElementById('tint-balance-value');

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
    tintBalanceSlider.value = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.tintBalance;
    tintBalanceValue.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.tintBalance.toFixed(1);

    // Add event listener
    tintBalanceSlider.addEventListener('input', function () {
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.tintBalance = parseFloat(tintBalanceSlider.value);
      tintBalanceValue.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.tintBalance.toFixed(1);
      (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
    });
  }

  // Setup reset button
  var resetButton = document.querySelector('.reset-btn[data-section="colorWheels"]');
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
  var canvas = document.createElement('canvas');
  canvas.width = wheel.clientWidth || 80;
  canvas.height = wheel.clientHeight || 80;
  wheel.appendChild(canvas);

  // Use CSS-based color wheel instead of canvas
  wheel.style.background = "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)";
  wheel.style.backgroundImage = "radial-gradient(circle at center, white 0%, rgba(255, 255, 255, 0) 70%), conic-gradient(red, yellow, lime, cyan, blue, magenta, red)";

  // Add indicator for current position
  var indicator = document.createElement('div');
  indicator.className = 'wheel-indicator';
  wheel.appendChild(indicator);

  // Get current tint value
  var tintValue = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels[paramName];

  // Position indicator based on current tint value
  var centerX = wheel.clientWidth / 2;
  var centerY = wheel.clientHeight / 2;
  var maxDistance = Math.min(centerX, centerY) - 2;

  // Calculate position from tint values
  // Convert from 0-255 range to -1 to 1 range (128 is center/neutral)
  var normalizedR = (tintValue.r - 128) / 128;
  var normalizedG = (tintValue.g - 128) / 128;
  var normalizedB = (tintValue.b - 128) / 128;

  // Estimate hue and saturation from RGB (simplified)
  var saturation = Math.sqrt(normalizedR * normalizedR + normalizedG * normalizedG + normalizedB * normalizedB);
  saturation = Math.min(1, saturation); // Clamp to 1

  // This is a simplified conversion - a complete RGB to HSV would be more accurate
  var hue = 0;
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
  var x = Math.cos(hue) * saturation * maxDistance;
  var y = Math.sin(hue) * saturation * maxDistance;

  // Position indicator
  setWheelIndicatorPosition(wheel, indicator, x, y);

  // Track if mouse is down
  var isMouseDown = false;

  // Handle mouse interactions
  wheel.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    updateWheelFromEvent(e);
  });
  document.addEventListener('mousemove', function (e) {
    if (!isMouseDown) return;
    updateWheelFromEvent(e);
  });
  document.addEventListener('mouseup', function () {
    isMouseDown = false;
  });
  wheel.addEventListener('click', updateWheelFromEvent);
  function updateWheelFromEvent(e) {
    var rect = wheel.getBoundingClientRect();
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;

    // Get coordinates relative to center
    var x = e.clientX - rect.left - centerX;
    var y = e.clientY - rect.top - centerY;

    // Calculate distance from center (for saturation)
    var distance = Math.sqrt(x * x + y * y);
    var maxDistance = Math.min(centerX, centerY) - 2;

    // Limit to wheel boundary
    if (distance <= maxDistance) {
      // Update indicator position
      setWheelIndicatorPosition(wheel, indicator, x, y);

      // Calculate angle (for hue)
      var angle = Math.atan2(y, x);
      if (angle < 0) angle += 2 * Math.PI;

      // Normalize distance to 0-1
      var normalizedDistance = distance / maxDistance;

      // Calculate color based on position
      var _hue = angle / (2 * Math.PI);
      var _saturation = normalizedDistance;
      var rgb = hsvToRgb(_hue, _saturation, 1.0);

      // Map RGB (0-255) to tint adjustments (64-192, where 128 is neutral)
      // We use a narrower range to avoid extreme adjustments
      var mappedR = Math.round(128 + (rgb.r - 128) * _saturation);
      var mappedG = Math.round(128 + (rgb.g - 128) * _saturation);
      var mappedB = Math.round(128 + (rgb.b - 128) * _saturation);

      // Update the parameter
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels[paramName] = {
        r: mappedR,
        g: mappedG,
        b: mappedB
      };

      // Apply the adjustment to the image
      (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
    }
  }
}

// Reset color wheels to default values
function resetColorWheels() {
  // Reset to neutral tints
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.shadowTint = {
    r: 128,
    g: 128,
    b: 128
  };
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.highlightTint = {
    r: 128,
    g: 128,
    b: 128
  };
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels.tintBalance = 0;

  // Update UI
  var tintBalanceSlider = document.getElementById('tint-balance');
  var tintBalanceValue = document.getElementById('tint-balance-value');
  if (tintBalanceSlider) tintBalanceSlider.value = 0;
  if (tintBalanceValue) tintBalanceValue.textContent = '0.0';

  // Reset wheel indicators
  var shadowColorWheel = document.getElementById('shadow-color-wheel');
  var highlightColorWheel = document.getElementById('highlight-color-wheel');
  if (shadowColorWheel) {
    var shadowIndicator = shadowColorWheel.querySelector('.wheel-indicator');
    if (shadowIndicator) {
      setWheelIndicatorPosition(shadowColorWheel, shadowIndicator, 0, 0);
    }
  }
  if (highlightColorWheel) {
    var highlightIndicator = highlightColorWheel.querySelector('.wheel-indicator');
    if (highlightIndicator) {
      setWheelIndicatorPosition(highlightColorWheel, highlightIndicator, 0, 0);
    }
  }

  // Apply changes to image
  (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
}

// Set up section toggle for expandable sections
function setupSectionToggle(toggleId, sectionId) {
  var toggle = document.getElementById(toggleId);
  var section = document.getElementById(sectionId);
  if (toggle && section) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('expanded');
      section.classList.toggle('expanded');
    });
  }
}

// Helper for setting wheel indicator position
function setWheelIndicatorPosition(wheel, indicator, x, y) {
  var centerX = wheel.clientWidth / 2;
  var centerY = wheel.clientHeight / 2;
  indicator.style.left = "".concat(centerX + x, "px");
  indicator.style.top = "".concat(centerY + y, "px");
}

// Convert HSV (0-1 ranges) to RGB (0-255)
function hsvToRgb(h, s, v) {
  var r, g, b;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Apply color wheel tinting to an image
function applyColorWheelAdjustments(imageData) {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels;
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    // Get RGB values and normalize to 0-1
    var r = data[i] / 255;
    var g = data[i + 1] / 255;
    var b = data[i + 2] / 255;

    // Apply color wheels tinting
    var result = applyColorWheels(r, g, b, params.shadowTint, params.highlightTint, params.tintBalance / 150);

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
  var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Calculate shadow and highlight influence based on luminance
  var shadowInfluence = Math.pow(1 - luminance, 2);
  var highlightInfluence = Math.pow(luminance, 2);

  // Apply tint balance to adjust the crossover point
  if (tintBalance > 0) {
    // Shift influence towards highlights
    shadowInfluence *= 1 - tintBalance;
    highlightInfluence = highlightInfluence * (1 - tintBalance) + tintBalance;
  } else if (tintBalance < 0) {
    // Shift influence towards shadows
    highlightInfluence *= 1 + tintBalance;
    shadowInfluence = shadowInfluence * (1 + tintBalance) - tintBalance;
  }

  // Convert shadow tint from 0-255 to -1 to 1 range (128 is neutral)
  var shadowR = (shadowTint.r - 128) / 128;
  var shadowG = (shadowTint.g - 128) / 128;
  var shadowB = (shadowTint.b - 128) / 128;

  // Convert highlight tint from 0-255 to -1 to 1 range (128 is neutral)
  var highlightR = (highlightTint.r - 128) / 128;
  var highlightG = (highlightTint.g - 128) / 128;
  var highlightB = (highlightTint.b - 128) / 128;

  // Apply shadow tint
  r += shadowR * shadowInfluence * 0.5;
  g += shadowG * shadowInfluence * 0.5;
  b += shadowB * shadowInfluence * 0.5;

  // Apply highlight tint
  r += highlightR * highlightInfluence * 0.5;
  g += highlightG * highlightInfluence * 0.5;
  b += highlightB * highlightInfluence * 0.5;
  return {
    r: r,
    g: g,
    b: b
  };
}

// Export functions for use in other modules


/***/ }),

/***/ "./lots-app/src/components/common/ui-elements.js":
/*!*******************************************************!*\
  !*** ./lots-app/src/components/common/ui-elements.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initUiElements: () => (/* binding */ initUiElements),
/* harmony export */   showConfirmDialog: () => (/* binding */ showConfirmDialog),
/* harmony export */   showToast: () => (/* binding */ showToast),
/* harmony export */   updateLUTPreview: () => (/* binding */ updateLUTPreview)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// components/common/ui-elements.js
// Import app state if needed


// Initialize common UI elements
function initUiElements() {
  console.log('Initializing UI Elements');

  // Initialize modal functionality
  initModals();

  // Initialize expandable sections
  initExpandableSections();

  // Initialize window control buttons
  initWindowControls();
}

// Initialize modal dialogs
function initModals() {
  // Code Preview Modal
  var viewCodeBtn = document.getElementById('view-code-btn');
  var viewCodeBtnAdvanced = document.getElementById('view-code-btn-advanced');
  var codeModal = document.getElementById('code-modal');
  var closeModalBtn = document.getElementById('close-modal-btn');
  if (viewCodeBtn && codeModal) {
    viewCodeBtn.addEventListener('click', function () {
      // Update the code preview with current LUT
      updateLUTPreview(true);
      // Show the modal
      codeModal.style.display = 'block';
    });
  }
  if (viewCodeBtnAdvanced && codeModal) {
    viewCodeBtnAdvanced.addEventListener('click', function () {
      // Update the code preview with current LUT
      updateLUTPreview(true);
      // Show the modal
      codeModal.style.display = 'block';
    });
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      // Hide any open modal
      var modals = document.querySelectorAll('.modal');
      modals.forEach(function (modal) {
        modal.style.display = 'none';
      });
    });
  }

  // Close modals when clicking outside content
  window.addEventListener('click', function (e) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

// Update LUT preview in code modal
function updateLUTPreview() {
  var fullPreview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var lutPreview = document.getElementById('lut-preview');
  if (!lutPreview) return;

  // Get LUT content from generator (to be implemented)
  var lutContent = "# LUT Preview will be generated here";

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

// Initialize expandable sections
function initExpandableSections() {
  // Define sections to initialize as expanded or collapsed
  var sections = [{
    toggle: 'basic-correction-toggle',
    content: 'basic-correction-section',
    expanded: true
  }, {
    toggle: 'creative-toggle',
    content: 'creative-section',
    expanded: false
  }, {
    toggle: 'color-wheels-toggle',
    content: 'color-wheels-section',
    expanded: false
  }, {
    toggle: 'curves-toggle',
    content: 'curves-section',
    expanded: false
  }];
  sections.forEach(function (section) {
    var toggle = document.getElementById(section.toggle);
    var content = document.getElementById(section.content);
    if (toggle && content) {
      // Set initial state
      if (section.expanded) {
        toggle.classList.add('expanded');
        content.classList.add('expanded');
      }
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('expanded');
        content.classList.toggle('expanded');
      });
    }
  });
}

// Initialize window control buttons for Electron
function initWindowControls() {
  var minimizeBtn = document.getElementById('minimize-btn');
  var maximizeBtn = document.getElementById('maximize-btn');
  var closeBtn = document.getElementById('close-btn');
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('minimize');
      }
    });
  }
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('maximize');
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (window.electronAPI) {
        window.electronAPI.windowControl('close');
      }
    });
  }
}

// Create a simple toast notification
function showToast(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
  // Create toast container if it doesn't exist
  var toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  var toast = document.createElement('div');
  toast.className = "toast toast-".concat(type);
  toast.textContent = message;

  // Add to container
  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(function () {
    toast.classList.add('show');
  }, 10);

  // Remove after duration
  setTimeout(function () {
    toast.classList.remove('show');

    // Remove from DOM after animation completes
    setTimeout(function () {
      toastContainer.removeChild(toast);
    }, 300);
  }, duration);
  return toast;
}

// Create a confirmation dialog
function showConfirmDialog(message, onConfirm, onCancel) {
  // Create dialog
  var dialogOverlay = document.createElement('div');
  dialogOverlay.className = 'dialog-overlay';
  var dialogBox = document.createElement('div');
  dialogBox.className = 'dialog-box';
  var messageEl = document.createElement('p');
  messageEl.textContent = message;
  var buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'dialog-buttons';
  var confirmBtn = document.createElement('button');
  confirmBtn.className = 'primary';
  confirmBtn.textContent = 'Confirm';
  var cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';

  // Add elements to DOM
  buttonsContainer.appendChild(cancelBtn);
  buttonsContainer.appendChild(confirmBtn);
  dialogBox.appendChild(messageEl);
  dialogBox.appendChild(buttonsContainer);
  dialogOverlay.appendChild(dialogBox);
  document.body.appendChild(dialogOverlay);

  // Add event listeners
  confirmBtn.addEventListener('click', function () {
    if (onConfirm) onConfirm();
    document.body.removeChild(dialogOverlay);
  });
  cancelBtn.addEventListener('click', function () {
    if (onCancel) onCancel();
    document.body.removeChild(dialogOverlay);
  });

  // Also close on overlay click
  dialogOverlay.addEventListener('click', function (e) {
    if (e.target === dialogOverlay) {
      if (onCancel) onCancel();
      document.body.removeChild(dialogOverlay);
    }
  });
  return dialogOverlay;
}

/***/ }),

/***/ "./lots-app/src/components/creative/creative-effects.js":
/*!**************************************************************!*\
  !*** ./lots-app/src/components/creative/creative-effects.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyCreativeEffects: () => (/* binding */ applyCreativeEffects),
/* harmony export */   applyFadedFilm: () => (/* binding */ applyFadedFilm),
/* harmony export */   applyVibrance: () => (/* binding */ applyVibrance),
/* harmony export */   initCreativeEffects: () => (/* binding */ initCreativeEffects)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// Import app state and functions


// Initialize the Creative Effects component
function initCreativeEffects() {
  console.log('Initializing Creative Effects');

  // Initialize creative effect parameters if not present
  if (!_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative = {
      fadedFilm: 0,
      vibrance: 0
    };
  }

  // Get slider references
  var fadedFilmSlider = document.getElementById('faded-film');
  var vibranceSlider = document.getElementById('vibrance');

  // Display value references
  var fadedFilmValue = document.getElementById('faded-film-value');
  var vibranceValue = document.getElementById('vibrance-value');

  // Set up event listeners for sliders
  setupSlider(fadedFilmSlider, fadedFilmValue, 'fadedFilm');
  setupSlider(vibranceSlider, vibranceValue, 'vibrance');

  // Set up section toggle
  setupSectionToggle('creative-toggle', 'creative-section');
}

// Set up a slider control with its value display
function setupSlider(slider, valueDisplay, paramName) {
  if (!slider || !valueDisplay) return;

  // Set initial value from app state
  slider.value = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative[paramName];
  valueDisplay.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative[paramName].toFixed(1);

  // Add event listener
  slider.addEventListener('input', function () {
    // Update parameter in app state
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative[paramName] = parseFloat(slider.value);

    // Update display value
    valueDisplay.textContent = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative[paramName].toFixed(1);

    // Apply adjustments to image
    (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
  });
}

// Set up section toggle for expandable sections
function setupSectionToggle(toggleId, sectionId) {
  var toggle = document.getElementById(toggleId);
  var section = document.getElementById(sectionId);
  if (toggle && section) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('expanded');
      section.classList.toggle('expanded');
    });
  }
}

// Apply creative effects to image data
function applyCreativeEffects(imageData) {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.creative;
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    // Get RGB values (0-255) and normalize to 0-1
    var r = data[i] / 255;
    var g = data[i + 1] / 255;
    var b = data[i + 2] / 255;

    // Apply vibrance if enabled
    if (params.vibrance !== 0) {
      var result = applyVibrance(r, g, b, params.vibrance / 150);
      r = result.r;
      g = result.g;
      b = result.b;
    }

    // Apply faded film effect if enabled
    if (params.fadedFilm > 0) {
      var _result = applyFadedFilm(r, g, b, params.fadedFilm / 100);
      r = _result.r;
      g = _result.g;
      b = _result.b;
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

// Apply vibrance adjustment
function applyVibrance(r, g, b, amount) {
  // Calculate luminance
  var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Calculate saturation level to determine vibrance effect
  var maxChannel = Math.max(r, g, b);
  var minChannel = Math.min(r, g, b);
  var saturationLevel = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;

  // Apply vibrance (affects less saturated colors more)
  var vibranceEffect = amount * (1 - saturationLevel);

  // Apply the effect to each channel
  r = luminance + (r - luminance) * (1 + vibranceEffect);
  g = luminance + (g - luminance) * (1 + vibranceEffect);
  b = luminance + (b - luminance) * (1 + vibranceEffect);
  return {
    r: r,
    g: g,
    b: b
  };
}

// Apply faded film effect
function applyFadedFilm(r, g, b, amount) {
  // Faded film effect reduces contrast and slightly shifts the black point
  var fadeAmount = amount * 0.5; // Adjust the strength

  // Reduce contrast
  r = r * (1 - fadeAmount) + 0.5 * fadeAmount;
  g = g * (1 - fadeAmount) + 0.5 * fadeAmount;
  b = b * (1 - fadeAmount) + 0.5 * fadeAmount;

  // Add a slight shift to the black point
  var blackShift = amount * 0.1;
  r += blackShift;
  g += blackShift;
  b += blackShift;
  return {
    r: r,
    g: g,
    b: b
  };
}

// Export functions and utilities


/***/ }),

/***/ "./lots-app/src/components/curves/curves-panel.js":
/*!********************************************************!*\
  !*** ./lots-app/src/components/curves/curves-panel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyCurvesToImage: () => (/* binding */ applyCurvesToImage),
/* harmony export */   defaultCurveParams: () => (/* binding */ defaultCurveParams),
/* harmony export */   initCurvesPanel: () => (/* binding */ initCurvesPanel),
/* harmony export */   interpolateCurve: () => (/* binding */ interpolateCurve),
/* harmony export */   isLinearCurve: () => (/* binding */ isLinearCurve)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// components/curves/curves-panel.js
// Import app state and functions


// Default curve parameters
var defaultCurveParams = {
  rgb: [{
    x: 0,
    y: 0
  },
  // Shadow point
  {
    x: 0.25,
    y: 0.25
  },
  // Quarter tone
  {
    x: 0.5,
    y: 0.5
  },
  // Midtone
  {
    x: 0.75,
    y: 0.75
  },
  // Three-quarter tone
  {
    x: 1,
    y: 1
  } // Highlight point
  ],
  red: [{
    x: 0,
    y: 0
  }, {
    x: 0.25,
    y: 0.25
  }, {
    x: 0.5,
    y: 0.5
  }, {
    x: 0.75,
    y: 0.75
  }, {
    x: 1,
    y: 1
  }],
  green: [{
    x: 0,
    y: 0
  }, {
    x: 0.25,
    y: 0.25
  }, {
    x: 0.5,
    y: 0.5
  }, {
    x: 0.75,
    y: 0.75
  }, {
    x: 1,
    y: 1
  }],
  blue: [{
    x: 0,
    y: 0
  }, {
    x: 0.25,
    y: 0.25
  }, {
    x: 0.5,
    y: 0.5
  }, {
    x: 0.75,
    y: 0.75
  }, {
    x: 1,
    y: 1
  }],
  currentChannel: 'rgb'
};

// Check if a curve is linear (no adjustments)
function isLinearCurve(points) {
  for (var i = 0; i < points.length; i++) {
    var expectedY = points[i].x;
    if (Math.abs(points[i].y - expectedY) > 0.01) {
      return false;
    }
  }
  return true;
}

// Interpolate a value through a curve
function interpolateCurve(points, value) {
  // Handle edge cases
  if (value <= 0) return points[0].y;
  if (value >= 1) return points[points.length - 1].y;

  // Find the segment containing the value
  var i = 0;
  while (i < points.length - 1 && points[i + 1].x < value) {
    i++;
  }

  // Linear interpolation between points
  var p1 = points[i];
  var p2 = points[i + 1];
  var t = (value - p1.x) / (p2.x - p1.x);
  return p1.y + t * (p2.y - p1.y);
}

// Main Curves class
var CurvesPanel = /*#__PURE__*/function () {
  function CurvesPanel() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CurvesPanel);
    // Merge provided params with defaults
    this.params = _objectSpread(_objectSpread({}, JSON.parse(JSON.stringify(defaultCurveParams))), params);

    // DOM references
    this.curveCanvas = null;
    this.curveCtx = null;
    this.channelButtons = {};
    this.activePoint = null;

    // Bind methods to maintain correct context
    this.init = this.init.bind(this);
    this.drawCurve = this.drawCurve.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.resetCurve = this.resetCurve.bind(this);
  }

  // Initialize the curves panel UI
  return _createClass(CurvesPanel, [{
    key: "init",
    value: function init() {
      console.log('Initializing Curves Panel');

      // Get references to curve UI elements
      this.curveCanvas = document.getElementById('curve-canvas');
      if (!this.curveCanvas) {
        console.warn('Curve canvas not found');
        return;
      }
      this.curveCtx = this.curveCanvas.getContext('2d');

      // Get channel selector buttons
      this.channelButtons = {
        rgb: document.getElementById('curve-rgb'),
        red: document.getElementById('curve-red'),
        green: document.getElementById('curve-green'),
        blue: document.getElementById('curve-blue')
      };

      // Set up event listeners
      this.setupEvents();

      // Initial UI setup
      this.updateChannelButtonUI();

      // Initialize by drawing the curve
      this.drawCurve();
    }

    // Set up all event listeners
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;
      // Ensure methods are bound
      if (!this.curveCanvas) return;

      // Canvas event handling
      this.curveCanvas.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);

      // Channel selector buttons
      var _loop = function _loop(channel) {
        var btn = _this.channelButtons[channel];
        if (btn) {
          btn.addEventListener('click', function () {
            // Set active channel
            _this.params.currentChannel = channel;

            // Update UI
            _this.updateChannelButtonUI();
            _this.drawCurve();
          });
        }
      };
      for (var channel in this.channelButtons) {
        _loop(channel);
      }

      // Reset button
      var resetCurveBtn = document.getElementById('reset-curve-btn');
      if (resetCurveBtn) {
        resetCurveBtn.addEventListener('click', this.resetCurve);
      }
    }

    // Update channel button UI
  }, {
    key: "updateChannelButtonUI",
    value: function updateChannelButtonUI() {
      for (var channel in this.channelButtons) {
        var btn = this.channelButtons[channel];
        if (btn) {
          if (channel === this.params.currentChannel) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        }
      }
    }

    // Reset curve to linear
  }, {
    key: "resetCurve",
    value: function resetCurve() {
      console.log('Resetting curve');

      // Reset current channel to default linear curve
      this.params[this.params.currentChannel] = JSON.parse(JSON.stringify(defaultCurveParams[this.params.currentChannel]));

      // Redraw
      this.drawCurve();

      // Apply to image if available
      if (typeof _app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments === 'function') {
        (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
      }
    }

    // Draw the curve onto the canvas
  }, {
    key: "drawCurve",
    value: function drawCurve() {
      var _this2 = this;
      if (!this.curveCanvas || !this.curveCtx) {
        console.warn('Canvas not ready for drawing');
        return;
      }
      var width = this.curveCanvas.width;
      var height = this.curveCanvas.height;

      // Clear canvas
      this.curveCtx.clearRect(0, 0, width, height);

      // Get current channel curve points
      var points = this.params[this.params.currentChannel];

      // Draw curve background
      this.curveCtx.fillStyle = 'rgba(20, 20, 20, 0.3)';
      this.curveCtx.fillRect(0, 0, width, height);

      // Set curve color based on channel
      var curveColor;
      switch (this.params.currentChannel) {
        case 'red':
          curveColor = 'rgba(255, 100, 100, 0.8)';
          break;
        case 'green':
          curveColor = 'rgba(100, 255, 100, 0.8)';
          break;
        case 'blue':
          curveColor = 'rgba(100, 100, 255, 0.8)';
          break;
        default:
          curveColor = 'rgba(255, 255, 255, 0.8)';
      }

      // Start drawing the curve
      this.curveCtx.beginPath();

      // Move to first point
      this.curveCtx.moveTo(points[0].x * width, (1 - points[0].y) * height);

      // Draw line segments
      for (var i = 1; i < points.length; i++) {
        this.curveCtx.lineTo(points[i].x * width, (1 - points[i].y) * height);
      }

      // Style and stroke the path
      this.curveCtx.strokeStyle = curveColor;
      this.curveCtx.lineWidth = 2;
      this.curveCtx.stroke();

      // Draw control points
      points.forEach(function (point, index) {
        _this2.curveCtx.beginPath();
        _this2.curveCtx.arc(point.x * width, (1 - point.y) * height, 5, 0, Math.PI * 2);

        // Style based on whether it's an endpoint (fixed) or not
        if (index === 0 || index === points.length - 1) {
          _this2.curveCtx.fillStyle = 'rgba(150, 150, 150, 0.8)';
        } else {
          _this2.curveCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        }
        _this2.curveCtx.fill();
        _this2.curveCtx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        _this2.curveCtx.lineWidth = 1;
        _this2.curveCtx.stroke();
      });
    }

    // Handle mouse down on curve
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      if (!this.curveCanvas) return;
      var rect = this.curveCanvas.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = 1 - (e.clientY - rect.top) / rect.height;

      // Get current channel points
      var points = this.params[this.params.currentChannel];

      // Find closest control point
      var minDistance = Infinity;
      var closestPoint = null;
      var pointIndex = -1;
      points.forEach(function (point, index) {
        var dx = point.x - x;
        var dy = point.y - y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
          pointIndex = index;
        }
      });

      // If close enough to a point, make it active
      if (minDistance < 0.05) {
        // Don't allow moving first or last point
        if (pointIndex > 0 && pointIndex < points.length - 1) {
          this.activePoint = {
            point: closestPoint,
            index: pointIndex
          };
        }
      }
    }

    // Handle mouse move for curve editing
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      if (!this.activePoint || !this.curveCanvas) return;
      var rect = this.curveCanvas.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = 1 - (e.clientY - rect.top) / rect.height;

      // Clamp values
      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));
      var points = this.params[this.params.currentChannel];
      var index = this.activePoint.index;

      // Enforce x ordering and prevent moving end points
      var prevX = points[index - 1].x;
      var nextX = points[index + 1].x;

      // Ensure point stays between its neighbors
      x = Math.max(prevX + 0.01, Math.min(nextX - 0.01, x));

      // Update point
      points[index].x = x;
      points[index].y = y;

      // Redraw
      this.drawCurve();

      // Apply adjustments if function exists
      if (typeof _app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments === 'function') {
        (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
      }
    }

    // Handle mouse up for curve editing
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      // Clear active point
      this.activePoint = null;
    }

    // Apply curves to RGB values
  }, {
    key: "applyCurves",
    value: function applyCurves(r, g, b) {
      // Apply RGB curve
      var rgbPoints = this.params.rgb;
      r = interpolateCurve(rgbPoints, r);
      g = interpolateCurve(rgbPoints, g);
      b = interpolateCurve(rgbPoints, b);

      // Apply individual channel curves if not linear
      if (!isLinearCurve(this.params.red)) {
        r = interpolateCurve(this.params.red, r);
      }
      if (!isLinearCurve(this.params.green)) {
        g = interpolateCurve(this.params.green, g);
      }
      if (!isLinearCurve(this.params.blue)) {
        b = interpolateCurve(this.params.blue, b);
      }
      return {
        r: r,
        g: g,
        b: b
      };
    }

    // Apply curves to an entire image
  }, {
    key: "applyCurvesToImage",
    value: function applyCurvesToImage(imageData) {
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        // Get RGB values and normalize to 0-1
        var r = data[i] / 255;
        var g = data[i + 1] / 255;
        var b = data[i + 2] / 255;

        // Apply curves
        var result = this.applyCurves(r, g, b);

        // Convert back to 0-255 range
        data[i] = Math.round(result.r * 255);
        data[i + 1] = Math.round(result.g * 255);
        data[i + 2] = Math.round(result.b * 255);
        // Alpha remains unchanged
      }
      return imageData;
    }
  }]);
}(); // Single instance for the app
var curvesPanel = null;

// Initialize the curves panel
function initCurvesPanel() {
  console.log('Setting up Curves Panel');

  // Initialize curves parameters in app state if not present
  if (!_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.curves) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.curves = JSON.parse(JSON.stringify(defaultCurveParams));
  }

  // Create the curves panel with parameters from app state
  curvesPanel = new CurvesPanel(_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.curves);

  // Set up section toggle
  setupSectionToggle('curves-toggle', 'curves-section');

  // Initialize when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function () {
      return curvesPanel.init();
    }, 0);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      return curvesPanel.init();
    });
  }

  // Store reference in app state
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.curvesPanel = curvesPanel;
}

// Set up section toggle for expandable sections
function setupSectionToggle(toggleId, sectionId) {
  var toggle = document.getElementById(toggleId);
  var section = document.getElementById(sectionId);
  if (toggle && section) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('expanded');
      section.classList.toggle('expanded');
    });
  }
}

// Apply curves to an image
function applyCurvesToImage(imageData) {
  if (curvesPanel) {
    return curvesPanel.applyCurvesToImage(imageData);
  }
  return imageData;
}

/***/ }),

/***/ "./lots-app/src/components/image-preview/image-comparison.js":
/*!*******************************************************************!*\
  !*** ./lots-app/src/components/image-preview/image-comparison.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   initImageComparison: () => (/* binding */ initImageComparison)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// Import app state


// Initialize image comparison
function initImageComparison() {
  console.log('Initializing Image Comparison');
  // Will implement comparison slider functionality 
}

// Export functions
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  initImageComparison: initImageComparison
});

/***/ }),

/***/ "./lots-app/src/components/image-preview/preview-controller.js":
/*!*********************************************************************!*\
  !*** ./lots-app/src/components/image-preview/preview-controller.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentSliderPosition: () => (/* binding */ currentSliderPosition),
/* harmony export */   initPreviewController: () => (/* binding */ initPreviewController),
/* harmony export */   setViewMode: () => (/* binding */ setViewMode)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
// Import utilities if needed


// Keep track of slider position
var currentSliderPosition = 50;

// Initialize the preview controller
function initPreviewController() {
  console.log('Initializing Preview Controller');

  // Get DOM elements
  var originalImage = document.getElementById('original-image');
  var processedImage = document.getElementById('processed-image');
  var originalPlaceholder = document.getElementById('original-placeholder');
  var comparisonContainer = document.getElementById('comparison-container');
  var imageUploadBtn = document.getElementById('image-upload-btn');

  // Store references to the DOM elements in the global app state
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.originalImageElement = originalImage;
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.processedImageElement = processedImage;

  // Set up view toggle buttons
  setupViewToggleButtons();

  // Set up image upload button
  if (imageUploadBtn) {
    imageUploadBtn.addEventListener('click', handleImageUpload);
  }

  // Set up image load handler
  if (originalImage) {
    originalImage.onload = function () {
      console.log("Image loaded successfully");

      // Store the image in app state
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.originalImage = originalImage;
      _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.processedImage = processedImage;

      // Hide placeholder, show comparison container
      if (originalPlaceholder) originalPlaceholder.style.display = 'none';
      if (comparisonContainer) comparisonContainer.style.display = 'block';

      // Initialize comparison slider
      initComparisonSlider();

      // Apply adjustments to process the image
      (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
    };
  }
}

// Set up view toggle buttons (split, before, after)
function setupViewToggleButtons() {
  var viewSplitBtn = document.getElementById('view-split');
  var viewBeforeBtn = document.getElementById('view-before');
  var viewAfterBtn = document.getElementById('view-after');
  if (viewSplitBtn) {
    viewSplitBtn.addEventListener('click', function () {
      setViewMode('split');
    });
  }
  if (viewBeforeBtn) {
    viewBeforeBtn.addEventListener('click', function () {
      setViewMode('before');
    });
  }
  if (viewAfterBtn) {
    viewAfterBtn.addEventListener('click', function () {
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
      filters: [{
        name: 'Images',
        extensions: ['jpg', 'jpeg', 'png', 'bmp']
      }]
    }).then(function (imagePath) {
      if (imagePath) {
        console.log("Selected image:", imagePath);
        _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.originalImageElement.src = "file://".concat(imagePath);
      }
    })["catch"](function (error) {
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
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', function (e) {
    if (this.files && this.files[0]) {
      var file = this.files[0];
      console.log("Selected file:", file.name);
      var reader = new FileReader();
      reader.onload = function (event) {
        _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.originalImageElement.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  input.click();
}

// Initialize comparison slider functionality
function initComparisonSlider() {
  var comparisonContainer = document.getElementById('comparison-container');
  var originalImageContainer = document.getElementById('original-image-container');
  var comparisonSlider = document.getElementById('comparison-slider');
  var verticalDivider = document.getElementById('vertical-divider');
  var isSliding = false;
  var startX = 0;
  var startPercent = 50;

  // Function to update slider position
  function updateSliderPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));

    // Store the current position
    currentSliderPosition = percent;

    // Update the clip-path of the original image container
    originalImageContainer.style.clipPath = "inset(0 ".concat(100 - percent, "% 0 0)");

    // Update slider position
    comparisonSlider.style.left = percent + '%';

    // Update vertical divider position
    verticalDivider.style.left = percent + '%';
  }

  // Handle mouse events
  comparisonSlider.addEventListener('mousedown', function (e) {
    isSliding = true;
    startX = e.clientX;

    // Get current slider position
    var sliderLeft = parseFloat(comparisonSlider.style.left) || currentSliderPosition;
    startPercent = sliderLeft;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!isSliding) return;
    var rect = comparisonContainer.getBoundingClientRect();
    var deltaX = e.clientX - startX;
    var deltaPercent = deltaX / rect.width * 100;
    updateSliderPosition(startPercent + deltaPercent);
    e.preventDefault();
  });
  document.addEventListener('mouseup', function () {
    isSliding = false;
  });

  // Handle touch events
  comparisonSlider.addEventListener('touchstart', function (e) {
    isSliding = true;
    startX = e.touches[0].clientX;

    // Get current slider position
    var sliderLeft = parseFloat(comparisonSlider.style.left) || currentSliderPosition;
    startPercent = sliderLeft;
    e.preventDefault();
  });
  document.addEventListener('touchmove', function (e) {
    if (!isSliding) return;
    var rect = comparisonContainer.getBoundingClientRect();
    var deltaX = e.touches[0].clientX - startX;
    var deltaPercent = deltaX / rect.width * 100;
    updateSliderPosition(startPercent + deltaPercent);
    e.preventDefault();
  });
  document.addEventListener('touchend', function () {
    isSliding = false;
  });

  // Click anywhere in container to move slider
  comparisonContainer.addEventListener('click', function (e) {
    if (e.target.closest('.toggle-view') || e.target.closest('.slider-handle')) return;
    var rect = comparisonContainer.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var percent = clickX / rect.width * 100;
    updateSliderPosition(percent);
  });

  // Initialize with 50/50 split or restore previous position
  updateSliderPosition(currentSliderPosition);
}

// Set view mode (split, before, after)
function setViewMode(mode) {
  var resetPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var viewSplitBtn = document.getElementById('view-split');
  var viewBeforeBtn = document.getElementById('view-before');
  var viewAfterBtn = document.getElementById('view-after');
  var originalImageContainer = document.getElementById('original-image-container');
  var comparisonSlider = document.getElementById('comparison-slider');
  var verticalDivider = document.getElementById('vertical-divider');

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
      originalImageContainer.style.clipPath = "inset(0 ".concat(100 - currentSliderPosition, "% 0 0)");
      verticalDivider.style.left = "".concat(currentSliderPosition, "%");
      comparisonSlider.style.left = "".concat(currentSliderPosition, "%");

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


/***/ }),

/***/ "./lots-app/src/components/presets/presets.js":
/*!****************************************************!*\
  !*** ./lots-app/src/components/presets/presets.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyPreset: () => (/* binding */ applyPreset),
/* harmony export */   builtInPresets: () => (/* binding */ builtInPresets),
/* harmony export */   initPresets: () => (/* binding */ initPresets),
/* harmony export */   saveCurrentAsPreset: () => (/* binding */ saveCurrentAsPreset),
/* harmony export */   userPresets: () => (/* binding */ userPresets)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.js */ "./lots-app/src/app.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Import app state and functions


// Define built-in presets
var builtInPresets = {
  "custom": {
    contrast: 1.2,
    saturation: 1.15,
    redBalance: 1.05,
    greenBalance: 0.95,
    blueBalance: 1.1,
    shadowsShift: [0.05, 0.0, -0.05],
    highlightsShift: [0.03, 0.03, 0.0]
  },
  "warm": {
    contrast: 1.1,
    saturation: 0.9,
    redBalance: 1.15,
    greenBalance: 0.95,
    blueBalance: 0.85,
    shadowsShift: [0.08, 0.02, -0.05],
    highlightsShift: [0.05, 0.0, -0.05]
  },
  "cool": {
    contrast: 1.3,
    saturation: 0.85,
    redBalance: 0.9,
    greenBalance: 1.0,
    blueBalance: 1.2,
    shadowsShift: [-0.03, 0.0, 0.08],
    highlightsShift: [0.0, 0.0, 0.03]
  },
  "bw": {
    contrast: 1.5,
    saturation: 0.0,
    redBalance: 0.33,
    greenBalance: 0.33,
    blueBalance: 0.33,
    shadowsShift: [-0.05, -0.05, -0.05],
    highlightsShift: [0.05, 0.05, 0.05]
  },
  "film": {
    contrast: 0.9,
    saturation: 0.8,
    redBalance: 1.1,
    greenBalance: 1.05,
    blueBalance: 0.9,
    shadowsShift: [0.1, 0.05, 0.0],
    highlightsShift: [-0.02, -0.02, 0.05]
  }
};

// Initialize user presets
var userPresets = {};

// Initialize the Presets component
function initPresets() {
  console.log('Initializing Presets');

  // Initialize preset buttons
  var presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      presetButtons.forEach(function (b) {
        return b.classList.remove('active');
      });

      // Add active class to clicked button
      btn.classList.add('active');

      // Get preset id from button id
      var presetId = btn.id.split('-')[1];

      // Apply the preset
      applyPreset(presetId);
    });
  });

  // Load any saved user presets
  loadUserPresets();
}

// Apply a preset by its ID
function applyPreset(presetId) {
  // Look for preset in built-in presets first, then user presets
  var preset = builtInPresets[presetId] || userPresets[presetId];
  if (!preset) {
    console.warn("Preset '".concat(presetId, "' not found"));
    return;
  }
  console.log("Applying preset: ".concat(presetId));

  // Store the active preset ID
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.activePresetId = presetId;

  // Apply preset to basic parameters
  if (!_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic = {};
  }

  // Copy preset values to app state
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.contrast = preset.contrast;
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.saturation = preset.saturation;
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.redBalance = preset.redBalance;
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.greenBalance = preset.greenBalance;
  _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.blueBalance = preset.blueBalance;

  // Set shadows and highlights shift if present
  if (preset.shadowsShift) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.shadowsShift = _toConsumableArray(preset.shadowsShift);
  }
  if (preset.highlightsShift) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.highlightsShift = _toConsumableArray(preset.highlightsShift);
  }

  // If advanced parameters are in the preset, apply them too
  if (preset.advanced) {
    applyAdvancedPreset(preset.advanced);
  }

  // Update UI sliders to reflect new values
  updateSlidersFromPreset();

  // Apply adjustments to image
  (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.applyImageAdjustments)();
}

// Apply advanced preset parameters if present
function applyAdvancedPreset(advancedParams) {
  // Apply Lumetri-style parameters if they exist in the preset
  if (advancedParams.temperature !== undefined && _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri.temperature = advancedParams.temperature;
  }
  if (advancedParams.tint !== undefined && _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri) {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri.tint = advancedParams.tint;
  }

  // Add more advanced parameters as needed
}

// Update UI sliders to reflect preset values
function updateSlidersFromPreset() {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic;

  // Update basic sliders
  updateSlider('contrast', params.contrast);
  updateSlider('saturation', params.saturation);
  updateSlider('red-balance', params.redBalance);
  updateSlider('green-balance', params.greenBalance);
  updateSlider('blue-balance', params.blueBalance);
}

// Helper to update a slider and its value display
function updateSlider(sliderId, value) {
  var slider = document.getElementById(sliderId);
  var valueDisplay = document.getElementById("".concat(sliderId, "-value"));
  if (slider) {
    slider.value = value;
  }
  if (valueDisplay) {
    valueDisplay.textContent = value.toFixed(2);
  }
}

// Save the current settings as a user preset
function saveCurrentAsPreset(presetName) {
  if (!presetName) return;

  // Create a preset from current settings
  var newPreset = {
    contrast: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.contrast,
    saturation: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.saturation,
    redBalance: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.redBalance,
    greenBalance: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.greenBalance,
    blueBalance: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.blueBalance
  };

  // Add shadows and highlights shift if present
  if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.shadowsShift) {
    newPreset.shadowsShift = _toConsumableArray(_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.shadowsShift);
  }
  if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.highlightsShift) {
    newPreset.highlightsShift = _toConsumableArray(_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic.highlightsShift);
  }

  // Add advanced parameters if in advanced mode
  if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.activeMode === 'advanced' && _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri) {
    newPreset.advanced = {
      temperature: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri.temperature,
      tint: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri.tint
      // Add other advanced parameters
    };
  }

  // Save to user presets
  userPresets[presetName] = newPreset;

  // Save to local storage
  saveUserPresets();

  // Add the preset to UI
  addPresetToUI(presetName);
  console.log("Saved preset: ".concat(presetName));
}

// Add a user preset to the UI
function addPresetToUI(presetName) {
  // This function would add a new preset button to the UI
  // Implementation would depend on how you want to handle user presets in the UI
  console.log("Added preset to UI: ".concat(presetName));
}

// Save user presets to local storage
function saveUserPresets() {
  try {
    localStorage.setItem('lotsAppUserPresets', JSON.stringify(userPresets));
  } catch (error) {
    console.error('Failed to save user presets:', error);
  }
}

// Load user presets from local storage
function loadUserPresets() {
  try {
    var savedPresets = localStorage.getItem('lotsAppUserPresets');
    if (savedPresets) {
      userPresets = JSON.parse(savedPresets);
      console.log('Loaded user presets:', Object.keys(userPresets));
    }
  } catch (error) {
    console.error('Failed to load user presets:', error);
  }
}

// Export functions and constants


/***/ }),

/***/ "./lots-app/src/models/image-processor.js":
/*!************************************************!*\
  !*** ./lots-app/src/models/image-processor.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAdjustmentsToImage: () => (/* binding */ applyAdjustmentsToImage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   processImage: () => (/* binding */ processImage),
/* harmony export */   processImageAdvanced: () => (/* binding */ processImageAdvanced),
/* harmony export */   processImageBasic: () => (/* binding */ processImageBasic)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./lots-app/src/app.js");
/* harmony import */ var _components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/basic-corrections/basic-corrections.js */ "./lots-app/src/components/basic-corrections/basic-corrections.js");
/* harmony import */ var _components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/creative/creative-effects.js */ "./lots-app/src/components/creative/creative-effects.js");
/* harmony import */ var _components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/color-wheels/color-wheels.js */ "./lots-app/src/components/color-wheels/color-wheels.js");
/* harmony import */ var _components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/curves/curves-panel.js */ "./lots-app/src/components/curves/curves-panel.js");
// models/image-processor.js
// Import necessary functions from other modules






// Process an image with current adjustments in basic mode
function processImageBasic(originalImage) {
  console.log('Processing image with basic adjustments');
  if (!originalImage) {
    console.error('No image to process');
    return null;
  }
  try {
    // Create an offscreen canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;

    // Draw the original image onto the canvas
    ctx.drawImage(originalImage, 0, 0);

    // Get the image data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Apply basic corrections
    (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyBasicCorrections)(imageData);

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
function processImageAdvanced(originalImage) {
  console.log('Processing image with advanced adjustments');
  if (!originalImage) {
    console.error('No image to process');
    return null;
  }
  try {
    // Create an offscreen canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;

    // Draw the original image onto the canvas
    ctx.drawImage(originalImage, 0, 0);

    // Get the image data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Apply adjustments in sequence

    // 1. Apply color wheels adjustments
    (0,_components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_3__.applyColorWheelAdjustments)(imageData);

    // 2. Apply creative effects (faded film, vibrance)
    (0,_components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_2__.applyCreativeEffects)(imageData);

    // 3. Apply curves adjustments
    if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.curvesPanel) {
      (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.applyCurvesToImage)(imageData);
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
function processImage(originalImage) {
  if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.activeMode === 'basic') {
    return processImageBasic(originalImage);
  } else {
    return processImageAdvanced(originalImage);
  }
}

// Apply the current adjustments to the displayed image
function applyAdjustmentsToImage() {
  var originalImage = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.originalImageElement;
  var processedImage = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.processedImageElement;
  if (!originalImage || !processedImage) {
    console.warn('Image elements not available');
    return;
  }

  // Process the image
  var processedImageUrl = processImage(originalImage);
  if (processedImageUrl) {
    // Update the processed image with the new data
    processedImage.src = processedImageUrl;
  }
}

// Export the image processing functions
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  processImageBasic: processImageBasic,
  processImageAdvanced: processImageAdvanced,
  processImage: processImage,
  applyAdjustmentsToImage: applyAdjustmentsToImage
});

/***/ }),

/***/ "./lots-app/src/services/export-service.js":
/*!*************************************************!*\
  !*** ./lots-app/src/services/export-service.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportPreset: () => (/* binding */ exportPreset),
/* harmony export */   exportProcessedImage: () => (/* binding */ exportProcessedImage),
/* harmony export */   formatFilename: () => (/* binding */ formatFilename),
/* harmony export */   handleExportLut: () => (/* binding */ handleExportLut),
/* harmony export */   initExportService: () => (/* binding */ initExportService)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./lots-app/src/app.js");
/* harmony import */ var _file_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-service.js */ "./lots-app/src/services/file-service.js");
/* harmony import */ var _lut_generator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lut-generator.js */ "./lots-app/src/services/lut-generator.js");
/* harmony import */ var _components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/common/ui-elements.js */ "./lots-app/src/components/common/ui-elements.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// services/export-service.js
// Import app state and services





// Initialize the export service
function initExportService() {
  console.log('Initializing Export Service');

  // Set up export buttons
  setupExportButtons();
}

// Set up export button click handlers
function setupExportButtons() {
  var saveLutBtn = document.getElementById('save-lut-btn');
  var saveLutBtnAdvanced = document.getElementById('save-lut-btn-advanced');
  if (saveLutBtn) {
    saveLutBtn.addEventListener('click', handleExportLut);
  }
  if (saveLutBtnAdvanced) {
    saveLutBtnAdvanced.addEventListener('click', handleExportLut);
  }
}

// Handle the LUT export button click
function handleExportLut() {
  return _handleExportLut.apply(this, arguments);
}

// Format a filename from the LUT title
function _handleExportLut() {
  _handleExportLut = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var lutContent, defaultFilename, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Exporting LUT');
          _context.prev = 1;
          // Generate the LUT content
          lutContent = (0,_lut_generator_js__WEBPACK_IMPORTED_MODULE_2__.generateCubeLUT)(); // Format filename from title
          defaultFilename = formatFilename(_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.title); // Save the file
          _context.next = 6;
          return (0,_file_service_js__WEBPACK_IMPORTED_MODULE_1__.saveLutFile)(lutContent, defaultFilename);
        case 6:
          result = _context.sent;
          if (result) {
            console.log('LUT exported successfully');
          } else {
            console.warn('LUT export was cancelled or failed');
          }
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error('Error exporting LUT:', _context.t0);
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)('Failed to export LUT: ' + _context.t0.message, 'error');
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _handleExportLut.apply(this, arguments);
}
function formatFilename(title) {
  if (!title) return 'lut.cube';

  // Replace spaces with underscores and remove special characters
  var filename = title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();

  // Add .cube extension if not present
  if (!filename.endsWith('.cube')) {
    filename += '.cube';
  }
  return filename;
}

// Export the current image with adjustments applied
function exportProcessedImage() {
  return _exportProcessedImage.apply(this, arguments);
}

// Export all settings as a preset file
function _exportProcessedImage() {
  _exportProcessedImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var imageDataUrl, defaultName, filePath, a;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Exporting processed image');
          if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.processedImageElement) {
            _context2.next = 4;
            break;
          }
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)('No processed image to export', 'error');
          return _context2.abrupt("return", null);
        case 4:
          _context2.prev = 4;
          // Get the processed image source (already contains the applied adjustments)
          imageDataUrl = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.processedImageElement.src; // In Electron environment, we would save the file using Electron APIs
          if (!(window.electronAPI && typeof window.electronAPI.saveImage === 'function')) {
            _context2.next = 16;
            break;
          }
          defaultName = 'processed_image.jpg';
          _context2.next = 10;
          return window.electronAPI.saveImage({
            dataUrl: imageDataUrl,
            defaultPath: defaultName
          });
        case 10:
          filePath = _context2.sent;
          if (!filePath) {
            _context2.next = 14;
            break;
          }
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)("Image saved to: ".concat(filePath), 'success');
          return _context2.abrupt("return", filePath);
        case 14:
          _context2.next = 24;
          break;
        case 16:
          // Browser environment - offer download
          a = document.createElement('a');
          a.href = imageDataUrl;
          a.download = 'processed_image.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)('Image downloaded', 'success');
          return _context2.abrupt("return", 'processed_image.jpg');
        case 24:
          _context2.next = 31;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](4);
          console.error('Error exporting image:', _context2.t0);
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)('Failed to export image', 'error');
          return _context2.abrupt("return", null);
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 26]]);
  }));
  return _exportProcessedImage.apply(this, arguments);
}
function exportPreset() {
  console.log('Exporting preset');
  try {
    // Create a preset object with current settings
    var preset = {
      name: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.title || 'Unnamed Preset',
      basic: _objectSpread({}, _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic),
      advanced: {
        lumetri: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri ? _objectSpread({}, _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.lumetri) : null,
        colorWheels: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels ? _objectSpread({}, _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.colorWheels) : null,
        curves: _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.curves ? _objectSpread({}, _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.curves) : null
      },
      version: '1.0'
    };

    // Convert to JSON
    var presetJson = JSON.stringify(preset, null, 2);

    // Format filename
    var defaultFilename = "".concat(formatFilename(preset.name).replace('.cube', ''), ".lotspreset");

    // Save the file using Electron or browser download
    if (window.electronAPI && typeof window.electronAPI.savePreset === 'function') {
      return window.electronAPI.savePreset({
        content: presetJson,
        defaultPath: defaultFilename
      }).then(function (filePath) {
        if (filePath) {
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)("Preset saved to: ".concat(filePath), 'success');
          return filePath;
        }
        return null;
      });
    } else {
      // Browser environment - offer download
      var blob = new Blob([presetJson], {
        type: 'application/json'
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = defaultFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)("Preset downloaded as ".concat(defaultFilename), 'success');
      return Promise.resolve(defaultFilename);
    }
  } catch (error) {
    console.error('Error exporting preset:', error);
    (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_3__.showToast)('Failed to export preset', 'error');
    return Promise.resolve(null);
  }
}

/***/ }),

/***/ "./lots-app/src/services/file-service.js":
/*!***********************************************!*\
  !*** ./lots-app/src/services/file-service.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fallbackFileUpload: () => (/* binding */ fallbackFileUpload),
/* harmony export */   fallbackLutUpload: () => (/* binding */ fallbackLutUpload),
/* harmony export */   initFileService: () => (/* binding */ initFileService),
/* harmony export */   loadLutFile: () => (/* binding */ loadLutFile),
/* harmony export */   openImageFile: () => (/* binding */ openImageFile),
/* harmony export */   saveLutFile: () => (/* binding */ saveLutFile)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./lots-app/src/app.js");
/* harmony import */ var _components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/ui-elements.js */ "./lots-app/src/components/common/ui-elements.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// services/file-service.js
// Import app state



// Initialize the file service
function initFileService() {
  console.log('Initializing File Service');
}

// Open an image file
function openImageFile() {
  return _openImageFile.apply(this, arguments);
}

// Fallback file upload function using HTML input for browser context
function _openImageFile() {
  _openImageFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var imagePath;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Opening image file');

          // If we're in Electron environment
          if (!(window.electronAPI && typeof window.electronAPI.openFileDialog === 'function')) {
            _context.next = 19;
            break;
          }
          _context.prev = 2;
          _context.next = 5;
          return window.electronAPI.openFileDialog({
            properties: ['openFile'],
            filters: [{
              name: 'Images',
              extensions: ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif']
            }]
          });
        case 5:
          imagePath = _context.sent;
          if (!imagePath) {
            _context.next = 9;
            break;
          }
          console.log("Selected image:", imagePath);
          return _context.abrupt("return", "file://".concat(imagePath));
        case 9:
          _context.next = 17;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.error("Error in Electron file dialog:", _context.t0);
          _context.next = 16;
          return fallbackFileUpload();
        case 16:
          return _context.abrupt("return", _context.sent);
        case 17:
          _context.next = 23;
          break;
        case 19:
          // Browser environment
          console.log("Using browser file input");
          _context.next = 22;
          return fallbackFileUpload();
        case 22:
          return _context.abrupt("return", _context.sent);
        case 23:
          return _context.abrupt("return", null);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 11]]);
  }));
  return _openImageFile.apply(this, arguments);
}
function fallbackFileUpload() {
  return new Promise(function (resolve) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function (e) {
      if (this.files && this.files[0]) {
        var file = this.files[0];
        console.log("Selected file:", file.name);
        var reader = new FileReader();
        reader.onload = function (event) {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });

    // Handle cancel case
    input.addEventListener('cancel', function () {
      resolve(null);
    });
    input.click();
  });
}

// Save a LUT file
function saveLutFile(_x) {
  return _saveLutFile.apply(this, arguments);
}

// Load a LUT file
function _saveLutFile() {
  _saveLutFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(content) {
    var defaultFilename,
      filename,
      filePath,
      blob,
      url,
      a,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          defaultFilename = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'lut.cube';
          console.log('Saving LUT file');
          _context2.prev = 2;
          // Format the filename
          filename = defaultFilename.endsWith('.cube') ? defaultFilename : "".concat(defaultFilename, ".cube"); // If we're in Electron environment
          if (!(window.electronAPI && typeof window.electronAPI.saveLut === 'function')) {
            _context2.next = 13;
            break;
          }
          _context2.next = 7;
          return window.electronAPI.saveLut({
            content: content,
            defaultPath: filename
          });
        case 7:
          filePath = _context2.sent;
          if (!filePath) {
            _context2.next = 11;
            break;
          }
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_1__.showToast)("LUT saved to: ".concat(filePath), 'success');
          return _context2.abrupt("return", filePath);
        case 11:
          _context2.next = 24;
          break;
        case 13:
          // Browser environment - offer download
          blob = new Blob([content], {
            type: 'text/plain'
          });
          url = URL.createObjectURL(blob);
          a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_1__.showToast)("LUT downloaded as ".concat(filename), 'success');
          return _context2.abrupt("return", filename);
        case 24:
          _context2.next = 31;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](2);
          console.error('Error saving LUT:', _context2.t0);
          (0,_components_common_ui_elements_js__WEBPACK_IMPORTED_MODULE_1__.showToast)('Failed to save LUT file', 'error');
          return _context2.abrupt("return", null);
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 26]]);
  }));
  return _saveLutFile.apply(this, arguments);
}
function loadLutFile() {
  return _loadLutFile.apply(this, arguments);
}

// Fallback LUT upload function using HTML input for browser context
function _loadLutFile() {
  _loadLutFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var lutPath;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log('Loading LUT file');

          // If we're in Electron environment
          if (!(window.electronAPI && typeof window.electronAPI.openFileDialog === 'function')) {
            _context3.next = 17;
            break;
          }
          _context3.prev = 2;
          _context3.next = 5;
          return window.electronAPI.openFileDialog({
            properties: ['openFile'],
            filters: [{
              name: 'CUBE Files',
              extensions: ['cube']
            }]
          });
        case 5:
          lutPath = _context3.sent;
          if (!lutPath) {
            _context3.next = 9;
            break;
          }
          // In a real implementation, we would read the file content here
          console.log("Selected LUT:", lutPath);

          // Placeholder for actual file reading logic
          // The content would be returned and parsed elsewhere
          return _context3.abrupt("return", {
            path: lutPath,
            filename: lutPath.split('/').pop(),
            content: "# Placeholder for actual LUT content"
          });
        case 9:
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          console.error("Error in Electron file dialog:", _context3.t0);
          return _context3.abrupt("return", null);
        case 15:
          _context3.next = 20;
          break;
        case 17:
          _context3.next = 19;
          return fallbackLutUpload();
        case 19:
          return _context3.abrupt("return", _context3.sent);
        case 20:
          return _context3.abrupt("return", null);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return _loadLutFile.apply(this, arguments);
}
function fallbackLutUpload() {
  return new Promise(function (resolve) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cube';
    input.addEventListener('change', function (e) {
      if (this.files && this.files[0]) {
        var file = this.files[0];
        console.log("Selected LUT file:", file.name);
        var reader = new FileReader();
        reader.onload = function (event) {
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
    input.addEventListener('cancel', function () {
      resolve(null);
    });
    input.click();
  });
}

/***/ }),

/***/ "./lots-app/src/services/lut-generator.js":
/*!************************************************!*\
  !*** ./lots-app/src/services/lut-generator.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAdvancedLutAdjustments: () => (/* binding */ applyAdvancedLutAdjustments),
/* harmony export */   applyBasicLutAdjustments: () => (/* binding */ applyBasicLutAdjustments),
/* harmony export */   applyTemperatureAndTint: () => (/* binding */ applyTemperatureAndTint),
/* harmony export */   applyToneAdjustments: () => (/* binding */ applyToneAdjustments),
/* harmony export */   generateCubeLUT: () => (/* binding */ generateCubeLUT),
/* harmony export */   initLutGenerator: () => (/* binding */ initLutGenerator)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./lots-app/src/app.js");
/* harmony import */ var _components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/basic-corrections/basic-corrections.js */ "./lots-app/src/components/basic-corrections/basic-corrections.js");
/* harmony import */ var _components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/creative/creative-effects.js */ "./lots-app/src/components/creative/creative-effects.js");
/* harmony import */ var _components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/color-wheels/color-wheels.js */ "./lots-app/src/components/color-wheels/color-wheels.js");
/* harmony import */ var _components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/curves/curves-panel.js */ "./lots-app/src/components/curves/curves-panel.js");
// services/lut-generator.js
// Import app state and utilities






// Initialize the LUT generator service
function initLutGenerator() {
  console.log('Initializing LUT Generator Service');

  // Make the generator available globally
  window.generateCubeLUT = generateCubeLUT;
}

// Generate a CUBE format LUT based on current parameters
function generateCubeLUT() {
  var lutParams = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams;
  var size = lutParams.size || 32;
  var content = '';

  // Header
  content += "# ".concat(lutParams.title, "\n");
  content += '# Generated by LOTS App\n\n';
  content += "LUT_3D_SIZE ".concat(size, "\n");
  content += 'DOMAIN_MIN 0.0 0.0 0.0\n';
  content += 'DOMAIN_MAX 1.0 1.0 1.0\n\n';

  // Generate the 3D LUT entries
  var step = 1.0 / (size - 1);
  for (var b = 0; b < size; b++) {
    for (var g = 0; g < size; g++) {
      for (var r = 0; r < size; r++) {
        // Calculate normalized RGB values (0.0 to 1.0)
        var redValue = r * step;
        var greenValue = g * step;
        var blueValue = b * step;

        // Apply adjustments based on the current mode
        if (_app_js__WEBPACK_IMPORTED_MODULE_0__.appState.activeMode === 'basic') {
          var result = applyBasicLutAdjustments(redValue, greenValue, blueValue);
          redValue = result.r;
          greenValue = result.g;
          blueValue = result.b;
        } else {
          var _result = applyAdvancedLutAdjustments(redValue, greenValue, blueValue);
          redValue = _result.r;
          greenValue = _result.g;
          blueValue = _result.b;
        }

        // Clamp values to valid range
        redValue = Math.min(1.0, Math.max(0.0, redValue));
        greenValue = Math.min(1.0, Math.max(0.0, greenValue));
        blueValue = Math.min(1.0, Math.max(0.0, blueValue));

        // Add the entry to the LUT
        content += "".concat(redValue.toFixed(6), " ").concat(greenValue.toFixed(6), " ").concat(blueValue.toFixed(6), "\n");
      }
    }
  }
  return content;
}

// Apply basic mode adjustments to a single color point
function applyBasicLutAdjustments(r, g, b) {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams.basic || {};

  // Apply contrast
  r = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(r, params.contrast || 1.0);
  g = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(g, params.contrast || 1.0);
  b = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(b, params.contrast || 1.0);

  // Apply color balance
  r *= params.redBalance || 1.0;
  g *= params.greenBalance || 1.0;
  b *= params.blueBalance || 1.0;

  // Apply shadow/highlight adjustments
  if (params.shadowsShift && params.highlightsShift) {
    var shadowEffect = Math.pow(1 - Math.max(r, Math.max(g, b)), 2);
    var highlightEffect = Math.pow(Math.max(r, Math.max(g, b)), 2);
    r += params.shadowsShift[0] * shadowEffect + params.highlightsShift[0] * highlightEffect;
    g += params.shadowsShift[1] * shadowEffect + params.highlightsShift[1] * highlightEffect;
    b += params.shadowsShift[2] * shadowEffect + params.highlightsShift[2] * highlightEffect;
  }

  // Apply saturation
  if (params.saturation !== undefined && params.saturation !== 1.0) {
    var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = luminance + params.saturation * (r - luminance);
    g = luminance + params.saturation * (g - luminance);
    b = luminance + params.saturation * (b - luminance);
  }
  return {
    r: r,
    g: g,
    b: b
  };
}

// Apply advanced mode adjustments to a single color point
function applyAdvancedLutAdjustments(r, g, b) {
  var params = _app_js__WEBPACK_IMPORTED_MODULE_0__.appState.currentLutParams;

  // 1. Apply temperature and tint
  if (params.lumetri && (params.lumetri.temperature !== 0 || params.lumetri.tint !== 0)) {
    var tempResult = applyTemperatureAndTint(r, g, b, params.lumetri.temperature / 150, params.lumetri.tint / 150);
    r = tempResult.r;
    g = tempResult.g;
    b = tempResult.b;
  }

  // 2. Apply exposure and contrast
  if (params.lumetri) {
    // Apply exposure
    if (params.lumetri.exposure !== 0) {
      var exposureFactor = Math.pow(2, params.lumetri.exposure);
      r *= exposureFactor;
      g *= exposureFactor;
      b *= exposureFactor;
    }

    // Apply contrast
    if (params.lumetri.contrast !== 0) {
      var contrastValue = 1 + params.lumetri.contrast / 150 * 1.5;
      r = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(r, contrastValue);
      g = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(g, contrastValue);
      b = (0,_components_basic_corrections_basic_corrections_js__WEBPACK_IMPORTED_MODULE_1__.applyContrast)(b, contrastValue);
    }
  }

  // 3. Apply highlights, shadows, whites, blacks adjustments
  if (params.lumetri) {
    var toneResult = applyToneAdjustments(r, g, b, params.lumetri.highlights / 150 * 1.5, params.lumetri.shadows / 150 * 1.5, params.lumetri.whites / 150 * 1.5, params.lumetri.blacks / 150 * 1.5);
    r = toneResult.r;
    g = toneResult.g;
    b = toneResult.b;
  }

  // 4. Apply color wheels tinting
  if (params.colorWheels) {
    var shadowTint = params.colorWheels.shadowTint;
    var highlightTint = params.colorWheels.highlightTint;
    var tintBalance = params.colorWheels.tintBalance / 150;
    if (shadowTint.r !== 128 || shadowTint.g !== 128 || shadowTint.b !== 128 || highlightTint.r !== 128 || highlightTint.g !== 128 || highlightTint.b !== 128 || tintBalance !== 0) {
      var colorWheelResult = (0,_components_color_wheels_color_wheels_js__WEBPACK_IMPORTED_MODULE_3__.applyColorWheels)(r, g, b, shadowTint, highlightTint, tintBalance);
      r = colorWheelResult.r;
      g = colorWheelResult.g;
      b = colorWheelResult.b;
    }
  }

  // 5. Apply curves
  if (params.curves) {
    // Apply RGB curve first
    var rgbPoints = params.curves.rgb;
    if (rgbPoints) {
      r = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(rgbPoints, r);
      g = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(rgbPoints, g);
      b = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(rgbPoints, b);
    }

    // Apply individual channel curves if not linear
    if (params.curves.red && !(0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.isLinearCurve)(params.curves.red)) {
      r = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(params.curves.red, r);
    }
    if (params.curves.green && !(0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.isLinearCurve)(params.curves.green)) {
      g = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(params.curves.green, g);
    }
    if (params.curves.blue && !(0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.isLinearCurve)(params.curves.blue)) {
      b = (0,_components_curves_curves_panel_js__WEBPACK_IMPORTED_MODULE_4__.interpolateCurve)(params.curves.blue, b);
    }
  }

  // 6. Apply creative effects (vibrance, saturation, faded film)
  if (params.creative) {
    // Apply vibrance
    if (params.creative.vibrance !== 0) {
      var vibranceAmount = params.creative.vibrance / 150;
      var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      var maxChannel = Math.max(r, g, b);
      var minChannel = Math.min(r, g, b);
      var saturationLevel = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
      var vibranceEffect = vibranceAmount * (1 - saturationLevel);
      r = luminance + (r - luminance) * (1 + vibranceEffect);
      g = luminance + (g - luminance) * (1 + vibranceEffect);
      b = luminance + (b - luminance) * (1 + vibranceEffect);
    }

    // Apply faded film effect
    if (params.creative.fadedFilm > 0) {
      var fadedResult = (0,_components_creative_creative_effects_js__WEBPACK_IMPORTED_MODULE_2__.applyFadedFilm)(r, g, b, params.creative.fadedFilm / 100);
      r = fadedResult.r;
      g = fadedResult.g;
      b = fadedResult.b;
    }
  }
  return {
    r: r,
    g: g,
    b: b
  };
}

// Apply temperature and tint adjustments
function applyTemperatureAndTint(r, g, b, temperature, tint) {
  // Temperature: blue-yellow shift
  // Positive = cooler (more blue), Negative = warmer (more yellow)
  var tempFactor = temperature;

  // Tint: green-magenta shift
  // Positive = more magenta, Negative = more green
  var tintFactor = tint;

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
  return {
    r: r,
    g: g,
    b: b
  };
}

// Apply tone adjustments (highlights, shadows, whites, blacks)
function applyToneAdjustments(r, g, b, highlights, shadows, whites, blacks) {
  // Calculate luminance
  var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Apply highlights adjustment (affects brighter areas)
  var highlightEffect = Math.pow(luminance, 2) * highlights;

  // Apply shadows adjustment (affects darker areas)
  var shadowEffect = Math.pow(1 - luminance, 2) * shadows;

  // Apply whites adjustment (affects the brightest areas)
  var whitesEffect = Math.pow(luminance, 4) * whites;

  // Apply blacks adjustment (affects the darkest areas)
  var blacksEffect = Math.pow(1 - luminance, 4) * blacks;

  // Combine all adjustments
  var totalEffect = highlightEffect + shadowEffect + whitesEffect + blacksEffect;

  // Apply the combined effect to RGB channels
  r += totalEffect;
  g += totalEffect;
  b += totalEffect;
  return {
    r: r,
    g: g,
    b: b
  };
}

/***/ }),

/***/ "./lots-app/src/styles/animations.css":
/*!********************************************!*\
  !*** ./lots-app/src/styles/animations.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/base.css":
/*!**************************************!*\
  !*** ./lots-app/src/styles/base.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/compare.css":
/*!*****************************************!*\
  !*** ./lots-app/src/styles/compare.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/components.css":
/*!********************************************!*\
  !*** ./lots-app/src/styles/components.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/layout.css":
/*!****************************************!*\
  !*** ./lots-app/src/styles/layout.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/themes.css":
/*!****************************************!*\
  !*** ./lots-app/src/styles/themes.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./lots-app/src/styles/tools.css":
/*!***************************************!*\
  !*** ./lots-app/src/styles/tools.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lots-app/src/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map