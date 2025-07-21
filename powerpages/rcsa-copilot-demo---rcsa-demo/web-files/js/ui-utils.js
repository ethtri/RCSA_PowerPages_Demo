/**
 * RCSA UI Utilities Module
 * Common interface functions and helpers
 */

const UIUtils = {
    toastCounter: 0,

    /**
     * Show a toast notification
     */
    showToast(message, type = 'info') {
        try {
            this.createToastContainer();
            
            const toastId = `toast-${++this.toastCounter}`;
            const toastHtml = this.createToastHTML(toastId, message, type);
            
            document.getElementById('toast-container').insertAdjacentHTML('beforeend', toastHtml);
            
            // Show the toast
            const toastElement = document.getElementById(toastId);
            const toast = new bootstrap.Toast(toastElement, {
                autohide: true,
                delay: type === 'error' ? 5000 : 3000
            });
            
            toast.show();
            
            // Clean up after toast is hidden
            toastElement.addEventListener('hidden.bs.toast', () => {
                toastElement.remove();
            });
            
        } catch (error) {
            console.error('Error showing toast:', error);
        }
    },

    /**
     * Create toast HTML
     */
    createToastHTML(toastId, message, type) {
        const icons = {
            success: 'bi-check-circle-fill text-success',
            error: 'bi-exclamation-triangle-fill text-danger',
            warning: 'bi-exclamation-triangle-fill text-warning',
            info: 'bi-info-circle-fill text-primary'
        };

        const backgrounds = {
            success: 'bg-success',
            error: 'bg-danger',
            warning: 'bg-warning',
            info: 'bg-primary'
        };

        const icon = icons[type] || icons.info;
        const bg = backgrounds[type] || backgrounds.info;

        return `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${bg} text-white">
                    <i class="bi ${icon} me-2"></i>
                    <strong class="me-auto">RCSA Wizard</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
    },

    /**
     * Create toast container if it doesn't exist
     */
    createToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
    },

    /**
     * Show step transition animation
     */
    showStepTransition() {
        try {
            const activePane = document.querySelector('.wizard-pane.active');
            if (activePane) {
                activePane.style.animation = 'fadeIn 0.3s ease-in-out';
                setTimeout(() => {
                    if (activePane.style) {
                        activePane.style.animation = '';
                    }
                }, 300);
            }
        } catch (error) {
            console.error('Error showing step transition:', error);
        }
    },

    /**
     * Show loading state
     */
    showLoading(elementId, message = 'Loading...') {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `
                    <div class="d-flex align-items-center justify-content-center py-5">
                        <div class="spinner-border text-primary me-2" role="status" aria-hidden="true"></div>
                        <span>${message}</span>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error showing loading state:', error);
        }
    },

    /**
     * Hide loading state
     */
    hideLoading(elementId) {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                const spinner = element.querySelector('.spinner-border');
                if (spinner) {
                    spinner.closest('.d-flex').remove();
                }
            }
        } catch (error) {
            console.error('Error hiding loading state:', error);
        }
    },

    /**
     * Debounce function for search inputs
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Animate element with CSS classes
     */
    animateElement(element, animationClass, duration = 1000) {
        try {
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }

            if (element) {
                element.classList.add(animationClass);
                setTimeout(() => {
                    element.classList.remove(animationClass);
                }, duration);
            }
        } catch (error) {
            console.error('Error animating element:', error);
        }
    },

    /**
     * Scroll to element smoothly
     */
    scrollToElement(elementId, offset = 0) {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Error scrolling to element:', error);
        }
    },

    /**
     * Update button state
     */
    updateButtonState(buttonId, state = 'enabled', text = null) {
        try {
            const button = document.getElementById(buttonId);
            if (button) {
                switch (state) {
                    case 'loading':
                        button.disabled = true;
                        button.innerHTML = `
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ${text || 'Loading...'}
                        `;
                        break;
                    case 'disabled':
                        button.disabled = true;
                        if (text) button.textContent = text;
                        break;
                    case 'enabled':
                        button.disabled = false;
                        if (text) button.textContent = text;
                        // Remove any spinners
                        const spinner = button.querySelector('.spinner-border');
                        if (spinner) {
                            button.innerHTML = text || button.textContent;
                        }
                        break;
                }
            }
        } catch (error) {
            console.error('Error updating button state:', error);
        }
    },

    /**
     * Format number with commas
     */
    formatNumber(num) {
        try {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } catch (error) {
            return num;
        }
    },

    /**
     * Format percentage
     */
    formatPercentage(value, decimals = 0) {
        try {
            return `${value.toFixed(decimals)}%`;
        } catch (error) {
            return `${value}%`;
        }
    },

    /**
     * Get risk level color class
     */
    getRiskLevelColor(score) {
        if (score >= 20) return 'danger';
        if (score >= 15) return 'warning';
        if (score >= 10) return 'info';
        return 'success';
    },

    /**
     * Get risk level text
     */
    getRiskLevelText(score) {
        if (score >= 20) return 'Critical';
        if (score >= 15) return 'High';
        if (score >= 10) return 'Medium';
        if (score >= 5) return 'Low';
        return 'Very Low';
    }
};

// Export for global access (Power Pages compatibility)
window.UIUtils = UIUtils; 