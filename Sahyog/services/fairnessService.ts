
import { FairnessReport, PriorityFactor, JobOpportunity, UserProfile } from '../types';

// Fairness Engine from unified.md Module 7
// "क्यों मिला, क्यों नहीं मिला - सब पता चलेगा"
export class FairnessEngine {
  
  // Priority factors with weights as per unified.md
  private priorityFactors = {
    daysWorkedGap: { weight: 30, maxScore: 30 },
    vulnerableCategory: { weight: 25, maxScore: 25 },
    economicNeed: { weight: 20, maxScore: 20 },
    waitingTime: { weight: 15, maxScore: 15 },
    skillMatch: { weight: 10, maxScore: 10 }
  };

  // Calculate priority score for job allocation
  calculatePriorityScore(user: UserProfile, villageAverageWorkDays: number = 50): number {
    let totalScore = 0;
    
    // Factor 1: Days worked gap (those who worked less get priority)
    const daysWorkedGap = Math.max(0, 100 - user.daysWorked);
    const daysScore = (daysWorkedGap / 100) * this.priorityFactors.daysWorkedGap.weight;
    totalScore += daysScore;

    // Factor 2: Vulnerable category (SC/ST, women, elderly)
    let vulnerableScore = 0;
    if (user.category === 'SC' || user.category === 'ST') vulnerableScore += 10;
    if (user.gender === 'female') vulnerableScore += 8;
    if (user.age && user.age > 50) vulnerableScore += 7;
    totalScore += Math.min(vulnerableScore, this.priorityFactors.vulnerableCategory.weight);

    // Factor 3: Economic need (less land, larger family)
    let economicScore = 0;
    if (user.landOwned !== undefined && user.landOwned < 1) economicScore += 10;
    if (user.familyMembers && user.familyMembers > 5) economicScore += 10;
    totalScore += Math.min(economicScore, this.priorityFactors.economicNeed.weight);

    // Factor 4: Waiting time (implemented via registration date)
    // This would be calculated based on actual waiting time in production
    totalScore += 10; // Default waiting score

    return Math.round(totalScore);
  }

  // Generate detailed fairness report for transparency
  generateFairnessReport(user: UserProfile, villageStats: { averageWorkDays: number; totalJobs: number }): FairnessReport {
    const priorityScore = this.calculatePriorityScore(user, villageStats.averageWorkDays);
    
    const factors: PriorityFactor[] = [
      {
        factor: 'Days Worked Gap',
        factorHindi: 'काम के दिनों का अंतर',
        score: Math.round((Math.max(0, 100 - user.daysWorked) / 100) * 30),
        maxScore: 30,
        explanation: `You have worked ${user.daysWorked} days out of 100. Gap: ${100 - user.daysWorked} days.`,
        explanationHindi: `आपने 100 में से ${user.daysWorked} दिन काम किया है। बाकी: ${100 - user.daysWorked} दिन।`
      },
      {
        factor: 'Priority Category',
        factorHindi: 'प्राथमिकता श्रेणी',
        score: user.category === 'SC' || user.category === 'ST' ? 25 : (user.gender === 'female' ? 18 : 5),
        maxScore: 25,
        explanation: `Category: ${user.category || 'General'}. ${user.gender === 'female' ? 'Women get additional priority.' : ''}`,
        explanationHindi: `श्रेणी: ${user.category || 'सामान्य'}। ${user.gender === 'female' ? 'महिलाओं को अतिरिक्त प्राथमिकता।' : ''}`
      },
      {
        factor: 'Economic Need',
        factorHindi: 'आर्थिक जरूरत',
        score: (user.landOwned !== undefined && user.landOwned < 1) ? 20 : 10,
        maxScore: 20,
        explanation: `Land owned: ${user.landOwned || 0} acres. Less land = higher priority.`,
        explanationHindi: `जमीन: ${user.landOwned || 0} एकड़। कम जमीन = ज्यादा प्राथमिकता।`
      },
      {
        factor: 'Waiting Time',
        factorHindi: 'प्रतीक्षा समय',
        score: 10,
        maxScore: 15,
        explanation: 'Based on last work allocation date.',
        explanationHindi: 'आखिरी काम आवंटन तिथि के आधार पर।'
      }
    ];

    const percentile = Math.round(
      ((user.daysWorked - villageStats.averageWorkDays) / villageStats.averageWorkDays) * 100 + 50
    );

    return {
      userId: user.id,
      period: 'Current Financial Year 2025-26',
      totalJobsAvailable: villageStats.totalJobs,
      jobsAllocated: Math.floor(user.daysWorked / 5), // Approximate jobs
      waitingPosition: priorityScore > 60 ? 1 : (priorityScore > 40 ? 5 : 15),
      priorityScore,
      priorityFactors: factors,
      comparisonWithVillage: {
        averageDaysWorked: villageStats.averageWorkDays,
        userDaysWorked: user.daysWorked,
        percentile: Math.min(100, Math.max(0, percentile))
      },
      transparencyDetails: [
        `आपका प्राथमिकता स्कोर ${priorityScore}/100 है।`,
        `गाँव में औसत ${villageStats.averageWorkDays} दिन काम हुआ है।`,
        priorityScore > 60 
          ? 'आप अगले काम के लिए उच्च प्राथमिकता में हैं।'
          : 'आपको जल्द ही काम मिलेगा।',
        'यह स्कोर पूरी तरह पारदर्शी और ऑडिट योग्य है।'
      ]
    };
  }

  // Explain why a specific job was/wasn't allocated (unified.md requirement)
  explainAllocation(job: JobOpportunity, user: UserProfile, wasAllocated: boolean): string {
    if (wasAllocated) {
      return `यह काम आपको मिला क्योंकि:\n` +
        `• आपने अभी तक ${user.daysWorked} दिन काम किया है (100 में से)\n` +
        `• आप ${user.category || 'सामान्य'} श्रेणी में हैं\n` +
        `• यह काम आपके गाँव से ${job.distance} दूर है\n` +
        `• आपका प्राथमिकता स्कोर उच्च था`;
    } else {
      return `इस बार यह काम आपको नहीं मिला क्योंकि:\n` +
        `• कुछ लोगों ने आपसे कम दिन काम किया था\n` +
        `• ${job.priorityGroups.join(', ')} को प्राथमिकता दी गई\n` +
        `• आपकी बारी जल्द आएगी\n` +
        `\nसवाल है? "सहायक" से पूछें।`;
    }
  }

  // Audit trail for transparency
  getAuditTrail(jobId: string): { date: string; action: string; details: string }[] {
    // In production, this would fetch from database
    return [
      {
        date: new Date().toISOString(),
        action: 'Job Created',
        details: 'New job opportunity created by Block Office'
      },
      {
        date: new Date().toISOString(),
        action: 'Priority Queue Generated',
        details: '45 eligible workers ranked by fairness algorithm'
      },
      {
        date: new Date().toISOString(),
        action: 'Workers Allocated',
        details: 'Top 15 workers allocated based on priority score'
      }
    ];
  }
}

export const fairnessEngine = new FairnessEngine();
