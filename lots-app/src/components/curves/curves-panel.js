// components/curves/curves-panel.js
// Import app state and functions
import { appState, applyImageAdjustments } from '../../app.js';

// Default curve parameters - only two points for a straight line
export const defaultCurveParams = {
  rgb: [
    { x: 0, y: 0 },      // Shadow point
    { x: 1, y: 1 }       // Highlight point
  ],
  red: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  green: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  blue: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  currentChannel: 'rgb'
};

// Check if a curve is linear (no adjustments)
export function isLinearCurve(points) {
  for (let i = 0; i < points.length; i++) {
    const expectedY = points[i].x;
    if (Math.abs(points[i].y - expectedY) > 0.01) {
      return false;
    }
  }
  return true;
}

// Interpolate a value through a curve
export function interpolateCurve(points, value) {
  // Handle edge cases
  if (value <= 0) return points[0].y;
  if (value >= 1) return points[points.length - 1].y;
  
  // Find the segment containing the value
  let i = 0;
  while (i < points.length - 1 && points[i + 1].x < value) {
    i++;
  }
  
  // Get the segment points
  const p1 = points[i];
  const p2 = points[i + 1];
  
  // Calculate the t parameter (0-1) within this segment
  const segmentLength = p2.x - p1.x;
  const t = segmentLength === 0 ? 0 : (value - p1.x) / segmentLength;
  
  // Simple linear interpolation for direct curve segments
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
    this.pointRadius = 5;
    this.gridColor = 'rgba(100, 100, 100, 0.3)';
    this.baseLineColor = 'rgba(100, 100, 100, 0.5)';
    this.curveColors = {
      rgb: 'rgba(255, 255, 255, 0.9)',
      red: 'rgba(255, 100, 100, 0.9)',
      green: 'rgba(100, 255, 100, 0.9)',
      blue: 'rgba(100, 100, 255, 0.9)'
    };
    
    // Keyboard state
    this.shiftPressed = false;
    this.altPressed = false;
    
    // Bind methods to maintain correct context
    this.init = this.init.bind(this);
    this.drawCurve = this.drawCurve.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.resetCurve = this.resetCurve.bind(this);
    this.findNearestPoint = this.findNearestPoint.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.removePoint = this.removePoint.bind(this);
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
    
    // Keyboard event listeners for Shift and Alt keys
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    
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
  
  // Handle key down events
  handleKeyDown(e) {
    // Track Shift key (for adding points)
    if (e.key === 'Shift') {
      this.shiftPressed = true;
      this.curveCanvas.style.cursor = 'crosshair';
    }
    
    // Track Alt/Option key (for removing points)
    if (e.key === 'Alt' || e.key === 'Option') {
      this.altPressed = true;
      this.curveCanvas.style.cursor = 'not-allowed';
    }
  }
  
  // Handle key up events
  handleKeyUp(e) {
    if (e.key === 'Shift') {
      this.shiftPressed = false;
      this.curveCanvas.style.cursor = 'default';
    }
    
    if (e.key === 'Alt' || e.key === 'Option') {
      this.altPressed = false;
      this.curveCanvas.style.cursor = 'default';
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
  
  // Draw the grid
  drawGrid(width, height) {
    this.curveCtx.strokeStyle = this.gridColor;
    this.curveCtx.lineWidth = 1;
    
    // Draw vertical grid lines (5 lines including borders)
    for (let i = 0; i <= 4; i++) {
      const x = Math.round(width * (i / 4)) + 0.5; // Add 0.5 for sharp lines
      this.curveCtx.beginPath();
      this.curveCtx.moveTo(x, 0);
      this.curveCtx.lineTo(x, height);
      this.curveCtx.stroke();
    }
    
    // Draw horizontal grid lines (5 lines including borders)
    for (let i = 0; i <= 4; i++) {
      const y = Math.round(height * (i / 4)) + 0.5; // Add 0.5 for sharp lines
      this.curveCtx.beginPath();
      this.curveCtx.moveTo(0, y);
      this.curveCtx.lineTo(width, y);
      this.curveCtx.stroke();
    }
    
    // Draw the diagonal reference line
    this.curveCtx.strokeStyle = this.baseLineColor;
    this.curveCtx.beginPath();
    this.curveCtx.moveTo(0, height);
    this.curveCtx.lineTo(width, 0);
    this.curveCtx.stroke();
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
    
    // Draw curve background
    this.curveCtx.fillStyle = 'rgba(20, 20, 20, 0.4)';
    this.curveCtx.fillRect(0, 0, width, height);
    
    // Draw grid
    this.drawGrid(width, height);
    
    // Get current channel curve points
    const points = this.params[this.params.currentChannel];
    
    // Set curve color based on channel
    const curveColor = this.curveColors[this.params.currentChannel];
    
    // Sort points by X value to ensure proper curve rendering
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);
    
    // Draw the curve using direct line segments
    this.drawDirectCurve(sortedPoints, width, height, curveColor);
    
    // Now draw the control points
    this.drawControlPoints(sortedPoints, width, height);
  }
  
  // Draw a direct curve with simple line segments
  drawDirectCurve(points, width, height, curveColor) {
    if (points.length < 2) return;
    
    // For rendering, we'll use a high resolution curve with many interpolated points
    const resolution = 100; // Number of segments for smooth curve
    const step = 1 / resolution;
    
    this.curveCtx.beginPath();
    
    // Start at the first point
    this.curveCtx.moveTo(
      points[0].x * width,
      (1 - points[0].y) * height
    );
    
    // For each segment between 0 and 1
    for (let t = step; t <= 1; t += step) {
      // Find the appropriate segment
      let i = 0;
      while (i < points.length - 1 && points[i + 1].x < t) {
        i++;
      }
      
      // Skip if we're already past the end
      if (i >= points.length - 1) continue;
      
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // Skip if point is outside our current segment
      if (t < p1.x || t > p2.x) continue;
      
      // Linear interpolation within this segment
      const segmentT = (t - p1.x) / (p2.x - p1.x);
      const y = p1.y + segmentT * (p2.y - p1.y);
      
      // Draw line to this point
      this.curveCtx.lineTo(
        t * width,
        (1 - y) * height
      );
    }
    
    // Ensure we draw to the last point
    this.curveCtx.lineTo(
      points[points.length - 1].x * width,
      (1 - points[points.length - 1].y) * height
    );
    
    // Style and stroke the path
    this.curveCtx.strokeStyle = curveColor;
    this.curveCtx.lineWidth = 2;
    this.curveCtx.stroke();
  }
  
  // Draw the control points
  drawControlPoints(points, width, height) {
    points.forEach((point, index) => {
      const isEndpoint = (index === 0 || index === points.length - 1);
      const x = point.x * width;
      const y = (1 - point.y) * height;
      
      // Draw point
      this.curveCtx.beginPath();
      this.curveCtx.arc(x, y, this.pointRadius, 0, Math.PI * 2);
      
      // Style based on whether it's an endpoint (fixed) or not
      if (isEndpoint) {
        this.curveCtx.fillStyle = 'rgba(150, 150, 150, 0.9)';
      } else if (this.activePoint && this.activePoint.point === point) {
        this.curveCtx.fillStyle = 'rgba(255, 255, 255, 1.0)';
      } else {
        this.curveCtx.fillStyle = 'rgba(220, 220, 220, 0.9)';
      }
      
      this.curveCtx.fill();
      this.curveCtx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      this.curveCtx.lineWidth = 1;
      this.curveCtx.stroke();
    });
  }
  
  // Find the nearest control point to the given coordinates
  findNearestPoint(x, y) {
    const points = this.params[this.params.currentChannel];
    let minDistance = Infinity;
    let nearestPoint = null;
    let pointIndex = -1;
    
    points.forEach((point, index) => {
      const dx = point.x - x;
      const dy = point.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
        pointIndex = index;
      }
    });
    
    return {
      point: nearestPoint,
      index: pointIndex,
      distance: minDistance
    };
  }
  
  // Add a new point to the curve
  addPoint(x, y) {
    const points = this.params[this.params.currentChannel];
    
    // Find where to insert the new point (maintain x-ordering)
    let insertIndex = points.length;
    for (let i = 0; i < points.length; i++) {
      if (x < points[i].x) {
        insertIndex = i;
        break;
      }
    }
    
    // Insert the new point
    points.splice(insertIndex, 0, { x, y });
    
    // Redraw the curve
    this.drawCurve();
    
    // Apply changes to image
    if (typeof applyImageAdjustments === 'function') {
      applyImageAdjustments();
    }
    
    return insertIndex;
  }
  
  // Remove a point from the curve
  removePoint(index) {
    const points = this.params[this.params.currentChannel];
    
    // Don't remove endpoint (first and last points)
    if (index > 0 && index < points.length - 1) {
      points.splice(index, 1);
      
      // Redraw the curve
      this.drawCurve();
      
      // Apply changes to image
      if (typeof applyImageAdjustments === 'function') {
        applyImageAdjustments();
      }
    }
  }
  
  // Handle mouse down on curve
  handleMouseDown(e) {
    if (!this.curveCanvas) return;
    
    const rect = this.curveCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    
    // Clamp values to 0-1 range
    const clampedX = Math.max(0, Math.min(1, x));
    const clampedY = Math.max(0, Math.min(1, y));
    
    // Find nearest point
    const nearest = this.findNearestPoint(clampedX, clampedY);
    
    // Handle adding a point with Shift key
    if (this.shiftPressed) {
      // If not too close to existing point, add a new one
      if (nearest.distance > 0.05) {
        this.addPoint(clampedX, clampedY);
      }
      return;
    }
    
    // Handle removing a point with Alt/Option key
    if (this.altPressed) {
      // If close to a point and not an endpoint, remove it
      if (nearest.distance < 0.05 && nearest.index > 0 && nearest.index < this.params[this.params.currentChannel].length - 1) {
        this.removePoint(nearest.index);
      }
      return;
    }
    
    // If close enough to a point, select it
    if (nearest.distance < 0.05) {
      // Don't allow moving first or last point horizontally
      if (nearest.index > 0 && nearest.index < this.params[this.params.currentChannel].length - 1) {
        this.activePoint = {
          point: nearest.point,
          index: nearest.index,
          startX: clampedX,
          startY: clampedY
        };
      } else {
        // Endpoints can only move vertically
        this.activePoint = {
          point: nearest.point,
          index: nearest.index,
          startX: clampedX,
          startY: clampedY,
          verticalOnly: true
        };
      }
      
      // Redraw to highlight the active point
      this.drawCurve();
    }
  }
  
  // Handle mouse move
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
    
    // If vertical only (endpoints), only update Y
    if (this.activePoint.verticalOnly) {
      points[index].y = y;
    } else {
      // For middle points, enforce x-ordering
      const prevX = (index > 0) ? points[index - 1].x + 0.01 : 0;
      const nextX = (index < points.length - 1) ? points[index + 1].x - 0.01 : 1;
      
      // Update point position
      points[index].x = Math.max(prevX, Math.min(nextX, x));
      points[index].y = y;
    }
    
    // Redraw the curve
    this.drawCurve();
    
    // Apply changes to image
    if (typeof applyImageAdjustments === 'function') {
      applyImageAdjustments();
    }
  }
  
  // Handle mouse up
  handleMouseUp(e) {
    this.activePoint = null;
    this.drawCurve(); // Redraw to update highlighting
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
      
      if (section.classList.contains('expanded')) {
        section.style.display = 'block';
        section.style.maxHeight = '1000px'; 
        section.style.opacity = '1';
      } else {
        section.style.maxHeight = '0';
        section.style.opacity = '0';
        setTimeout(() => {
          if (!section.classList.contains('expanded')) {
            section.style.display = 'none';
          }
        }, 300);
      }
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