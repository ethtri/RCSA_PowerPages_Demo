# RCSA Workflow Tool - 1st Line of Defense Requirements

## Executive Summary

A modern, AI-powered Risk Control Self-Assessment tool that transforms the traditional 2-hour Excel-based process into a guided 10-minute experience. This document outlines requirements for the 1st Line of Defense (business unit risk managers) who perform risk assessments.

---

## 1. User Personas

### Primary: Sarah Chen - Risk Manager
**Role**: VP Operations, Retail Banking (1st LoD)  
**Experience**: 5 years in risk management  
**Tech Comfort**: Medium - uses standard business applications  
**Pain Points**:
- Monthly assessments take 2-3 hours in Excel
- Uncertain which risks to include
- No guidance on scoring methodology
- Difficulty tracking control effectiveness
- Manual follow-up on issues

**Goals**:
- Complete assessments quickly and accurately
- Get guidance on risk identification
- Understand control effectiveness
- Track and resolve issues efficiently

### Secondary: Marcus Johnson - Business Unit Head
**Role**: EVP Retail Banking  
**Experience**: 15 years in banking  
**Tech Comfort**: Low - prefers executive summaries  
**Pain Points**:
- Limited visibility into BU risk posture
- Surprised by audit findings
- Can't track team's assessment progress

**Goals**:
- Real-time view of BU risks
- Ensure team compliance
- Proactive risk management

---

## 2. User Journey Map

### Monthly Assessment Flow
```
1. EMAIL NOTIFICATION
   ↓ "3 assessments due this week"
2. INTELLIGENT DASHBOARD
   ↓ AI prioritizes urgent tasks
3. ASSESSMENT WIZARD
   ↓ 7-step guided process
4. AI-ASSISTED DECISIONS
   ↓ Risk suggestions, control matching
5. AUTOMATED WORKFLOWS
   ↓ Issues created, notifications sent
6. COMPLETION CELEBRATION
   ↓ Time saved highlighted
```

### Proactive Risk Identification Flow
```
1. IDENTIFIES NEW RISK
   ↓ During daily operations
2. QUICK INTAKE FORM
   ↓ AI helps articulate risk
3. MINI ASSESSMENT
   ↓ Streamlined 4-step process
4. AUTO-ESCALATION
   ↓ If high risk detected
```

---

## 3. Screen Requirements

### 3.1 Intelligent Dashboard (scrDashboard_1LoD)

**Purpose**: Command center that learns user patterns and prioritizes work

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Good morning, Sarah! Here's what needs your attention  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⚡ Quick Actions                                       │
│ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐│
│ │ 🚨 Report New  │ │ 📝 Start Ad-Hoc│ │ ⏰ Complete  ││
│ │     Risk       │ │   Assessment   │ │   Overdue    ││
│ └────────────────┘ └────────────────┘ └──────────────┘│
│                                                         │
│ 🎯 AI-Prioritized Tasks                               │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 1. Wire Transfer Assessment - DUE TODAY         │   │
│ │    Last month: 2 high risks found              │   │
│ │ 2. Loan Origination - Due in 2 days           │   │
│ │ 3. Resolve Issue #1247 - Escalated            │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ 📊 Your Risk Landscape                    🔔 (3)      │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │ In Progress │ │ Due This    │ │ High Risk   │     │
│ │      3      │ │ Week: 5     │ │ Issues: 2   │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
│                                                         │
│ 🗺️ Residual Risk Heat Map        📈 Trend Alert      │
│ ┌─────────────────────────┐     ┌─────────────────┐ │
│ │ [Interactive Heat Map]  │     │ KRI: Wire Limits│ │
│ │ L×I grid with tooltips  │     │ Approaching     │ │
│ └─────────────────────────┘     │ threshold ↗️    │ │
│                                 └─────────────────┘ │
│                                                         │
│ 📋 My Assessments                                     │
│ ┌─────────────────────────────────────────────────┐   │
│ │ [Smart card layout with status indicators]      │   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Quick Actions** (New Section):
- **Report New Risk**: Bright red button with icon, opens Proactive Risk Intake
- **Start Ad-Hoc Assessment**: For unscheduled assessments
- **Complete Overdue**: One-click to most overdue item
- All buttons have hover states and clear data-action attributes

**AI Features**:
- **Smart Prioritization**: AI analyzes due dates, risk levels, and historical patterns
- **Predictive Alerts**: "Based on last 3 months, Wire Transfer typically has 2-3 high risks"
- **Natural Language Summary**: "You have a busy week ahead with 5 assessments. Start with Wire Transfer - it's due today and historically has the most findings."
- **Anomaly Detection**: Highlights unusual KRI movements

**Key Interactions**:
- Click any prioritized task → Launch assessment wizard
- Hover on heat map cells → See risk details
- Click KRI alert → View trend analysis
- Notification bell → Dropdown with categorized alerts

### 3.2 Assessment Wizard (wizAssessment)

**Purpose**: Guide users through RCSA best practices with AI assistance at each step

**Important UX Principle**: **One pane visible at a time** to reduce cognitive load. Users see only the current step with smooth transitions between panes.

#### Wizard Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Wire Transfer Assessment                    Help (?)    │
├─────────────────────────────────────────────────────────┤
│ [1]──[2]──[3]──[4]──[5]──[6]──[7]  Step 4 of 7       │
│  ✓    ✓    ✓    ●    ○    ○    ○   Control Effect.   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [Current Pane Content - Only One Visible at a Time]    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ [← Previous]                    [Save Draft] [Next →]  │
└─────────────────────────────────────────────────────────┘

Optional: Collapsible Summary Sidebar (left side)
┌─────────────┐
│ ✓ Risks (5) │  <- Click to review/edit completed steps
│ ✓ Inherent  │
│ ✓ Controls  │
│ ● Effect... │
│ ○ Residual  │
│ ○ Response  │
│ ○ Submit    │
└─────────────┘
```

**Navigation Features**:
- Progress bar shows completed (✓), current (●), and future (○) steps
- Can click any completed step to review/edit
- Auto-save every 30 seconds
- "Save Draft" for explicit save
- Smooth slide transitions between panes (left/right)

#### Pane 1: Risk Review (paneRiskReview)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Review Risks for: Wire Transfer Process                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📋 Pre-Identified Risks (from Risk Library)           │
│ ┌─────────────────────────────────────────────────┐   │
│ │ ☑ Unauthorized wire transfer                    │   │
│ │ ☑ Wire fraud - external                        │   │
│ │ ☑ Compliance violation - limits                │   │
│ │ ☐ System outage during transfer                │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ✨ AI Suggestions - New Risks to Consider             │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 🤖 "Based on recent industry events, consider:" │   │
│ │                                                 │   │
│ │ • Deepfake voice authorization (NEW)           │   │
│ │   Recent incidents at peer banks               │   │
│ │   [Add to Assessment]                          │   │
│ │                                                 │   │
│ │ • Real-time payment reversals                  │   │
│ │   New regulation effective last month          │   │
│ │   [Add to Assessment]                          │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [+ Add Custom Risk]              [Previous] [Next →]   │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Contextual Suggestions**: Based on process type, recent incidents, regulatory changes
- **Trend Analysis**: "This risk increased 40% across the industry last quarter"
- **Peer Insights**: "3 similar banks added this risk recently"

#### Pane 2: Inherent Risk Assessment (paneInherentRisk)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Assess Inherent Risk: Unauthorized Wire Transfer       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📊 Historical Context        🤖 AI Analysis           │
│ ┌──────────────────┐        ┌───────────────────┐    │
│ │ Last 6 Assessments│        │ Suggested: L4×I5  │    │
│ │ L: 3,3,4,4,4,4   │        │                   │    │
│ │ I: 5,5,5,5,5,5   │        │ "Wire fraud up    │    │
│ │ Trend: Stable ↔️  │        │  35% this year"  │    │
│ └──────────────────┘        │ [Why?]            │    │
│                             └───────────────────┘    │
│                                                         │
│ Select Likelihood & Impact:                            │
│        Impact →                                        │
│    L   1    2    3    4    5                         │
│    i ┌────┬────┬────┬────┬────┐                     │
│    k 5│ 5  │ 10 │ 15 │ 20 │ 25 │                     │
│    e ├────┼────┼────┼────┼────┤                     │
│    l 4│ 4  │ 8  │ 12 │ 16 │ 20 │ ← AI suggests      │
│    i ├────┼────┼────┼────┼────┤                     │
│    h 3│ 3  │ 6  │ 9  │ 12 │ 15 │                     │
│    o ├────┼────┼────┼────┼────┤                     │
│    o 2│ 2  │ 4  │ 6  │ 8  │ 10 │                     │
│    d ├────┼────┼────┼────┼────┤                     │
│    ↓ 1│ 1  │ 2  │ 3  │ 4  │ 5  │                     │
│      └────┴────┴────┴────┴────┘                     │
│                                                         │
│ 📈 KRI Correlation                                     │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Wire Exception Rate: 0.8% (↑ from 0.5%)        │   │
│ │ [Mini trend chart showing 6-month trend]       │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ Comments (Optional):                                   │
│ [_____________________________________________]        │
│                                                         │
│                              [← Previous] [Next →]     │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Smart Scoring**: AI suggests scores based on KRIs, incidents, peer data
- **Transparency**: "Why?" button explains AI reasoning
- **Trend Integration**: Shows how KRI movements correlate with risk scores

#### Pane 3: Control Mapping (paneControlMapping)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Map Controls: Unauthorized Wire Transfer               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔍 Search Existing Controls                           │
│ [Search: "wire authorization"___________] 🔍          │
│                                                         │
│ ✨ AI-Matched Controls                                │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 95% Match: Dual authorization for wires >$10k  │   │
│ │ Type: Preventive | Automated: Yes              │   │
│ │ [Link Control]                                 │   │
│ │                                                 │   │
│ │ 89% Match: Daily wire transfer reconciliation  │   │
│ │ Type: Detective | Automated: No                │   │
│ │ [Link Control]                                 │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ 🔗 Linked Controls (2)                                │
│ ┌─────────────────────────────────────────────────┐   │
│ │ ✓ Dual authorization for wires >$10k          │   │
│ │ ✓ Daily wire transfer reconciliation          │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ⚠️ AI Insight: "Consider adding real-time fraud      │
│ detection - peer banks reduced wire fraud by 60%"     │
│                                                         │
│ [+ Add New Control]          [← Previous] [Next →]    │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Intelligent Matching**: ML-based control suggestions
- **Gap Analysis**: Identifies missing control types
- **Duplicate Detection**: Prevents redundant mappings

#### Pane 4: Control Effectiveness (paneControlEffectiveness)

**Layout - Enhanced for Multiple Controls**:
```
┌─────────────────────────────────────────────────────────┐
│ Evaluate Control Effectiveness                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Risk: Unauthorized Wire Transfer                       │
│                                                         │
│ 📊 Control Effectiveness Summary                       │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Overall Control Effectiveness Index (CEI): 85%  │   │
│ │ ████████████████████░░░░  Strong               │   │
│ │                                                 │   │
│ │ Calculation: (90% + 80% + 85%) / 3 = 85%      │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ 📋 Individual Control Assessments (3 controls)        │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 1. Dual authorization for wires >$10k          │   │
│ │ Type: Preventive | Automated: Yes              │   │
│ │                                                 │   │
│ │ Design Effectiveness:    [Effective ▼]         │   │
│ │ Operational Effect.:     [Partially Eff. ▼]    │   │
│ │ Combined Score: 85%                            │   │
│ │                                                 │   │
│ │ 🤖 AI: "92% compliance, 4 exceptions found"   │   │
│ │ 📎 Evidence: [Test_Report.pdf]                │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 2. Daily wire reconciliation                   │   │
│ │ Type: Detective | Automated: No                │   │
│ │                                                 │   │
│ │ Design Effectiveness:    [Effective ▼]         │   │
│ │ Operational Effect.:     [Effective ▼]         │   │
│ │ Combined Score: 90%                            │   │
│ │                                                 │   │
│ │ 🤖 AI: "Consistently performed, no gaps"      │   │
│ │ 📎 Evidence: [Recon_Log.xlsx]                 │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 3. Manager approval for international wires    │   │
│ │ [Similar format...]                            │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ⚠️ AI Insight: "Control effectiveness dropped 5%      │
│ from last assessment. Consider additional training"    │
│                                                         │
│                              [← Previous] [Next →]     │
└─────────────────────────────────────────────────────────┘
```

**Key Enhancements**:
- **CEI Summary Card**: Shows overall effectiveness at a glance
- **Clear Calculation**: Transparent averaging method displayed
- **Individual Cards**: Each control in its own container
- **Visual Hierarchy**: Summary → Individual controls → AI insights
- **Combined Scores**: Each control shows its contribution to CEI

**Effectiveness Scoring Logic**:
```
Design Effectiveness:
- Effective = 100%
- Partially Effective = 75%
- Ineffective = 25%
- Not Applicable = Excluded from CEI

Operational Effectiveness:
- Same scale as above

Control Score = (Design + Operational) / 2
CEI = Average of all Control Scores
```

**AI Features**:
- **Evidence Analysis**: AI reads test reports and suggests ratings
- **Anomaly Detection**: Flags unusual effectiveness drops
- **Predictive Insights**: "Effectiveness typically drops in Q4 due to volume"

#### Pane 5: Residual Risk Assessment (paneResidualRisk)

**Layout - Enhanced with CEI Integration**:
```
┌─────────────────────────────────────────────────────────┐
│ Residual Risk: Unauthorized Wire Transfer              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📊 Risk Calculation                                    │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Inherent Risk: L4 × I5 = 20 (Very High)        │   │
│ │                                                 │   │
│ │ Control Effectiveness Index: 85% (Strong)      │   │
│ │ • 3 controls mapped                            │   │
│ │ • Average effectiveness: Strong                │   │
│ │                                                 │   │
│ │ 🤖 AI Calculated Residual: L2 × I4 = 8        │   │
│ │                                                 │   │
│ │ AI Logic: "Strong controls (85% CEI) reduce   │   │
│ │ likelihood by 2 levels and contain impact"    │   │
│ │ [View Detailed Calculation]                    │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ Residual Risk Matrix:                                 │
│ [5×5 grid with calculated position highlighted]       │
│                                                         │
│ ⚠️ Risk Appetite Status:                              │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Medium Risk - Within Appetite ✓                │   │
│ │ Threshold: Score ≤ 15                          │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ Override Calculated Risk?                              │
│ [No - Accept Calculation ◉] [Yes - Manual Override ○] │
│                                                         │
│                              [← Previous] [Next →]     │
└─────────────────────────────────────────────────────────┘
```

**AI Calculation Transparency**:
When user clicks "View Detailed Calculation":
```
┌─────────────────────────────────────────────────────────┐
│ Residual Risk Calculation Details                  [X] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Starting Point:                                        │
│ • Inherent Likelihood: 4 (High)                       │
│ • Inherent Impact: 5 (Very High)                      │
│                                                         │
│ Control Effectiveness Impact:                          │
│ • CEI: 85% (Strong)                                   │
│ • Preventive Controls (2): Reduce likelihood         │
│ • Detective Controls (1): Enable faster response      │
│                                                         │
│ Reduction Logic:                                       │
│ • 80-100% CEI: Reduce L by 2, I by 1                 │
│ • 60-79% CEI: Reduce L by 1, I by 1                  │
│ • 40-59% CEI: Reduce L by 1 only                     │
│ • Below 40%: No significant reduction                 │
│                                                         │
│ Result: L4→L2, I5→I4 = Residual Score 8              │
│                                                         │
│                                           [Close]      │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Transparent Calculation**: Shows exactly how controls reduce risk
- **Appetite Comparison**: Compares to predefined thresholds
- **Override Justification**: If manual override, AI prompts for rationale

#### Pane 6: Risk Response (paneRiskResponse)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Risk Response Planning                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Risk: Unauthorized Wire Transfer                       │
│ Residual Score: 8 (Medium) - Within Appetite          │
│                                                         │
│ Select Response Strategy:                              │
│                                                         │
│ ◉ Monitor                                             │
│   Continue with current controls                       │
│                                                         │
│ ○ Enhance Controls                                    │
│   ┌─────────────────────────────────────────────┐    │
│   │ ✨ AI Recommendations:                       │    │
│   │ • Implement real-time fraud detection       │    │
│   │   Cost: $50K | Risk Reduction: 40%         │    │
│   │ • Reduce wire limit to $5K                 │    │
│   │   Cost: $0 | Risk Reduction: 25%          │    │
│   └─────────────────────────────────────────────┘    │
│                                                         │
│ ○ Accept Risk                                         │
│   Formal acceptance with justification                │
│                                                         │
│ Action Items (if Enhance selected):                   │
│ [_____________________________________________]        │
│ Owner: [Select ▼] Due Date: [MM/DD/YYYY]             │
│                                                         │
│                              [← Previous] [Next →]     │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Cost-Benefit Analysis**: AI calculates ROI of mitigations
- **Peer Benchmarking**: "82% of peer banks implemented this control"
- **Smart Recommendations**: Based on risk profile and resources

#### Pane 7: Review & Submit (paneReviewSubmit)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Review & Submit Assessment                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📋 Assessment Summary                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Process: Wire Transfer | BU: Retail Banking     │   │
│ │ Assessment Period: July 2024                    │   │
│ │                                                 │   │
│ │ Risks Assessed: 5                              │   │
│ │ • 2 High → Medium (mitigated)                 │   │
│ │ • 2 Medium → Low (controlled)                 │   │
│ │ • 1 New risk identified                       │   │
│ │                                                 │   │
│ │ Time Spent: 12 minutes (↓ from 2.5 hours!)    │   │
│ │ AI Assistance: 15 suggestions accepted         │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ✅ Completeness Check                                  │
│ ┌─────────────────────────────────────────────────┐   │
│ │ ✓ All risks have inherent scores              │   │
│ │ ✓ All risks have controls mapped              │   │
│ │ ✓ All controls evaluated                      │   │
│ │ ✓ All residual risks calculated               │   │
│ │ ✓ All responses documented                    │   │
│ │ ⚠️ 1 action item needs owner assigned         │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ☐ I attest that this assessment is complete and       │
│   accurate to the best of my knowledge                │
│                                                         │
│                        [← Previous] [Submit Assessment]│
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Completeness Validation**: AI checks for missing elements
- **Time Tracking**: Celebrates efficiency gains
- **Quality Score**: Behind-the-scenes scoring of assessment quality

### 3.3 Proactive Risk Intake (frmRiskIntake)

**Purpose**: Enable quick risk identification outside monthly cycle - emphasizing this as a KEY DIFFERENTIATOR

**Enhanced Layout with Clear CTA**:
```
┌─────────────────────────────────────────────────────────┐
│ 🚨 Report a New Risk                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Great catch! Let's document this risk properly.        │
│                                                         │
│ What risk have you identified?                         │
│ [Brief risk title_____________________________]        │
│                                                         │
│ Which process does this impact?                        │
│ [Select Process ▼]                                     │
│                                                         │
│ Tell us more:                                          │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Describe what could go wrong, how it might      │   │
│ │ happen, and potential impact...                  │   │
│ │                                                 │   │
│ │                                                 │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ✨ AI Risk Enhancement:                                │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 🤖 "Based on your input, here's a refined      │   │
│ │ risk statement:"                                │   │
│ │                                                 │   │
│ │ Risk: "Inadequate verification of wire         │   │
│ │ transfer callback procedures"                  │   │
│ │                                                 │   │
│ │ Cause: "Social engineering tactics bypassing   │   │
│ │ standard verification"                         │   │
│ │                                                 │   │
│ │ Impact: "Potential unauthorized transfers      │   │
│ │ up to $10M"                                   │   │
│ │                                                 │   │
│ │ Category: Operational Risk                     │   │
│ │ Suggested Inherent Score: L3 × I5 = 15       │   │
│ │                                                 │   │
│ │ [Use This] [Edit] [Regenerate]               │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ What would you like to do next?                       │
│                                                         │
│ [💾 Save for Later]  [📊 Assess This Risk Now →]      │
│                                   (Starts mini wizard) │
└─────────────────────────────────────────────────────────┘
```

**Key Enhancements**:
- **Prominent placement** in dashboard Quick Actions
- **Encouraging tone** - "Great catch!"
- **AI helps articulate** - Turns rough ideas into proper risk statements
- **Two paths**: Save for monthly cycle OR assess immediately
- **Risk components** - AI breaks down into Risk/Cause/Impact format

**AI Features**:
- **Risk Articulation**: Helps users write clear risk statements
- **Impact Analysis**: Suggests potential consequences
- **Similar Risk Detection**: "This is similar to existing risk X"

### 3.4 Issue Tracker (scrMyIssues)

**Purpose**: Manage remediation efforts efficiently

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ My Issues & Action Items                 🔍 [Search]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filter: [All ▼] [High Priority ▼] [Due This Week ▼]   │
│                                                         │
│ 🎯 AI Prioritized Actions                             │
│ ┌─────────────────────────────────────────────────┐   │
│ │ 1. Wire Limit Control - Due Tomorrow           │   │
│ │    Impact: 3 high risks | Days Open: 45       │   │
│ │    AI: "Similar issue took 60 days to resolve"│   │
│ │                                                 │   │
│ │ 2. Fraud Detection Implementation - Overdue    │   │
│ │    Escalated to: M. Johnson                   │   │
│ │    AI: "Blocking 2 assessments next month"    │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ 📋 All Issues (12)                                    │
│ ┌─────────────────────────────────────────────────┐   │
│ │ [List with status badges, owners, due dates]   │   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Detailed Issue View (Drawer)**:
```
┌─────────────────────────────────────────────────────────┐
│ Issue: Wire Limit Control Enhancement    [Close ✕]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🤖 AI Root Cause Analysis:                            │
│ "Control gap due to recent threshold increase.        │
│ Similar pattern seen in 3 other processes."           │
│                                                         │
│ 📊 Impact Analysis:                                    │
│ • Affects 3 high-risk items                          │
│ • $2M potential exposure                             │
│ • Compliance deadline: 30 days                       │
│                                                         │
│ 💡 AI Recommendations:                                 │
│ 1. Immediate: Reduce limit to $5K (1 day)           │
│ 2. Short-term: Implement callback process (1 week)   │
│ 3. Long-term: Deploy fraud detection (30 days)       │
│                                                         │
│ 📝 Updates:                                            │
│ [Status update box with AI-generated draft]          │
│                                                         │
│ 💬 Comments (3)                                        │
│ [Comment thread with @mentions]                       │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Root Cause Analysis**: Identifies patterns and connections
- **Impact Assessment**: Calculates risk exposure
- **Solution Recommendations**: Prioritized by effort/impact
- **Status Drafting**: AI writes update summaries

### 3.5 Help Center (scrHelp)

**Purpose**: Self-service support with AI assistance

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ Help Center                                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🤖 AI Assistant                                        │
│ ┌─────────────────────────────────────────────────┐   │
│ │ "Hi Sarah! I noticed you're working on Wire      │   │
│ │ Transfer assessment. How can I help?"            │   │
│ │                                                 │   │
│ │ Common questions:                               │   │
│ │ • How do I calculate residual risk?            │   │
│ │ • What's the difference between inherent and   │   │
│ │   residual risk?                               │   │
│ │ • When should I escalate a risk?              │   │
│ │                                                 │   │
│ │ [Type your question...]                        │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ 📚 Quick Guides                                        │
│ • RCSA Methodology Overview                           │
│ • Risk Scoring Guidelines                             │
│ • Control Types Explained                             │
│ • Video: 5-minute Assessment Walkthrough              │
└─────────────────────────────────────────────────────────┘
```

**AI Features**:
- **Contextual Help**: Knows what screen/process user is on
- **Predictive Support**: Suggests help before user asks
- **Learning Mode**: Improves answers based on usage

---

## 4. AI Behavior Specifications

### AI Assistant Personality
- **Tone**: Professional but friendly, like a knowledgeable colleague
- **Proactive**: Offers help before being asked
- **Transparent**: Always explains reasoning
- **Learning**: Adapts to user preferences

### Key AI Functions

#### 1. Risk Intelligence Engine
```javascript
// Analyzes multiple data sources
riskIntelligence.analyze({
  process: currentProcess,
  historicalData: last12Months,
  industryTrends: externalFeeds,
  regulatoryChanges: complianceDB,
  peerBenchmarks: anonymizedData
}) => suggestedRisks[]
```

#### 2. Control Effectiveness Predictor
```javascript
// Predicts control performance
controlPredictor.assess({
  controlTestResults: testData,
  incidentHistory: incidents,
  volumeTrends: transactionData,
  seasonalFactors: historicalPatterns
}) => effectivenessScore
```

#### 3. Smart Prioritization
```javascript
// Creates personalized work queue
priorityEngine.rank({
  dueDate: assessment.deadline,
  riskLevel: assessment.inherentRisk,
  userPatterns: historicalBehavior,
  businessImpact: processImportance,
  regulatoryDeadlines: complianceDates
}) => prioritizedTasks[]
```

---

## 5. Mock Data Requirements

### Sample Data Sets
1. **Processes**: 20 banking processes with varying criticality
2. **Risks**: 100+ risk library with categories and descriptions
3. **Controls**: 50+ controls with types and automation flags
4. **Historical Assessments**: 12 months of data showing trends
5. **Issues**: 30 open/closed issues with various statuses
6. **KRIs**: 15 metrics with historical trends

### Demo Scenarios
1. **Happy Path**: Complete assessment in 8 minutes
2. **High Risk**: Trigger issue creation workflow
3. **KRI Breach**: Show reassessment trigger
4. **New Risk**: Demonstrate proactive identification

---

## 6. Success Metrics for Demo

### Quantitative
- Assessment time: <10 minutes (vs 2+ hours)
- AI suggestions accepted: >70%
- Risks identified: 20% more than manual
- Issue resolution: 30% faster

### Qualitative
- "This feels like it understands my job"
- "I trust the AI recommendations"
- "So much faster than Excel"
- "I actually enjoy doing assessments now"

---

## 7. Technical Specifications

### Performance
- Page load: <1 second
- AI responses: <2 seconds
- Auto-save: Every 30 seconds
- Smooth animations: 60fps

### Browser Support
- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

### Responsive Design
- Optimized for: 1280×800 to 1920×1080
- Minimum: 1280×800
- No mobile optimization required

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation throughout
- Screen reader optimized
- High contrast mode support

---

## 8. Navigation & UI Components

### Global Navigation Bar
```
┌─────────────────────────────────────────────────────────┐
│ [≡] RCSA Tool  |  Dashboard > Wire Transfer Assessment │
│                                              Sarah Chen │
└─────────────────────────────────────────────────────────┘
```

### Persistent AI Assistant
- Floating action button (bottom right)
- Expands to chat interface
- Minimizes but stays accessible
- Shows notification badge for proactive tips

### Keyboard Shortcuts
- `Alt + /` - Open AI assistant
- `Alt + D` - Go to dashboard
- `Alt + N` - New assessment
- `Alt + ←/→` - Navigate wizard steps
- `Esc` - Close modals/drawers

### Visual Design Language
- **Cards**: 8px radius, subtle shadows
- **Primary Blue**: #0066CC
- **Success Green**: #0D7F3F
- **Warning Amber**: #CC6600
- **Danger Red**: #CC0000
- **Spacing**: 8px grid system
- **Typography**: System fonts, 14px base

---

## 9. Demo Script Highlights

### Opening Hook (30 seconds)
"Sarah used to spend over 2 hours each month on risk assessments in Excel. Today, she'll complete one in under 10 minutes with AI assistance."

### Key Demo Moments

#### Moment 1: Intelligent Dashboard (1 minute)
- Show AI prioritization
- Highlight time saved metric
- Click KRI alert showing trend

#### Moment 2: AI Risk Discovery (2 minutes)
- Accept pre-identified risks
- Show AI suggesting "deepfake" risk
- Explain how AI knew about industry trend

#### Moment 3: Smart Control Mapping (1.5 minutes)
- Show 95% match on controls
- AI identifies missing control
- One-click to link

#### Moment 4: Automated Calculations (1.5 minutes)
- Show transparent residual calculation
- Override with justification
- Automatic issue creation

#### Moment 5: Completion Celebration (30 seconds)
- Show "12 minutes vs 2.5 hours"
- Highlight quality improvements
- Preview 2LoD notification

### Closing Impact (30 seconds)
"Sarah just completed a higher-quality assessment in 92% less time. Multiply this across 50 risk managers doing monthly assessments, and you save 2,400 hours annually while improving risk visibility."

---

## 10. Future Enhancements (Post-Demo)

### Phase 2 Features
1. **Mobile App** - Assessments on the go
2. **Voice Input** - "Add risk about wire fraud"
3. **Predictive Analytics** - Forecast risk trends
4. **Integration Hub** - Connect to core banking systems
5. **Advanced AI** - GPT-4 integration for complex analysis

### Potential Integrations
- ServiceNow (issue tracking)
- Teams (notifications)
- Power BI (analytics)
- Outlook (scheduling)
- SharePoint (evidence storage)

---

## Appendix A: AI Response Examples

### Risk Suggestion
```
🤖 "I've identified 3 emerging risks for Wire Transfers:

1. Deepfake Voice Authorization (NEW)
   - 3 incidents at peer banks last month
   - Suggested score: L3 × I5 = 15
   
2. Real-time Payment Reversals
   - New regulation effective June 1
   - Suggested score: L2 × I4 = 8
   
3. Quantum Computing Threats
   - Long-term concern for encryption
   - Suggested score: L1 × I5 = 5

These are based on industry reports, regulatory bulletins, 
and incident data from the last 90 days."
```

### Control Effectiveness Analysis
```
🤖 "Analysis of 'Dual Authorization for Wires >$10k':

Design Effectiveness: Effective ✓
- Well-documented procedure
- Clear roles defined
- Appropriate threshold

Operational Effectiveness: Partially Effective ⚠️
- 92% compliance rate (down from 97%)
- 4 exceptions in last 30 days
- 2 near-misses prevented
- Staff training overdue for 15%

Recommendation: Schedule refresher training and 
consider lowering threshold to $5k for high-risk 
transactions."
```

### Issue Prioritization
```
🤖 "I've prioritized your 12 open issues:

CRITICAL (Do Today):
1. Wire Limit Control - Due tomorrow, affects 3 high risks
2. Access Review - Regulatory deadline in 3 days

HIGH (This Week):
3. Fraud Detection Implementation - 45 days overdue
4. Training Documentation - Blocking 2 assessments

MEDIUM (This Month):
5-8. [Various control updates]

LOW (Schedule):
9-12. [Process improvements]

Focus on #1 first - it has the highest risk impact 
and is blocking next month's assessment."
```

---

## Appendix B: Sample Mock Data Structure

### Processes
```json
{
  "processes": [
    {
      "id": "P001",
      "name": "Wire Transfers",
      "businessUnit": "Retail Banking",
      "criticality": "High",
      "owner": "Sarah Chen",
      "lastAssessment": "2024-06-15",
      "riskCount": 8,
      "controlCount": 12
    }
  ]
}
```

### Risks
```json
{
  "risks": [
    {
      "id": "R001",
      "title": "Unauthorized wire transfer",
      "category": "Operational",
      "process": "P001",
      "inherentLikelihood": 4,
      "inherentImpact": 5,
      "causes": ["Human error", "Fraud", "System failure"],
      "consequences": ["Financial loss", "Regulatory fine", "Reputation damage"]
    }
  ]
}
```

### KRI Trends
```json
{
  "kris": [
    {
      "id": "KRI001",
      "name": "Wire Exception Rate",
      "process": "P001",
      "currentValue": 0.8,
      "threshold": 1.0,
      "trend": "increasing",
      "history": [
        {"month": "Jan", "value": 0.5},
        {"month": "Feb", "value": 0.5},
        {"month": "Mar", "value": 0.6},
        {"month": "Apr", "value": 0.7},
        {"month": "May", "value": 0.7},
        {"month": "Jun", "value": 0.8}
      ]
    }
  ]
}
```

---

This completes the comprehensive 1st Line of Defense requirements document. The focus is on creating an intuitive, AI-powered experience that transforms risk assessment from a tedious compliance task into an engaging, value-adding activity.