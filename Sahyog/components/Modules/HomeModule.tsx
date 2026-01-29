
import React, { useState, useEffect } from 'react';
import { UserProfile, UIMode, Alert, ActiveTab } from '../../types';
import { geoService } from '../../services/geoService';

interface Props {
  user: UserProfile;
  uiMode: UIMode;
  onTabChange?: (tab: ActiveTab) => void;
}

// Geo-Personalized Home Module from unified.md Module 1
const HomeModule: React.FC<Props> = ({ user, uiMode, onTabChange }) => {
  const [locationInfo, setLocationInfo] = useState<{ village: string; district: string; state: string; block: string } | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [mandiPrices, setMandiPrices] = useState<{ crop: string; price: number; change: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;
  const isPictureMode = uiMode === UIMode.PICTURE;

  useEffect(() => {
    loadGeoData();
  }, []);

  const loadGeoData = async () => {
    try {
      const location = await geoService.detectLocation();
      setLocationInfo({
        village: location.village,
        district: location.district,
        state: location.state,
        block: location.block
      });
      
      const weatherAlerts = geoService.getWeatherAlerts();
      setAlerts(weatherAlerts);
      
      const prices = geoService.getMandiPrices();
      setMandiPrices(prices.map(p => ({ crop: p.crop, price: p.price, change: p.trend === 'up' ? 5 : p.trend === 'down' ? -3 : 0 })));
    } catch (e) {
      console.error('Failed to load geo data', e);
    } finally {
      setLoading(false);
    }
  };

  const daysWorkedPercent = Math.min((user.daysWorked / 100) * 100, 100);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Location Header */}
      <section className="space-y-1 md:space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm opacity-70">
          <i className="fa-solid fa-location-dot text-red-500"></i>
          <span>{locationInfo ? `${locationInfo.village}, ${locationInfo.district}` : 'Detecting location...'}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold">नमस्ते, {user.name}! 🙏</h2>
        <p className="text-sm md:text-base opacity-70">SATHI हमेशा आपके साथ है</p>
      </section>

      {/* Weather & Alerts - Responsive */}
      {alerts.length > 0 && (
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-l-4 ${
          alerts[0].type === 'weather' 
            ? 'border-blue-500 bg-blue-50' 
            : alerts[0].type === 'payment' 
              ? 'border-green-500 bg-green-50'
              : 'border-orange-500 bg-orange-50'
        }`}>
          <div className="flex gap-2 md:gap-3 items-start">
            <i className={`fa-solid ${
              alerts[0].type === 'weather' ? 'fa-cloud-rain text-blue-500' :
              alerts[0].type === 'payment' ? 'fa-indian-rupee-sign text-green-500' :
              'fa-bullhorn text-orange-500'
            } text-lg md:text-xl`}></i>
            <div>
              <h4 className="font-bold text-xs md:text-sm">{alerts[0].titleHindi || alerts[0].title}</h4>
              <p className="text-[10px] md:text-xs opacity-70 mt-0.5 md:mt-1">{alerts[0].messageHindi || alerts[0].message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white'}`}>
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 text-blue-600">
            <i className="fa-solid fa-calendar-days text-sm md:text-base"></i>
            <span className="text-[10px] md:text-xs font-bold uppercase">काम के दिन</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">{user.daysWorked}</div>
          <p className="text-[9px] md:text-[10px] opacity-60">लक्ष्य: 100 दिन</p>
          <div className="mt-1.5 md:mt-2 h-1.5 md:h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 rounded-full transition-all" style={{width: `${daysWorkedPercent}%`}}></div>
          </div>
        </div>
        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white'}`}>
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 text-green-600">
            <i className="fa-solid fa-indian-rupee-sign text-sm md:text-base"></i>
            <span className="text-[10px] md:text-xs font-bold uppercase">अनुमानित वेतन</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">₹{(user.daysWorked * 250).toLocaleString()}</div>
          <p className="text-[9px] md:text-[10px] opacity-60">अगला: 15 सितंबर</p>
        </div>
      </div>

      {/* Quick Actions (Picture Mode Friendly) - Responsive */}
      <section className="space-y-3 md:space-y-4">
        <h3 className="text-base md:text-lg font-bold">{isPictureMode ? '' : 'आप क्या करना चाहेंगे?'}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
          <QuickAction 
            icon="fa-person-digging" 
            color="bg-orange-100 text-orange-600" 
            label="काम खोजें" 
            labelEn="Find Work"
            uiMode={uiMode} 
            onClick={() => onTabChange?.('work')}
          />
          <QuickAction 
            icon="fa-scroll" 
            color="bg-purple-100 text-purple-600" 
            label="योजनाएं" 
            labelEn="Schemes"
            uiMode={uiMode} 
            onClick={() => onTabChange?.('schemes')}
          />
          <QuickAction 
            icon="fa-graduation-cap" 
            color="bg-blue-100 text-blue-600" 
            label="सीखें" 
            labelEn="Learn"
            uiMode={uiMode} 
            onClick={() => onTabChange?.('skills')}
          />
          <QuickAction 
            icon="fa-hands-holding-heart" 
            color="bg-emerald-100 text-emerald-600" 
            label="मदद" 
            labelEn="Help"
            uiMode={uiMode}
            onClick={() => onTabChange?.('wellbeing')}
          />
        </div>
      </section>

      {/* Mandi Prices - Responsive */}
      {mandiPrices.length > 0 && (
        <section className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-xs md:text-sm mb-2 md:mb-3 flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-green-600"></i>
            <span className="hidden sm:inline">Today's Mandi Rates / </span>आज का मंडी भाव
          </h3>
          <div className="grid grid-cols-3 gap-1.5 md:gap-2">
            {mandiPrices.slice(0, 3).map(item => (
              <div key={item.crop} className="text-center p-1.5 md:p-2 bg-slate-50 rounded-lg md:rounded-xl">
                <span className="text-[10px] md:text-xs font-bold block">{item.crop}</span>
                <span className="text-sm md:text-lg font-bold">₹{item.price}</span>
                <span className={`text-[9px] md:text-[10px] ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Job Card Status - Responsive */}
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-gradient-to-r from-orange-50 to-yellow-50'}`}>
        <div className="w-10 h-10 md:w-14 md:h-14 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg md:text-xl flex-shrink-0">
          <i className="fa-solid fa-id-card"></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm md:text-base truncate">Job Card / जॉब कार्ड</h4>
          <p className="text-[10px] md:text-xs opacity-70 truncate">
            {user.jobCard 
              ? `✅ Active: ${user.jobCard}` 
              : '⚠️ Not linked / अभी लिंक नहीं है'
            }
          </p>
        </div>
        {!user.jobCard && (
          <button className="text-[10px] md:text-xs bg-orange-500 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-full font-bold whitespace-nowrap flex-shrink-0 touch-manipulation active:bg-orange-600">
            Link Now
          </button>
        )}
      </div>

      {/* Featured Scheme Card - Responsive */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-video shadow-lg bg-slate-900">
        <img src="https://picsum.photos/seed/rural-india-2/800/450" className="w-full h-full object-cover opacity-60" alt="Feature" />
        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
          <span className="bg-yellow-400 text-black px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold w-fit mb-1 md:mb-2">NEW SCHEME / नई योजना</span>
          <h4 className="text-base md:text-xl font-bold leading-tight">PM Awas Yojana Update</h4>
          <p className="text-xs md:text-sm opacity-80 hidden sm:block">Check your housing status via SATHI / साथी से अपना स्टेटस जानें</p>
        </div>
      </div>

      {/* Quick Voice Actions - Responsive */}
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-center ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-purple-50'}`}>
        <p className="text-xs md:text-sm font-bold text-purple-900 mb-1.5 md:mb-2">Just say / बस बोलें:</p>
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
          <span className="bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs text-purple-700 border border-purple-200">"मेरा पेमेंट कब?"</span>
          <span className="bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs text-purple-700 border border-purple-200">"नजदीकी काम"</span>
          <span className="bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs text-purple-700 border border-purple-200">"योजना जानकारी"</span>
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{
  icon: string; 
  color: string; 
  label: string; 
  labelEn: string;
  uiMode: UIMode;
  onClick?: () => void;
}> = ({icon, color, label, labelEn, uiMode, onClick}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all active:scale-95 touch-manipulation ${uiMode === UIMode.HIGH_CONTRAST ? 'border-2 border-yellow-400' : 'bg-white shadow-sm hover:shadow-md'}`}
  >
    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl ${uiMode === UIMode.HIGH_CONTRAST ? 'text-white' : color}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    {uiMode !== UIMode.PICTURE && (
      <div className="text-center">
        <span className="text-[10px] md:text-xs font-bold block">{label}</span>
        <span className="text-[8px] md:text-[10px] opacity-50 hidden sm:block">{labelEn}</span>
      </div>
    )}
  </button>
);

export default HomeModule;
