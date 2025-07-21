# Bootstrap 5 Usage Guide - RCSA Application

## Overview

The RCSA application uses **Bootstrap 5.3.0** as its primary CSS framework, providing a solid foundation for responsive design and UI components. This guide documents how Bootstrap 5 is implemented and customized for our banking application.

## Bootstrap 5 Implementation

### CDN Usage
All pages use Bootstrap 5.3.0 via CDN for reliability and performance:

```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

<!-- Bootstrap 5 JavaScript (when needed) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

## Key Bootstrap Components Used

### 1. Grid System
```html
<!-- Standard 12-column responsive grid -->
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
            <!-- Main content -->
        </div>
        <div class="col-md-4">
            <!-- Sidebar -->
        </div>
    </div>
</div>
```

### 2. Cards (Primary Container)
```html
<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">Section Title</h5>
    </div>
    <div class="card-body">
        <!-- Content -->
    </div>
</div>
```

### 3. Buttons
```html
<!-- Primary actions -->
<button class="btn btn-primary">Continue</button>

<!-- Secondary actions -->
<button class="btn btn-outline-primary">Back</button>

<!-- Success actions -->
<button class="btn btn-success">Accept</button>

<!-- Warning actions -->
<button class="btn btn-warning">Modify</button>

<!-- Danger actions -->
<button class="btn btn-outline-secondary">Reject</button>
```

### 4. Forms
```html
<div class="mb-3">
    <label for="input" class="form-label">Field Label</label>
    <input type="text" class="form-control" id="input">
</div>

<div class="mb-3">
    <label for="select" class="form-label">Dropdown</label>
    <select class="form-select" id="select">
        <option>Choose...</option>
    </select>
</div>
```

### 5. Badges and Status Indicators
```html
<!-- Status badges -->
<span class="badge bg-success">Complete</span>
<span class="badge bg-warning">In Progress</span>
<span class="badge bg-danger">Overdue</span>
<span class="badge bg-primary">Pending</span>
```

### 6. Progress Indicators
```html
<!-- Progress bar -->
<div class="progress mb-3">
    <div class="progress-bar" role="progressbar" style="width: 25%">
        Step 1 of 4
    </div>
</div>
```

### 7. Alerts and Feedback
```html
<!-- Success message -->
<div class="alert alert-success alert-dismissible fade show">
    <i class="bi bi-check-circle me-2"></i>
    Operation completed successfully!
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Error message -->
<div class="alert alert-danger">
    <i class="bi bi-exclamation-triangle me-2"></i>
    Please correct the errors below.
</div>
```

## RCSA-Specific Bootstrap Customizations

### Color Customizations
Our application overrides Bootstrap's default colors to match banking standards:

```css
:root {
    /* RCSA Primary Colors */
    --bs-primary: #0066CC;        /* CapTech Blue */
    --bs-success: #0D7F3F;        /* Banking Green */
    --bs-warning: #CC6600;        /* Amber Warning */
    --bs-danger: #CC0000;         /* Red Danger */
    
    /* RCSA Neutral Colors */
    --bs-gray-100: #F5F5F5;       /* Background */
    --bs-gray-200: #E5E5E5;       /* Borders */
    --bs-gray-600: #6B6B6B;       /* Light text */
    --bs-gray-800: #4A4A4A;       /* Body text */
    --bs-gray-900: #2B2B2B;       /* Headers */
}
```

### Typography Overrides
```css
/* Bootstrap font family override */
body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

/* Header sizes aligned with RCSA standards */
h1 { font-size: 2rem; font-weight: 600; }      /* 32px Display */
h2 { font-size: 1.5rem; font-weight: 600; }    /* 24px Heading1 */
h3 { font-size: 1.25rem; font-weight: 600; }   /* 20px Heading2 */
h4 { font-size: 1.125rem; font-weight: 500; }  /* 18px Heading3 */
```

### Component Customizations

#### Enhanced Cards
```css
.card {
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    transition: all 200ms ease;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.12);
}
```

#### Custom Buttons
```css
.btn {
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 0.75rem 1.5rem;
    transition: all 200ms ease;
}

.btn-primary {
    background-color: #0066CC;
    border-color: #0066CC;
}

.btn-primary:hover {
    background-color: #0052A3;
    border-color: #0052A3;
}
```

## Bootstrap Icons Usage

### Common Icons Used
```html
<!-- Navigation -->
<i class="bi bi-chevron-left"></i>    <!-- Back -->
<i class="bi bi-chevron-right"></i>   <!-- Forward -->
<i class="bi bi-house"></i>           <!-- Home -->

<!-- Status and Feedback -->
<i class="bi bi-check-circle"></i>    <!-- Success -->
<i class="bi bi-exclamation-triangle"></i> <!-- Warning -->
<i class="bi bi-x-circle"></i>        <!-- Error -->
<i class="bi bi-info-circle"></i>     <!-- Information -->

<!-- Actions -->
<i class="bi bi-plus"></i>            <!-- Add -->
<i class="bi bi-pencil"></i>          <!-- Edit -->
<i class="bi bi-trash"></i>           <!-- Delete -->
<i class="bi bi-download"></i>        <!-- Download -->

<!-- Risk Assessment Specific -->
<i class="bi bi-shield-check"></i>    <!-- Controls -->
<i class="bi bi-graph-up"></i>        <!-- Metrics -->
<i class="bi bi-clipboard-data"></i>  <!-- Assessment -->
<i class="bi bi-bar-chart"></i>       <!-- Reports -->
```

## Responsive Behavior

### Breakpoints
```css
/* Bootstrap 5 default breakpoints used */
xs: <576px    (Extra small devices)
sm: ≥576px    (Small devices)
md: ≥768px    (Medium devices - minimum for our app)
lg: ≥992px    (Large devices)
xl: ≥1200px   (Extra large devices)
xxl: ≥1400px  (Extra extra large devices)
```

### RCSA Application Responsive Strategy
Since this is desktop-only, we optimize for:
- **md and above**: Primary target (≥768px)
- **lg and above**: Optimal experience (≥992px)
- **xl and above**: Enhanced layout (≥1200px)

```css
/* Example responsive utilities */
.d-none .d-md-block    /* Hide on mobile, show on desktop */
.col-md-6 .col-lg-4    /* 2 columns on medium, 3 on large */
```

## Performance Considerations

### CDN Benefits
- Global distribution and caching
- Automatic compression
- Version stability
- No hosting overhead

### Bundle Size
- Bootstrap CSS: ~191KB minified
- Bootstrap Icons: ~106KB
- Bootstrap JS: ~73KB (when needed)

### Loading Strategy
```html
<!-- Critical CSS loaded first -->
<link href="bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Non-critical icons loaded after -->
<link href="bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

<!-- JavaScript loaded at end of body (when needed) -->
<script src="bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

## Best Practices for RCSA Application

### 1. Consistent Spacing
Use Bootstrap's spacing utilities aligned with RCSA's 8px system:
```html
<!-- Margins -->
<div class="mb-1">    <!-- 8px bottom margin -->
<div class="mb-2">    <!-- 16px bottom margin -->
<div class="mb-3">    <!-- 24px bottom margin -->
<div class="mb-4">    <!-- 32px bottom margin -->

<!-- Padding -->
<div class="p-3">     <!-- 24px all around (card standard) -->
```

### 2. Color Usage
Always use semantic color classes:
```html
<!-- Correct -->
<button class="btn btn-primary">Primary Action</button>
<span class="badge bg-success">Complete</span>

<!-- Avoid -->
<button class="btn" style="background: blue;">Action</button>
```

### 3. Accessibility
Bootstrap 5 includes accessibility features by default:
```html
<!-- Screen reader support -->
<button class="btn btn-primary" aria-label="Continue to next step">
    Continue
</button>

<!-- Form associations -->
<label for="risk-title" class="form-label">Risk Title</label>
<input type="text" class="form-control" id="risk-title" aria-describedby="risk-help">
<div id="risk-help" class="form-text">Enter a descriptive risk title</div>
```

## Integration with Other Design Systems

### With LogicGate Design System
LogicGate components build on Bootstrap foundation:
```html
<!-- Bootstrap base + LogicGate enhancement -->
<div class="card logicgate-risk-card">
    <div class="card-body">
        <h5 class="card-title logicgate-risk-title">Risk Title</h5>
    </div>
</div>
```

### With RCSA Custom Styles
RCSA styles extend Bootstrap without conflicts:
```html
<!-- Bootstrap + RCSA enhancements -->
<div class="card rcsa-assessment-card">
    <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Assessment Progress</h5>
    </div>
</div>
```

## Maintenance and Updates

### Version Management
- **Current Version**: Bootstrap 5.3.0
- **Update Strategy**: Test thoroughly before upgrading
- **Breaking Changes**: Review migration guides
- **Fallback**: Always maintain CDN fallback

### Customization Guidelines
1. Use CSS custom properties for theme changes
2. Extend, don't override Bootstrap classes
3. Use semantic class names for custom components
4. Maintain responsive behavior in all customizations

---

This guide ensures consistent Bootstrap 5 usage across the RCSA application while maintaining our banking design standards and accessibility requirements. 