
import React, { useState } from 'react';
import { UIMode, UserProfile } from '../../types';

interface Props {
  onComplete: (profile: Partial<UserProfile>) => void;
  uiMode: UIMode;
}

// Progressive Onboarding from unified.md Module 2
// "Ask Only What You Need, Remember Everything"
const OnboardingFlow: React.FC<Props> = ({ onComplete, uiMode }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    onboardingLevel: 0
  });
  const [isListening, setIsListening] = useState(false);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;

  const steps = [
    {
      level: 0,
      title: 'Welcome / स्वागत है',
      titleHindi: 'सहायोग में आपका स्वागत है!',
      subtitle: 'You can explore without signing up',
      subtitleHindi: 'आप बिना कुछ भरे भी जानकारी ले सकते हैं।',
      icon: 'fa-hands-praying',
      canSkip: true
    },
    {
      level: 1,
      title: 'Phone Verification',
      titleHindi: 'फोन नंबर पुष्टि',
      subtitle: 'For personalized information',
      subtitleHindi: 'आपका नंबर 98765XXXXX है? हाँ या ना बोलें',
      icon: 'fa-mobile-screen',
      canSkip: false
    },
    {
      level: 2,
      title: 'Identity Verification',
      titleHindi: 'पहचान पुष्टि',
      subtitle: 'For applications and payments',
      subtitleHindi: 'अपना आधार या जॉब कार्ड नंबर बोलें',
      icon: 'fa-id-card',
      canSkip: true
    }
  ];

  const handleVoiceInput = async () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      if (step === 1) {
        setProfile({ ...profile, phoneNumber: '+91 9876543210', onboardingLevel: 1 });
      } else if (step === 2) {
        setProfile({ 
          ...profile, 
          aadhaarLinked: true, 
          jobCardNumber: 'MP-23-001-12345',
          onboardingLevel: 2 
        });
      }
    }, 2000);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleSkip = () => {
    if (step === 0) {
      // Skip to main app with zero barrier entry
      onComplete({ onboardingLevel: 0 });
    } else {
      handleNext();
    }
  };

  const currentStep = steps[step];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isHighContrast ? 'bg-black text-yellow-400' : 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'}`}>
      {/* Progress Dots */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-3 h-3 rounded-full transition-all ${idx === step ? 'bg-white scale-125' : idx < step ? 'bg-white/60' : 'bg-white/30'}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`w-full max-w-md p-8 rounded-3xl text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white/10 backdrop-blur-lg'}`}>
        
        {/* Icon */}
        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white/20'}`}>
          <i className={`fa-solid ${currentStep.icon}`}></i>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">{currentStep.titleHindi}</h1>
        <p className="opacity-80 mb-8">{currentStep.subtitleHindi}</p>

        {/* Voice Input Button */}
        {step > 0 && (
          <button 
            onClick={handleVoiceInput}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mb-4 transition-all ${
              isListening 
                ? 'bg-red-500 animate-pulse' 
                : isHighContrast 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-blue-600'
            }`}
          >
            <i className={`fa-solid ${isListening ? 'fa-circle' : 'fa-microphone'} text-xl`}></i>
            {isListening ? 'सुन रहा हूं... / Listening...' : 'बोलकर बताएं / Speak'}
          </button>
        )}

        {/* Continue Button */}
        <button 
          onClick={handleNext}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${
            isHighContrast 
              ? 'border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black' 
              : 'bg-white/20 hover:bg-white/30'
          }`}
        >
          {step === steps.length - 1 ? 'शुरू करें / Start' : 'आगे बढ़ें / Continue'}
        </button>

        {/* Skip Option */}
        {currentStep.canSkip && (
          <button 
            onClick={handleSkip}
            className="mt-4 opacity-70 hover:opacity-100 transition-all text-sm"
          >
            {step === 0 ? 'बिना खाते के देखें / Browse without account' : 'बाद में करें / Skip for now'}
          </button>
        )}
      </div>

      {/* Level Indicator */}
      <div className="mt-8 text-center opacity-60">
        <p className="text-sm">
          Level {currentStep.level}: {currentStep.level === 0 ? 'Zero Barrier Entry' : currentStep.level === 1 ? 'Basic Identity' : 'Verified Identity'}
        </p>
      </div>

      {/* Language Selector */}
      <button className="mt-4 flex items-center gap-2 opacity-70 hover:opacity-100">
        <i className="fa-solid fa-globe"></i>
        <span>हिंदी</span>
        <i className="fa-solid fa-chevron-down text-xs"></i>
      </button>
    </div>
  );
};

export default OnboardingFlow;
