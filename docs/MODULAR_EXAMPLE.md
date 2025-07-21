# Modular Architecture Example
## Risk Assessment Pane (Pane 2) Refactoring

This example shows how to extract Pane 2 (Risk Assessment) from the monolithic wizard into a clean, modular component.

---

## 🔄 **Before: Monolithic Approach**

**Current State (in 8,600-line file):**
```javascript
// Scattered across the massive file:
function generateRiskAssessmentCards() { ... } // Line ~4809
function initializeModernHeatMapGrid() { ... }  // Line ~4830
function selectRiskScore() { ... }               // Line ~4688
function updateHeatMapDisplay() { ... }          // Line ~various
// + 20+ other related functions mixed throughout
```

**Problems:**
- Functions scattered throughout massive file
- Hard to find related functionality
- Difficult to debug heat map issues
- Can't test in isolation
- No clear data flow

---

## ✅ **After: Modular Architecture**

### **1. Risk Assessment Component (`risk-assessment-pane.js`)**

```javascript
/**
 * Risk Assessment Pane Component
 * Handles inherent risk scoring with interactive heat maps
 */
class RiskAssessmentPane {
    constructor(container, riskData) {
        this.container = container;
        this.riskData = riskData;
        this.scores = {};
        this.isInitialized = false;
        
        // Bind methods to preserve context
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleAIAccept = this.handleAIAccept.bind(this);
    }

    /**
     * Initialize the pane with data and event listeners
     */
    async initialize() {
        if (this.isInitialized) return;
        
        try {
            // Load saved scores
            this.loadSavedScores();
            
            // Render the interface
            await this.render();
            
            // Set up event listeners
            this.bindEvents();
            
            // Generate AI suggestions
            await this.generateAISuggestions();
            
            this.isInitialized = true;
            
            // Emit initialization event
            EventBus.emit('paneInitialized', { 
                pane: 2, 
                component: 'RiskAssessment',
                riskCount: this.riskData.length 
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize Risk Assessment Pane:', error);
            UIUtils.showToast('Failed to load risk assessment', 'error');
        }
    }

    /**
     * Render the complete pane interface
     */
    async render() {
        UIUtils.showLoading(this.container, 'ai');
        
        const html = `
            <div class="risk-assessment-container">
                <div class="assessment-header">
                    <h3>Inherent Risk Assessment</h3>
                    <p class="text-muted">Score each risk based on likelihood and impact before controls</p>
                </div>
                
                <div class="ai-suggestions-section">
                    ${this.generateAISuggestionsHTML()}
                </div>
                
                <div class="risk-cards-container">
                    ${this.generateRiskCardsHTML()}
                </div>
                
                <div class="assessment-summary">
                    ${this.generateSummaryHTML()}
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
        
        // Initialize heat maps after DOM is ready
        await this.initializeHeatMaps();
        
        UIUtils.hideLoading(this.container);
    }

    /**
     * Generate HTML for individual risk cards with heat maps
     */
    generateRiskCardsHTML() {
        return this.riskData.map((risk, index) => `
            <div class="risk-assessment-card" data-risk-id="${risk.id}">
                <div class="risk-card-header">
                    <div class="risk-info">
                        <h4>${risk.title}</h4>
                        <span class="risk-category badge bg-secondary">${risk.category}</span>
                    </div>
                    <div class="ai-suggestion">
                        ${this.generateAISuggestionBadge(risk)}
                    </div>
                </div>
                
                <div class="risk-card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="heat-map-container">
                                <div class="heat-map-wrapper" id="heatmap-${risk.id}">
                                    ${this.generateHeatMapHTML(risk.id)}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="scoring-panel">
                                <div class="current-score" id="score-display-${risk.id}">
                                    <span class="score-label">Select a score</span>
                                </div>
                                <div class="ai-reasoning" id="ai-reasoning-${risk.id}">
                                    <!-- AI reasoning will be populated -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Generate interactive 5x5 heat map grid
     */
    generateHeatMapHTML(riskId) {
        let html = `
            <div class="heat-map-grid" data-risk-id="${riskId}">
                <div class="heat-map-axes">
                    <div class="impact-axis">
                        <div class="axis-label">Impact →</div>
                    </div>
                    <div class="likelihood-axis">
                        <div class="axis-label">↑ Likelihood</div>
                    </div>
                </div>
                <div class="heat-map-cells">
        `;
        
        // Generate 5x5 grid (likelihood 5 to 1, impact 1 to 5)
        for (let likelihood = 5; likelihood >= 1; likelihood--) {
            for (let impact = 1; impact <= 5; impact++) {
                const score = likelihood * impact;
                const riskLevel = this.getRiskLevel(score);
                
                html += `
                    <div class="heat-map-cell risk-${riskLevel}" 
                         data-likelihood="${likelihood}" 
                         data-impact="${impact}"
                         data-score="${score}"
                         data-risk-id="${riskId}">
                        ${score}
                    </div>
                `;
            }
        }
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }

    /**
     * Initialize heat map interactions
     */
    async initializeHeatMaps() {
        const heatMaps = this.container.querySelectorAll('.heat-map-grid');
        
        heatMaps.forEach(heatMap => {
            const riskId = heatMap.dataset.riskId;
            
            // Add click listeners to cells
            const cells = heatMap.querySelectorAll('.heat-map-cell');
            cells.forEach(cell => {
                cell.addEventListener('click', this.handleCellClick);
                
                // Add hover effects
                cell.addEventListener('mouseenter', this.handleCellHover);
                cell.addEventListener('mouseleave', this.handleCellLeave);
            });
            
            // Restore saved selection if exists
            this.restoreSelection(riskId);
        });
    }

    /**
     * Handle heat map cell clicks
     */
    handleCellClick(event) {
        const cell = event.target;
        const riskId = cell.dataset.riskId;
        const likelihood = parseInt(cell.dataset.likelihood);
        const impact = parseInt(cell.dataset.impact);
        const score = parseInt(cell.dataset.score);
        
        // Clear previous selection for this risk
        this.clearSelection(riskId);
        
        // Select new cell
        cell.classList.add('selected');
        
        // Update score data
        this.updateScore(riskId, {
            likelihood,
            impact,
            score,
            timestamp: new Date().toISOString()
        });
        
        // Update UI displays
        this.updateScoreDisplay(riskId, likelihood, impact, score);
        this.updateAIReasoning(riskId, likelihood, impact);
        this.updateSummary();
        
        // Emit score update event
        EventBus.emit('riskScored', {
            riskId,
            likelihood,
            impact,
            score,
            pane: 2
        });
        
        // Visual feedback
        UIUtils.animateSuccess(cell);
        
        console.log(`🎯 Risk scored: ${riskId} = ${score} (L:${likelihood} × I:${impact})`);
    }

    /**
     * Update risk score in component state
     */
    updateScore(riskId, scoreData) {
        this.scores[riskId] = scoreData;
        
        // Save to session storage
        DataManager.save('riskScores', this.scores);
        
        // Update global state
        AppState.updateRiskScore(riskId, scoreData);
    }

    /**
     * Update score display panel
     */
    updateScoreDisplay(riskId, likelihood, impact, score) {
        const scoreDisplay = document.getElementById(`score-display-${riskId}`);
        if (!scoreDisplay) return;
        
        const riskLevel = this.getRiskLevel(score);
        const riskLevelClass = this.getRiskLevelClass(riskLevel);
        
        scoreDisplay.innerHTML = `
            <div class="score-selected">
                <div class="score-value ${riskLevelClass}">
                    ${score}
                </div>
                <div class="score-breakdown">
                    L:${likelihood} × I:${impact}
                </div>
                <div class="score-level">
                    ${riskLevel.toUpperCase()} RISK
                </div>
            </div>
        `;
        
        // Add celebration animation for high scores
        if (score >= 15) {
            UIUtils.addWarningPulse(scoreDisplay);
        }
    }

    /**
     * Generate and display AI reasoning for score
     */
    updateAIReasoning(riskId, likelihood, impact) {
        const reasoningContainer = document.getElementById(`ai-reasoning-${riskId}`);
        if (!reasoningContainer) return;
        
        const risk = this.riskData.find(r => r.id === riskId);
        const reasoning = this.generateAIReasoning(risk, likelihood, impact);
        
        reasoningContainer.innerHTML = `
            <div class="ai-reasoning-card">
                <div class="ai-header">
                    <i class="bi bi-robot me-2"></i>
                    <strong>AI Analysis</strong>
                </div>
                <div class="reasoning-content">
                    ${reasoning}
                </div>
            </div>
        `;
    }

    /**
     * Generate AI reasoning text
     */
    generateAIReasoning(risk, likelihood, impact) {
        const score = likelihood * impact;
        const riskLevel = this.getRiskLevel(score);
        
        const reasoningMap = {
            low: `Low risk score suggests this event is unlikely and would have minimal impact. Standard controls should be sufficient.`,
            medium: `Medium risk score indicates this requires attention. Consider whether current controls adequately address this risk.`,
            high: `High risk score signals significant concern. This risk likely requires immediate attention and enhanced controls.`,
            critical: `Critical risk score demands urgent action. This poses substantial threat to operations and requires robust mitigation.`
        };
        
        let reasoning = reasoningMap[riskLevel] || reasoningMap.medium;
        
        // Add risk-specific context
        if (risk.category === 'Technology') {
            reasoning += ` Given this is a technology risk, consider both system redundancy and cybersecurity implications.`;
        } else if (risk.category === 'Operational') {
            reasoning += ` For operational risks, focus on process controls and staff training effectiveness.`;
        }
        
        return reasoning;
    }

    /**
     * Get risk level category from score
     */
    getRiskLevel(score) {
        if (score <= 5) return 'low';
        if (score <= 10) return 'medium-low';
        if (score <= 15) return 'medium';
        if (score <= 20) return 'high';
        return 'critical';
    }

    /**
     * Validate that all risks have been scored
     */
    validate() {
        const requiredRisks = this.riskData.length;
        const scoredRisks = Object.keys(this.scores).length;
        
        const isValid = scoredRisks >= requiredRisks;
        
        if (!isValid) {
            UIUtils.showToast(
                `Please score all risks (${scoredRisks}/${requiredRisks} completed)`, 
                'warning'
            );
        }
        
        return {
            isValid,
            scoredCount: scoredRisks,
            totalCount: requiredRisks,
            missingRisks: this.getMissingRisks()
        };
    }

    /**
     * Get data for next pane
     */
    getData() {
        return {
            scores: this.scores,
            riskData: this.riskData,
            isComplete: this.validate().isValid,
            totalScore: this.calculateTotalScore(),
            highRisks: this.getHighRisks()
        };
    }

    /**
     * Clean up component
     */
    destroy() {
        // Remove event listeners
        const cells = this.container.querySelectorAll('.heat-map-cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', this.handleCellClick);
        });
        
        // Clear container
        this.container.innerHTML = '';
        
        // Reset state
        this.isInitialized = false;
        
        console.log('🧹 Risk Assessment Pane destroyed');
    }

    // ... Additional helper methods
}

```

### **2. Usage in Main Wizard (`wizard-app.js`)**

```javascript
/**
 * Main Wizard Application
 * Coordinates between different pane components
 */
class WizardApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.panes = {};
        this.assessmentData = {};
        
        this.initializeEventListeners();
    }

    /**
     * Initialize specific pane
     */
    async initializePane(stepNumber) {
        const paneContainer = document.getElementById(`pane-${stepNumber}`);
        if (!paneContainer) {
            console.error(`❌ Pane container not found: pane-${stepNumber}`);
            return;
        }

        try {
            switch (stepNumber) {
                case 1:
                    this.panes[1] = new RiskReviewPane(paneContainer, this.assessmentData);
                    break;
                    
                case 2:
                    // Initialize Risk Assessment Pane
                    const riskData = this.assessmentData.selectedRisks || [];
                    this.panes[2] = new RiskAssessmentPane(paneContainer, riskData);
                    break;
                    
                case 3:
                    this.panes[3] = new ControlMappingPane(paneContainer, this.assessmentData);
                    break;
                    
                // ... other panes
            }
            
            // Initialize the pane
            if (this.panes[stepNumber]) {
                await this.panes[stepNumber].initialize();
            }
            
        } catch (error) {
            console.error(`❌ Failed to initialize pane ${stepNumber}:`, error);
            UIUtils.showToast('Failed to load page content', 'error');
        }
    }

    /**
     * Navigate to next step
     */
    async nextStep() {
        // Validate current pane
        const currentPane = this.panes[this.currentStep];
        if (currentPane && !currentPane.validate().isValid) {
            return; // Validation failed, stay on current step
        }
        
        // Save current pane data
        if (currentPane) {
            this.assessmentData[`step${this.currentStep}`] = currentPane.getData();
        }
        
        // Move to next step
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            await this.switchToStep(this.currentStep);
        }
    }

    /**
     * Switch to specific step
     */
    async switchToStep(stepNumber) {
        // Hide all panes
        document.querySelectorAll('.wizard-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Update progress indicator
        this.updateProgressIndicator(stepNumber);
        
        // Initialize and show target pane
        await this.initializePane(stepNumber);
        document.getElementById(`pane-${stepNumber}`).classList.add('active');
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Emit step change event
        EventBus.emit('stepChanged', {
            from: this.currentStep,
            to: stepNumber,
            progress: (stepNumber / this.totalSteps) * 100
        });
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    window.wizardApp = new WizardApp();
    console.log('🚀 RCSA Wizard Application Initialized');
});
```

### **3. Event Bus Communication (`event-bus.js`)**

```javascript
/**
 * Event Bus for component communication
 * Enables loose coupling between components
 */
const EventBus = {
    events: {},
    
    /**
     * Subscribe to event
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        
        console.log(`📡 Subscribed to event: ${event}`);
    },
    
    /**
     * Emit event to all subscribers
     */
    emit(event, data) {
        if (this.events[event]) {
            console.log(`📤 Emitting event: ${event}`, data);
            
            this.events[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`❌ Event callback error for ${event}:`, error);
                }
            });
        }
    },
    
    /**
     * Unsubscribe from event
     */
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
};

// Global event listeners for cross-component communication
EventBus.on('riskScored', (data) => {
    // Update progress tracking
    ProgressTracker.updateRiskProgress(data.riskId);
    
    // Update next pane recommendations
    if (window.wizardApp.panes[3]) {
        window.wizardApp.panes[3].updateRecommendations(data);
    }
});

EventBus.on('controlLinked', (data) => {
    // Update effectiveness assessment
    if (window.wizardApp.panes[4]) {
        window.wizardApp.panes[4].addControlToAssessment(data);
    }
    
    // Show success feedback
    UIUtils.showToast('Control linked successfully', 'success');
});
```

---

## 📊 **Benefits Demonstrated**

### **Code Organization:**
- **Before**: 1 file with 8,600 lines
- **After**: Multiple focused files with clear responsibilities

### **Debugging:**
- **Before**: Search through massive file to find heat map issue
- **After**: Go directly to `RiskAssessmentPane.handleCellClick()`

### **Testing:**
```javascript
// Unit test for risk scoring
test('Risk Assessment Pane handles cell clicks correctly', () => {
    const pane = new RiskAssessmentPane(container, mockRiskData);
    const result = pane.handleCellClick(mockClickEvent);
    
    expect(pane.scores['risk-1'].score).toBe(12);
    expect(result.isValid).toBe(true);
});
```

### **Reusability:**
- Heat map component can be used in other parts of application
- Risk scoring logic can be shared with dashboard
- Validation logic can be reused across panes

### **Maintainability:**
- Clear component boundaries
- Predictable data flow
- Event-driven architecture
- Easy to add new features

---

**This modular approach transforms complex, hard-to-maintain code into clean, testable, reusable components while preserving all existing functionality.** 