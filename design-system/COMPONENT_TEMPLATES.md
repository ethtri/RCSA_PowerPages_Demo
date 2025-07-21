# RCSA Component Templates - Copy & Paste Library

## 🎯 Purpose

This document provides ready-to-use HTML/CSS templates for all RCSA application components. Copy these templates to ensure consistency across all pages.

## 📄 Page Structure Template

### Basic Page Foundation
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RCSA - Page Title</title>
    
    <!-- Bootstrap 5 Foundation -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- RCSA Custom Styles -->
    <link rel="stylesheet" href="/rcsa-styles.css">
    
    <!-- LogicGate Enterprise (for advanced pages) -->
    <!-- <link rel="stylesheet" href="/logicgate-design-system.css"> -->
</head>
<body style="background-color: #F5F5F5;">
    <!-- Page Content Container -->
    <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 40px;">
        
        <!-- Progress Indicator (for workflow pages) -->
        <div class="row mb-4">
            <div class="col-12">
                <!-- INSERT PROGRESS COMPONENT HERE -->
            </div>
        </div>
        
        <!-- Page Title & Breadcrumb -->
        <div class="row mb-4">
            <div class="col-12">
                <!-- INSERT PAGE HEADER HERE -->
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="row">
            <div class="col-12">
                <!-- INSERT MAIN CONTENT HERE -->
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="row mt-4">
            <div class="col-12 text-end">
                <!-- INSERT ACTION BUTTONS HERE -->
            </div>
        </div>
        
    </div>
    
    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- <script src="/logicgate-components.js"></script> -->
</body>
</html>
```

## 🧩 Core Components

### 1. Progress Indicator (Workflow Steps)
```html
<!-- 4-Step Progress Indicator -->
<div class="card border-0 shadow-sm">
    <div class="card-body p-3">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <!-- Step 1 - Complete -->
                <div class="d-flex align-items-center me-4">
                    <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" 
                         style="width: 32px; height: 32px;">
                        <i class="bi bi-check"></i>
                    </div>
                    <span class="ms-2 fw-semibold text-success">Process Selection</span>
                </div>
                
                <!-- Connector Line -->
                <div class="bg-success" style="height: 2px; width: 60px; margin: 0 16px;"></div>
                
                <!-- Step 2 - Active -->
                <div class="d-flex align-items-center me-4">
                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                         style="width: 32px; height: 32px;">
                        <span class="fw-bold">2</span>
                    </div>
                    <span class="ms-2 fw-semibold text-primary">Risk Identification</span>
                </div>
                
                <!-- Connector Line -->
                <div class="bg-secondary" style="height: 2px; width: 60px; margin: 0 16px;"></div>
                
                <!-- Step 3 - Inactive -->
                <div class="d-flex align-items-center me-4">
                    <div class="rounded-circle border border-2 border-secondary text-secondary d-flex align-items-center justify-content-center" 
                         style="width: 32px; height: 32px;">
                        <span class="fw-bold">3</span>
                    </div>
                    <span class="ms-2 text-secondary">Control Mapping</span>
                </div>
                
                <!-- Connector Line -->
                <div class="bg-secondary" style="height: 2px; width: 60px; margin: 0 16px;"></div>
                
                <!-- Step 4 - Inactive -->
                <div class="d-flex align-items-center">
                    <div class="rounded-circle border border-2 border-secondary text-secondary d-flex align-items-center justify-content-center" 
                         style="width: 32px; height: 32px;">
                        <span class="fw-bold">4</span>
                    </div>
                    <span class="ms-2 text-secondary">Residual Assessment</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 2. Page Header with Context
```html
<!-- Page Header with Context -->
<div class="row align-items-center">
    <div class="col-md-8">
        <h1 class="mb-1 fw-semibold" style="color: #2B2B2B; font-size: 2rem;">Risk Identification</h1>
        <p class="text-muted mb-0" style="font-size: 1rem;">
            <i class="bi bi-building me-2"></i>Retail Banking
            <i class="bi bi-chevron-right mx-2"></i>
            <strong>Wire Transfers</strong> (Critical Process)
        </p>
    </div>
    <div class="col-md-4 text-end">
        <span class="badge bg-warning text-dark px-3 py-2">Step 2 of 4</span>
    </div>
</div>
```

### 3. Risk Card (AI Suggested)
```html
<!-- AI Suggested Risk Card -->
<div class="card border shadow-sm mb-3" id="risk-card-1">
    <div class="card-body p-3">
        <div class="row align-items-center">
            <div class="col-md-8">
                <div class="d-flex align-items-start">
                    <div class="me-3">
                        <!-- Heat Map Indicator -->
                        <div class="rounded text-white fw-bold d-flex align-items-center justify-content-center"
                             style="width: 40px; height: 40px; background-color: #CC0000;">
                            20
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="card-title mb-1 fw-semibold">Unauthorized Wire Transfer</h5>
                        <p class="text-muted mb-2 small">
                            <span class="badge bg-secondary me-2">Operational</span>
                            Likelihood: 4 • Impact: 5
                        </p>
                        <p class="card-text small mb-0">
                            Risk of unauthorized wire transfers due to inadequate dual authorization or system controls.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-end">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-success btn-sm px-3" onclick="acceptRisk(1)">
                        <i class="bi bi-check-lg"></i> Accept
                    </button>
                    <button type="button" class="btn btn-warning btn-sm px-3" onclick="modifyRisk(1)">
                        <i class="bi bi-pencil"></i> Modify
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-sm px-3" onclick="rejectRisk(1)">
                        <i class="bi bi-x-lg"></i> Reject
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 4. Accepted Risk Summary
```html
<!-- Accepted Risks Summary -->
<div class="card border-success shadow-sm">
    <div class="card-header bg-success text-white">
        <h5 class="card-title mb-0">
            <i class="bi bi-check-circle me-2"></i>
            Accepted Risks <span class="badge bg-white text-success ms-2">2</span>
        </h5>
    </div>
    <div class="card-body p-0">
        <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">Unauthorized Wire Transfer</h6>
                    <small class="text-muted">Operational • L:4 × I:5 = 20</small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="removeRisk(1)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">System Outage During Processing</h6>
                    <small class="text-muted">Technology • L:3 × I:4 = 12</small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="removeRisk(2)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
</div>
```

### 5. Action Buttons (Standard Footer)
```html
<!-- Standard Action Buttons -->
<div class="d-flex justify-content-between">
    <button type="button" class="btn btn-outline-secondary px-4" onclick="goBack()">
        <i class="bi bi-chevron-left me-2"></i>Back
    </button>
    <div>
        <button type="button" class="btn btn-outline-primary me-3 px-4" onclick="saveProgress()">
            <i class="bi bi-bookmark me-2"></i>Save Progress
        </button>
        <button type="button" class="btn btn-primary px-4" onclick="continueToNext()" id="continue-btn" disabled>
            Continue <i class="bi bi-chevron-right ms-2"></i>
        </button>
    </div>
</div>
```

### 6. Loading States
```html
<!-- AI Loading State -->
<div class="card border-primary shadow-sm" id="ai-loading">
    <div class="card-body text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <h5 class="text-primary mb-2">
            <i class="bi bi-magic me-2"></i>AI is analyzing your process...
        </h5>
        <p class="text-muted mb-0">This will take about 3 seconds</p>
    </div>
</div>

<!-- Skeleton Loading for Cards -->
<div class="card border shadow-sm mb-3" id="skeleton-card">
    <div class="card-body p-3">
        <div class="row align-items-center">
            <div class="col-md-8">
                <div class="d-flex align-items-start">
                    <div class="me-3">
                        <div class="bg-light rounded" style="width: 40px; height: 40px;"></div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="bg-light rounded mb-2" style="height: 20px; width: 80%;"></div>
                        <div class="bg-light rounded mb-2" style="height: 16px; width: 60%;"></div>
                        <div class="bg-light rounded" style="height: 14px; width: 90%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-end">
                <div class="bg-light rounded" style="height: 36px; width: 150px; margin-left: auto;"></div>
            </div>
        </div>
    </div>
</div>
```

### 7. Alert Messages
```html
<!-- Success Alert -->
<div class="alert alert-success alert-dismissible fade show" role="alert">
    <i class="bi bi-check-circle me-2"></i>
    <strong>Success!</strong> Your assessment has been completed and sent for review.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Warning Alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <i class="bi bi-exclamation-triangle me-2"></i>
    <strong>High Risk Detected:</strong> This assessment will create an issue for immediate attention.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Error Alert -->
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <i class="bi bi-x-circle me-2"></i>
    <strong>Error:</strong> Unable to save assessment. Please check your connection and try again.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Info Alert -->
<div class="alert alert-info alert-dismissible fade show" role="alert">
    <i class="bi bi-info-circle me-2"></i>
    <strong>AI Suggestion:</strong> Based on your controls, we recommend a residual score of L:2 × I:3.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### 8. Heat Map Grid (5×5)
```html
<!-- 5×5 Heat Map Grid -->
<div class="card border shadow-sm">
    <div class="card-header">
        <h6 class="card-title mb-0">Risk Scoring Heat Map</h6>
        <small class="text-muted">Click a cell to select likelihood × impact</small>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-borderless mb-0">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center small">Impact 1</th>
                        <th class="text-center small">Impact 2</th>
                        <th class="text-center small">Impact 3</th>
                        <th class="text-center small">Impact 4</th>
                        <th class="text-center small">Impact 5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="small fw-bold">L5</td>
                        <td class="p-1">
                            <button class="btn heat-cell" style="width: 60px; height: 60px; background-color: #0D7F3F; color: white;" 
                                    data-likelihood="5" data-impact="1" data-score="5">5</button>
                        </td>
                        <td class="p-1">
                            <button class="btn heat-cell" style="width: 60px; height: 60px; background-color: #FFC107; color: black;" 
                                    data-likelihood="5" data-impact="2" data-score="10">10</button>
                        </td>
                        <td class="p-1">
                            <button class="btn heat-cell" style="width: 60px; height: 60px; background-color: #CC6600; color: white;" 
                                    data-likelihood="5" data-impact="3" data-score="15">15</button>
                        </td>
                        <td class="p-1">
                            <button class="btn heat-cell" style="width: 60px; height: 60px; background-color: #CC0000; color: white;" 
                                    data-likelihood="5" data-impact="4" data-score="20">20</button>
                        </td>
                        <td class="p-1">
                            <button class="btn heat-cell selected" style="width: 60px; height: 60px; background-color: #CC0000; color: white; border: 3px solid #0066CC;" 
                                    data-likelihood="5" data-impact="5" data-score="25">25</button>
                        </td>
                    </tr>
                    <!-- Add remaining rows for L4, L3, L2, L1 with appropriate colors -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
.heat-cell {
    border: 1px solid white !important;
    transition: all 200ms ease;
}
.heat-cell:hover {
    filter: brightness(110%);
    transform: scale(1.05);
}
.heat-cell.selected {
    border: 3px solid #0066CC !important;
    transform: scale(1.05);
}
</style>
```

### 9. Form Elements (Custom Risk Entry)
```html
<!-- Custom Risk Form -->
<div class="card border-primary shadow-sm">
    <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">
            <i class="bi bi-plus-circle me-2"></i>Add Custom Risk
        </h5>
    </div>
    <div class="card-body">
        <form id="custom-risk-form">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="risk-title" class="form-label fw-semibold">Risk Title *</label>
                        <input type="text" class="form-control" id="risk-title" 
                               placeholder="Enter a descriptive risk title" required>
                        <div class="form-text">Be specific about the risk scenario</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="risk-category" class="form-label fw-semibold">Risk Category *</label>
                        <select class="form-select" id="risk-category" required>
                            <option value="">Choose category...</option>
                            <option value="Operational">Operational</option>
                            <option value="Technology">Technology</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Credit">Credit</option>
                            <option value="Market">Market</option>
                            <option value="Compliance">Compliance</option>
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label for="risk-description" class="form-label fw-semibold">Description</label>
                        <textarea class="form-control" id="risk-description" rows="3" 
                                  placeholder="Describe the risk scenario and potential impact"></textarea>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Likelihood</label>
                        <div class="btn-group-vertical d-grid" role="group">
                            <input type="radio" class="btn-check" name="likelihood" id="l5" value="5">
                            <label class="btn btn-outline-danger" for="l5">5 - Very High</label>
                            
                            <input type="radio" class="btn-check" name="likelihood" id="l4" value="4">
                            <label class="btn btn-outline-warning" for="l4">4 - High</label>
                            
                            <input type="radio" class="btn-check" name="likelihood" id="l3" value="3" checked>
                            <label class="btn btn-outline-warning" for="l3">3 - Medium</label>
                            
                            <input type="radio" class="btn-check" name="likelihood" id="l2" value="2">
                            <label class="btn btn-outline-success" for="l2">2 - Low</label>
                            
                            <input type="radio" class="btn-check" name="likelihood" id="l1" value="1">
                            <label class="btn btn-outline-success" for="l1">1 - Very Low</label>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Impact</label>
                        <div class="btn-group-vertical d-grid" role="group">
                            <input type="radio" class="btn-check" name="impact" id="i5" value="5">
                            <label class="btn btn-outline-danger" for="i5">5 - Very High</label>
                            
                            <input type="radio" class="btn-check" name="impact" id="i4" value="4">
                            <label class="btn btn-outline-warning" for="i4">4 - High</label>
                            
                            <input type="radio" class="btn-check" name="impact" id="i3" value="3" checked>
                            <label class="btn btn-outline-warning" for="i3">3 - Medium</label>
                            
                            <input type="radio" class="btn-check" name="impact" id="i2" value="2">
                            <label class="btn btn-outline-success" for="i2">2 - Low</label>
                            
                            <input type="radio" class="btn-check" name="impact" id="i1" value="1">
                            <label class="btn btn-outline-success" for="i1">1 - Very Low</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-secondary me-2" onclick="cancelCustomRisk()">
                    Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-plus-lg me-2"></i>Add Risk
                </button>
            </div>
        </form>
    </div>
</div>
```

### 10. Dashboard Metric Cards
```html
<!-- Dashboard Metrics Row -->
<div class="row g-4 mb-4">
    <!-- Pending Assessments -->
    <div class="col-md-6 col-lg-3">
        <div class="card border-primary shadow-sm h-100">
            <div class="card-body text-center">
                <div class="display-4 text-primary fw-bold mb-2">3</div>
                <h5 class="card-title text-primary mb-1">Pending Assessments</h5>
                <p class="card-text text-muted small mb-0">Due this week</p>
            </div>
        </div>
    </div>
    
    <!-- Completed This Month -->
    <div class="col-md-6 col-lg-3">
        <div class="card border-success shadow-sm h-100">
            <div class="card-body text-center">
                <div class="display-4 text-success fw-bold mb-2">12</div>
                <h5 class="card-title text-success mb-1">Completed</h5>
                <p class="card-text text-muted small mb-0">This month</p>
            </div>
        </div>
    </div>
    
    <!-- In Progress -->
    <div class="col-md-6 col-lg-3">
        <div class="card border-warning shadow-sm h-100">
            <div class="card-body text-center">
                <div class="display-4 text-warning fw-bold mb-2">2</div>
                <h5 class="card-title text-warning mb-1">In Progress</h5>
                <p class="card-text text-muted small mb-0">Started today</p>
            </div>
        </div>
    </div>
    
    <!-- Average Time -->
    <div class="col-md-6 col-lg-3">
        <div class="card border-info shadow-sm h-100">
            <div class="card-body text-center">
                <div class="display-4 text-info fw-bold mb-2">8min</div>
                <h5 class="card-title text-info mb-1">Average Time</h5>
                <p class="card-text text-muted small mb-0">Per assessment</p>
            </div>
        </div>
    </div>
</div>
```

## 📱 JavaScript Interaction Patterns

### Basic Component Behaviors
```javascript
// Risk Card Actions
function acceptRisk(riskId) {
    // Add to accepted risks list
    // Hide the suggestion card
    // Update continue button state
    console.log('Accepting risk:', riskId);
}

function modifyRisk(riskId) {
    // Open modification modal
    // Pre-populate with current values
    console.log('Modifying risk:', riskId);
}

function rejectRisk(riskId) {
    // Remove from suggestions
    // Show brief feedback
    console.log('Rejecting risk:', riskId);
}

// Heat Map Selection
function selectHeatMapCell(likelihood, impact) {
    // Remove previous selection
    document.querySelectorAll('.heat-cell').forEach(cell => {
        cell.classList.remove('selected');
    });
    
    // Add selection to clicked cell
    const selectedCell = document.querySelector(`[data-likelihood="${likelihood}"][data-impact="${impact}"]`);
    selectedCell.classList.add('selected');
    
    // Update hidden form fields
    document.getElementById('residual-likelihood').value = likelihood;
    document.getElementById('residual-impact').value = impact;
    document.getElementById('residual-score').value = likelihood * impact;
}

// Continue Button State Management
function updateContinueButton() {
    const acceptedRisks = document.querySelectorAll('.accepted-risk').length;
    const continueBtn = document.getElementById('continue-btn');
    
    if (acceptedRisks > 0) {
        continueBtn.disabled = false;
        continueBtn.classList.remove('btn-outline-primary');
        continueBtn.classList.add('btn-primary');
    } else {
        continueBtn.disabled = true;
        continueBtn.classList.add('btn-outline-primary');
        continueBtn.classList.remove('btn-primary');
    }
}
```

## 🎨 CSS Custom Properties

### RCSA Color Variables
```css
:root {
    /* RCSA Primary Colors */
    --rcsa-primary: #0066CC;
    --rcsa-success: #0D7F3F;
    --rcsa-warning: #CC6600;
    --rcsa-danger: #CC0000;
    
    /* RCSA Neutrals */
    --rcsa-background: #F5F5F5;
    --rcsa-card-white: #FFFFFF;
    --rcsa-border: #E5E5E5;
    --rcsa-text-primary: #2B2B2B;
    --rcsa-text-body: #4A4A4A;
    --rcsa-text-muted: #6B6B6B;
    
    /* RCSA Spacing */
    --rcsa-spacing-xs: 8px;
    --rcsa-spacing-sm: 16px;
    --rcsa-spacing-md: 24px;
    --rcsa-spacing-lg: 32px;
    --rcsa-spacing-xl: 48px;
    
    /* RCSA Shadows */
    --rcsa-shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
    --rcsa-shadow-md: 0 4px 8px rgba(0,0,0,0.12);
    
    /* RCSA Borders */
    --rcsa-border-radius: 8px;
    --rcsa-border-radius-sm: 4px;
}
```

---

**✅ With these templates, you can now reproduce ANY RCSA screen consistently!**

Copy the components you need, customize the content, and maintain perfect design consistency across all pages. 