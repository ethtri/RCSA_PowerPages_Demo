# RCSA JavaScript Patterns - Interactive Behaviors

## 🎯 Purpose

This document provides JavaScript patterns and code examples for all interactive behaviors in the RCSA application. Use these patterns to ensure consistent user interactions across all pages.

## 📋 Core Interaction Patterns

### 1. Page Initialization
```javascript
// Standard page initialization pattern
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 RCSA Page Initialized');
    
    // Initialize page components
    initializeProgressIndicator();
    loadSessionData();
    setupEventListeners();
    updatePageState();
    
    // Initialize debug panel (development only)
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
        initializeDebugPanel();
    }
});

function initializeProgressIndicator() {
    const currentStep = getCurrentStep();
    updateProgressIndicator(currentStep);
}

function getCurrentStep() {
    // Determine current step based on page
    const path = window.location.pathname;
    if (path.includes('process-selection')) return 1;
    if (path.includes('risk-identification')) return 2;
    if (path.includes('control-mapping')) return 3;
    if (path.includes('residual-assessment')) return 4;
    return 1;
}
```

### 2. Session Storage Management
```javascript
// Session storage utilities for workflow data
const SessionManager = {
    keys: {
        SELECTED_PROCESS: 'rcsa_selected_process',
        SELECTED_BU: 'rcsa_selected_bu',
        ACCEPTED_RISKS: 'rcsa_accepted_risks',
        CONTROL_MAPPINGS: 'rcsa_control_mappings',
        RESIDUAL_SCORES: 'rcsa_residual_scores'
    },
    
    save: function(key, data) {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
            console.log(`💾 Saved to session: ${key}`, data);
        } catch (error) {
            console.error('❌ Failed to save to session:', error);
        }
    },
    
    load: function(key) {
        try {
            const data = sessionStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('❌ Failed to load from session:', error);
            return null;
        }
    },
    
    clear: function(key) {
        sessionStorage.removeItem(key);
        console.log(`🗑️ Cleared from session: ${key}`);
    },
    
    clearAll: function() {
        Object.values(this.keys).forEach(key => {
            sessionStorage.removeItem(key);
        });
        console.log('🗑️ Cleared all RCSA session data');
    }
};

// Usage examples
function saveSelectedProcess(processData) {
    SessionManager.save(SessionManager.keys.SELECTED_PROCESS, processData);
}

function loadSelectedProcess() {
    return SessionManager.load(SessionManager.keys.SELECTED_PROCESS);
}
```

### 3. Risk Management (Risk Identification Page)
```javascript
// Risk management utilities
const RiskManager = {
    acceptedRisks: [],
    
    initialize: function() {
        // Load accepted risks from session
        this.acceptedRisks = SessionManager.load(SessionManager.keys.ACCEPTED_RISKS) || [];
        this.renderAcceptedRisks();
        this.updateContinueButton();
    },
    
    acceptRisk: function(riskData) {
        // Add to accepted risks
        this.acceptedRisks.push({
            id: riskData.id || this.generateRiskId(),
            title: riskData.title,
            category: riskData.category,
            likelihood: riskData.likelihood,
            impact: riskData.impact,
            score: riskData.likelihood * riskData.impact,
            source: riskData.source || 'ai', // 'ai' or 'custom'
            timestamp: new Date().toISOString()
        });
        
        // Save to session
        SessionManager.save(SessionManager.keys.ACCEPTED_RISKS, this.acceptedRisks);
        
        // Update UI
        this.renderAcceptedRisks();
        this.updateContinueButton();
        this.hideRiskSuggestion(riskData.id);
        
        // Show success feedback
        this.showFeedback('success', `Risk "${riskData.title}" accepted`);
        
        console.log('✅ Risk accepted:', riskData);
    },
    
    rejectRisk: function(riskId) {
        // Hide suggestion with animation
        this.hideRiskSuggestion(riskId);
        
        // Show feedback
        this.showFeedback('info', 'Risk suggestion dismissed');
        
        console.log('❌ Risk rejected:', riskId);
    },
    
    removeAcceptedRisk: function(riskId) {
        // Remove from accepted risks
        this.acceptedRisks = this.acceptedRisks.filter(risk => risk.id !== riskId);
        
        // Save to session
        SessionManager.save(SessionManager.keys.ACCEPTED_RISKS, this.acceptedRisks);
        
        // Update UI
        this.renderAcceptedRisks();
        this.updateContinueButton();
        
        console.log('🗑️ Accepted risk removed:', riskId);
    },
    
    addCustomRisk: function(formData) {
        const riskData = {
            id: this.generateRiskId(),
            title: formData.title,
            category: formData.category,
            likelihood: parseInt(formData.likelihood),
            impact: parseInt(formData.impact),
            description: formData.description,
            source: 'custom'
        };
        
        this.acceptRisk(riskData);
        
        // Close modal and reset form
        this.closeCustomRiskModal();
        this.resetCustomRiskForm();
    },
    
    renderAcceptedRisks: function() {
        const container = document.getElementById('accepted-risks-container');
        if (!container) return;
        
        if (this.acceptedRisks.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-inbox text-muted" style="font-size: 3rem;"></i>
                    <p class="text-muted mt-2">No risks accepted yet</p>
                </div>
            `;
            return;
        }
        
        const html = this.acceptedRisks.map(risk => `
            <div class="list-group-item d-flex justify-content-between align-items-center" data-risk-id="${risk.id}">
                <div>
                    <h6 class="mb-1">${risk.title}</h6>
                    <small class="text-muted">
                        ${risk.category} • L:${risk.likelihood} × I:${risk.impact} = ${risk.score}
                        ${risk.source === 'custom' ? '• <span class="badge bg-info">Custom</span>' : ''}
                    </small>
                </div>
                <button class="btn btn-outline-danger btn-sm" onclick="RiskManager.removeAcceptedRisk('${risk.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `).join('');
        
        container.innerHTML = html;
    },
    
    updateContinueButton: function() {
        const continueBtn = document.getElementById('continue-btn');
        if (!continueBtn) return;
        
        const canContinue = this.acceptedRisks.length > 0;
        
        continueBtn.disabled = !canContinue;
        if (canContinue) {
            continueBtn.classList.remove('btn-outline-primary');
            continueBtn.classList.add('btn-primary');
            continueBtn.innerHTML = `Continue <i class="bi bi-chevron-right ms-2"></i>`;
        } else {
            continueBtn.classList.add('btn-outline-primary');
            continueBtn.classList.remove('btn-primary');
            continueBtn.innerHTML = `Select at least 1 risk to continue`;
        }
    },
    
    generateRiskId: function() {
        return 'risk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    hideRiskSuggestion: function(riskId) {
        const card = document.querySelector(`[data-risk-id="${riskId}"]`);
        if (card) {
            card.style.transition = 'all 300ms ease';
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
            setTimeout(() => card.remove(), 300);
        }
    },
    
    showFeedback: function(type, message) {
        // Create and show toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                const bsAlert = new bootstrap.Alert(toast);
                bsAlert.close();
            }
        }, 3000);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('accepted-risks-container')) {
        RiskManager.initialize();
    }
});
```

### 4. Heat Map Interactions (Residual Assessment)
```javascript
// Heat map utilities for residual assessment
const HeatMapManager = {
    selectedCells: {},
    
    initialize: function() {
        this.setupHeatMapListeners();
        this.loadSavedScores();
    },
    
    setupHeatMapListeners: function() {
        document.querySelectorAll('.heat-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const likelihood = parseInt(e.target.dataset.likelihood);
                const impact = parseInt(e.target.dataset.impact);
                const riskId = e.target.closest('.risk-section').dataset.riskId;
                
                this.selectCell(riskId, likelihood, impact);
            });
            
            // Add hover effects
            cell.addEventListener('mouseenter', (e) => {
                e.target.style.filter = 'brightness(110%)';
                e.target.style.transform = 'scale(1.05)';
            });
            
            cell.addEventListener('mouseleave', (e) => {
                if (!e.target.classList.contains('selected')) {
                    e.target.style.filter = '';
                    e.target.style.transform = '';
                }
            });
        });
    },
    
    selectCell: function(riskId, likelihood, impact) {
        const score = likelihood * impact;
        
        // Clear previous selection for this risk
        document.querySelectorAll(`[data-risk-id="${riskId}"] .heat-cell`).forEach(cell => {
            cell.classList.remove('selected');
            cell.style.border = '1px solid white';
            cell.style.transform = '';
        });
        
        // Select new cell
        const selectedCell = document.querySelector(
            `[data-risk-id="${riskId}"] [data-likelihood="${likelihood}"][data-impact="${impact}"]`
        );
        
        if (selectedCell) {
            selectedCell.classList.add('selected');
            selectedCell.style.border = '3px solid #0066CC';
            selectedCell.style.transform = 'scale(1.05)';
        }
        
        // Update stored scores
        this.selectedCells[riskId] = { likelihood, impact, score };
        
        // Update UI elements
        this.updateScoreDisplay(riskId, likelihood, impact, score);
        this.updateAISuggestion(riskId);
        this.checkHighRiskWarning(riskId, score);
        this.updateSubmitButton();
        
        // Save to session
        SessionManager.save(SessionManager.keys.RESIDUAL_SCORES, this.selectedCells);
        
        console.log(`🎯 Heat map selection - Risk: ${riskId}, L:${likelihood}, I:${impact}, Score:${score}`);
    },
    
    updateScoreDisplay: function(riskId, likelihood, impact, score) {
        const scoreDisplay = document.querySelector(`[data-risk-id="${riskId}"] .score-display`);
        if (scoreDisplay) {
            scoreDisplay.innerHTML = `
                <strong>Selected Score:</strong> 
                L:${likelihood} × I:${impact} = <span class="fw-bold text-primary">${score}</span>
            `;
        }
    },
    
    checkHighRiskWarning: function(riskId, score) {
        const warningContainer = document.querySelector(`[data-risk-id="${riskId}"] .high-risk-warning`);
        if (!warningContainer) return;
        
        if (score > 15) {
            warningContainer.innerHTML = `
                <div class="alert alert-warning mt-2">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    <strong>High Risk Warning:</strong> This score will create an issue for immediate attention.
                </div>
            `;
        } else {
            warningContainer.innerHTML = '';
        }
    },
    
    updateSubmitButton: function() {
        const totalRisks = document.querySelectorAll('.risk-section').length;
        const scoredRisks = Object.keys(this.selectedCells).length;
        const submitBtn = document.getElementById('submit-btn');
        
        if (!submitBtn) return;
        
        if (scoredRisks >= totalRisks) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-outline-primary');
            submitBtn.classList.add('btn-success');
            submitBtn.innerHTML = `<i class="bi bi-check-lg me-2"></i>Submit Assessment`;
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-outline-primary');
            submitBtn.classList.remove('btn-success');
            submitBtn.innerHTML = `Score all risks to continue (${scoredRisks}/${totalRisks})`;
        }
    }
};
```

### 5. Form Validation Patterns
```javascript
// Form validation utilities
const FormValidator = {
    initialize: function(formId, rules) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Add validation listeners
        Object.keys(rules).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldId, rules[fieldId]));
                field.addEventListener('input', () => this.clearFieldError(fieldId));
            }
        });
        
        // Add form submit listener
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(rules)) {
                e.preventDefault();
                this.showValidationSummary();
            }
        });
    },
    
    validateField: function(fieldId, rule) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rule.required && !value) {
            isValid = false;
            errorMessage = rule.requiredMessage || 'This field is required';
        }
        
        // Min length validation
        if (isValid && rule.minLength && value.length < rule.minLength) {
            isValid = false;
            errorMessage = rule.minLengthMessage || `Minimum ${rule.minLength} characters required`;
        }
        
        // Custom validation
        if (isValid && rule.custom && !rule.custom(value)) {
            isValid = false;
            errorMessage = rule.customMessage || 'Invalid value';
        }
        
        // Update UI
        if (isValid) {
            this.markFieldValid(fieldId);
        } else {
            this.markFieldInvalid(fieldId, errorMessage);
        }
        
        return isValid;
    },
    
    markFieldValid: function(fieldId) {
        const field = document.getElementById(fieldId);
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        
        if (feedback) {
            feedback.style.display = 'none';
        }
    },
    
    markFieldInvalid: function(fieldId, message) {
        const field = document.getElementById(fieldId);
        let feedback = field.parentNode.querySelector('.invalid-feedback');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            field.parentNode.appendChild(feedback);
        }
        
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        feedback.textContent = message;
        feedback.style.display = 'block';
    },
    
    clearFieldError: function(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.remove('is-invalid', 'is-valid');
        
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
};

// Usage example for custom risk form
const customRiskValidationRules = {
    'risk-title': {
        required: true,
        minLength: 10,
        requiredMessage: 'Risk title is required',
        minLengthMessage: 'Risk title must be at least 10 characters'
    },
    'risk-category': {
        required: true,
        requiredMessage: 'Please select a risk category'
    },
    'risk-description': {
        minLength: 20,
        minLengthMessage: 'Please provide a more detailed description'
    }
};

// Initialize validation
document.addEventListener('DOMContentLoaded', function() {
    FormValidator.initialize('custom-risk-form', customRiskValidationRules);
});
```

### 6. Loading States and Animations
```javascript
// Loading state management
const LoadingManager = {
    show: function(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const config = {
            message: options.message || 'Loading...',
            type: options.type || 'spinner', // 'spinner', 'skeleton', 'progress'
            overlay: options.overlay || false
        };
        
        let html = '';
        
        switch (config.type) {
            case 'ai':
                html = `
                    <div class="card border-primary shadow-sm">
                        <div class="card-body text-center py-5">
                            <div class="spinner-border text-primary mb-3" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <h5 class="text-primary mb-2">
                                <i class="bi bi-magic me-2"></i>${config.message}
                            </h5>
                            <p class="text-muted mb-0">This will take about 3 seconds</p>
                        </div>
                    </div>
                `;
                break;
                
            case 'skeleton':
                html = this.generateSkeletonCards(3);
                break;
                
            default:
                html = `
                    <div class="text-center py-4">
                        <div class="spinner-border text-primary mb-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="text-muted">${config.message}</p>
                    </div>
                `;
        }
        
        container.innerHTML = html;
    },
    
    hide: function(containerId) {
        const container = document.getElementById(containerId);
        if (container && container.querySelector('.spinner-border')) {
            container.innerHTML = '';
        }
    },
    
    generateSkeletonCards: function(count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="card border shadow-sm mb-3 skeleton-loading">
                    <div class="card-body p-3">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <div class="d-flex align-items-start">
                                    <div class="me-3">
                                        <div class="bg-light rounded skeleton-pulse" style="width: 40px; height: 40px;"></div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="bg-light rounded skeleton-pulse mb-2" style="height: 20px; width: 80%;"></div>
                                        <div class="bg-light rounded skeleton-pulse mb-2" style="height: 16px; width: 60%;"></div>
                                        <div class="bg-light rounded skeleton-pulse" style="height: 14px; width: 90%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 text-end">
                                <div class="bg-light rounded skeleton-pulse" style="height: 36px; width: 150px; margin-left: auto;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }
};

// Add skeleton animation CSS
const skeletonCSS = `
<style>
.skeleton-pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
    0% { opacity: 1; }
    100% { opacity: 0.6; }
}
</style>
`;

// Add CSS to head
document.head.insertAdjacentHTML('beforeend', skeletonCSS);
```

### 7. Navigation and Page Transitions
```javascript
// Navigation utilities
const NavigationManager = {
    navigateToNext: function() {
        const currentStep = getCurrentStep();
        const nextPages = {
            1: '/process-selection',
            2: '/risk-identification',
            3: '/control-mapping',
            4: '/residual-assessment',
            5: '/success-page'
        };
        
        const nextPage = nextPages[currentStep + 1];
        if (nextPage) {
            window.location.href = nextPage;
        }
    },
    
    navigateToPrevious: function() {
        const currentStep = getCurrentStep();
        const prevPages = {
            2: '/process-selection',
            3: '/risk-identification',
            4: '/control-mapping'
        };
        
        const prevPage = prevPages[currentStep];
        if (prevPage) {
            window.location.href = prevPage;
        }
    },
    
    saveProgress: function() {
        // Save current page state
        const currentData = this.getCurrentPageData();
        const currentStep = getCurrentStep();
        
        SessionManager.save(`step_${currentStep}_data`, currentData);
        
        // Show feedback
        this.showSaveConfirmation();
    },
    
    getCurrentPageData: function() {
        // Override in each page to return page-specific data
        return {};
    },
    
    showSaveConfirmation: function() {
        const toast = document.createElement('div');
        toast.className = 'alert alert-success alert-dismissible fade show position-fixed';
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 1050;';
        toast.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            Progress saved successfully
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(toast);
            bsAlert.close();
        }, 2000);
    }
};
```

## 🎮 Event Handling Patterns

### Global Event Listeners
```javascript
// Global event handling setup
document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-action="continue"]')) {
            NavigationManager.navigateToNext();
        }
        
        if (e.target.matches('[data-action="back"]')) {
            NavigationManager.navigateToPrevious();
        }
        
        if (e.target.matches('[data-action="save"]')) {
            NavigationManager.saveProgress();
        }
    });
    
    // Auto-save on form changes (debounced)
    let saveTimeout;
    document.addEventListener('input', function(e) {
        if (e.target.matches('.auto-save')) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                NavigationManager.saveProgress();
            }, 2000);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            NavigationManager.saveProgress();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const bsModal = bootstrap.Modal.getInstance(openModal);
                bsModal.hide();
            }
        }
    });
});
```

---

**✅ With these JavaScript patterns, you have complete interactive behavior libraries for all RCSA functionality!**

Use these patterns to maintain consistent user interactions and data handling across all pages. 