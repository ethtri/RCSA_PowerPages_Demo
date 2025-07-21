/**
 * RCSA Data Manager Module
 * Handles data persistence, session management, and auto-save functionality
 */

const DataManager = {
    storageKey: 'rcsaAssessmentData',
    autoSaveInterval: null,
    lastSaved: null,

    /**
     * Initialize data manager
     */
    initialize() {
        try {
            console.log('💾 Initializing Data Manager...');
            this.loadSessionData();
            this.updateSaveTime();
            console.log('✅ Data Manager initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing data manager:', error);
        }
    },

    /**
     * Get all assessment data
     */
    getAssessmentData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : this.getDefaultData();
        } catch (error) {
            console.error('Error getting assessment data:', error);
            return this.getDefaultData();
        }
    },

    /**
     * Save assessment data
     */
    async saveAssessmentData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.lastSaved = new Date();
            this.updateSaveTime();
            console.log('💾 Assessment data saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving assessment data:', error);
            UIUtils.showToast('Failed to save data', 'error');
            return false;
        }
    },

    /**
     * Get default data structure
     */
    getDefaultData() {
        return {
            selectedRisks: ['system-failure'], // Default selected risk
            riskAssessments: {},
            controlMappings: {},
            controlEffectiveness: {},
            residualRisk: {},
            riskResponse: {},
            metadata: {
                processName: 'Wire Transfer Assessment',
                assessmentPeriod: 'December 2024',
                lastModified: new Date().toISOString(),
                currentStep: 1
            }
        };
    },

    /**
     * Load session data from localStorage
     */
    loadSessionData() {
        try {
            const data = this.getAssessmentData();
            console.log('📥 Session data loaded:', data);
            return data;
        } catch (error) {
            console.error('Error loading session data:', error);
            return this.getDefaultData();
        }
    },

    /**
     * Save current progress
     */
    async saveProgress() {
        try {
            const currentData = this.getAssessmentData();
            
            // Update metadata
            currentData.metadata.lastModified = new Date().toISOString();
            currentData.metadata.currentStep = WizardCore.currentStep;
            
            // Collect current form data (this would be expanded based on actual forms)
            await this.collectCurrentFormData(currentData);
            
            return await this.saveAssessmentData(currentData);
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    },

    /**
     * Collect current form data from the active pane
     */
    async collectCurrentFormData(data) {
        try {
            const currentStep = WizardCore.currentStep;
            
            switch (currentStep) {
                case 1:
                    // Collect selected risks
                    data.selectedRisks = this.getSelectedRisks();
                    break;
                case 2:
                    // Collect risk assessments
                    data.riskAssessments = this.getRiskAssessments();
                    break;
                case 3:
                    // Collect control mappings
                    data.controlMappings = this.getControlMappings();
                    break;
                case 4:
                    // Collect control effectiveness data
                    data.controlEffectiveness = this.getControlEffectiveness();
                    break;
                case 5:
                    // Collect residual risk data
                    data.residualRisk = this.getResidualRisk();
                    break;
                case 6:
                    // Collect risk response data
                    data.riskResponse = this.getRiskResponse();
                    break;
            }
        } catch (error) {
            console.error('Error collecting form data:', error);
        }
    },

    /**
     * Get selected risks from the UI
     */
    getSelectedRisks() {
        try {
            const selectedRisks = [];
            document.querySelectorAll('.risk-card.selected').forEach(card => {
                const riskId = card.getAttribute('data-risk');
                if (riskId) selectedRisks.push(riskId);
            });
            return selectedRisks.length > 0 ? selectedRisks : ['system-failure'];
        } catch (error) {
            console.error('Error getting selected risks:', error);
            return ['system-failure'];
        }
    },

    /**
     * Get risk assessments from the UI
     */
    getRiskAssessments() {
        try {
            const assessments = {};
            // This would collect data from heat map selections
            // Implementation depends on the actual UI structure
            return assessments;
        } catch (error) {
            console.error('Error getting risk assessments:', error);
            return {};
        }
    },

    /**
     * Get control mappings from the UI
     */
    getControlMappings() {
        try {
            const mappings = {};
            // This would collect control mapping data
            // Implementation depends on the actual UI structure
            return mappings;
        } catch (error) {
            console.error('Error getting control mappings:', error);
            return {};
        }
    },

    /**
     * Get control effectiveness data
     */
    getControlEffectiveness() {
        try {
            const effectiveness = {};
            // This would collect effectiveness assessment data
            return effectiveness;
        } catch (error) {
            console.error('Error getting control effectiveness:', error);
            return {};
        }
    },

    /**
     * Get residual risk data
     */
    getResidualRisk() {
        try {
            const residualRisk = {};
            // This would collect residual risk assessment data
            return residualRisk;
        } catch (error) {
            console.error('Error getting residual risk:', error);
            return {};
        }
    },

    /**
     * Get risk response data
     */
    getRiskResponse() {
        try {
            const riskResponse = {};
            // This would collect risk response strategy data
            return riskResponse;
        } catch (error) {
            console.error('Error getting risk response:', error);
            return {};
        }
    },

    /**
     * Save draft (manual save)
     */
    async saveDraft() {
        try {
            const success = await this.saveProgress();
            if (success) {
                UIUtils.showToast('Draft saved successfully', 'success');
            }
            return success;
        } catch (error) {
            console.error('Error saving draft:', error);
            UIUtils.showToast('Failed to save draft', 'error');
            return false;
        }
    },

    /**
     * Start auto-save functionality
     */
    startAutoSave() {
        try {
            // Clear existing interval
            if (this.autoSaveInterval) {
                clearInterval(this.autoSaveInterval);
            }

            // Auto-save every 30 seconds
            this.autoSaveInterval = setInterval(() => {
                this.autoSave();
            }, 30000);

            console.log('🔄 Auto-save started (30 second intervals)');
        } catch (error) {
            console.error('Error starting auto-save:', error);
        }
    },

    /**
     * Stop auto-save functionality
     */
    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
            console.log('⏹️ Auto-save stopped');
        }
    },

    /**
     * Auto-save function
     */
    async autoSave() {
        try {
            await this.saveProgress();
            console.log('🔄 Auto-save completed');
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    },

    /**
     * Update the last saved time display
     */
    updateSaveTime() {
        try {
            const lastSavedElement = document.getElementById('last-saved');
            if (lastSavedElement) {
                if (this.lastSaved) {
                    const timeString = this.lastSaved.toLocaleTimeString();
                    lastSavedElement.textContent = `Last saved: ${timeString}`;
                } else {
                    lastSavedElement.textContent = 'Not saved yet';
                }
            }
        } catch (error) {
            console.error('Error updating save time:', error);
        }
    },

    /**
     * Clear all assessment data
     */
    clearData() {
        try {
            localStorage.removeItem(this.storageKey);
            this.lastSaved = null;
            this.updateSaveTime();
            console.log('🗑️ Assessment data cleared');
            UIUtils.showToast('Data cleared successfully', 'info');
        } catch (error) {
            console.error('Error clearing data:', error);
            UIUtils.showToast('Failed to clear data', 'error');
        }
    },

    /**
     * Export assessment data
     */
    exportData() {
        try {
            const data = this.getAssessmentData();
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `rcsa-assessment-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            UIUtils.showToast('Assessment data exported', 'success');
        } catch (error) {
            console.error('Error exporting data:', error);
            UIUtils.showToast('Failed to export data', 'error');
        }
    },

    /**
     * Import assessment data
     */
    async importData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            await this.saveAssessmentData(data);
            UIUtils.showToast('Assessment data imported successfully', 'success');
            
            // Refresh the current view
            location.reload();
        } catch (error) {
            console.error('Error importing data:', error);
            UIUtils.showToast('Failed to import data - invalid file format', 'error');
        }
    }
};

// Backward compatibility aliases for existing functions
const SessionManager = {
    getSelectedRisks: () => DataManager.getSelectedRisks(),
    getAssessmentData: () => DataManager.getAssessmentData(),
    saveAssessmentData: (data) => DataManager.saveAssessmentData(data)
};

// Export for global access (Power Pages compatibility)
window.DataManager = DataManager;
window.SessionManager = SessionManager; 