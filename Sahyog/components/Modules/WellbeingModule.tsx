
import React, { useState } from 'react';
import { UIMode, MoodType, WellbeingCheckIn, SuccessStory } from '../../types';
import { SUCCESS_STORIES, COUNSELORS } from '../../constants';

interface Props {
  uiMode: UIMode;
}

// Mental Wellbeing Integration from unified.md Module 8
const WellbeingModule: React.FC<Props> = ({ uiMode }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [showCheckInComplete, setShowCheckInComplete] = useState(false);
  const [checkInHistory, setCheckInHistory] = useState<WellbeingCheckIn[]>([]);
  const [showCounselors, setShowCounselors] = useState(false);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;
  const isPictureMode = uiMode === UIMode.PICTURE;

  const moods: { type: MoodType; icon: string; label: string; labelHindi: string; color: string }[] = [
    { type: 'happy', icon: 'fa-face-smile', label: 'Happy', labelHindi: 'खुश', color: 'text-yellow-500' },
    { type: 'okay', icon: 'fa-face-meh', label: 'Okay', labelHindi: 'ठीक', color: 'text-slate-500' },
    { type: 'stressed', icon: 'fa-face-tired', label: 'Stressed', labelHindi: 'थका हुआ', color: 'text-orange-500' },
    { type: 'worried', icon: 'fa-face-frown', label: 'Worried', labelHindi: 'चिंतित', color: 'text-blue-500' },
    { type: 'sad', icon: 'fa-face-sad-tear', label: 'Sad', labelHindi: 'उदास', color: 'text-purple-500' },
    { type: 'angry', icon: 'fa-face-angry', label: 'Frustrated', labelHindi: 'परेशान', color: 'text-red-500' }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    // Record check-in
    const newCheckIn: WellbeingCheckIn = {
      date: new Date().toISOString(),
      mood,
      followUpRequired: ['sad', 'worried', 'angry'].includes(mood)
    };
    setCheckInHistory([newCheckIn, ...checkInHistory]);
    
    setTimeout(() => {
      setShowCheckInComplete(true);
    }, 500);
  };

  const getSupportMessage = (mood: MoodType | null) => {
    switch (mood) {
      case 'happy':
        return { message: 'बहुत अच्छा! आपकी खुशी देखकर हमें भी खुशी होती है। 🎉', showCounselor: false };
      case 'okay':
        return { message: 'अच्छा है। याद रखें, हर दिन एक नई शुरुआत है।', showCounselor: false };
      case 'stressed':
        return { message: 'थकान होना स्वाभाविक है। थोड़ा आराम करें। क्या कोई समस्या है?', showCounselor: true };
      case 'worried':
        return { message: 'चिंता न करें। हम साथ हैं। अपनी बात साझा करें।', showCounselor: true };
      case 'sad':
        return { message: 'मुझे दुख है कि आप उदास हैं। क्या आप किसी से बात करना चाहेंगे?', showCounselor: true };
      case 'angry':
        return { message: 'परेशानी होना स्वाभाविक है। अपनी बात बताएं, हम सुनेंगे।', showCounselor: true };
      default:
        return { message: '', showCounselor: false };
    }
  };

  // Counselor List View
  if (showCounselors) {
    return (
      <div className="p-6 space-y-6">
        <button 
          onClick={() => setShowCounselors(false)}
          className="flex items-center gap-2 text-blue-600 font-bold"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        <h2 className="text-2xl font-bold">Free Counselors / मुफ्त परामर्शदाता</h2>

        <div className={`p-4 rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-green-50'}`}>
          <p className="text-sm">
            <i className="fa-solid fa-shield-check text-green-500 mr-2"></i>
            100% Free & Confidential / पूरी तरह मुफ्त और गोपनीय
          </p>
        </div>

        <div className="space-y-4">
          {COUNSELORS.map((counselor, idx) => (
            <div key={idx} className={`p-5 rounded-2xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{counselor.name}</h3>
                  <p className="text-sm opacity-60">{counselor.specialization}</p>
                  <div className="flex gap-2 mt-1">
                    {counselor.language.map(lang => (
                      <span key={lang} className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{lang}</span>
                    ))}
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${counselor.available ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              </div>
              
              <button className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                counselor.available 
                  ? isHighContrast ? 'bg-yellow-400 text-black' : 'bg-green-600 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                <i className="fa-solid fa-phone"></i>
                {counselor.available ? 'Call Now / अभी कॉल करें' : 'Busy - Try Later'}
              </button>
            </div>
          ))}
        </div>

        {/* SATHI Talk Option */}
        <div className={`p-6 rounded-3xl text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-purple-50'}`}>
          <div className="w-20 h-20 rounded-full bg-purple-600 text-white mx-auto flex items-center justify-center text-3xl mb-4">
            <i className="fa-solid fa-robot"></i>
          </div>
          <h3 className="font-bold text-lg">Talk to SATHI First</h3>
          <p className="text-sm opacity-70 mt-2">
            Not ready to talk to a person? Share with SATHI. I'm always here.
          </p>
          <button className={`mt-4 px-6 py-3 rounded-full font-bold ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-purple-600 text-white'}`}>
            <i className="fa-solid fa-microphone mr-2"></i>
            "साथी, मुझे बात करनी है"
          </button>
        </div>
      </div>
    );
  }

  // Check-in Complete View
  if (showCheckInComplete && selectedMood) {
    const support = getSupportMessage(selectedMood);
    
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-8">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-6 ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-purple-50'}`}>
            <i className={`fa-solid ${moods.find(m => m.type === selectedMood)?.icon} ${moods.find(m => m.type === selectedMood)?.color}`}></i>
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank you for sharing</h2>
          <p className="text-lg opacity-80">{support.message}</p>
        </div>

        {support.showCounselor && (
          <div className={`p-6 rounded-3xl text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-purple-50'}`}>
            <div className="w-16 h-16 bg-purple-600 text-white rounded-full mx-auto flex items-center justify-center text-2xl mb-4">
              <i className="fa-solid fa-headset"></i>
            </div>
            <h3 className="font-bold text-lg">Talk to Someone</h3>
            <p className="text-sm opacity-70 mt-2">
              Free counselors available in your language. No judgment.
            </p>
            <button 
              onClick={() => setShowCounselors(true)}
              className={`w-full mt-4 py-4 rounded-2xl font-bold ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-purple-600 text-white'}`}
            >
              <i className="fa-solid fa-phone mr-2"></i>
              Free Counselor Call / मुफ्त परामर्श
            </button>
          </div>
        )}

        <button 
          onClick={() => { setShowCheckInComplete(false); setSelectedMood(null); }}
          className={`w-full py-4 rounded-2xl font-bold ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-slate-100'}`}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Go Back / वापस जाएं
        </button>
      </div>
    );
  }

  // Main Wellbeing View
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">How are you today? / आज कैसा महसूस हो रहा है?</h2>
      
      {/* Mood Check-in */}
      <div className="grid grid-cols-3 gap-4">
        {moods.map(mood => (
          <button 
            key={mood.type}
            onClick={() => handleMoodSelect(mood.type)}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105 active:scale-95 ${
              selectedMood === mood.type 
                ? 'ring-4 ring-blue-500' 
                : isHighContrast 
                  ? 'border-2 border-yellow-400' 
                  : 'bg-white shadow-sm'
            }`}
          >
            <i className={`fa-solid ${mood.icon} text-4xl ${isHighContrast ? 'text-white' : mood.color}`}></i>
            <span className="text-xs font-bold text-center">{isPictureMode ? '' : mood.labelHindi}</span>
          </button>
        ))}
      </div>

      {/* Talk to SATHI */}
      <div className={`p-6 rounded-3xl space-y-4 ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-purple-50'}`}>
        <div className="flex gap-4 items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-purple-600 text-white'}`}>
            <i className="fa-solid fa-headset"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-900">Talk to SATHI / साथी से बात करें</h3>
            <p className="text-sm text-purple-800 opacity-80">Share your heart. I am always listening.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCounselors(true)}
          className={`w-full py-4 rounded-2xl font-bold ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white text-purple-600 border-2 border-purple-200'}`}
        >
          <i className="fa-solid fa-phone mr-2"></i>
          Free Counselor Call / मुफ्त परामर्श कॉल
        </button>
      </div>

      {/* Weekly Mood Summary */}
      <div className={`p-4 rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-white shadow-sm'}`}>
        <h3 className="font-bold mb-4">This Week / इस हफ्ते</h3>
        <div className="flex justify-around">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                idx < 4 ? 'bg-green-100' : idx === 4 ? 'bg-yellow-100' : 'bg-slate-100'
              }`}>
                {idx < 5 ? (
                  <i className={`fa-solid ${idx < 4 ? 'fa-face-smile text-green-600' : 'fa-face-meh text-yellow-600'} text-sm`}></i>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </div>
              <span className="text-[10px] opacity-60">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <section className="space-y-4">
        <h3 className="font-bold opacity-70 uppercase text-xs tracking-widest">Community Circle / समुदाय</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          {SUCCESS_STORIES.map(story => (
            <div key={story.id} className={`min-w-[280px] p-5 rounded-2xl space-y-3 ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src={story.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-sm font-bold">{story.userName}</span>
                  <p className="text-xs opacity-60">{story.userVillage}</p>
                </div>
              </div>
              <p className="text-sm opacity-80">{story.storyHindi}</p>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  story.category === 'payment' ? 'bg-green-100 text-green-700' :
                  story.category === 'skill' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {story.category === 'payment' ? '💰 Payment' : 
                   story.category === 'skill' ? '📚 Skill' : '✅ Grievance'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Helpline */}
      <div className={`p-4 rounded-2xl border-2 border-dashed text-center ${isHighContrast ? 'border-yellow-400' : 'border-red-200'}`}>
        <p className="text-sm">
          <i className="fa-solid fa-phone-volume text-red-500 mr-2"></i>
          Emergency Helpline: <span className="font-bold">1800-XXX-XXXX</span>
        </p>
        <p className="text-xs opacity-60 mt-1">24/7 Free | 22 Languages</p>
      </div>
    </div>
  );
};

export default WellbeingModule;
