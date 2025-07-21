/*
================================================================================
RCSA COPILOT DASHBOARD - ENHANCED CUSTOM JAVASCRIPT
================================================================================
Dashboard-specific JavaScript for enhanced interactivity, demo functionality,
and Power Pages integration.
================================================================================
*/

// Demo Data - Define first to ensure it's available
const RCSADemoData = {
  currentUser: { 
    name: "Sarah Chen", 
    role: "VP Operations", 
    businessUnit: "Retail Banking", 
    avatar: "SC" 
  },
  metrics: { 
    assessmentsThisMonth: 8, 
    assessmentsCompleted: 6, 
    averageTime: "12 min", 
    issuesOpen: 3, 
    issuesResolved: 12 
  },
  priorityTasks: [
    { 
      id: 1, 
      title: "Wire Transfer Assessment", 
      process: "Wire Transfers", 
      dueDate: "Today", 
      priority: "high", 
      estimatedTime: "8 min" 
    },
    { 
      id: 2, 
      title: "Loan Origination Review", 
      process: "Commercial Lending", 
      dueDate: "2 days", 
      priority: "medium", 
      estimatedTime: "6 min" 
    },
    { 
      id: 3, 
      title: "ATM Reconciliation Process", 
      process: "Cash Management", 
      dueDate: "3 days", 
      priority: "medium", 
      estimatedTime: "5 min" 
    }
  ],
  assessments: [
    { 
      id: 1, 
      processName: "Wire Transfers", 
      businessUnit: "Retail Banking", 
      status: "pending", 
      dueDate: "Today", 
      riskScore: 18, 
      controlCount: 5, 
      issueCount: 2 
    },
    { 
      id: 2, 
      processName: "Commercial Lending", 
      businessUnit: "Retail Banking", 
      status: "in-progress", 
      dueDate: "Jan 25, 2025", 
      riskScore: 12, 
      controlCount: 8, 
      issueCount: 0 
    }
  ]
};

// Enhanced Dashboard Components with modern UX patterns
const EnhancedDashboardComponents = {
  
  // Animation and loading utilities
  animationDuration: 300,
  quickActions: [],
  
  init: function() {
    console.log('🚀 Initializing Enhanced Dashboard Components...');
    
    try {
      this.showLoadingStates();
      
      // Staggered loading for better UX
      setTimeout(() => this.renderEnhancedGreeting(), 200);
      setTimeout(() => this.renderEnhancedMetrics(), 400);
      setTimeout(() => this.renderEnhancedQuickActions(), 600);
      setTimeout(() => this.renderEnhancedPriorityTasks(), 800);
      setTimeout(() => this.renderEnhancedAssessments(), 1000);
      
      // Initialize enhanced interactions
      this.initializeEnhancedInteractions();
      
      console.log('✅ Dashboard Components initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing dashboard:', error);
      this.showErrorState();
    }
  },

  showErrorState: function() {
    console.log('📝 Showing error state fallback...');
    
    // Fallback content if JavaScript fails
    const containers = [
      'dashboard-greeting', 
      'dashboard-metrics', 
      'quick-actions', 
      'priority-tasks', 
      'my-assessments'
    ];
    
    containers.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = `
          <div class="error-fallback" style="padding: 2rem; text-align: center; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; color: #991b1b;">
            <h3>⚠️ Loading Error</h3>
            <p>Unable to load dashboard content. Please refresh the page.</p>
            <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Refresh Page
            </button>
          </div>
        `;
      }
    });
  },

  showLoadingStates: function() {
    console.log('⏳ Showing loading states...');
    
    const containers = [
      'dashboard-greeting', 
      'dashboard-metrics', 
      'quick-actions', 
      'priority-tasks', 
      'my-assessments'
    ];
    
    containers.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = this.generateSkeletonLoader(id);
      }
    });
  },

  generateSkeletonLoader: function(type) {
    switch(type) {
      case 'dashboard-greeting':
        return `
          <div class="skeleton-greeting">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-content">
              <div class="skeleton-line large"></div>
              <div class="skeleton-line medium"></div>
            </div>
          </div>
        `;
      case 'dashboard-metrics':
        return `
          <div class="skeleton-metrics">
            ${Array(4).fill().map(() => `
              <div class="skeleton-metric-card">
                <div class="skeleton-line small"></div>
                <div class="skeleton-line large"></div>
                <div class="skeleton-line medium"></div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return `
          <div class="skeleton-generic">
            <div class="skeleton-line large"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line small"></div>
          </div>
        `;
    }
  },

  renderEnhancedGreeting: function() {
    console.log('👋 Rendering enhanced greeting...');
    
    const el = document.getElementById('dashboard-greeting');
    if (!el) {
      console.warn('❌ Greeting container not found');
      return;
    }
    
    try {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      const timeIcon = hour < 12 ? '🌅' : hour < 17 ? '☀️' : '🌆';
      
      el.innerHTML = `
        <div class="enhanced-greeting-card">
          <div class="greeting-content">
            <div class="greeting-main">
              <div class="greeting-text">
                <h1 class="greeting-title">
                  <span class="time-icon">${timeIcon}</span>
                  ${greeting}, ${RCSADemoData.currentUser.name}!
                </h1>
                <p class="greeting-subtitle">
                  Here's your risk management overview for ${RCSADemoData.currentUser.businessUnit}
                </p>
              </div>
            </div>
            <div class="greeting-profile">
              <div class="profile-info">
                <div class="profile-role">${RCSADemoData.currentUser.role}</div>
                <div class="profile-unit">${RCSADemoData.currentUser.businessUnit}</div>
                <div class="profile-status">
                  <span class="status-indicator active"></span>
                  <span class="status-text">Active</span>
                </div>
              </div>
              <div class="profile-avatar">
                <span class="avatar-text">${RCSADemoData.currentUser.avatar}</span>
              </div>
            </div>
          </div>
          <div class="greeting-insights">
            <div class="insight-item">
              <span class="insight-icon">⚡</span>
              <span class="insight-text">You're 20% faster than team average</span>
            </div>
            <div class="insight-item">
              <span class="insight-icon">🎯</span>
              <span class="insight-text">3 high-priority tasks need attention</span>
            </div>
          </div>
        </div>
      `;
      
      this.animateIn(el);
      console.log('✅ Greeting rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering greeting:', error);
    }
  },

  renderEnhancedMetrics: function() {
    console.log('📊 Rendering enhanced metrics...');
    
    const el = document.getElementById('dashboard-metrics');
    if (!el) {
      console.warn('❌ Metrics container not found');
      return;
    }
    
    try {
      const completionRate = Math.round((RCSADemoData.metrics.assessmentsCompleted / RCSADemoData.metrics.assessmentsThisMonth) * 100);
      
      const metrics = [
        {
          value: RCSADemoData.metrics.assessmentsThisMonth,
          label: 'Assessments This Month',
          change: '+2 from last month',
          trend: 'positive',
          icon: '📊',
          color: 'blue'
        },
        {
          value: RCSADemoData.metrics.averageTime,
          label: 'Average Completion Time',
          change: '-30% improvement',
          trend: 'positive', 
          icon: '⚡',
          color: 'green'
        },
        {
          value: RCSADemoData.metrics.issuesOpen,
          label: 'Open Issues',
          change: '2 due this week',
          trend: 'neutral',
          icon: '⚠️',
          color: 'orange'
        },
        {
          value: completionRate + '%',
          label: 'Completion Rate',
          change: 'On track for month',
          trend: 'positive',
          icon: '🎯',
          color: 'purple'
        }
      ];
      
      el.innerHTML = `
        <div class="section-header lg-mb-6">
          <h2 class="section-title">
            <span class="section-icon">📈</span>
            Key Metrics
          </h2>
          <p class="section-subtitle">Your performance indicators</p>
        </div>
        <div class="enhanced-metrics-grid">
          ${metrics.map((metric, index) => `
            <div class="enhanced-metric-card ${metric.color}" style="animation-delay: ${index * 100}ms">
              <div class="metric-header">
                <span class="metric-icon">${metric.icon}</span>
                <span class="metric-trend ${metric.trend}">
                  ${metric.trend === 'positive' ? '↗️' : metric.trend === 'negative' ? '↘️' : '➡️'}
                </span>
              </div>
              <div class="metric-value">${metric.value}</div>
              <div class="metric-label">${metric.label}</div>
              <div class="metric-change ${metric.trend}">${metric.change}</div>
            </div>
          `).join('')}
        </div>
      `;
      
      this.animateIn(el);
      console.log('✅ Metrics rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering metrics:', error);
    }
  },

  renderEnhancedQuickActions: function() {
    console.log('⚡ Rendering enhanced quick actions...');
    
    const el = document.getElementById('quick-actions');
    if (!el) {
      console.warn('❌ Quick actions container not found');
      return;
    }
    
    try {
      const actions = [
        {
          id: 'report-risk',
          icon: '🚨',
          title: 'Report New Risk',
          description: 'Identified something during operations?',
          action: () => this.navigateWithFeedback('/frmRiskIntake', 'Opening Risk Intake Form...'),
          badge: 'Urgent',
          color: 'red'
        },
        {
          id: 'start-assessment',
          icon: '📝',
          title: 'Start Assessment',
          description: 'Begin a new risk assessment',
          action: () => this.navigateWithFeedback('/wizAssessment', 'Launching Assessment Wizard...'),
          badge: 'AI-Powered',
          color: 'blue'
        },
        {
          id: 'view-issues',
          icon: '⏰',
          title: 'View My Issues',
          description: `${RCSADemoData.metrics.issuesOpen} items need attention`,
          action: () => this.navigateWithFeedback('/scrMyIssues', 'Loading My Issues...'),
          badge: `${RCSADemoData.metrics.issuesOpen} Active`,
          color: 'orange'
        }
      ];
      
      el.innerHTML = `
        <div class="section-header lg-mb-6">
          <h2 class="section-title">
            <span class="section-icon">⚡</span>
            Quick Actions
          </h2>
          <p class="section-subtitle">Most common tasks</p>
        </div>
        <div class="enhanced-actions-grid">
          ${actions.map((action, index) => `
            <div class="enhanced-action-card ${action.color}" 
                 onclick="EnhancedDashboardComponents.executeAction('${action.id}')"
                 style="animation-delay: ${index * 150}ms"
                 tabindex="0"
                 role="button"
                 aria-label="${action.title}: ${action.description}">
              <div class="action-header">
                <span class="action-icon">${action.icon}</span>
                <span class="action-badge">${action.badge}</span>
              </div>
              <div class="action-content">
                <h3 class="action-title">${action.title}</h3>
                <p class="action-description">${action.description}</p>
              </div>
              <div class="action-arrow">→</div>
            </div>
          `).join('')}
        </div>
      `;
      
      // Store actions for execution
      this.quickActions = actions;
      this.animateIn(el);
      console.log('✅ Quick actions rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering quick actions:', error);
    }
  },

  renderEnhancedPriorityTasks: function() {
    console.log('🎯 Rendering enhanced priority tasks...');
    
    const el = document.getElementById('priority-tasks');
    if (!el) {
      console.warn('❌ Priority tasks container not found');
      return;
    }
    
    try {
      el.innerHTML = `
        <div class="section-header lg-mb-6">
          <h2 class="section-title">
            <span class="section-icon">🎯</span>
            AI-Prioritized Tasks
            <span class="ai-badge">✨ AI</span>
          </h2>
          <p class="section-subtitle">Intelligent task ordering based on risk and deadlines</p>
        </div>
        <div class="enhanced-tasks-list">
          ${RCSADemoData.priorityTasks.map((task, index) => `
            <div class="enhanced-task-card priority-${task.priority}" 
                 onclick="EnhancedDashboardComponents.startTask(${task.id})"
                 style="animation-delay: ${index * 100}ms"
                 tabindex="0"
                 role="button">
              <div class="task-priority-indicator">
                <span class="priority-badge ${task.priority}">
                  ${task.priority === 'high' ? '🔴' : '🟡'} ${task.priority.toUpperCase()}
                </span>
              </div>
              <div class="task-content">
                <div class="task-header">
                  <h3 class="task-title">${index + 1}. ${task.title}</h3>
                  <div class="task-meta">
                    <span class="task-process">${task.process}</span>
                    <span class="task-due">Due ${task.dueDate}</span>
                    <span class="task-time">⏱️ ${task.estimatedTime}</span>
                  </div>
                </div>
                <div class="task-insight">
                  <span class="insight-label">🤖 AI Insight:</span>
                  <span class="insight-text">
                    ${task.dueDate === 'Today' ? 'Due today and historically identifies the most high-risk findings.' : 
                      'Medium complexity process with good control coverage.'}
                  </span>
                </div>
              </div>
              <div class="task-action">
                <span class="action-button">Start →</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      this.animateIn(el);
      console.log('✅ Priority tasks rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering priority tasks:', error);
    }
  },

  renderEnhancedAssessments: function() {
    console.log('📋 Rendering enhanced assessments...');
    
    const el = document.getElementById('my-assessments');
    if (!el) {
      console.warn('❌ Assessments container not found');
      return;
    }
    
    try {
      el.innerHTML = `
        <div class="section-header lg-mb-6">
          <h2 class="section-title">
            <span class="section-icon">📋</span>
            My Assessments
          </h2>
          <p class="section-subtitle">Recent and ongoing risk assessments</p>
        </div>
        <div class="enhanced-assessments-grid">
          ${RCSADemoData.assessments.map((assessment, index) => `
            <div class="enhanced-assessment-card status-${assessment.status}"
                 onclick="EnhancedDashboardComponents.openAssessment(${assessment.id})"
                 style="animation-delay: ${index * 150}ms"
                 tabindex="0"
                 role="button">
              <div class="assessment-header">
                <h3 class="assessment-title">${assessment.processName}</h3>
                <span class="assessment-status ${assessment.status}">
                  ${assessment.status === 'pending' ? '⏳' : '🔄'} 
                  ${assessment.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div class="assessment-meta">
                <span class="assessment-unit">${assessment.businessUnit}</span>
                <span class="assessment-due">Due ${assessment.dueDate}</span>
              </div>
              <div class="assessment-stats">
                <div class="stat-item">
                  <span class="stat-icon">⚠️</span>
                  <span class="stat-value">${assessment.riskScore}</span>
                  <span class="stat-label">Risk Score</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">🛡️</span>
                  <span class="stat-value">${assessment.controlCount}</span>
                  <span class="stat-label">Controls</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">📋</span>
                  <span class="stat-value">${assessment.issueCount}</span>
                  <span class="stat-label">Issues</span>
                </div>
              </div>
              <div class="assessment-action">
                <span class="action-text">View Details →</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      this.animateIn(el);
      console.log('✅ Assessments rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering assessments:', error);
    }
  },

  // Enhanced interaction methods
  executeAction: function(actionId) {
    console.log('🎬 Executing action:', actionId);
    const action = this.quickActions.find(a => a.id === actionId);
    if (action && action.action) {
      action.action();
    }
  },

  navigateWithFeedback: function(url, message) {
    this.showToast(message, 'info');
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  },

  startTask: function(taskId) {
    const task = RCSADemoData.priorityTasks.find(t => t.id === taskId);
    if (task) {
      this.showToast(`Starting ${task.title}...`, 'info');
      setTimeout(() => {
        window.location.href = '/wizAssessment';
      }, 1000);
    }
  },

  openAssessment: function(assessmentId) {
    this.showToast('Opening assessment details...', 'info');
    setTimeout(() => {
      window.location.href = '/wizAssessment';
    }, 1000);
  },

  animateIn: function(element) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = `opacity ${this.animationDuration}ms ease, transform ${this.animationDuration}ms ease`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);
  },

  initializeEnhancedInteractions: function() {
    console.log('🎮 Initializing enhanced interactions...');
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.role === 'button' && focused.onclick) {
          e.preventDefault();
          focused.click();
        }
      }
    });

    // Add hover effects for cards
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.enhanced-metric-card, .enhanced-action-card, .enhanced-task-card, .enhanced-assessment-card')) {
        e.target.closest('.enhanced-metric-card, .enhanced-action-card, .enhanced-task-card, .enhanced-assessment-card').classList.add('hover-active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.enhanced-metric-card, .enhanced-action-card, .enhanced-task-card, .enhanced-assessment-card')) {
        e.target.closest('.enhanced-metric-card, .enhanced-action-card, .enhanced-task-card, .enhanced-assessment-card').classList.remove('hover-active');
      }
    });
  },

  showToast: function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `enhanced-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'info' ? 'ℹ️' : type === 'success' ? '✅' : '⚠️'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }
};

// Fallback simple toast function
function showToast(message) {
  if (window.EnhancedDashboardComponents) {
    EnhancedDashboardComponents.showToast(message, 'info');
  } else {
    console.log('Toast:', message);
    alert(message); // Fallback alert
  }
}

// Maintain compatibility with existing code
const DashboardComponents = EnhancedDashboardComponents;

// Initialize enhanced dashboard
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM Content Loaded - Starting Dashboard...');
  
  // Add comprehensive error handling
  window.addEventListener('error', (e) => {
    console.error('❌ Dashboard Error:', e.error);
    // Graceful degradation - don't break the demo
  });
  
  // Initialize with delay to ensure all resources are loaded
  setTimeout(() => {
    try {
      if (window.EnhancedDashboardComponents) {
        EnhancedDashboardComponents.init();
      } else {
        console.error('❌ EnhancedDashboardComponents not found');
      }
    } catch (error) {
      console.error('❌ Failed to initialize dashboard:', error);
    }
  }, 100);
});
