/**
 * RCSA Wizard Core Module
 * Handles wizard navigation, progress tracking, and initialization
 */

const WizardCore = {
    currentStep: 1,
    totalSteps: 7,
    isNavigating: false,
    
    // Step configuration
    stepConfig: {
        1: { name: 'Risk Review', validate: () => SessionManager.getSelectedRisks().length > 0 },
        2: { name: 'Inherent Risk', validate: () => true }, // Will add validation logic
        3: { name: 'Control Mapping', validate: () => true },
        4: { name: 'Control Effectiveness', validate: () => true },
        5: { name: 'Residual Risk', validate: () => true },
        6: { name: 'Risk Response', validate: () => true },
        7: { name: 'Review & Submit', validate: () => true }
    },

    /**
     * Initialize the wizard
     */
    initialize() {
        try {
            console.log('🚀 Initializing RCSA Wizard Core...');
            
            this.updateProcessInfo({
                name: 'Wire Transfer Assessment',
                meta: 'Retail Banking • Due Today • Last assessed 3 months ago',
                period: 'December 2024',
                estimatedTime: '8-12 minutes'
            });
            
            this.updateProgress();
            this.initializeBreadcrumbNavigation();
            this.showWelcomeMessage();
            
            // Initialize auto-save
            DataManager.startAutoSave();
            
            console.log('✅ Wizard Core initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing wizard:', error);
            UIUtils.showToast('Failed to initialize wizard', 'error');
        }
    },

    /**
     * Update process information display
     */
    updateProcessInfo(process) {
        try {
            document.getElementById('process-name').textContent = process.name;
            
            // Update assessment meta info
            const metaElements = document.querySelectorAll('.assessment-meta div');
            if (metaElements.length >= 3) {
                metaElements[0].innerHTML = `<strong>Assessment Period:</strong> ${process.period}`;
                metaElements[1].innerHTML = `<strong>Estimated Time:</strong> ${process.estimatedTime}`;
            }
        } catch (error) {
            console.error('Error updating process info:', error);
        }
    },

    /**
     * Update progress indicator
     */
    updateProgress() {
        try {
            const progressTitle = document.getElementById('progress-title');
            const currentStepName = document.getElementById('current-step-name');
            
            if (progressTitle) {
                progressTitle.textContent = `Assessment Progress - Step ${this.currentStep} of ${this.totalSteps}`;
            }
            
            if (currentStepName) {
                currentStepName.textContent = this.stepConfig[this.currentStep].name;
            }

            // Update step indicators
            document.querySelectorAll('.step').forEach((step, index) => {
                const stepNumber = index + 1;
                const circle = step.querySelector('.step-circle');
                const label = step.querySelector('.step-label');
                const connector = step.querySelector('.step-connector');

                // Reset classes
                circle.className = 'step-circle';
                label.className = 'step-label';
                if (connector) connector.className = 'step-connector';

                if (stepNumber < this.currentStep) {
                    // Completed steps
                    circle.classList.add('completed');
                    label.classList.add('completed');
                    if (connector) connector.classList.add('completed');
                } else if (stepNumber === this.currentStep) {
                    // Current step
                    circle.classList.add('current');
                    label.classList.add('current');
                } else {
                    // Future steps
                    circle.classList.add('future');
                    label.classList.add('future');
                }
            });

            console.log(`📊 Progress updated: Step ${this.currentStep}/${this.totalSteps}`);
        } catch (error) {
            console.error('Error updating progress:', error);
            this.updateProgressFallback();
        }
    },

    /**
     * Fallback progress update method
     */
    updateProgressFallback() {
        console.log(`Progress fallback: Step ${this.currentStep} of ${this.totalSteps}`);
    },

    /**
     * Navigate to the next step
     */
    async nextStep() {
        if (this.isNavigating) return;
        this.isNavigating = true;

        try {
            // Validate current step
            if (!this.validateCurrentStep()) {
                this.isNavigating = false;
                return false;
            }

            // Save progress before moving
            await DataManager.saveProgress();

            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                await this.goToStep(this.currentStep);
                UIUtils.showStepTransition();
            } else {
                await this.submitAssessment();
            }
        } catch (error) {
            console.error('Error in nextStep:', error);
            UIUtils.showToast('Failed to proceed to next step', 'error');
        } finally {
            this.isNavigating = false;
        }
    },

    /**
     * Navigate to the previous step
     */
    async previousStep() {
        if (this.isNavigating || this.currentStep <= 1) return;
        this.isNavigating = true;

        try {
            await DataManager.saveProgress();
            this.currentStep--;
            await this.goToStep(this.currentStep);
        } catch (error) {
            console.error('Error in previousStep:', error);
            UIUtils.showToast('Failed to go back', 'error');
        } finally {
            this.isNavigating = false;
        }
    },

    /**
     * Navigate to a specific step
     */
    async goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps || this.isNavigating) return;
        
        try {
            console.log(`🎯 Navigating to step ${stepNumber}`);

            // Hide all panes
            document.querySelectorAll('.wizard-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            // Show target pane
            const targetPane = document.getElementById(`pane-${stepNumber}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            this.currentStep = stepNumber;
            this.updateProgress();

            // Initialize step-specific functionality
            await this.initializeStep(stepNumber);

        } catch (error) {
            console.error(`Error navigating to step ${stepNumber}:`, error);
            UIUtils.showToast('Navigation failed', 'error');
        }
    },

    /**
     * Initialize step-specific functionality
     */
    async initializeStep(stepNumber) {
        try {
            switch (stepNumber) {
                case 1:
                    // Risk Review initialization handled by RiskModule
                    break;
                case 2:
                    // Generate risk assessment cards for inherent risk scoring
                    if (typeof generateRiskAssessmentCards === 'function') {
                        generateRiskAssessmentCards();
                    }
                    break;
                case 3:
                    // Generate control mapping cards
                    if (typeof generateEnhancedControlMappingCards === 'function') {
                        generateEnhancedControlMappingCards();
                    }
                    break;
                case 4:
                    // Initialize control effectiveness pane
                    if (typeof initializeControlEffectivenessPane === 'function') {
                        initializeControlEffectivenessPane();
                    }
                    break;
                case 5:
                    // Generate residual risk assessment
                    if (typeof generateResidualRiskAssessment === 'function') {
                        generateResidualRiskAssessment();
                    }
                    break;
                case 6:
                    // Initialize risk response planning
                    if (typeof initializeRiskResponsePlanning === 'function') {
                        initializeRiskResponsePlanning();
                    }
                    break;
                case 7:
                    // Show review and submit interface
                    if (typeof generateReviewSummary === 'function') {
                        generateReviewSummary();
                    }
                    break;
            }
        } catch (error) {
            console.error(`Error initializing step ${stepNumber}:`, error);
        }
    },

    /**
     * Initialize breadcrumb navigation
     */
    initializeBreadcrumbNavigation() {
        try {
            document.querySelectorAll('.step').forEach((step, index) => {
                const stepNumber = index + 1;

                step.addEventListener('click', () => {
                    if (stepNumber <= this.currentStep || stepNumber === this.currentStep + 1) {
                        this.goToStep(stepNumber);
                    }
                });

                step.addEventListener('mouseenter', () => {
                    if (stepNumber <= this.currentStep || stepNumber === this.currentStep + 1) {
                        step.style.cursor = 'pointer';
                        step.style.opacity = '0.8';
                    }
                });

                step.addEventListener('mouseleave', () => {
                    step.style.opacity = '1';
                });
            });
        } catch (error) {
            console.error('Error initializing breadcrumb navigation:', error);
        }
    },

    /**
     * Validate the current step
     */
    validateCurrentStep() {
        try {
            const validator = this.stepConfig[this.currentStep]?.validate;
            if (!validator) return true;

            const isValid = validator();
            if (!isValid) {
                this.showValidationError();
            }
            return isValid;
        } catch (error) {
            console.error('Error validating step:', error);
            return true; // Allow progression on validation errors
        }
    },

    /**
     * Show validation error
     */
    showValidationError() {
        const messages = {
            1: 'Please select at least one risk to assess',
            2: 'Please complete the inherent risk scoring',
            3: 'Please map controls to all selected risks',
            4: 'Please assess the effectiveness of all controls',
            5: 'Please complete the residual risk assessment',
            6: 'Please select risk response strategies',
            7: 'Please review all sections before submitting'
        };

        const message = messages[this.currentStep] || 'Please complete this step before continuing';
        UIUtils.showToast(message, 'warning');
    },

    /**
     * Submit the assessment
     */
    async submitAssessment() {
        try {
            console.log('🎯 Submitting assessment...');
            
            // Final validation
            if (!this.validateCurrentStep()) {
                return false;
            }

            // Save final data
            await DataManager.saveProgress();
            
            // Show completion celebration
            this.showCompletionCelebration();
            
            // Here you would typically send data to server
            console.log('✅ Assessment submitted successfully');
            
        } catch (error) {
            console.error('Error submitting assessment:', error);
            UIUtils.showToast('Failed to submit assessment', 'error');
        }
    },

    /**
     * Show completion celebration
     */
    showCompletionCelebration() {
        try {
            UIUtils.showToast('🎉 Assessment completed successfully!', 'success');
            
            // Add completion animation
            document.querySelector('.wizard-content').style.animation = 'fadeOut 0.5s ease-in-out';
            
            setTimeout(() => {
                // Show completion message or redirect
                console.log('Assessment workflow completed');
            }, 500);
            
        } catch (error) {
            console.error('Error showing completion celebration:', error);
        }
    },

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        setTimeout(() => {
            UIUtils.showToast('Welcome to the RCSA Assessment Wizard', 'info');
        }, 500);
    }
};

// Export for global access (Power Pages compatibility)
window.WizardCore = WizardCore; 