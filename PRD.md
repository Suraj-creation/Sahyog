# 📋 SAHAYOG - Product Requirements Document (PRD)
## Human-First Platform for Rural Employment Transformation

---

**Document Version**: 1.0  
**Created**: January 28, 2026  
**Last Updated**: January 28, 2026  
**Product Owner**: SAHAYOG 2026 Initiative  
**Target Release**: Q2 2026 (MVP), Q4 2026 (Full Production)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Target Users & Personas](#3-target-users--personas)
4. [Problem Statement](#4-problem-statement)
5. [Product Goals & Success Metrics](#5-product-goals--success-metrics)
6. [Feature Requirements](#6-feature-requirements)
7. [User Stories & Acceptance Criteria](#7-user-stories--acceptance-criteria)
8. [User Flows](#8-user-flows)
9. [Information Architecture](#9-information-architecture)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Constraints & Assumptions](#11-constraints--assumptions)
12. [Release Plan & Roadmap](#12-release-plan--roadmap)
13. [Risk Assessment](#13-risk-assessment)
14. [Appendix](#14-appendix)

---

## 1. Executive Summary

### 1.1 Product Overview

**SAHAYOG** is a unified digital platform designed to transform rural employment in India by providing voice-first, location-aware, and AI-powered access to government employment schemes, fair job allocation, grievance resolution, and skill development—serving 250+ million rural workers including illiterate and digitally excluded populations.

### 1.2 Core Value Proposition

> *"Any rural worker—literate or illiterate, with smartphone or without, young or old—can access government employment schemes, get fair job allocation, resolve complaints in 5 days, and build skills for a better future—all without needing a middleman, without needing to read, and without bias."*

### 1.3 Key Differentiators

| Differentiator | Description |
|----------------|-------------|
| **Voice-First Design** | "If you can speak, you can use SAHAYOG" - 22 languages + 50 dialects |
| **Zero Literacy Requirement** | Picture-only UI mode for illiterate users |
| **5-Day Grievance Promise** | Guaranteed human response within 5 days |
| **Explainable AI Decisions** | Every allocation decision is transparent and auditable |
| **Multi-Channel Access** | Same experience across smartphone, feature phone (IVR), WhatsApp, web |
| **Vision-Enabled AI** | AI can see the screen and guide users visually |
| **Always-On Companion (SATHI)** | Wake word activated conversational AI assistant |

### 1.4 Business Impact

| Metric | Current State | Target State | Impact |
|--------|---------------|--------------|--------|
| Scheme Awareness | 40-60% unaware | 100% aware | +₹25,000 Cr benefits claimed |
| Data Accuracy | 40% incomplete | 99.5% complete | -₹4,000 Cr fraud annually |
| Grievance Resolution | 62% unresolved | 100% resolved | Trust restoration |
| Work Days Delivered | 46/100 days | 100/100 days | +54 days employment |
| Wage Increase (skilled) | ₹220/day | ₹350-500/day | +59% to +127% income |

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

*"Technology that disappears—leaving only empowerment"*

To create a world where every rural Indian can access their rightful government entitlements through natural conversation, without barriers of literacy, language, technology, or corruption.

### 2.2 Mission Statement

Build a human-first digital platform that:
1. **Includes everyone** - Works for illiterate, disabled, elderly, migrants
2. **Eliminates middlemen** - Direct citizen access without brokers
3. **Ensures fairness** - Algorithmic transparency and accountability
4. **Enables growth** - Skills and upward mobility pathways
5. **Provides support** - Mental wellbeing and dignity restoration

### 2.3 Strategic Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SAHAYOG STRATEGIC PILLARS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PILLAR 1: UNIVERSAL ACCESS                                                  │
│  ├── Voice-first interface (22 languages + 50 dialects)                     │
│  ├── Picture-only mode for illiterate users                                 │
│  ├── Multi-channel: App, Web, IVR, USSD, WhatsApp, Kiosk                   │
│  └── Offline-first architecture                                             │
│                                                                              │
│  PILLAR 2: INTELLIGENT PERSONALIZATION                                       │
│  ├── Geo-aware content filtering                                            │
│  ├── Eligibility-based scheme matching                                      │
│  ├── Proactive nudges and recommendations                                   │
│  └── Conversational AI that remembers context                               │
│                                                                              │
│  PILLAR 3: GUARANTEED ACCOUNTABILITY                                         │
│  ├── 5-day human response promise for grievances                            │
│  ├── Explainable AI for all allocation decisions                            │
│  ├── Blockchain audit trail for transparency                                │
│  └── Auto-escalation mechanisms                                             │
│                                                                              │
│  PILLAR 4: GROWTH & DIGNITY                                                  │
│  ├── Bite-sized skill training in local languages                           │
│  ├── Job-linked certifications                                              │
│  ├── Career progression pathways                                            │
│  └── Technology-enabled work transformation                                 │
│                                                                              │
│  PILLAR 5: HOLISTIC WELLBEING                                                │
│  ├── Proactive distress detection                                           │
│  ├── 24/7 tele-counseling access                                            │
│  ├── Peer support networks                                                  │
│  └── Integrated mental health without stigma                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Design Principles (7 Mantras)

1. **Invisible Technology** - Feels like talking to a helpful neighbor
2. **Show Only What Matters** - No information overload
3. **Human Touch Always Available** - Technology augments, never replaces
4. **5-Day Promise** - Every grievance gets human response
5. **Growth Not Stagnation** - Every interaction moves toward better future
6. **Voice Is Universal Interface** - Speak to use
7. **Fairness By Design** - Algorithms serve justice

---

## 3. Target Users & Personas

### 3.1 Primary User Segments

| Segment | Population | Key Characteristics |
|---------|------------|---------------------|
| **MGNREGA Workers** | 150 million | Rural laborers seeking guaranteed employment |
| **Illiterate Rural Population** | 77 million | Cannot read/write, need voice/picture interface |
| **Women Workers** | 56 million | Face discrimination, need safety features |
| **SC/ST Communities** | 45 million | Historically marginalized, need priority access |
| **Persons with Disabilities** | 8 million rural PwD | Need accessible interfaces, adapted work |
| **Elderly (60+)** | 35 million | Digital exclusion, need simplified experience |
| **Migrant Workers** | 140 million | Benefits portability across locations |
| **Widows/Single Women** | 12 million | Vulnerable, unaware of entitlements |

### 3.2 User Personas

#### Persona 1: Kamla Devi (The Illiterate Widow)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👵 KAMLA DEVI                                                               │
│  Age: 68 | Location: Rampur, UP | Literacy: None | Phone: Basic feature     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND:                                                                 │
│  • Widow, husband passed 3 years ago                                        │
│  • Children migrated to city                                                │
│  • Lives alone, limited mobility                                            │
│  • Receives no pension despite eligibility                                  │
│                                                                              │
│  PAIN POINTS:                                                                │
│  • Cannot read forms or documents                                           │
│  • Ashamed to ask neighbors for help                                        │
│  • Unaware of widow pension scheme                                          │
│  • Walked 5km to office, returned empty-handed                              │
│                                                                              │
│  GOALS:                                                                      │
│  • Know what she's entitled to                                              │
│  • Apply without needing to read                                            │
│  • Track her money without confusion                                        │
│  • Feel independent, not a burden                                           │
│                                                                              │
│  TECH COMFORT:                                                               │
│  • Can make/receive calls                                                   │
│  • Cannot navigate smartphone apps                                          │
│  • Comfortable with voice conversations                                     │
│                                                                              │
│  SAHAYOG SOLUTION:                                                           │
│  • IVR-based access (dial *123#)                                            │
│  • Voice-guided pension application                                         │
│  • Proactive payment alerts via call                                        │
│  • SATHI companion for emotional support                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Persona 2: Ramu Prasad (The Distressed Laborer)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👨‍🌾 RAMU PRASAD                                                             │
│  Age: 45 | Location: Sehore, MP | Literacy: Limited | Phone: Smartphone     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND:                                                                 │
│  • MGNREGA worker for 10 years                                              │
│  • Family of 5 dependent on him                                             │
│  • Same job, same wage for a decade                                         │
│  • Suspects wage theft but cannot verify                                    │
│                                                                              │
│  PAIN POINTS:                                                                │
│  • Cannot understand bank SMS                                               │
│  • Feels humiliated asking others to read                                   │
│  • Fears retaliation if he complains                                        │
│  • No skill progression despite experience                                  │
│                                                                              │
│  GOALS:                                                                      │
│  • Verify correct wages credited                                            │
│  • File complaints anonymously                                              │
│  • Learn new skills for higher pay                                          │
│  • Feel respected at work                                                   │
│                                                                              │
│  TECH COMFORT:                                                               │
│  • Owns smartphone (son's old phone)                                        │
│  • Uses WhatsApp for voice messages                                         │
│  • Cannot navigate complex apps                                             │
│                                                                              │
│  SAHAYOG SOLUTION:                                                           │
│  • Picture-mode UI with voice                                               │
│  • Wage verification in plain Hindi                                         │
│  • Anonymous grievance filing                                               │
│  • Skill courses via video                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Persona 3: Sunita Devi (The Vulnerable Mother)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👩 SUNITA DEVI                                                              │
│  Age: 35 | Location: Lucknow, UP | Literacy: 8th pass | Phone: Smartphone   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND:                                                                 │
│  • Husband abandoned 6 months ago                                           │
│  • 3 young children to support                                              │
│  • Desperately needs work                                                   │
│  • Facing harassment from middleman                                         │
│                                                                              │
│  PAIN POINTS:                                                                │
│  • Doesn't know emergency work provisions                                   │
│  • Being asked for "favors" for job allocation                             │
│  • Contemplating sending children away                                      │
│  • No one to turn to for help                                               │
│                                                                              │
│  GOALS:                                                                      │
│  • Get work immediately                                                     │
│  • Stop harassment safely                                                   │
│  • Access emergency support                                                 │
│  • Keep family together                                                     │
│                                                                              │
│  TECH COMFORT:                                                               │
│  • Comfortable with smartphones                                             │
│  • Uses Facebook, WhatsApp                                                  │
│  • Can navigate apps with Hindi text                                        │
│                                                                              │
│  SAHAYOG SOLUTION:                                                           │
│  • Priority allocation as single mother                                     │
│  • Anonymous harassment reporting                                           │
│  • Emergency police connect via SATHI                                       │
│  • Mental health support integration                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Persona 4: Mohan (The Disabled Worker)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👨‍🦽 MOHAN                                                                   │
│  Age: 32 | Location: Jaipur, RJ | Literacy: 5th pass | Phone: Feature phone │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND:                                                                 │
│  • Locomotor disability (40%)                                               │
│  • Trained as tailor but no jobs                                            │
│  • Lives with elderly parents                                               │
│  • UDID card holder                                                         │
│                                                                              │
│  PAIN POINTS:                                                                │
│  • MGNREGA work too physical for him                                        │
│  • No PwD-suitable work offered                                             │
│  • App interfaces not accessible                                            │
│  • Feels like a burden on family                                            │
│                                                                              │
│  GOALS:                                                                      │
│  • Find work matching his abilities                                         │
│  • Get proper PwD entitlements                                              │
│  • Contribute to family income                                              │
│  • Feel productive and valued                                               │
│                                                                              │
│  SAHAYOG SOLUTION:                                                           │
│  • Skill-matched job allocation                                             │
│  • Screen reader compatible interface                                       │
│  • High contrast mode                                                       │
│  • Priority in sedentary work                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Secondary Users

| User Type | Description | Key Features Needed |
|-----------|-------------|---------------------|
| **Village Sahayak (Agent)** | Community volunteers helping users | Agent app, complaint recording, offline sync |
| **Block Officers** | Government officials managing blocks | Dashboard, grievance queue, performance metrics |
| **District Collectors** | Senior administrators | Analytics, escalations, audit reports |
| **CSC Operators** | Common Service Center staff | Kiosk mode, assisted access, document upload |
| **Tele-agents** | Call center staff | Queue management, script guidance, escalation |
| **Counselors** | Mental health professionals | Case management, follow-up tracking |

---

## 4. Problem Statement

### 4.1 Current State Analysis

India spends **₹2.5+ lakh crore annually** on rural employment schemes, yet:

| Problem | Statistics | Impact |
|---------|------------|--------|
| **Awareness Gap** | 40-60% eligible unaware of schemes | Billions in unclaimed benefits |
| **Data Quality** | 40% have incomplete records | Wrong eligibility assessments |
| **Grievance Failure** | 62% grievances unresolved | Distrust in system |
| **Digital Exclusion** | 22% rural population illiterate | Complete lockout from digital services |
| **Work Delivery** | 46 days delivered vs 100 promised | Poverty persistence |
| **Wage Delays** | 18-day average payment delay | Financial distress |
| **Skill Stagnation** | Same job for 10+ years | No upward mobility |
| **Allocation Bias** | Caste/gender discrimination | Exclusion of vulnerable |
| **Mental Health Crisis** | 14,000+ farmer suicides annually | Zero support |

### 4.2 Root Cause Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROBLEM INTERCONNECTION WEB                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Data Problems ────────► Allocation Failures                                 │
│       │                       │                                              │
│       │                       ▼                                              │
│       │              Distrust & Corruption                                   │
│       │                       │                                              │
│       │                       ▼                                              │
│       └────────────► Exclusion of Vulnerable                                 │
│                              │                                               │
│                              ▼                                               │
│                       Skill Stagnation                                       │
│                              │                                               │
│                              ▼                                               │
│                       Unemployment                                           │
│                              │                                               │
│                              ▼                                               │
│                    Mental Health Crisis                                      │
│                              │                                               │
│                              ▼                                               │
│                    Reduced Participation ────────► Poor Data                 │
│                                                                              │
│  This vicious cycle can only be broken by addressing ALL problems            │
│  simultaneously through a UNIFIED PLATFORM.                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Jobs To Be Done (JTBD)

| When I am... | I want to... | So I can... |
|--------------|--------------|-------------|
| Looking for work | Find jobs near me that I can do | Earn money to support my family |
| Unaware of benefits | Know what schemes I'm eligible for | Claim my rightful entitlements |
| Facing payment delay | Track and escalate payment status | Get my money without begging |
| Facing injustice | File complaint without fear | Get resolution without retaliation |
| Stuck in same job | Learn new skills | Earn more and progress in life |
| Feeling hopeless | Talk to someone who understands | Feel supported and not alone |
| Unable to read | Navigate government services | Be independent without shame |
| In an emergency | Get immediate help | Protect myself and family |

---

## 5. Product Goals & Success Metrics

### 5.1 Primary Goals

| Goal | Description | Timeline |
|------|-------------|----------|
| **G1: Universal Access** | 100% of rural workers can access platform regardless of literacy/device | 12 months |
| **G2: Scheme Awareness** | 100% aware of schemes they're eligible for | 18 months |
| **G3: Fair Allocation** | 100% allocation decisions explainable and bias-free | 12 months |
| **G4: Grievance Resolution** | 100% grievances resolved with human response in 5 days | 6 months |
| **G5: Skill Uplift** | 1 million workers complete skill training | 24 months |
| **G6: Data Quality** | 99.5% profile completeness across 250M workers | 18 months |

### 5.2 Key Performance Indicators (KPIs)

#### Acquisition & Reach KPIs

| KPI | Current | Target (Y1) | Target (Y3) |
|-----|---------|-------------|-------------|
| Total Registered Users | 0 | 50 million | 200 million |
| Daily Active Users (DAU) | 0 | 5 million | 30 million |
| Monthly Active Users (MAU) | 0 | 20 million | 100 million |
| IVR/USSD Users (Feature Phone) | 0 | 10 million | 50 million |
| States Covered | 0 | 10 states | All India |
| Languages Supported | 0 | 10 | 22 + 50 dialects |

#### Engagement KPIs

| KPI | Target |
|-----|--------|
| Voice Query Success Rate | >90% intent recognition |
| Average Session Duration | 3-5 minutes |
| Repeat Usage (7-day) | >60% |
| Feature Phone Retention (30-day) | >40% |
| Agent-Assisted Interactions | <20% requiring human |
| SATHI Wake Word Activation/Day | 1M+ |

#### Outcome KPIs

| KPI | Current | Target (Y1) | Measurement |
|-----|---------|-------------|-------------|
| Grievances Resolved in 5 Days | 38% | 95% | System tracking |
| Scheme Applications Submitted | - | 10M | Transaction count |
| Average Work Days/Beneficiary | 46 | 80 | Integration with MGNREGA |
| Wage Payment Time | 18 days | <7 days | Bank integration |
| Skills Training Completion | - | 1M certificates | LMS data |
| Income Increase (Skilled) | ₹220/day | ₹350/day | Self-reported + verification |
| User Satisfaction (CSAT) | - | >4.2/5 | Survey |
| Net Promoter Score (NPS) | - | >50 | Survey |

#### Trust & Fairness KPIs

| KPI | Target | Method |
|-----|--------|--------|
| Allocation Fairness Score | >95/100 | Algorithm audit |
| Bias Detection Accuracy | >98% | Testing |
| Explainability Satisfaction | >85% | User feedback |
| Fraud Detection Rate | >95% | Verified cases |
| False Positive Rate (Fraud) | <1% | Audit |

#### Wellbeing KPIs

| KPI | Target |
|-----|--------|
| Distress Detection Accuracy | >80% |
| Counseling Connections Made | 100K/year |
| Follow-up Completion Rate | >70% |
| Worker Dignity Score | +50% improvement |

### 5.3 Success Criteria by Phase

#### MVP Success (Month 6)

- [ ] Voice assistant understands 5+ intents in 3 languages
- [ ] Geo-personalization shows correct content for 3 districts
- [ ] Picture mode enables illiterate users to navigate
- [ ] Grievance filing works end-to-end via voice
- [ ] 10,000 registered pilot users
- [ ] <5 second response time for queries

#### Beta Success (Month 12)

- [ ] 10 states covered
- [ ] 10 million registered users
- [ ] 5 million grievances handled
- [ ] 85% 5-day resolution rate
- [ ] 100,000 skill certifications
- [ ] IVR system handling 1M calls/month

#### Production Success (Month 24)

- [ ] Pan-India coverage
- [ ] 100 million+ registered users
- [ ] 95%+ grievance resolution in 5 days
- [ ] 1 million skilled workers
- [ ] Integration with all major schemes
- [ ] Self-sustaining with government ownership

---

## 6. Feature Requirements

### 6.1 Core Features (11 Modules)

#### Module 1: Geo-Personalized Experience

**Priority**: P0 (Critical)

**Description**: Location-aware content filtering showing only relevant schemes, jobs, and contacts for user's exact geographical position.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F1.1 Multi-method Location Detection | GPS, Cell Tower, IVR input, Aadhaar-linked address | P0 |
| F1.2 Location → Content Mapping | State → District → Block → GP → Village hierarchy | P0 |
| F1.3 Personalized Home Screen | Work nearby, applicable schemes, local contacts | P0 |
| F1.4 "Access Everything" Mode | Full portal access when needed | P1 |
| F1.5 Weather & Mandi Integration | Local weather alerts, crop prices | P2 |

**Acceptance Criteria**:
- User's location detected within 30 seconds of app open
- Content filtered to within 10km radius by default
- 100% of displayed schemes are actually applicable to user's location
- User can override location manually via voice

---

#### Module 2: Smart Onboarding & Information Induction

**Priority**: P0 (Critical)

**Description**: Progressive information gathering that asks minimal upfront, auto-fetches from government databases, and builds profile through natural conversation.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F2.1 Zero-Barrier Entry | Browse without registration | P0 |
| F2.2 Level 1: Phone + Location | Auto-detected, voice confirmed | P0 |
| F2.3 Level 2: Aadhaar/Job Card Verification | Voice input, auto-fetch from databases | P0 |
| F2.4 Level 3: Progressive Profiling | Ask only when needed for specific service | P1 |
| F2.5 Dedicated Personal Page | User's own dashboard with status | P0 |
| F2.6 Data Never Asked Twice | Stored and reused across sessions | P1 |

**Acceptance Criteria**:
- User can access scheme information with zero registration
- Aadhaar-based auto-fill populates 80%+ of profile fields
- Profile completeness reaches 95% after 5 interactions
- Time to first value < 2 minutes

---

#### Module 3: Adaptive UI/UX Revolution

**Priority**: P0 (Critical)

**Description**: Interface that automatically adapts to user's literacy level, device type, and accessibility needs.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F3.1 Picture Mode | Zero-text, icon-only interface for illiterate | P0 |
| F3.2 Standard Mode | Full text interface for literate users | P0 |
| F3.3 High Contrast Mode | Accessibility for vision impaired | P1 |
| F3.4 Auto-Detection | AI detects literacy level from interaction | P1 |
| F3.5 IVR Mode | Full functionality via phone keypad | P0 |
| F3.6 USSD Mode | Text-based menus for feature phones | P1 |
| F3.7 WhatsApp Bot Mode | Integration with WhatsApp | P1 |
| F3.8 Kiosk Mode | CSC-optimized interface | P2 |

**Acceptance Criteria**:
- Illiterate user can complete scheme application with zero reading
- Mode switch occurs within 2 taps or 1 voice command
- Picture mode has <50 text characters on any screen
- IVR covers 100% of critical user journeys

---

#### Module 4: Always-On Voice Assistant (SATHI/SAHAYAK)

**Priority**: P0 (Critical)

**Description**: Conversational AI companion that's always available, speaks user's language, can see the screen, and guides through any task.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F4.1 Wake Word Activation | "Sathi" in 10+ Indian language scripts | P0 |
| F4.2 Continuous Listening Mode | Optional always-on listening | P1 |
| F4.3 22 Languages + 50 Dialects | Regional language understanding | P0 |
| F4.4 Vision-Based Guidance | AI sees screen, highlights elements, guides clicks | P0 |
| F4.5 Natural Conversation | Multi-turn dialogue with context retention | P0 |
| F4.6 Page Explanation | Explains any screen in simple language | P0 |
| F4.7 Form Filling via Voice | Complete forms through conversation | P0 |
| F4.8 Complaint Registration | Voice-based grievance filing | P0 |
| F4.9 General Queries | Weather, mandi prices, festival dates | P2 |
| F4.10 Emotional Support | Empathetic responses, wellbeing detection | P1 |
| F4.11 Emergency Connect | Police/helpline connection on distress | P0 |

**Acceptance Criteria**:
- Wake word detected within 1 second in noisy environment
- Intent recognition accuracy >90% for trained intents
- Vision guidance correctly identifies >95% of UI elements
- Conversation context retained for at least 5 turns
- Response latency <2 seconds

---

#### Module 5: Human-Powered Grievance System (5-Day Promise)

**Priority**: P0 (Critical)

**Description**: Guaranteed human response to every grievance within 5 days, with voice-based filing, tracking, and auto-escalation.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F5.1 Voice Grievance Filing | Record complaint in natural speech | P0 |
| F5.2 AI Categorization | Auto-categorize and route complaints | P0 |
| F5.3 Ticket Generation | Unique ID with SMS confirmation | P0 |
| F5.4 5-Day Timer | Automatic countdown and alerts | P0 |
| F5.5 Auto-Escalation | Escalate to higher authority if not responded | P0 |
| F5.6 Voice Tracking | "What happened to my complaint?" via voice | P0 |
| F5.7 Human Callback | Guaranteed phone call within 5 days | P0 |
| F5.8 Anonymous Filing | Option to file without identification | P1 |
| F5.9 Officer Dashboard | Queue management for officials | P0 |
| F5.10 Resolution Recording | Document resolution and feedback | P1 |

**Acceptance Criteria**:
- Grievance registered within 2 minutes via voice
- 95% correctly auto-categorized
- SMS confirmation within 30 seconds
- Human callback made within 5 days for 95%+ cases
- Auto-escalation triggers at Day 4 if no response

---

#### Module 6: Global-Inspired Skill Development

**Priority**: P1 (High)

**Description**: Bite-sized video learning in local languages, directly linked to higher-paying job opportunities.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F6.1 Bite-Sized Videos | 3-7 minute lessons like reels | P0 |
| F6.2 Multi-Language Dubbing | Same content in 22 languages + dialects | P0 |
| F6.3 Offline Download | Download once, watch anytime | P0 |
| F6.4 Visual-Heavy Content | Show, don't tell | P1 |
| F6.5 Voice-Based Quiz | Assessment via voice answers | P1 |
| F6.6 Micro-Credentials | Digital badges for each skill | P1 |
| F6.7 Job Linkage | Show earning potential and jobs after course | P0 |
| F6.8 Progress Tracking | Resume where left off | P1 |
| F6.9 Skill Recommendations | AI suggests next skill based on profile | P1 |
| F6.10 Peer Learning | Connect learners in same area | P2 |

**Acceptance Criteria**:
- Video loads in <5 seconds on 2G connection
- 80% completion rate for started courses
- 70% of completers get job within 30 days
- Average income increase of 50% post-certification

---

#### Module 7: Fairness Engine

**Priority**: P0 (Critical)

**Description**: AI-powered job allocation with transparent scoring, explainable decisions, and blockchain audit trail.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F7.1 Multi-Criteria Scoring | Need, skill, proximity, equity weighted | P0 |
| F7.2 Fairness Guardrails | Minimum thresholds for SC/ST, women, PwD | P0 |
| F7.3 Explainable Decisions | "Why I didn't get work" in plain language | P0 |
| F7.4 Score Breakdown | Show factor-wise contribution | P1 |
| F7.5 Blockchain Audit | Immutable record of every allocation | P1 |
| F7.6 Bias Detection | ML monitoring for discrimination patterns | P0 |
| F7.7 Public Audit Portal | Citizens can verify any allocation | P2 |
| F7.8 Appeal Mechanism | Challenge and review unfair decisions | P1 |

**Acceptance Criteria**:
- Fairness score >95/100 as measured by independent audit
- Zero cases of SC/ST proportion below village demographics
- 100% of allocation decisions have explanation
- Bias detection catches 98% of discrimination patterns

---

#### Module 8: Mental Wellbeing Integration

**Priority**: P1 (High)

**Description**: Proactive distress detection, 24/7 counseling access, and peer support—integrated without stigma.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F8.1 Stress Signal Detection | Voice/behavior pattern analysis | P0 |
| F8.2 Gentle Nudges | "Are you okay?" prompts when distress detected | P0 |
| F8.3 24/7 Tele-Counseling | Trained counselors in 22 languages | P0 |
| F8.4 Voice-Based Check-ins | Weekly "How are you feeling?" | P1 |
| F8.5 Peer Support Groups | Connect with others facing similar challenges | P2 |
| F8.6 Professional Referral | Link to district mental health program | P1 |
| F8.7 Emergency Intervention | Suicide prevention protocols | P0 |
| F8.8 Follow-up Tracking | Ensure continuity of care | P1 |

**Acceptance Criteria**:
- Distress detection accuracy >80%
- Counselor connection within 5 minutes of request
- 100% of detected crisis cases escalated immediately
- Zero stigmatizing language in any interface

---

#### Module 9: Dignity Through Innovation

**Priority**: P1 (High)

**Description**: Technology-enabled transformation of low-dignity jobs, creating pathways from laborer to technician.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F9.1 Work Transformation Catalog | Innovations for sanitation, construction, agriculture | P1 |
| F9.2 Equipment Training | Video courses for tool operation | P1 |
| F9.3 Tool Library Network | Equipment lending at GP level | P2 |
| F9.4 Career Ladder Visualization | Clear progression paths | P1 |
| F9.5 Dignity Metrics | Track physical strain reduction, income increase | P2 |
| F9.6 Role Elevation | "Cleaner → Hygiene Technician" rebranding | P1 |

**Acceptance Criteria**:
- 50% physical strain reduction for participating workers
- 80% income increase for certified technicians
- Self-reported dignity score improvement of 50%

---

#### Module 10: Empathic Conversational AI

**Priority**: P0 (Critical)

**Description**: The emotional core of SAHAYOG—an AI that remembers, cares, protects, and prioritizes vulnerable users.

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F10.1 Persistent Memory | Remember name, village, past issues across sessions | P0 |
| F10.2 Emotional Intelligence | Detect and respond to emotions in voice | P0 |
| F10.3 Proactive Support | Reach out when user seems to be struggling | P1 |
| F10.4 Double Consent | Extra confirmation before any personal action | P0 |
| F10.5 Vulnerable Priority | Automatically fast-track distressed users | P0 |
| F10.6 Conversational Data Collection | Gather info naturally, never interrogate | P1 |
| F10.7 General Companionship | Chat about weather, festivals, just listen | P2 |

**Acceptance Criteria**:
- 95% of users feel "heard and understood" in surveys
- Context retained across 7+ days of inactivity
- Vulnerable users processed 2x faster than average

---

#### Module 11: Intelligent Fraud Detection & Protection

**Priority**: P1 (High)

**Description**: ML-powered fraud detection that catches fake claims while protecting genuine but confused users (elderly, illiterate).

**Key Features**:
| Feature | Description | Priority |
|---------|-------------|----------|
| F11.1 Anomaly Detection | Unusual patterns in claims, attendance | P0 |
| F11.2 Duplicate Detection | Same person claiming from multiple locations | P0 |
| F11.3 Ghost Beneficiary Identification | Deceased/non-existent persons on rolls | P0 |
| F11.4 Confusion vs Fraud Differentiation | Protect elderly making genuine mistakes | P0 |
| F11.5 Human Review Queue | Flag for investigation, never auto-reject | P0 |
| F11.6 Official Behavior Monitoring | Track unusual approval patterns | P1 |
| F11.7 Anonymous Tip Line | Report corruption safely | P1 |

**Acceptance Criteria**:
- Fraud detection rate >95%
- False positive rate <1% (genuine users not flagged)
- ₹4,000 Cr+ annual savings from fraud prevention
- Zero cases of genuine elderly users penalized

---

### 6.2 Feature Priority Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FEATURE PRIORITY MATRIX                            │
├───────────────┬──────────────┬─────────────┬─────────────┬─────────────────┤
│               │ MUST HAVE    │ SHOULD HAVE │ COULD HAVE  │ WON'T HAVE (V1) │
│               │ (P0)         │ (P1)        │ (P2)        │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Geo-Personal. │ Location Det.│             │ Mandi Prices│                 │
│               │ Content Map  │             │             │                 │
│               │ Home Screen  │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Onboarding    │ Zero-Barrier │ Progressive │             │ Biometric Auth  │
│               │ Aadhaar Auto │ Profiling   │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Adaptive UI   │ Picture Mode │ High Cont.  │ Kiosk Mode  │ AR Interface    │
│               │ IVR Mode     │ USSD        │             │                 │
│               │ Standard Mode│ WhatsApp    │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Voice (SATHI) │ Wake Word    │ Emotion Det.│ General Q   │ Voice Cloning   │
│               │ 10 Languages │ 50 Dialects │             │                 │
│               │ Vision Guide │ Context Mem.│             │                 │
│               │ Form Fill    │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Grievance     │ Voice Filing │ Anonymous   │             │ Video Evidence  │
│               │ 5-Day Timer  │ Resolution  │             │                 │
│               │ Auto-Escalate│ Recording   │             │                 │
│               │ Callback     │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Skills        │ Bite Videos  │ Voice Quiz  │ Peer Learn  │ Live Classes    │
│               │ Multi-Lang   │ Badges      │             │                 │
│               │ Offline      │ Recommend   │             │                 │
│               │ Job Linkage  │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Fairness      │ Scoring Algo │ Appeal      │ Public Audit│ Blockchain NFT  │
│               │ Guardrails   │ Blockchain  │             │                 │
│               │ Explain AI   │             │             │                 │
│               │ Bias Detect  │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Wellbeing     │ Distress Det.│ Check-ins   │ Peer Groups │ VR Therapy      │
│               │ Counseling   │ Referral    │             │                 │
│               │ Emergency    │             │             │                 │
├───────────────┼──────────────┼─────────────┼─────────────┼─────────────────┤
│ Fraud         │ Anomaly Det. │ Official Mon│             │ Predictive      │
│               │ Duplicate    │ Tip Line    │             │                 │
│               │ Confusion Prt│             │             │                 │
└───────────────┴──────────────┴─────────────┴─────────────┴─────────────────┘
```

---

## 7. User Stories & Acceptance Criteria

### 7.1 Epic 1: Universal Access

#### US1.1: Voice Navigation

```
AS A illiterate user
I WANT TO navigate the entire platform using my voice
SO THAT I can access services without needing to read

ACCEPTANCE CRITERIA:
✓ I can say "Sathi" to activate voice assistant
✓ I can ask any question in my native language/dialect
✓ System understands intent with >90% accuracy
✓ I receive spoken response within 2 seconds
✓ I can complete any task end-to-end via voice
```

#### US1.2: Picture Mode

```
AS A user who cannot read
I WANT TO see only pictures and icons
SO THAT I can understand and use the app

ACCEPTANCE CRITERIA:
✓ Home screen has maximum 6 large icons
✓ Tapping any icon plays voice explanation
✓ No text smaller than icon labels exists
✓ I can switch to picture mode by voice command
✓ All critical journeys work without reading
```

#### US1.3: IVR Access

```
AS A user with only feature phone
I WANT TO access services via phone call
SO THAT I don't need smartphone or internet

ACCEPTANCE CRITERIA:
✓ I can dial a toll-free number or *123#
✓ System greets me in my region's language
✓ I can press numbers to navigate menus
✓ I can speak my queries after prompts
✓ All critical services available via IVR
✓ I receive SMS confirmations
```

### 7.2 Epic 2: Scheme Discovery

#### US2.1: Personalized Scheme List

```
AS A rural worker
I WANT TO see only schemes I'm eligible for
SO THAT I don't waste time on irrelevant information

ACCEPTANCE CRITERIA:
✓ System knows my location, age, gender, category
✓ Only applicable schemes shown on my home screen
✓ Each scheme shows benefit amount and eligibility match
✓ I can ask "Am I eligible for PM-Kisan?" and get answer
✓ When eligibility changes, I get notification
```

#### US2.2: Scheme Application

```
AS A eligible beneficiary
I WANT TO apply for a scheme via voice
SO THAT I don't need to fill complicated forms

ACCEPTANCE CRITERIA:
✓ I can say "Apply for widow pension"
✓ System asks only questions not already in my profile
✓ Each question asked in conversational tone
✓ I can answer via voice, not typing
✓ System confirms details before submission
✓ I receive application number via voice and SMS
✓ I can track status by voice query
```

### 7.3 Epic 3: Work Discovery

#### US3.1: Nearby Work

```
AS A job seeker
I WANT TO find work available near my village
SO THAT I can earn without traveling far

ACCEPTANCE CRITERIA:
✓ Work shown within 5km by default
✓ Each job shows distance, wage, start date
✓ Jobs sorted by relevance (distance + match)
✓ I can filter by "today" or "this week"
✓ I can apply with one tap or voice command
```

#### US3.2: Work Application

```
AS A worker
I WANT TO apply for work via voice
SO THAT I can get employment without paperwork

ACCEPTANCE CRITERIA:
✓ I say "Apply for pond work"
✓ System confirms which specific job
✓ My profile auto-attached to application
✓ I get confirmation with expected start date
✓ If not selected, I get explanation why
```

### 7.4 Epic 4: Grievance Filing

#### US4.1: Voice Complaint

```
AS A worker facing injustice
I WANT TO file complaint by speaking
SO THAT I don't need to write or visit office

ACCEPTANCE CRITERIA:
✓ I can say "I have a complaint"
✓ System asks clarifying questions conversationally
✓ My voice recording attached to complaint
✓ AI categorizes complaint automatically
✓ Ticket number generated and read to me
✓ SMS sent with ticket number
```

#### US4.2: 5-Day Promise

```
AS A complainant
I WANT TO receive human response within 5 days
SO THAT I know my voice is heard

ACCEPTANCE CRITERIA:
✓ Timer starts from complaint registration
✓ I receive reminder on Day 3 about pending response
✓ Officer receives escalation warning on Day 4
✓ Human calls me back by Day 5 with update
✓ If no response, auto-escalated to district level
✓ I can rate satisfaction after resolution
```

### 7.5 Epic 5: Fair Allocation

#### US5.1: Explainable Rejection

```
AS A worker not selected for work
I WANT TO know exactly why I wasn't selected
SO THAT I understand the system is fair

ACCEPTANCE CRITERIA:
✓ I can ask "Why didn't I get work?"
✓ System explains my rank and score
✓ System shows who was above me and why
✓ Explanation uses simple language, not jargon
✓ System tells when I'll likely get work next
```

### 7.6 Epic 6: Skill Development

#### US6.1: Learn New Skill

```
AS A worker wanting higher wages
I WANT TO learn new skills via video in my language
SO THAT I can get better-paying jobs

ACCEPTANCE CRITERIA:
✓ Skills recommended based on my current work
✓ Each course shows earning potential after completion
✓ Videos are 3-7 minutes, not hours
✓ Audio in my exact dialect, not just language
✓ I can download and watch offline
✓ Quiz via voice, not typing
✓ Certificate added to my profile
✓ Jobs matching new skill shown on completion
```

### 7.7 Epic 7: Wellbeing Support

#### US7.1: Distress Detection

```
AS a platform
I WANT TO detect when user is in distress
SO THAT I can proactively offer support

ACCEPTANCE CRITERIA:
✓ Voice patterns analyzed for stress indicators
✓ Behavior changes detected (stopped applying, repeated complaints)
✓ Gentle check-in prompt offered, not forced
✓ User can decline without consequence
✓ If accepted, connected to counselor within 5 minutes
```

---

## 8. User Flows

### 8.1 First-Time User Flow (Illiterate)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FIRST-TIME USER JOURNEY (ILLITERATE)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  START: User opens app / dials IVR                                          │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 1: AUTO-DETECTION                                               │  │
│  │  • Location detected (GPS/Cell tower)                                 │  │
│  │  • Language detected from voice/region                                │  │
│  │  • Phone number captured                                              │  │
│  │  → Voice: "नमस्ते! सहायोग में स्वागत है। मैं साथी हूं।"                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 2: UI MODE SELECTION                                            │  │
│  │  → Voice: "क्या आप पढ़ सकते हैं?" (Can you read?)                      │  │
│  │  • If "नहीं/No" → Switch to Picture Mode                              │  │
│  │  • If "हाँ/Yes" → Stay in Standard Mode                                │  │
│  │  → Voice: "मैं आपकी आवाज़ से सब करूंगा। कोई पढ़ने की ज़रूरत नहीं।"       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 3: PERSONALIZED HOME SCREEN (NO LOGIN REQUIRED)                 │  │
│  │  Shows Picture Mode with 6 large icons:                               │  │
│  │  [🛠️ काम] [📋 योजनाएं] [📝 शिकायत] [💰 पैसे] [📚 सीखें] [🎙️ बोलो]     │  │
│  │  → Voice: "आपके गाँव में 3 काम हैं। सुनने के लिए पहली तस्वीर छुएं।"     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 4: USER EXPLORES (No account needed)                            │  │
│  │  • Tap 🛠️ → Hear available work                                       │  │
│  │  • Tap 📋 → Hear applicable schemes                                   │  │
│  │  • All interaction via voice and pictures                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  STEP 5: VERIFICATION (Only when applying)                            │  │
│  │  User: "इस काम के लिए आवेदन करो"                                       │  │
│  │  → Sahayak: "आवेदन के लिए आधार नंबर बोलें"                             │  │
│  │  User speaks: "4 5 6 7 8 9 0 1 2 3 4 5"                               │  │
│  │  → System fetches name, photo, address from Aadhaar                   │  │
│  │  → Sahayak: "आपका नाम रामलाल है, गाँव रामपुर। सही है?"                 │  │
│  │  User: "हाँ"                                                           │  │
│  │  → Profile created, application submitted                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  END: User receives confirmation, SMS with details                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Grievance Filing Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GRIEVANCE FILING JOURNEY                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User says: "Sathi, मेरा पैसा नहीं आया"                                      │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  INTENT DETECTION                                                     │  │
│  │  → Detected: payment_complaint                                        │  │
│  │  → Confidence: 94%                                                    │  │
│  │  → Emotion: frustrated                                                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  GUIDED CONVERSATION                                                  │  │
│  │  Sathi: "मुझे दुख है कि पैसा नहीं आया। मैं शिकायत दर्ज करता हूं।        │  │
│  │          बताइए, कितने दिनों का पैसा बाकी है?"                           │  │
│  │  User: "15 दिन का"                                                     │  │
│  │                                                                        │  │
│  │  Sathi: "और आखिरी बार पैसा कब आया था?"                                 │  │
│  │  User: "पिछले महीने"                                                    │  │
│  │                                                                        │  │
│  │  Sathi: "ठीक है। क्या कोई और बात है जो मुझे पता होनी चाहिए?"            │  │
│  │  User: "सरपंच कह रहे पैसा आ गया पर मेरे खाते में नहीं है"                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  COMPLAINT CREATION                                                   │  │
│  │  • Category: Payment Delay                                            │  │
│  │  • Severity: High (possible fraud indication)                         │  │
│  │  • Voice recording: Attached                                          │  │
│  │  • Assigned to: Block Development Officer                             │  │
│  │  • Ticket: #GRV-2026-45678                                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  CONFIRMATION                                                         │  │
│  │  Sathi: "आपकी शिकायत नंबर 45678 दर्ज हो गई।                           │  │
│  │          5 दिनों में कोई आपको फोन करेगा।                                │  │
│  │          मैंने SMS भी भेज दिया।                                        │  │
│  │          अगर 5 दिन में फोन नहीं आया तो मैं खुद ऊपर वालों को बताऊंगा।"  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  5-DAY TRACKING                                                       │  │
│  │  Day 0: Registered, SMS sent                                          │  │
│  │  Day 3: Reminder to user and officer                                  │  │
│  │  Day 4: Warning to officer, escalation threat                         │  │
│  │  Day 5: If no response → Auto-escalate to District                    │  │
│  │          If responded → Record resolution, collect feedback           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Fair Allocation Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FAIR ALLOCATION PROCESS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  INPUT: 25 applicants for 10 work slots                                      │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  SCORING ENGINE (For each applicant)                                  │  │
│  │                                                                        │  │
│  │  Need Score (40%):                                                    │  │
│  │  • Days since last work: 45 days → 0.9                                │  │
│  │  • Household income: BPL → 0.8                                        │  │
│  │  • Dependents: 4 → 0.7                                                │  │
│  │  • Disability: None → 0.0                                             │  │
│  │  • Single parent: No → 0.0                                            │  │
│  │  Need Score = weighted average = 0.72                                 │  │
│  │                                                                        │  │
│  │  Skill Match (25%):                                                   │  │
│  │  • Required: Earth work, Available: Earth work → 1.0                  │  │
│  │  Skill Score = 1.0                                                    │  │
│  │                                                                        │  │
│  │  Proximity (20%):                                                     │  │
│  │  • Distance: 2km → 0.8                                                │  │
│  │  Proximity Score = 0.8                                                │  │
│  │                                                                        │  │
│  │  Equity (15%):                                                        │  │
│  │  • Days worked this year: 30 (below average) → 0.7                    │  │
│  │  • Category: SC → 0.1 bonus if underrepresented                       │  │
│  │  Equity Score = 0.75                                                  │  │
│  │                                                                        │  │
│  │  FINAL SCORE = 0.40×0.72 + 0.25×1.0 + 0.20×0.8 + 0.15×0.75 = 0.81    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  FAIRNESS GUARDRAILS CHECK                                            │  │
│  │  ✓ SC/ST proportion matches village demographics                     │  │
│  │  ✓ Women ≥ 33% of allocation                                         │  │
│  │  ✓ No single family > 20% of slots                                   │  │
│  │  ✓ Nobody with 30+ days no-work excluded                             │  │
│  │  ✓ PwD with matching abilities included                              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  RANKED OUTPUT                                                        │  │
│  │  1. Sita Devi (0.92) - Widow, 60 days no work, SC ✓ SELECTED         │  │
│  │  2. Mohan (0.88) - PwD, 45 days no work ✓ SELECTED                   │  │
│  │  3. Ramlal (0.81) - BPL, 45 days no work ✓ SELECTED                  │  │
│  │  ...                                                                  │  │
│  │  10. Suresh (0.72) ✓ SELECTED                                        │  │
│  │  ───────────────────────────────────────                             │  │
│  │  11. Ramesh (0.68) ✗ WAITLISTED                                      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  EXPLAINABLE NOTIFICATION TO #11 RAMESH                               │  │
│  │                                                                        │  │
│  │  Sathi: "रमेश जी, इस बार 10 लोगों को काम मिला।                        │  │
│  │          आप 11वें नंबर पर थे। आपका स्कोर 68 था।                        │  │
│  │          आपसे ऊपर रहे:                                                 │  │
│  │          - सीता देवी जो विधवा हैं और 60 दिन से बेकार थीं               │  │
│  │          - मोहन जो विकलांग हैं                                         │  │
│  │          अगले हफ्ते 15 और काम आ रहे हैं। आप ज़रूर मिलेंगे।"            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  BLOCKCHAIN RECORD                                                    │  │
│  │  • Allocation ID: ALLOC-2026-12345                                    │  │
│  │  • Work: Pond Excavation, Rampur GP                                   │  │
│  │  • Timestamp: 2026-01-28 10:30:00 IST                                 │  │
│  │  • Applicants: 25, Selected: 10                                       │  │
│  │  • Algorithm: FairAlloc v2.3.1                                        │  │
│  │  • Fairness Score: 96/100                                             │  │
│  │  • Hash: 0x7f3a9b2c...                                                │  │
│  │  • Viewable at: sahayog.gov.in/audit/ALLOC-2026-12345                 │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Information Architecture

### 9.1 Site Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SAHAYOG SITE MAP                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🏠 HOME (Personalized Dashboard)                                            │
│  ├── 🛠️ WORK                                                                │
│  │   ├── Available Work (filtered by location)                              │
│  │   ├── My Applications                                                    │
│  │   ├── Work History                                                       │
│  │   └── Why I Didn't Get Work                                              │
│  │                                                                           │
│  ├── 📋 SCHEMES                                                              │
│  │   ├── Eligible Schemes                                                   │
│  │   ├── Applied Schemes                                                    │
│  │   ├── Scheme Details                                                     │
│  │   └── Application Status                                                 │
│  │                                                                           │
│  ├── 📝 GRIEVANCE                                                            │
│  │   ├── File New Complaint                                                 │
│  │   ├── My Complaints                                                      │
│  │   ├── Track Complaint                                                    │
│  │   └── Anonymous Report                                                   │
│  │                                                                           │
│  ├── 💰 PAYMENTS                                                             │
│  │   ├── Payment History                                                    │
│  │   ├── Pending Payments                                                   │
│  │   ├── Payment Alerts                                                     │
│  │   └── Bank Account Update                                                │
│  │                                                                           │
│  ├── 📚 LEARN                                                                │
│  │   ├── Recommended Courses                                                │
│  │   ├── Course Catalog                                                     │
│  │   ├── My Progress                                                        │
│  │   ├── My Certificates                                                    │
│  │   └── Jobs for My Skills                                                 │
│  │                                                                           │
│  ├── 🧠 WELLBEING                                                            │
│  │   ├── How Are You Feeling?                                               │
│  │   ├── Talk to Counselor                                                  │
│  │   ├── Success Stories                                                    │
│  │   └── Peer Support                                                       │
│  │                                                                           │
│  ├── 👤 PROFILE                                                              │
│  │   ├── My Information                                                     │
│  │   ├── My Documents                                                       │
│  │   ├── Settings                                                           │
│  │   ├── Language Preference                                                │
│  │   └── UI Mode (Picture/Standard)                                         │
│  │                                                                           │
│  └── 🎙️ SATHI (Always Available)                                            │
│      ├── Voice Activation                                                   │
│      ├── Page Explanation                                                   │
│      └── General Assistance                                                 │
│                                                                              │
│  📊 ADMIN PORTAL (Officials)                                                 │
│  ├── Dashboard                                                              │
│  ├── Grievance Queue                                                        │
│  ├── Allocation Management                                                  │
│  ├── Reports & Analytics                                                    │
│  └── User Management                                                        │
│                                                                              │
│  🌐 PUBLIC PORTAL                                                            │
│  ├── Transparency Dashboard                                                 │
│  ├── Allocation Audit                                                       │
│  ├── Scheme Information                                                     │
│  └── Contact Directory                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Navigation Patterns

| Channel | Primary Navigation | Secondary Navigation |
|---------|-------------------|---------------------|
| **Mobile App** | Bottom tab bar (6 icons) + SATHI floating button | Swipe gestures, voice commands |
| **IVR** | Keypad menu (1-9, 0 for human) | Voice commands at any point |
| **USSD** | Numbered menu lists | Type number to navigate |
| **WhatsApp** | Quick reply buttons | Free-form voice/text |
| **Web** | Side navigation + top bar | Search, breadcrumbs |
| **Kiosk** | Large touch buttons | Agent assistance |

---

## 10. Non-Functional Requirements

### 10.1 Performance Requirements

| Requirement | Specification |
|-------------|---------------|
| **Page Load Time** | <3 seconds on 3G connection |
| **Voice Response Latency** | <2 seconds from end of speech |
| **API Response Time** | <500ms for 95th percentile |
| **Video Load Time** | <5 seconds on 2G connection |
| **Offline Capability** | Core features work without internet |
| **Concurrent Users** | Support 10 million simultaneous |
| **IVR Capacity** | 1 million concurrent calls |

### 10.2 Scalability Requirements

| Requirement | Specification |
|-------------|---------------|
| **User Base** | Scale from 0 to 250 million users |
| **Data Volume** | Handle 500+ million records |
| **Geographic Distribution** | Edge computing in 750 districts |
| **Traffic Spikes** | Handle 10x normal load during crises |
| **Language Models** | Scale to 22 languages + 50 dialects |

### 10.3 Availability Requirements

| Requirement | Specification |
|-------------|---------------|
| **Uptime** | 99.9% (8.76 hours downtime/year max) |
| **Disaster Recovery** | RPO: 1 hour, RTO: 4 hours |
| **Maintenance Windows** | 2 AM - 4 AM IST, <2 hours/month |
| **Degraded Mode** | Core features available even in partial outage |

### 10.4 Security Requirements

| Requirement | Specification |
|-------------|---------------|
| **Data Encryption** | AES-256 at rest, TLS 1.3 in transit |
| **Authentication** | Aadhaar eKYC + OTP, OAuth 2.0 |
| **Authorization** | RBAC with principle of least privilege |
| **Audit Logging** | All actions logged with immutable trail |
| **PII Protection** | DPDP Act 2023 compliant, field-level encryption |
| **Penetration Testing** | Quarterly by CERT-In empaneled agency |

### 10.5 Accessibility Requirements

| Requirement | Specification |
|-------------|---------------|
| **Screen Reader** | WCAG 2.1 AA compliant |
| **Color Contrast** | Minimum 4.5:1 ratio |
| **Touch Targets** | Minimum 48x48 dp |
| **Voice Control** | 100% features accessible via voice |
| **IVR Accessibility** | Works with relay services |

### 10.6 Localization Requirements

| Requirement | Specification |
|-------------|---------------|
| **Languages** | 22 scheduled languages, expandable |
| **Dialects** | 50+ dialects for voice |
| **Script Support** | All Indian scripts (Devanagari, Tamil, etc.) |
| **RTL Support** | Urdu, Arabic |
| **Date/Number Formats** | Indian standards |
| **Cultural Sensitivity** | Region-appropriate images and examples |

---

## 11. Constraints & Assumptions

### 11.1 Constraints

| Constraint | Description | Mitigation |
|------------|-------------|------------|
| **Network Connectivity** | Rural areas have poor/no internet | Offline-first architecture, IVR fallback |
| **Device Diversity** | Wide range from landline to smartphone | Multi-channel design, progressive enhancement |
| **Literacy Levels** | 22% adult illiteracy in rural areas | Voice-first, picture mode |
| **Government Integration** | Dependent on NREGASoft, Aadhaar APIs | API abstraction layer, mock fallbacks |
| **Budget** | Government procurement constraints | Open source preference, phased rollout |
| **Timeline** | Political cycles, scheme schedules | MVP approach, iterative delivery |

### 11.2 Assumptions

| Assumption | Risk if Invalid | Validation Plan |
|------------|-----------------|-----------------|
| Users have access to some phone | Critical | Survey target regions |
| Bhashini APIs perform adequately | High | Load testing before launch |
| Government will provide API access | Critical | Early stakeholder engagement |
| Village agents can be recruited | Medium | Pilot program in 2 blocks |
| Users will trust voice AI | Medium | UX research with prototypes |
| Counselors available in all languages | Medium | Partnership with tele-health providers |

### 11.3 Dependencies

| Dependency | Type | Criticality |
|------------|------|-------------|
| Bhashini APIs (ASR/TTS) | External | Critical |
| Aadhaar eKYC APIs | External | Critical |
| NREGASoft APIs | External | High |
| Gemini/GPT APIs | External | Critical |
| Telecom IVR Gateway | External | High |
| SMS Gateway | External | High |
| Bank NPCI APIs | External | Medium |
| State Scheme Databases | External | Medium |

---

## 12. Release Plan & Roadmap

### 12.1 Phased Rollout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAHAYOG RELEASE ROADMAP                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: MVP (Month 1-6)                                                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Scope: 3 districts, 3 languages, core features                       │  │
│  │  • Voice assistant (Hindi, Bhojpuri, Awadhi)                          │  │
│  │  • Geo-personalization                                                │  │
│  │  • Picture mode UI                                                    │  │
│  │  • Grievance filing (voice)                                           │  │
│  │  • 5-day promise tracking                                             │  │
│  │  • Basic scheme information                                           │  │
│  │  Target: 50,000 users                                                 │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  PHASE 2: BETA (Month 7-12)                                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Scope: 10 states, 10 languages, full features                        │  │
│  │  • All 11 modules functional                                          │  │
│  │  • IVR integration                                                    │  │
│  │  • WhatsApp bot                                                       │  │
│  │  • Skill academy (100 courses)                                        │  │
│  │  • Fair allocation engine                                             │  │
│  │  • Agent network in pilot areas                                       │  │
│  │  Target: 10 million users                                             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  PHASE 3: PRODUCTION (Month 13-24)                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Scope: Pan-India, 22 languages, government integration               │  │
│  │  • All states covered                                                 │  │
│  │  • Full NREGASoft integration                                         │  │
│  │  • 50+ dialect support                                                │  │
│  │  • Blockchain audit trail                                             │  │
│  │  • Wellbeing network operational                                      │  │
│  │  • Dignity innovation pilots                                          │  │
│  │  Target: 100 million users                                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                              │                                               │
│                              ▼                                               │
│  PHASE 4: SCALE (Month 25-36)                                                │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Scope: Full adoption, government ownership, continuous improvement   │  │
│  │  • 200+ million users                                                 │  │
│  │  • Transfer to government ownership                                   │  │
│  │  • Multi-scheme integration                                           │  │
│  │  • AI improvements based on usage                                     │  │
│  │  • Regional customizations                                            │  │
│  │  Target: 200 million users                                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 12.2 MVP Feature Scope

| In Scope | Out of Scope |
|----------|--------------|
| Voice navigation (3 languages) | All 22 languages |
| Picture mode UI | Advanced accessibility features |
| Geo-personalization (3 districts) | Pan-India coverage |
| Grievance filing + 5-day tracking | Full grievance resolution |
| Scheme information | Scheme application processing |
| Work listing | Fair allocation engine |
| Basic profile | Full Aadhaar integration |
| IVR prototype | WhatsApp/USSD |

---

## 13. Risk Assessment

### 13.1 Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Bhashini API latency/accuracy** | Medium | High | Parallel development with fallback ASR, caching |
| **Government API access delays** | High | High | Mock APIs, phased integration, early engagement |
| **User adoption resistance** | Medium | High | Extensive UX research, pilot with trusted agents |
| **Voice recognition failures in noisy environments** | High | Medium | Noise cancellation, text fallback, keypad input |
| **Security breach / data leak** | Low | Critical | Security audit, encryption, access controls |
| **Agent network recruitment challenges** | Medium | Medium | Partner with SHGs, competitive incentives |
| **Dialect diversity challenges** | High | Medium | Community-sourced recordings, continuous training |
| **Political/administrative changes** | Medium | High | Multi-stakeholder buy-in, success metrics |

### 13.2 Contingency Plans

| Scenario | Contingency |
|----------|-------------|
| Bhashini not ready | Use Google Speech API as fallback |
| NREGASoft integration blocked | Deploy with manual data entry initially |
| Low smartphone penetration | Prioritize IVR channel |
| Privacy concerns | Detailed consent flows, transparency portal |
| Counselor shortage | Partner with NIMHANS, iCall |

---

## 14. Appendix

### 14.1 Glossary

| Term | Definition |
|------|------------|
| **MGNREGA** | Mahatma Gandhi National Rural Employment Guarantee Act |
| **Bhashini** | Government of India's AI translation platform |
| **SATHI** | SAHAYOG's AI voice assistant (साथी = companion) |
| **IVR** | Interactive Voice Response - phone-based menu system |
| **USSD** | Unstructured Supplementary Service Data - text-based mobile menus |
| **GP** | Gram Panchayat - village-level local government |
| **BDO** | Block Development Officer |
| **CSC** | Common Service Center - digital service kiosks |
| **PwD** | Person with Disability |
| **UDID** | Unique Disability ID |
| **SECC** | Socio-Economic and Caste Census |

### 14.2 References

- MGNREGA Act 2005 and Guidelines
- Digital Personal Data Protection Act 2023
- Bhashini API Documentation
- WCAG 2.1 Accessibility Guidelines
- Government of India e-Governance Standards

### 14.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-28 | SAHAYOG Team | Initial PRD |

---

*Document End*
