// components/curves/curves-panel.js
// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Default curve parameters
const defaultCurveParams = {
  rgb: [
    { x: 0, y: 0 },      // Shadow point
    { x: 0.25, y: 0.25 }, // Quarter tone
    { x: 0.5, y: 0.5 },   // Midtone
    { x: 0.75, y: 0.75 }, // Three-quarter tone
    { x: 1, y: 1 }       // Highlight point
  ],
  red: [
    { x: 0, y: 0 },
    { x: 0.25, y: 0.25 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 1 }
  ],
  green: [
    { x: 0, y: 0 },
    { x: 0.25, y: 0.25 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 1 }
  ],
  blue: [
    { x: 0, y: 0 },
    { x: 0.25, y: 0.25 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.75 },
    { x: 1, y: 1 }
  ],
  currentChannel: 'rgb'
};

// Check if a curve is linear (no adjustments)
function isLinearCurve(points) {
  for (let i = 0; i < points.length; i++) {
    const expectedY = points[i].x;
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
  let i = 0;
  while (i < points.length - 1 && points[i + 1].x < value) {
    i++;
  }
  
  // Linear interpolation between points
  const p1 = points[i];
  const p2 = points[i + 1];
  const t = (value - p1.x) / (p2.x - p1.x);
  
  return p1.y + t * (p2.y - p1.y);
}

// Main Curves class
class CurvesPanel {
  constructor(params = {}) {
    // Merge provided params with defaults
    this.params = {
      ...JSON.parse(JSON.stringify(defaultCurveParams)),
      ...params
    };
    
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
  init() {
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
  setupEvents() {
    // Ensure methods are bound
    if (!this.curveCanvas) return;
    
    // Canvas event handling
    this.curveCanvas.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    
    // Channel selector buttons
    for (const channel in this.channelButtons) {
      const btn = this.channelButtons[channel];
      if (btn) {
        btn.addEventListener('click', () => {
          // Set active channel
          this.params.currentChannel = channel;
          
          // Update UI
          this.updateChannelButtonUI();
          this.drawCurve();
        });
      }
    }
    
    // Reset button
    const resetCurveBtn = document.getElementById('reset-curve-btn');
    if (resetCurveBtn) {
      resetCurveBtn.addEventListener('click', this.resetCurve);
    }
  }
  
  // Update channel button UI
  updateChannelButtonUI() {
    for (const channel in this.channelButtons) {
      const btn = this.channelButtons[channel];
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
  resetCurve() {
    console.log('Resetting curve');
    
    // Reset current channel to default linear curve
    this.params[this.params.currentChannel] = 
      JSON.parse(JSON.stringify(defaultCurveParams[this.params.currentChannel]));
    
    // Redraw
    this.drawCurve();
    
    // Apply to image if available
    if (typeof applyImageAdjustments === 'function') {
      applyImageAdjustments();
    }
  }
  
  // Draw the curve onto the canvas
  drawCurve() {
    if (!this.curveCanvas || !this.curveCtx) {
      console.warn('Canvas not ready for drawing');
      return;
    }
    
    const width = this.curveCanvas.width;
    const height = this.curveCanvas.height;
    
    // Clear canvas
    this.curveCtx.clearRect(0, 0, width, height);
    
    // Get current channel curve points
    const points = this.params[this.params.currentChannel];
    
    // Draw curve background
    this.curveCtx.fillStyle = 'rgba(20, 20, 20, 0.3)';
    this.curveCtx.fillRect(0, 0, width, height);
    
    // Set curve color based on channel
    let curveColor;
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
    for (let i = 1; i < points.length; i++) {
      this.curveCtx.lineTo(points[i].x * width, (1 - points[i].y) * height);
    }
    
    // Style and stroke the path
    this.curveCtx.strokeStyle = curveColor;
    this.curveCtx.lineWidth = 2;
    this.curveCtx.stroke();
    
    // Draw control points
    points.forEach((point, index) => {
      this.curveCtx.beginPath();
      this.curveCtx.arc(
        point.x * width,
        (1 - point.y) * height,
        5,
        0,
        Math.PI * 2
      );
      
      // Style based on whether it's an endpoint (fixed) or not
      if (index === 0 || index === points.length - 1) {
        this.curveCtx.fillStyle = 'rgba(150, 150, 150, 0.8)';
      } else {
        this.curveCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      }
      
      this.curveCtx.fill();
      this.curveCtx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      this.curveCtx.lineWidth = 1;
      this.curveCtx.stroke();
    });
  }
  
  // Handle mouse down on curve
  handleMouseDown(e) {
    if (!this.curveCanvas) return;
    
    const rect = this.curveCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    
    // Get current channel points
    const points = this.params[this.params.currentChannel];
    
    // Find closest control point
    let minDistance = Infinity;
    let closestPoint = null;
    let pointIndex = -1;
    
    points.forEach((point, index) => {
      const dx = point.x - x;
      const dy = point.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
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
  handleMouseMove(e) {
    if (!this.activePoint || !this.curveCanvas) return;
    
    const rect = this.curveCanvas.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width;
    let y = 1 - (e.clientY - rect.top) / rect.height;
    
    // Clamp values
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    
    const points = this.params[this.params.currentChannel];
    const index = this.activePoint.index;
    
    // Enforce x ordering and prevent moving end points
    const prevX = points[index - 1].x;
    const nextX = points[index + 1].x;
    
    // Ensure point stays between its neighbors
    x = Math.max(prevX + 0.01, Math.min(nextX - 0.01, x));
    
    // Update point
    points[index].x = x;
    points[index].y = y;
    
    // Redraw
    this.drawCurve();
    
    // Apply adjustments if function exists
    if (typeof applyImageAdjustments === 'function') {
      applyImageAdjustments();
    }
  }
  
  // Handle mouse up for curve editing
  handleMouseUp() {
    // Clear active point
    this.activePoint = null;
  }
  
  // Apply curves to RGB values
  applyCurves(r, g, b) {
    // Apply RGB curve
    const rgbPoints = this.params.rgb;
    
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
    
    return { r, g, b };
  }
  
  // Apply curves to an entire image
  applyCurvesToImage(imageData) {
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Get RGB values and normalize to 0-1
      let r = data[i] / 255;
      let g = data[i + 1] / 255;
      let b = data[i + 2] / 255;
      
      // Apply curves
      const result = this.applyCurves(r, g, b);
      
      // Convert back to 0-255 range
      data[i] = Math.round(result.r * 255);
      data[i + 1] = Math.round(result.g * 255);
      data[i + 2] = Math.round(result.b * 255);
      // Alpha remains unchanged
    }
    
    return imageData;
  }
}

// Single instance for the app
let curvesPanel = null;

// Initialize the curves panel
export function initCurvesPanel() {
  console.log('Setting up Curves Panel');
  
  // Initialize curves parameters in app state if not present
  if (!appState.currentLutParams.curves) {
    appState.currentLutParams.curves = JSON.parse(JSON.stringify(defaultCurveParams));
  }
  
  // Create the curves panel with parameters from app state
  curvesPanel = new CurvesPanel(appState.currentLutParams.curves);
  
  // Set up section toggle
  setupSectionToggle('curves-toggle', 'curves-section');
  
  // Initialize when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => curvesPanel.init(), 0);
  } else {
    document.addEventListener('DOMContentLoaded', () => curvesPanel.init());
  }
  
  // Store reference in app state
  appState.curvesPanel = curvesPanel;
}

// Set up section toggle for expandable sections
function setupSectionToggle(toggleId, sectionId) {
  const toggle = document.getElementById(toggleId);
  const section = document.getElementById(sectionId);
  
  if (toggle && section) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('expanded');
      section.classList.toggle('expanded');
    });
  }
}

// Apply curves to an image
export function applyCurvesToImage(imageData) {
  if (curvesPanel) {
    return curvesPanel.applyCurvesToImage(imageData);
  }
  return imageData;
}

// Export functions and constants
export {
  isLinearCurve,
  interpolateCurve,
  defaultCurveParams
};