
import { GeoLocation, JobOpportunity, Scheme, Alert } from '../types';

// Geo-Personalization Engine from unified.md Module 1
export class GeoPersonalizationEngine {
  private currentLocation: GeoLocation | null = null;

  // Detect location using multiple methods as per unified.md
  async detectLocation(): Promise<GeoLocation> {
    // Method 1: GPS (Smartphone)
    if ('geolocation' in navigator) {
      try {
        const position = await this.getGPSPosition();
        return this.reverseGeocode(position.coords.latitude, position.coords.longitude);
      } catch (error) {
        console.log('GPS failed, falling back to default location');
      }
    }
    
    // Fallback: Return default location (can be enhanced with cell tower, IVR, etc.)
    return this.getDefaultLocation();
  }

  private getGPSPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      });
    });
  }

  private async reverseGeocode(lat: number, lng: number): Promise<GeoLocation> {
    // In production, this would call a geocoding API
    // For demo, return mock data based on coordinates
    return {
      latitude: lat,
      longitude: lng,
      village: 'रामपुर (Rampur)',
      gramPanchayat: 'Rampur Gram Panchayat',
      block: 'Sadar',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001'
    };
  }

  private getDefaultLocation(): GeoLocation {
    return {
      latitude: 25.3176,
      longitude: 82.9739,
      village: 'रामपुर (Rampur)',
      gramPanchayat: 'Rampur Gram Panchayat', 
      block: 'Sadar',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001'
    };
  }

  setLocation(location: GeoLocation) {
    this.currentLocation = location;
  }

  getLocation(): GeoLocation | null {
    return this.currentLocation;
  }

  // Filter jobs within specified radius (default 5km as per unified.md)
  filterJobsByDistance(jobs: JobOpportunity[], maxDistanceKm: number = 5): JobOpportunity[] {
    return jobs
      .filter(job => job.distanceKm <= maxDistanceKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // Filter schemes applicable to location (state + central + local)
  filterSchemesByLocation(schemes: Scheme[], state: string): Scheme[] {
    // In production, this would filter based on state-specific schemes
    return schemes.filter(scheme => scheme.matchScore > 50);
  }

  // Get local contacts based on location
  getLocalContacts() {
    const location = this.currentLocation || this.getDefaultLocation();
    return {
      sarpanch: {
        name: 'श्री रामचंद्र यादव',
        phone: '+91 9876543210',
        role: 'Sarpanch'
      },
      rozgarSevak: {
        name: 'श्रीमती सुनीता देवी',
        phone: '+91 9876543211',
        role: 'Rozgar Sevak'
      },
      bdo: {
        name: 'श्री अजय कुमार सिंह',
        phone: '+91 9876543212',
        role: 'Block Development Officer'
      },
      helpline: '1800-XXX-XXXX'
    };
  }

  // Get weather alerts for local area
  getWeatherAlerts(): Alert[] {
    return [
      {
        id: 'weather-1',
        type: 'weather',
        title: 'बारिश की संभावना',
        titleHindi: 'बारिश की संभावना',
        message: 'Tomorrow rain expected. Plan farm work accordingly.',
        messageHindi: 'कल बारिश की संभावना है। खेती का काम तदनुसार करें।',
        date: new Date().toISOString(),
        isRead: false,
        priority: 'medium'
      }
    ];
  }

  // Get local mandi prices
  getMandiPrices() {
    return [
      { crop: 'गेहूं (Wheat)', price: 2200, unit: 'per quintal', trend: 'up' },
      { crop: 'धान (Rice)', price: 2100, unit: 'per quintal', trend: 'stable' },
      { crop: 'सरसों (Mustard)', price: 5500, unit: 'per quintal', trend: 'down' }
    ];
  }
}

export const geoService = new GeoPersonalizationEngine();
