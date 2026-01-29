
import React, { useState, useEffect } from 'react';
import { UIMode, Grievance, GrievanceCategory } from '../../types';
import { grievanceService } from '../../services/grievanceService';

interface Props {
  uiMode: UIMode;
}

// 5-Day Promise Grievance System from unified.md Module 5
const GrievanceModule: React.FC<Props> = ({ uiMode }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GrievanceCategory | null>(null);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;
  const isPictureMode = uiMode === UIMode.PICTURE;

  useEffect(() => {
    grievanceService.loadMockData();
    setGrievances(grievanceService.getUserGrievances());
  }, []);

  const categories: { id: GrievanceCategory; label: string; labelHindi: string; icon: string }[] = [
    { id: 'payment_delay', label: 'Payment Delay', labelHindi: 'पैसा नहीं आया', icon: 'fa-indian-rupee-sign' },
    { id: 'job_card_issue', label: 'Job Card Issue', labelHindi: 'जॉब कार्ड समस्या', icon: 'fa-id-card' },
    { id: 'work_not_available', label: 'No Work Available', labelHindi: 'काम नहीं मिला', icon: 'fa-briefcase' },
    { id: 'wage_dispute', label: 'Wage Dispute', labelHindi: 'मजदूरी कम मिली', icon: 'fa-scale-unbalanced' },
    { id: 'discrimination', label: 'Discrimination', labelHindi: 'भेदभाव', icon: 'fa-users-slash' },
    { id: 'other', label: 'Other', labelHindi: 'अन्य समस्या', icon: 'fa-circle-question' }
  ];

  const handleStartRecording = async () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(async () => {
      setIsRecording(false);
      if (selectedCategory) {
        const newGrievance = await grievanceService.registerGrievance(
          selectedCategory,
          'Voice recorded complaint - automatically transcribed'
        );
        setGrievances(grievanceService.getUserGrievances());
        setShowNewComplaint(false);
        setSelectedCategory(null);
        setSelectedGrievance(newGrievance);
      }
    }, 3000);
  };

  const getStatusColor = (status: string, isOverdue: boolean) => {
    if (isOverdue) return 'bg-red-100 text-red-700';
    switch (status) {
      case 'registered': return 'bg-blue-100 text-blue-700';
      case 'assigned': return 'bg-yellow-100 text-yellow-700';
      case 'investigating': return 'bg-purple-100 text-purple-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'escalated':
      case 'auto_escalated': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getDaysRemainingText = (g: Grievance) => {
    if (g.status === 'resolved') return '✅ Resolved';
    if (g.isOverdue) return '⚠️ Escalated to DC';
    const remaining = 5 - g.daysSinceRegistration;
    return `${remaining} days remaining`;
  };

  // Timeline View
  if (selectedGrievance) {
    return (
      <div className="space-y-4 md:space-y-6">
        <button 
          onClick={() => setSelectedGrievance(null)}
          className="flex items-center gap-2 text-orange-600 font-bold touch-manipulation"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-lg'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
            <div>
              <span className={`text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full ${getStatusColor(selectedGrievance.status, selectedGrievance.isOverdue)}`}>
                {selectedGrievance.statusLabel}
              </span>
              <h2 className="text-lg md:text-xl font-bold mt-2">{selectedGrievance.categoryLabel}</h2>
              <p className="text-xs md:text-sm opacity-60">Ticket: {selectedGrievance.ticketNo}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className={`text-xl md:text-2xl font-black ${selectedGrievance.isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                Day {selectedGrievance.daysSinceRegistration}/5
              </div>
              <p className="text-[10px] md:text-xs opacity-60">{getDaysRemainingText(selectedGrievance)}</p>
            </div>
          </div>

          {/* 5-Day Promise Progress */}
          <div className="mb-4 md:mb-6">
            <div className="flex justify-between text-[10px] md:text-xs mb-1 md:mb-2">
              <span>Registration</span>
              <span>5-Day Deadline</span>
            </div>
            <div className="h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${selectedGrievance.isOverdue ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(100, (selectedGrievance.daysSinceRegistration / 5) * 100)}%` }}
              />
            </div>
          </div>

          {/* Assigned Officer */}
          {selectedGrievance.assignedOfficer && (
            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl mb-4 md:mb-6 ${isHighContrast ? 'border border-yellow-400' : 'bg-blue-50'}`}>
              <p className="text-[10px] md:text-xs font-bold opacity-60 mb-1 md:mb-2">ASSIGNED OFFICER</p>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm md:text-base truncate">{selectedGrievance.assignedOfficer}</p>
                  <p className="text-xs md:text-sm opacity-70">{selectedGrievance.officerPhone}</p>
                </div>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 touch-manipulation active:bg-green-600">
                  <i className="fa-solid fa-phone"></i>
                </button>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="font-bold text-sm md:text-base">Timeline / समय-रेखा</h3>
            {selectedGrievance.timeline.map((event, idx) => (
              <div key={idx} className="flex gap-3 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-slate-300'}`} />
                  {idx < selectedGrievance.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-3 md:pb-4">
                  <p className="font-medium text-sm md:text-base">{event.eventHindi}</p>
                  <p className="text-[10px] md:text-xs opacity-60">{new Date(event.date).toLocaleDateString('hi-IN')}</p>
                  {event.actor && <p className="text-[10px] md:text-xs opacity-60">By: {event.actor}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // New Complaint Form
  if (showNewComplaint) {
    return (
      <div className="space-y-4 md:space-y-6">
        <button 
          onClick={() => { setShowNewComplaint(false); setSelectedCategory(null); }}
          className="flex items-center gap-2 text-orange-600 font-bold touch-manipulation"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <h2 className="text-xl md:text-2xl font-bold">New Complaint / नई शिकायत</h2>

        {!selectedCategory ? (
          <>
            <p className="opacity-70 text-sm md:text-base">Select complaint type / शिकायत का प्रकार चुनें:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-col items-center gap-2 md:gap-3 transition-all active:scale-95 touch-manipulation ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm hover:shadow-md'}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl ${isHighContrast ? 'text-yellow-400' : 'bg-red-50 text-red-600'}`}>
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-center leading-tight">{cat.labelHindi}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl text-center space-y-4 md:space-y-6 ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-red-50'}`}>
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-white'}`}>
              <i className={`fa-solid fa-microphone text-3xl md:text-4xl ${isRecording ? 'text-white' : 'text-red-600'}`}></i>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold">
                {isRecording ? 'Recording... / रिकॉर्ड हो रहा है...' : 'Speak your complaint / अपनी शिकायत बोलें'}
              </h3>
              <p className="text-xs md:text-sm opacity-70 mt-1 md:mt-2">
                {isRecording ? 'बोलते रहें...' : '"साथी, मेरा पैसा 20 दिन से नहीं आया..."'}
              </p>
            </div>

            {!isRecording && (
              <button 
                onClick={handleStartRecording}
                className="w-full py-3 md:py-4 bg-red-600 text-white rounded-xl md:rounded-2xl font-bold shadow-xl shadow-red-200 active:scale-[0.98] touch-manipulation text-sm md:text-base"
              >
                <i className="fa-solid fa-microphone mr-2"></i>
                Start Recording / रिकॉर्ड शुरू करें
              </button>
            )}

            <div className={`p-3 md:p-4 rounded-lg md:rounded-xl ${isHighContrast ? 'border border-yellow-400' : 'bg-white'}`}>
              <p className="text-[10px] md:text-xs font-bold text-green-600">
                ✅ 5-DAY PROMISE / 5-दिन का वादा
              </p>
              <p className="text-[10px] md:text-xs opacity-70 mt-1">
                Your complaint will receive a human response within 5 days - guaranteed!
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Grievance List
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl md:text-2xl font-bold">Grievance Portal</h2>
        <div className="bg-red-100 text-red-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1">
          <i className="fa-solid fa-shield-check"></i>
          5-DAY PROMISE
        </div>
      </div>

      {/* New Complaint CTA */}
      <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4 text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-gradient-to-br from-red-50 to-orange-50'}`}>
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto flex items-center justify-center shadow-lg ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white text-red-600'}`}>
          <i className="fa-solid fa-microphone-lines text-2xl md:text-3xl"></i>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-red-900">Need Help? / मदद चाहिए?</h3>
          <p className="text-xs md:text-sm text-red-800 opacity-80">
            {isPictureMode ? '🎙️ → 📝 → ✅' : 'Just speak your problem. We will handle the rest.'}
          </p>
          <p className="text-[10px] md:text-xs opacity-60 mt-1">
            "साथी, मुझे शिकायत करनी है"
          </p>
        </div>
        <button 
          onClick={() => setShowNewComplaint(true)}
          className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-xl active:scale-[0.98] touch-manipulation text-sm md:text-base ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-red-600 text-white shadow-red-200'}`}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          File a New Complaint / नई शिकायत करें
        </button>
      </div>

      {/* Active Complaints */}
      {grievances.filter(g => g.status !== 'resolved').length > 0 && (
        <section className="space-y-3 md:space-y-4">
          <h3 className="font-bold opacity-70 uppercase text-[10px] md:text-xs tracking-widest">Active Complaints / चालू शिकायतें</h3>
          {grievances.filter(g => g.status !== 'resolved').map(g => (
            <div 
              key={g.id}
              onClick={() => setSelectedGrievance(g)}
              className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer transition-all active:scale-[0.98] touch-manipulation ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm hover:shadow-md'}`}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0 ${g.isOverdue ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                <span className="text-base md:text-lg font-black">{g.daysSinceRegistration}</span>
                <span className="text-[7px] md:text-[8px] font-bold">/5 DAYS</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-1">
                  <h4 className="font-bold text-sm md:text-base truncate">{g.categoryLabel}</h4>
                  <span className={`text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${getStatusColor(g.status, g.isOverdue)}`}>
                    {g.statusLabel}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs opacity-60 truncate">Ticket: {g.ticketNo}</p>
                <p className="text-[10px] md:text-xs text-green-600 font-medium mt-0.5 md:mt-1">{getDaysRemainingText(g)}</p>
              </div>
              <i className="fa-solid fa-chevron-right opacity-30 flex-shrink-0"></i>
            </div>
          ))}
        </section>
      )}

      {/* Resolved Complaints */}
      {grievances.filter(g => g.status === 'resolved').length > 0 && (
        <section className="space-y-3 md:space-y-4">
          <h3 className="font-bold opacity-70 uppercase text-[10px] md:text-xs tracking-widest">Resolved / हल हुई</h3>
          {grievances.filter(g => g.status === 'resolved').map(g => (
            <div 
              key={g.id}
              onClick={() => setSelectedGrievance(g)}
              className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer opacity-70 touch-manipulation ${isHighContrast ? 'border border-yellow-400' : 'bg-slate-50'}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-check text-lg md:text-xl"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm md:text-base truncate">{g.categoryLabel}</h4>
                <p className="text-[10px] md:text-xs opacity-60">{g.ticketNo}</p>
                {g.satisfactionRating && (
                  <div className="flex gap-0.5 mt-0.5 md:mt-1">
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className={`fa-solid fa-star text-[10px] md:text-xs ${s <= g.satisfactionRating! ? 'text-yellow-400' : 'text-slate-200'}`}></i>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Promise Reminder */}
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-dashed text-center ${isHighContrast ? 'border-yellow-400' : 'border-slate-200'}`}>
        <p className="text-[10px] md:text-xs opacity-60">
          <i className="fa-solid fa-shield-check mr-1 text-green-500"></i>
          Every grievance gets a human response within 5 days. If not, auto-escalated to District Collector.
        </p>
      </div>
    </div>
  );
};

export default GrievanceModule;
