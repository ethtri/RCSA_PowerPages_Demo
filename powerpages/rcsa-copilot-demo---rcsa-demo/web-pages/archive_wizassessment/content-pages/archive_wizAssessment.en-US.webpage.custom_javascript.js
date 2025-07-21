/*
================================================================================
RCSA ASSESSMENT WIZARD - ENHANCED JAVASCRIPT
================================================================================
Enhanced functionality for the Assessment Wizard including animations, 
keyboard navigation, demo features, and improved user experience.
================================================================================
*/

// Wizard Enhancement Functions
const WizardEnhancer = {
  
  init() {
    this.addKeyboardNavigation();
    this.setupProgressAnimations();
    this.addTooltips();
    this.setupDemoFeatures();
    this.addAccessibilityEnhancements();
    this.monitorPerformance();
  },

  // Enhanced keyboard navigation
  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Alt + 1-7 = Jump to specific step
      if (e.altKey && e.key >= '1' && e.key <= '7') {
        e.preventDefault();
        const stepNumber = parseInt(e.key);
        if (stepNumber <= WizardData.navigation.currentStep || WizardData.navigation.completedSteps.includes(stepNumber)) {
          AssessmentWizard.goToStep(stepNumber);
          this.announceStepChange(stepNumber);
        }
      }
      
      // Escape = Show exit confirmation
      if (e.key === 'Escape') {
        e.preventDefault();
        this.showExitConfirmation();
      }
      
      // F1 = Show contextual help
      if (e.key === 'F1') {
        e.preventDefault();
        this.showContextualHelp();
      }
    });
  },

  // Smooth progress animations
  setupProgressAnimations() {
    const originalGoToStep = AssessmentWizard.goToStep;
    AssessmentWizard.goToStep = function(stepId) {
      // Add slide animation
      const currentPane = document.querySelector('.wizard-pane[style*="display: block"]');
      if (currentPane) {
        currentPane.style.animation = 'slideOut 0.2s ease-out';
        setTimeout(() => {
          originalGoToStep.call(this, stepId);
          const newPane = document.querySelector('.wizard-pane[style*="display: block"]');
          if (newPane) {
            newPane.style.animation = 'slideIn 0.3s ease-out';
          }
        }, 200);
      } else {
        originalGoToStep.call(this, stepId);
      }
    };
  },

  // Add helpful tooltips
  addTooltips() {
    // Progress step tooltips
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.wizard-step')) {
        const step = e.target.closest('.wizard-step');
        const stepId = parseInt(step.getAttribute('data-step'));
        const stepData = WizardData.navigation.steps.find(s => s.id === stepId);
        
        this.showTooltip(step, this.getStepTooltip(stepData, stepId));
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.wizard-step')) {
        this.hideTooltip();
      }
    });
  },

  getStepTooltip(stepData, stepId) {
    const tooltips = {
      1: 'Review and select risks for assessment',
      2: 'Score inherent risk likelihood and impact',
      3: 'Map controls to identified risks',
      4: 'Evaluate control effectiveness',
      5: 'Calculate residual risk scores',
      6: 'Select risk response strategies',
      7: 'Review and submit assessment'
    };
    
    const isCompleted = WizardData.navigation.completedSteps.includes(stepId);
    const isAccessible = stepId <= WizardData.navigation.currentStep || isCompleted;
    
    let tooltip = tooltips[stepId] || stepData.name;
    
    if (isCompleted) tooltip += ' ✓ Completed';
    else if (!isAccessible) tooltip += ' 🔒 Complete previous steps first';
    else if (stepId === WizardData.navigation.currentStep) tooltip += ' 👉 Current step';
    
    return tooltip;
  },

  showTooltip(element, text) {
    this.hideTooltip(); // Remove any existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'wizard-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - 10) + 'px';
    tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
  },

  hideTooltip() {
    const existing = document.querySelector('.wizard-tooltip');
    if (existing) existing.remove();
  },

  // Demo-specific features
  setupDemoFeatures() {
    // Simulate AI processing delays
    const originalNextStep = AssessmentWizard.nextStep;
    AssessmentWizard.nextStep = function() {
      // Show "AI processing" for certain steps
      const aiSteps = [2, 4, 5]; // Inherent Risk, Control Effectiveness, Residual Risk
      
      if (aiSteps.includes(WizardData.navigation.currentStep)) {
        WizardEnhancer.showAIProcessing(() => {
          originalNextStep.call(this);
        });
      } else {
        originalNextStep.call(this);
      }
    };

    // Add time-based encouragement messages
    setTimeout(() => {
      if (WizardData.navigation.currentStep === 1) {
        this.showEncouragementToast('Great start! AI has already pre-selected common risks for wire transfers.');
      }
    }, 15000); // After 15 seconds on first step

    // Add realistic data variations
    this.addRealisticVariations();
  },

  showAIProcessing(callback) {
    const messages = [
      'AI analyzing risk patterns...',
      'Comparing with peer benchmarks...',
      'Calculating effectiveness scores...',
      'Optimizing recommendations...'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Show processing overlay
    const overlay = document.createElement('div');
    overlay.className = 'ai-processing-overlay';
    overlay.innerHTML = `
      <div class="ai-processing-content">
        <div class="ai-spinner"></div>
        <div class="ai-processing-message">🤖 ${randomMessage}</div>
      </div>
    `;
    
    document.getElementById('wizard-content').appendChild(overlay);
    
    // Remove after realistic delay
    setTimeout(() => {
      overlay.remove();
      callback();
      AssessmentWizard.showToast('AI analysis complete!', 'success');
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  },

  addRealisticVariations() {
    // Randomly adjust some data to make demos feel fresh
    setTimeout(() => {
      const timeVariations = ['8 min', '9 min', '10 min', '7 min'];
      const randomTime = timeVariations[Math.floor(Math.random() * timeVariations.length)];
      
      const timeEl = document.querySelector('[data-metric="time"]');
      if (timeEl) {
        timeEl.textContent = randomTime;
      }
    }, 10000);
  },

  // Enhanced accessibility
  addAccessibilityEnhancements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'wizard-announcer';
    document.body.appendChild(liveRegion);

    // Announce wizard load
    setTimeout(() => {
      this.announce('Assessment wizard loaded. Currently on step 1 of 7: Risk Review. Use Alt + arrow keys to navigate.');
    }, 2000);

    // Focus management
    this.setupFocusManagement();
  },

  setupFocusManagement() {
    // Focus first interactive element when pane changes
    const originalShowCurrentPane = AssessmentWizard.showCurrentPane;
    AssessmentWizard.showCurrentPane = function() {
      originalShowCurrentPane.call(this);
      
      // Focus first focusable element in new pane
      setTimeout(() => {
        const currentPane = document.querySelector('.wizard-pane[style*="display: block"]');
        if (currentPane) {
          const firstFocusable = currentPane.querySelector('input, button, [tabindex="0"]');
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }, 100);
    };
  },

  announceStepChange(stepNumber) {
    const stepName = WizardData.navigation.steps.find(s => s.id === stepNumber)?.name;
    this.announce(`Navigated to step ${stepNumber}: ${stepName}`);
  },

  announce(message) {
    const announcer = document.getElementById('wizard-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  },

  // Performance monitoring
  monitorPerformance() {
    this.startTime = Date.now();
    
    // Track time on each step
    const originalGoToStep = AssessmentWizard.goToStep;
    AssessmentWizard.goToStep = function(stepId) {
      const timeOnStep = Date.now() - (WizardEnhancer.stepStartTime || WizardEnhancer.startTime);
      console.log(`Time on step ${WizardData.navigation.currentStep}: ${Math.round(timeOnStep / 1000)}s`);
      
      WizardEnhancer.stepStartTime = Date.now();
      originalGoToStep.call(this, stepId);
    };
  },

  // Helper methods
  showExitConfirmation() {
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000 / 60);
    const modal = `
      <div class="exit-confirmation-modal">
        <div class="modal-backdrop" onclick="WizardEnhancer.hideExitConfirmation()"></div>
        <div class="modal-content">
          <h3>Exit Assessment?</h3>
          <p>You've spent ${timeSpent} minutes on this assessment. Your progress has been automatically saved.</p>
          <div class="modal-buttons">
            <button class="lg-btn lg-btn-outline" onclick="WizardEnhancer.hideExitConfirmation()">
              Continue Assessment
            </button>
            <button class="lg-btn lg-btn-secondary" onclick="window.location.href='/scrDashboard_1LoD'">
              Exit to Dashboard
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
  },

  hideExitConfirmation() {
    const modal = document.querySelector('.exit-confirmation-modal');
    if (modal) modal.remove();
  },

  showContextualHelp() {
    const currentStep = WizardData.navigation.currentStep;
    const helpContent = this.getHelpContent(currentStep);
    
    const modal = `
      <div class="help-modal">
        <div class="modal-backdrop" onclick="WizardEnhancer.hideHelp()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h3>Help: ${WizardData.navigation.steps.find(s => s.id === currentStep)?.name}</h3>
            <button onclick="WizardEnhancer.hideHelp()">×</button>
          </div>
          <div class="modal-body">
            ${helpContent}
          </div>
          <div class="modal-footer">
            <button class="lg-btn lg-btn-primary" onclick="WizardEnhancer.hideHelp()">
              Got it!
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
  },

  getHelpContent(step) {
    const helpContent = {
      1: `
        <h4>Risk Review</h4>
        <p>Select risks that apply to your process. Pre-identified risks are common for this process type.</p>
        <ul>
          <li><strong>Pre-identified:</strong> Common risks from the risk library</li>
          <li><strong>AI Suggested:</strong> New risks based on industry trends</li>
          <li><strong>Custom:</strong> Add process-specific risks</li>
        </ul>
        <p><strong>Tip:</strong> Consider both internal and external risk sources.</p>
      `,
      2: `
        <h4>Inherent Risk Assessment</h4>
        <p>Score each risk's inherent likelihood and impact before considering controls.</p>
        <ul>
          <li><strong>Likelihood (1-5):</strong> How often might this occur?</li>
          <li><strong>Impact (1-5):</strong> What would the consequence be?</li>
          <li><strong>Score:</strong> Likelihood × Impact = Risk Score</li>
        </ul>
      `,
      3: `
        <h4>Control Mapping</h4>
        <p>Link existing controls to your identified risks.</p>
        <ul>
          <li><strong>Search:</strong> Find controls by name or description</li>
          <li><strong>AI Matching:</strong> Suggested controls based on risk type</li>
          <li><strong>Types:</strong> Preventive vs Detective controls</li>
        </ul>
      `
    };
    
    return helpContent[step] || '<p>Contextual help for this step is being developed.</p>';
  },

  hideHelp() {
    const modal = document.querySelector('.help-modal');
    if (modal) modal.remove();
  },

  showEncouragementToast(message) {
    AssessmentWizard.showToast(message, 'info');
  }
};

// Enhanced Risk Selection Features
const RiskEnhancer = {
  
  init() {
    this.addSmartSelection();
    this.addCategoryFiltering();
    this.addRiskInsights();
  },

  addSmartSelection() {
    // Add "Select All" functionality
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const riskReviewPane = document.getElementById('pane-risk-review');
          if (riskReviewPane && riskReviewPane.style.display === 'block') {
            this.enhanceRiskSelection();
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },

  enhanceRiskSelection() {
    // Only add once
    if (document.querySelector('.risk-selection-enhancer')) return;
    
    const preSelectedSection = document.querySelector('.risk-selection-grid');
    if (preSelectedSection) {
      const enhancer = document.createElement('div');
      enhancer.className = 'risk-selection-enhancer lg-mb-4';
      enhancer.innerHTML = `
        <div class="lg-flex lg-items-center lg-gap-4">
          <button class="lg-btn lg-btn-outline lg-btn-sm" onclick="RiskEnhancer.selectAllPreSelected()">
            Select All Pre-identified
          </button>
          <button class="lg-btn lg-btn-ghost lg-btn-sm" onclick="RiskEnhancer.clearSelection()">
            Clear All
          </button>
          <span class="lg-text-sm lg-text-gray-500">|</span>
          <label class="lg-flex lg-items-center lg-gap-2">
            <input type="checkbox" onchange="RiskEnhancer.toggleCategoryFilter(this, 'Operational')">
            <span class="lg-text-sm">Show Operational only</span>
          </label>
        </div>
      `;
      
      preSelectedSection.parentNode.insertBefore(enhancer, preSelectedSection);
    }
  },

  selectAllPreSelected() {
    WizardData.mockRisks.forEach(risk => {
      if (risk.preSelected && !WizardData.data.selectedRisks.includes(risk.id)) {
        AssessmentWizard.toggleRisk(risk.id, true);
      }
    });
    AssessmentWizard.showToast('All pre-identified risks selected', 'success');
  },

  clearSelection() {
    WizardData.data.selectedRisks = [];
    AssessmentWizard.updateRiskSelection();
    AssessmentWizard.showToast('Risk selection cleared', 'info');
  },

  toggleCategoryFilter(checkbox, category) {
    const riskCards = document.querySelectorAll('.risk-card');
    riskCards.forEach(card => {
      const riskId = card.getAttribute('data-risk-id');
      const risk = WizardData.mockRisks.find(r => r.id === riskId);
      
      if (checkbox.checked) {
        card.style.display = risk?.category === category ? 'block' : 'none';
      } else {
        card.style.display = 'block';
      }
    });
  },

  addRiskInsights() {
    // Add hover insights for risks
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.risk-card')) {
        const card = e.target.closest('.risk-card');
        const riskId = card.getAttribute('data-risk-id');
        const risk = WizardData.mockRisks.find(r => r.id === riskId);
        
        if (risk && !card.querySelector('.risk-insight')) {
          this.showRiskInsight(card, risk);
        }
      }
    });
  },

  showRiskInsight(card, risk) {
    const insights = {
      'R001': 'Most common risk for wire transfers (87% of banks)',
      'R002': 'Increased 35% industry-wide in 2024',
      'R003': 'New SWIFT regulations in effect',
      'R004': 'Emerging threat - 3 incidents at peer banks',
      'R005': 'Related to FedNow implementation'
    };
    
    const insight = insights[risk.id];
    if (insight) {
      const insightEl = document.createElement('div');
      insightEl.className = 'risk-insight lg-text-xs lg-text-blue-600 lg-mt-2 lg-p-2 lg-bg-blue-50 lg-rounded';
      insightEl.innerHTML = `💡 ${insight}`;
      
      card.appendChild(insightEl);
      
      // Remove after delay
      setTimeout(() => {
        insightEl.remove();
      }, 3000);
    }
  }
};

// Initialize enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    WizardEnhancer.init();
    RiskEnhancer.init();
  }, 1000); // Wait for main wizard to initialize
});

// Add enhanced styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  /* Tooltip styles */
  .wizard-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 1.4;
    white-space: nowrap;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
    pointer-events: none;
  }
  
  .wizard-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
  
  /* AI processing overlay */
  .ai-processing-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(2px);
  }
  
  .ai-processing-content {
    text-align: center;
    padding: 2rem;
  }
  
  .ai-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--lg-gray-200);
    border-top: 4px solid var(--lg-primary-600);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  .ai-processing-message {
    font-size: 16px;
    font-weight: 500;
    color: var(--lg-gray-700);
  }
  
  /* Modal styles */
  .exit-confirmation-modal,
  .help-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 0;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  .modal-header button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    opacity: 0.7;
  }
  
  .modal-header button:hover {
    opacity: 1;
    background: var(--lg-gray-100);
  }
  
  .modal-body {
    padding: 24px;
  }
  
  .modal-footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding: 0 24px 24px;
  }
  
  .modal-buttons {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  
  /* Enhanced animations */
  @keyframes slideOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-20px); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  /* Risk selection enhancements */
  .risk-selection-enhancer {
    border-bottom: 1px solid var(--lg-gray-200);
    padding-bottom: 1rem;
  }
  
  .risk-insight {
    animation: fadeIn 0.3s ease;
  }
  
  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

document.head.appendChild(enhancedStyles);

