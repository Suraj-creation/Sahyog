# SAHAYOG-2026: Problem Statement

## Problem Statement

The Indian government spends billions of rupees on schemes (like MGNREGA / VBGRAM) to promise 100 days of paid work to rural families. The money is there. The policy is there. However, the system is failing on the ground. Why? Because the people who need these jobs often cannot read, do not own smartphones, and do not have political influence. As a result, local middlemen often decide who gets work, leaving the most vulnerable people (widows, the elderly, the poorest) with nothing.

## The Three Specific Failures

You are trying to solve three specific failures in the current system:

### 1. Bias & Corruption
A local leader often gives jobs to their friends or family, not the people who need it most.

### 2. The Digital Wall
Most solutions require apps or reading. If a user cannot read or has no internet, they are locked out of the system.

### 3. The Dead-End Trap
Workers are given digging jobs for 10 years straight. They never learn new skills, never earn more money and eventually lose hope (leading to mental health crises and production coming down).

## The Goal

Design a system that connects a rural worker to a government job without needing a middleman, without needing to read and without bias. Your solution must treat the worker as a human being who deserves fairness, easy access, and a future.

You do not need to tackle all of these, but your solution should solve **at least one** of these major pillars deeply.

## Three Major Solution Pillars

### 1. The "Fairness Engine" (Fixing Allocation)

#### The Challenge
Currently, humans decide who gets work. Humans are biased.

#### What to Build
Create an automated logic (algorithm) that assigns jobs based on Need and Rules, not names.

#### Requirements
- Your system must prioritize vulnerable people (like single mothers, people with zero income)
- It must produce a "Proof of Fairness", a log that shows exactly why Person A got the job and Person B did not

---

### 2. The "Voice-First" Interface (Fixing Access)

#### The Challenge
Your user cannot read text and might have a cheap phone with no internet.

#### What to Build
An interface that works via Voice or Simple Images.

#### Requirements
- The user should be able to ask: "Is there work for me this week?" in their local language (Hindi, Kannada, etc.) and get an audio reply
- It must work on low internet bandwidth (2G) or offline mode

---

### 3. The "Growth & Hope" Tracker (Fixing Stagnation)

#### The Challenge
Workers are stuck in a cycle of poverty and depression. They don't know how to improve their lives.

#### What to Build
A feature that tracks a worker's history and suggests "Level Ups."

#### Requirements
- **Upskilling**: If a worker has done 50 days of manual labor, the system should alert them: "You are eligible for free masonry training. Click here to apply."
- **Mental Health**: If a worker stops showing up or reports payment delays repeatedly, the system should flag them as "High Stress" and alert a community helper to visit them

---

## Design & Approach Guidelines

Teams are encouraged to design and approach this problem in the following manner:

### 1. Start From the System, Not the Interface

Teams are encouraged to begin by identifying where and why the current employment system fails—whether due to bias, missing information, weak incentives, poor communication, or lack of growth pathways.

**Focus**: Solutions should focus on fixing decision making, allocation, access, or accountability, not merely adding another digital layer.

### 2. Work With Imperfect, Limited, or Hypothetical Data

In real public systems, clean and complete data rarely exists. Teams should therefore construct realistic, representative datasets that reflect rural constraints such as missing records, delays, inconsistencies and human error.

**Emphasis**: The focus is on showing what kinds of data matter, how they interact and how decisions change when that data is used responsibly.

### 3. Explain the "Why" Behind Every Data Choice

For every dataset or variable used, teams must clearly explain:
- Why this data is necessary
- What real world condition it represents
- What risk or bias might arise if it is missing or misused

This ensures solutions remain grounded in governance and human reality, not just technical elegance.

### 4. Design for Low Power, Low Literacy, and Low Trust Environments

All proposed systems must assume:
- Limited or no internet access
- Limited literacy or digital familiarity
- Low institutional trust

Teams should demonstrate how their solution functions under these constraints, whether through indirect data signals, intermediated access, automation, or explainable system behavior.

### 5. Prioritize Explainability and Accountability

Any automated or algorithmic decision must be auditable and explainable. Teams should show how a worker, official, or auditor could understand:
- Why a decision was made
- Who benefits and who does not
- How errors or grievances can be identified and corrected

**Note**: Opacity, even if technically sophisticated, is discouraged.

### 6. Treat Workers as Humans, Not Records

Solutions should explicitly consider:
- Long-term stagnation and aspiration loss
- Psychological stress caused by uncertainty or exclusion
- Dignity, motivation, and trust as system outcomes

Teams are encouraged to model growth, well-being, or future opportunity, not just task completion or attendance.

### 7. Show Impact Through Reasoning, Not Scale

Teams are not expected to build nation-scale systems. Instead, they should demonstrate—through logic, data flows, and scenarios—how their approach improves fairness, access, or outcomes compared to the current system, even at a small or pilot scale.

### 8. Innovation Is About Insight, Not Complexity

Advanced tools (AI, analytics, geospatial data, automation) are encouraged but only when they solve a clearly articulated problem. Simple, well reasoned systems that align with policy intent and human behavior can be more valuable than technically dense but disconnected solutions with respect to the context.

---

## Example Problem Statements (Reference Only)

The following are example problem statements to help you understand possible types of solutions. **You do not have to follow these**—they are solely for your understanding. We do not want to limit your imagination.

### 1. Satellite-Based Work Verification

Uses before–after satellite images of registered worksite coordinates to detect real physical changes. Sites marked "completed" with no visible change are flagged for audit to prevent ghost work and fund leakage.

### 2. Fairness Allocation Engine

Automatically assigns work based on need indicators (income, dependency, past workdays), not names or influence. Generates a transparent log explaining why one worker was prioritized over another.

### 3. Payment Delay Pattern Analyzer

Analyzes wage payment timelines across villages to identify abnormal delay clusters. Repeated delay patterns trigger early audits before protests or dropouts occur.

### 4. Voice-Based Stress Signal Detector

Extracts stress indicators from worker complaint calls using speech features like pauses and repetition. Rising stress trends flag households for human follow-up before mental health crises escalate.

### 5. Skill Stagnation Index

Tracks how long workers remain in the same task category without income improvement. Flags "career deadlocks" and recommends free upskilling only when stagnation is data-verified.

### 6. Information Access Inequality Mapper

Maps how job information spreads across hamlets using call and timestamp data. Identifies communities that consistently receive work updates last, revealing structural exclusion.

### 7. Rule Drift Detection System

Compares official scheme rules with actual allocation outcomes over time. Highlights silent violations like vulnerable groups being deprioritized despite policy mandates.

---

## Summary

This problem statement challenges you to rethink how government employment schemes work at ground level. The key is to **solve real systemic failures** (bias, access, stagnation) with solutions that are **practical, explainable, and human-centered**—not just technically sophisticated.

Focus on one pillar deeply. Make it work in resource-constrained environments. Show how it improves outcomes. That's the goal.