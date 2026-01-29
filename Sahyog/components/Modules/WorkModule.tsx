
import React, { useState } from 'react';
import { MOCK_JOBS } from '../../constants';
import { UIMode, JobOpportunity, UserProfile } from '../../types';
import { fairnessEngine } from '../../services/fairnessService';
import { geoService } from '../../services/geoService';

interface Props {
  uiMode: UIMode;
  user?: UserProfile;
}

// Work Module with Fairness Engine from unified.md Module 7
const WorkModule: React.FC<Props> = ({ uiMode, user }) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showFairnessReport, setShowFairnessReport] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;
  const isPictureMode = uiMode === UIMode.PICTURE;

  // Filter jobs by distance (geo-personalization)
  const nearbyJobs = MOCK_JOBS.filter(job => job.distanceKm <= 10).sort((a, b) => a.distanceKm - b.distanceKm);

  // Mock user for demo
  const currentUser: UserProfile = user || {
    id: '123',
    name: 'Ramesh Singh',
    village: 'Piparia',
    block: 'Sadar',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    preferredLanguage: 'hi-IN',
    uiMode: UIMode.STANDARD,
    daysWorked: 45,
    aadhaarLinked: true,
    phoneNumber: '+91 9876543210',
    category: 'OBC',
    gender: 'male',
    age: 35,
    isLiterate: true,
    bankAccountLinked: true,
    familyMembers: 5,
    landOwned: 0.5,
    onboardingLevel: 2,
    registeredSchemes: ['MGNREGA'],
    pendingPayments: 2400,
    lastActiveDate: new Date().toISOString()
  };

  const fairnessReport = fairnessEngine.generateFairnessReport(currentUser, { 
    averageWorkDays: 52, 
    totalJobs: 156 
  });

  const handleApply = (jobId: string) => {
    setAppliedJobs([...appliedJobs, jobId]);
  };

  // Fairness Report View
  if (showFairnessReport) {
    return (
      <div className="space-y-4 md:space-y-6">
        <button 
          onClick={() => setShowFairnessReport(false)}
          className="flex items-center gap-2 text-orange-600 font-bold touch-manipulation"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-scale-balanced text-xl md:text-2xl text-orange-600"></i>
          <h2 className="text-xl md:text-2xl font-bold">Fairness Report / न्याय रिपोर्ट</h2>
        </div>

        <p className="opacity-70 text-xs md:text-sm">
          "क्यों मिला, क्यों नहीं मिला - सब पता चलेगा"
        </p>

        {/* Priority Score */}
        <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-gradient-to-br from-orange-500 to-red-600 text-white'}`}>
          <p className="text-xs md:text-sm opacity-80">Your Priority Score</p>
          <div className="text-5xl md:text-6xl font-black my-3 md:my-4">{fairnessReport.priorityScore}</div>
          <p className="text-xs md:text-sm opacity-80">out of 100</p>
          <div className="mt-3 md:mt-4 text-xs md:text-sm">
            {fairnessReport.priorityScore > 60 
              ? '🎯 High Priority - You will get work soon!'
              : fairnessReport.priorityScore > 40 
                ? '📊 Medium Priority - Keep checking'
                : '📋 In Queue - Your turn will come'
            }
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="font-bold text-sm md:text-base">How is this calculated? / यह कैसे गिना जाता है?</h3>
          {fairnessReport.priorityFactors.map((factor, idx) => (
            <div key={idx} className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-white shadow-sm'}`}>
              <div className="flex justify-between items-center mb-1.5 md:mb-2">
                <span className="font-bold text-sm md:text-base">{factor.factorHindi}</span>
                <span className="text-xs md:text-sm font-bold text-orange-600">{factor.score}/{factor.maxScore}</span>
              </div>
              <div className="h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5 md:mb-2">
                <div 
                  className="h-full bg-orange-500" 
                  style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                />
              </div>
              <p className="text-[10px] md:text-xs opacity-60">{factor.explanationHindi}</p>
            </div>
          ))}
        </div>

        {/* Village Comparison */}
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-green-50'}`}>
          <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Village Comparison / गाँव से तुलना</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-orange-600">{fairnessReport.comparisonWithVillage.userDaysWorked}</div>
              <div className="text-[10px] md:text-xs opacity-60">Your Days Worked</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold">{fairnessReport.comparisonWithVillage.averageDaysWorked}</div>
              <div className="text-[10px] md:text-xs opacity-60">Village Average</div>
            </div>
          </div>
          <div className="mt-3 md:mt-4 text-center text-xs md:text-sm">
            You are in the <span className="font-bold text-green-600">{fairnessReport.comparisonWithVillage.percentile}th percentile</span>
          </div>
        </div>

        {/* Transparency Details */}
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-slate-50'}`}>
          <h3 className="font-bold mb-2 text-sm md:text-base"><i className="fa-solid fa-shield-check mr-2 text-green-500"></i>Transparency / पारदर्शिता</h3>
          <ul className="space-y-1.5 md:space-y-2">
            {fairnessReport.transparencyDetails.map((detail, idx) => (
              <li key={idx} className="text-xs md:text-sm flex items-start gap-2">
                <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Ask SATHI */}
        <div className="text-center">
          <button className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base touch-manipulation ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-orange-600 text-white'}`}>
            <i className="fa-solid fa-microphone mr-2"></i>
            Ask SATHI about this
          </button>
        </div>
      </div>
    );
  }

  // Job Detail View
  if (selectedJob) {
    const explanation = fairnessEngine.explainAllocation(selectedJob, currentUser, true);
    
    return (
      <div className="space-y-4 md:space-y-6">
        <button 
          onClick={() => setSelectedJob(null)}
          className="flex items-center gap-2 text-orange-600 font-bold touch-manipulation"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        {/* Job Image */}
        <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden relative">
          <img 
            src={`https://picsum.photos/seed/${selectedJob.id}/800/450`}
            className="w-full h-full object-cover"
            alt={selectedJob.title}
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-xl md:text-2xl font-bold text-white">{selectedJob.titleHindi}</h2>
            <p className="text-white/80 text-sm md:text-base">{selectedJob.title}</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
          <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-green-50'}`}>
            <div className="text-lg md:text-xl font-bold text-green-600">₹{selectedJob.wage}</div>
            <div className="text-[10px] md:text-xs opacity-60">Per Day</div>
          </div>
          <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-blue-50'}`}>
            <div className="text-lg md:text-xl font-bold text-blue-600">{selectedJob.distance}</div>
            <div className="text-[10px] md:text-xs opacity-60">Distance</div>
          </div>
          <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-purple-50'}`}>
            <div className="text-lg md:text-xl font-bold text-purple-600">{selectedJob.workDays}</div>
            <div className="text-[10px] md:text-xs opacity-60">Days</div>
          </div>
        </div>

        {/* Details */}
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl space-y-2 md:space-y-3 ${isHighContrast ? 'border border-yellow-400' : 'bg-white shadow-sm'}`}>
          <p className="font-medium text-sm md:text-base">{selectedJob.descriptionHindi}</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <span className="bg-slate-100 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
              <i className="fa-solid fa-calendar mr-1"></i>
              Starts: {new Date(selectedJob.startDate).toLocaleDateString('hi-IN')}
            </span>
            <span className="bg-slate-100 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
              <i className="fa-solid fa-users mr-1"></i>
              {selectedJob.availableSlots} slots
            </span>
            <span className="bg-slate-100 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
              <i className="fa-solid fa-person mr-1"></i>
              {selectedJob.applicants} applied
            </span>
          </div>
        </div>

        {/* Fairness Score */}
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-orange-50'}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-xs font-bold opacity-60">FAIRNESS SCORE</p>
              <p className="font-bold text-sm md:text-base truncate">Allocation Transparency</p>
            </div>
            <div className="text-2xl md:text-3xl font-black text-orange-600 flex-shrink-0">{selectedJob.fairnessScore}%</div>
          </div>
          <p className="text-[10px] md:text-xs mt-2 opacity-70">{selectedJob.allocationReason}</p>
          <p className="text-[10px] md:text-xs mt-1">Priority: {selectedJob.priorityGroups.join(', ')}</p>
        </div>

        {/* Apply Button */}
        <button 
          onClick={() => handleApply(selectedJob.id)}
          disabled={appliedJobs.includes(selectedJob.id)}
          className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all touch-manipulation ${
            appliedJobs.includes(selectedJob.id)
              ? 'bg-green-100 text-green-700'
              : isHighContrast 
                ? 'bg-yellow-400 text-black' 
                : 'bg-orange-600 text-white shadow-xl shadow-orange-200 active:scale-[0.98]'
          }`}
        >
          {appliedJobs.includes(selectedJob.id) ? (
            <><i className="fa-solid fa-check mr-2"></i>Applied / आवेदन किया</>
          ) : (
            <><i className="fa-solid fa-plus mr-2"></i>Apply Now / अभी आवेदन करें</>
          )}
        </button>
      </div>
    );
  }

  // Main Job List View
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl md:text-2xl font-bold">Work Nearby / पास में काम</h2>
        <button 
          onClick={() => setShowFairnessReport(true)}
          className="text-orange-600 text-xs md:text-sm font-bold flex items-center gap-1 touch-manipulation"
        >
          <i className="fa-solid fa-scale-balanced"></i> Fairness
        </button>
      </div>

      {/* Location Info */}
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-wrap items-center gap-2 md:gap-3 ${isHighContrast ? 'border border-yellow-400' : 'bg-orange-50'}`}>
        <i className="fa-solid fa-location-dot text-orange-600 text-lg md:text-xl"></i>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm md:text-base truncate">📍 रामपुर (Rampur)</p>
          <p className="text-[10px] md:text-xs opacity-60">Block: Sadar, District: Sehore</p>
        </div>
        <span className="bg-orange-600 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap">
          {nearbyJobs.length} jobs within 10km
        </span>
      </div>

      {/* Priority Status */}
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 ${isHighContrast ? 'border border-yellow-400' : 'bg-green-50'}`}>
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-100 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-lg md:text-xl font-black text-green-700">{fairnessReport.priorityScore}</span>
          <span className="text-[7px] md:text-[8px] font-bold text-green-600">SCORE</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm md:text-base">Your Priority Status</p>
          <p className="text-xs md:text-sm opacity-70">Queue Position: #{fairnessReport.waitingPosition}</p>
          <button 
            onClick={() => setShowFairnessReport(true)}
            className="text-[10px] md:text-xs text-orange-600 font-bold mt-0.5 md:mt-1 touch-manipulation"
          >
            See why →
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-3 md:space-y-4">
        {nearbyJobs.map((job) => (
          <div 
            key={job.id} 
            onClick={() => setSelectedJob(job)}
            className={`p-3 md:p-5 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer transition-all active:scale-[0.98] touch-manipulation ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm hover:shadow-md'}`}
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0 flex items-center justify-center text-xl md:text-2xl ${isHighContrast ? 'bg-slate-900 border' : 'bg-orange-50 text-orange-600'}`}>
              <i className={`fa-solid ${job.icon}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-lg truncate">{isPictureMode ? '' : job.titleHindi}</h3>
              <div className="flex gap-2 md:gap-3 text-xs md:text-sm opacity-70 truncate">
                <span><i className="fa-solid fa-map-pin mr-1"></i> {job.location} ({job.distance})</span>
              </div>
              <div className="mt-1.5 md:mt-2 flex items-center gap-1.5 md:gap-2 flex-wrap">
                <span className="bg-green-100 text-green-700 px-2 md:px-3 py-0.5 rounded-full text-[10px] md:text-xs font-bold">
                  ₹{job.wage}/day
                </span>
                <span className="bg-slate-100 text-slate-600 px-2 md:px-3 py-0.5 rounded-full text-[10px] md:text-xs font-bold">
                  {job.availableSlots} slots
                </span>
                <span className="bg-orange-100 text-orange-600 px-1.5 md:px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold hidden sm:inline">
                  {job.fairnessScore}% fair
                </span>
              </div>
            </div>
            {appliedJobs.includes(job.id) ? (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-check"></i>
              </div>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); handleApply(job.id); }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 flex-shrink-0 touch-manipulation ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-orange-600 text-white'}`}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* More Work */}
      <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl text-center space-y-2 md:space-y-3 ${isHighContrast ? 'border-2 border-dashed border-yellow-400' : 'bg-slate-100 border-2 border-dashed border-slate-300'}`}>
        <div className="text-2xl md:text-3xl opacity-40"><i className="fa-solid fa-magnifying-glass"></i></div>
        <p className="font-medium opacity-70 text-sm md:text-base">SATHI can find more work in other villages. Just ask!</p>
        <p className="text-[10px] md:text-xs opacity-50">"साथी, और काम दिखाओ"</p>
        <button className="text-orange-600 font-bold uppercase text-xs md:text-sm touch-manipulation">See Other Districts</button>
      </div>
    </div>
  );
};

export default WorkModule;
