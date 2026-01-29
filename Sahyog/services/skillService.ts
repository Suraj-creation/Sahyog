
import { SkillCourse, SkillModule, SkillVideo } from '../types';

// Skill Development from unified.md Module 6
// "सीखो, बढ़ो, कमाओ" / "Learn, Grow, Earn"
export class SkillAcademyService {
  private courses: SkillCourse[] = [];
  private userProgress: Map<string, { courseId: string; completedVideos: string[] }> = new Map();

  constructor() {
    this.loadCourses();
  }

  private loadCourses() {
    this.courses = [
      {
        id: 'masonry-101',
        title: 'Masonry (Bricklaying)',
        titleHindi: 'राजमिस्त्री (ईंट का काम)',
        category: 'construction',
        level: 'beginner',
        durationMinutes: 300, // 5 hours
        totalVideos: 60,
        earnPotential: '₹400-600/day',
        earnPotentialMin: 400,
        earnPotentialMax: 600,
        linkedJobs: 23,
        thumbnail: 'https://picsum.photos/seed/masonry/400/300',
        language: 'hi-IN',
        availableLanguages: ['hi-IN', 'bn-IN', 'te-IN', 'ta-IN', 'kn-IN', 'mr-IN', 'gu-IN', 'or-IN', 'pa-IN'],
        completionPercentage: 0,
        earnedBadges: [],
        nextBadge: 'औजार विशेषज्ञ',
        videosToNextBadge: 5,
        modules: [
          {
            id: 'masonry-m1',
            title: 'Tool Identification',
            titleHindi: 'औजारों की पहचान',
            badge: '🏅 औजार विशेषज्ञ',
            isCompleted: false,
            videos: [
              { id: 'v1', title: 'Trowel and Hammer', titleHindi: 'कड़ी और हथौड़ा', durationSeconds: 240, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Types of trowels', 'Proper grip', 'Safety'] },
              { id: 'v2', title: 'Mortar Pan and Chisel', titleHindi: 'तसला और टाँगली', durationSeconds: 180, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Mixing mortar', 'Chisel usage'] },
              { id: 'v3', title: 'Level and Plumb', titleHindi: 'लेवल और प्लंब', durationSeconds: 300, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Checking alignment', 'Accuracy'] },
              { id: 'v4', title: 'Practice Exercise', titleHindi: 'अभ्यास', durationSeconds: 180, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Hands-on practice'] },
              { id: 'v5', title: 'Quiz', titleHindi: 'प्रश्नोत्तरी', durationSeconds: 120, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Voice-based quiz'] }
            ]
          },
          {
            id: 'masonry-m2',
            title: 'Brick Laying Basics',
            titleHindi: 'ईंट बिछाने की मूल बातें',
            badge: '🏅 ईंट विशेषज्ञ',
            isCompleted: false,
            videos: [
              { id: 'v6', title: 'Preparing Mortar', titleHindi: 'मसाला बनाना', durationSeconds: 360, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Cement-sand ratio', 'Consistency'] },
              { id: 'v7', title: 'First Layer', titleHindi: 'पहली परत', durationSeconds: 300, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Foundation layer', 'Spacing'] },
              { id: 'v8', title: 'Building Up', titleHindi: 'ऊपर बढ़ना', durationSeconds: 420, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Pattern', 'Alignment'] }
            ]
          },
          {
            id: 'masonry-m3',
            title: 'Advanced Techniques',
            titleHindi: 'उन्नत तकनीक',
            badge: '🏅 मास्टर मेसन',
            isCompleted: false,
            videos: [
              { id: 'v9', title: 'Corners and Joints', titleHindi: 'कोने और जोड़', durationSeconds: 480, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Corner building', 'Joint types'] },
              { id: 'v10', title: 'Wall Finishing', titleHindi: 'दीवार फिनिशिंग', durationSeconds: 420, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Plastering basics'] }
            ]
          }
        ]
      },
      {
        id: 'agriculture-101',
        title: 'Modern Farming Techniques',
        titleHindi: 'आधुनिक खेती तकनीक',
        category: 'agriculture',
        level: 'beginner',
        durationMinutes: 180,
        totalVideos: 30,
        earnPotential: '₹300-400/day',
        earnPotentialMin: 300,
        earnPotentialMax: 400,
        linkedJobs: 45,
        thumbnail: 'https://picsum.photos/seed/farming/400/300',
        language: 'hi-IN',
        availableLanguages: ['hi-IN', 'bn-IN', 'te-IN', 'ta-IN'],
        completionPercentage: 0,
        earnedBadges: [],
        nextBadge: 'मिट्टी विशेषज्ञ',
        videosToNextBadge: 5,
        modules: [
          {
            id: 'agri-m1',
            title: 'Soil Management',
            titleHindi: 'मिट्टी प्रबंधन',
            badge: '🏅 मिट्टी विशेषज्ञ',
            isCompleted: false,
            videos: [
              { id: 'a1', title: 'Soil Types', titleHindi: 'मिट्टी के प्रकार', durationSeconds: 300, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Clay', 'Sandy', 'Loam'] },
              { id: 'a2', title: 'Soil Testing', titleHindi: 'मिट्टी परीक्षण', durationSeconds: 240, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['pH testing', 'Nutrients'] }
            ]
          }
        ]
      },
      {
        id: 'digital-banking',
        title: 'Digital Banking Basics',
        titleHindi: 'डिजिटल बैंकिंग की मूल बातें',
        category: 'digital',
        level: 'beginner',
        durationMinutes: 60,
        totalVideos: 12,
        earnPotential: 'Financial Security',
        earnPotentialMin: 0,
        earnPotentialMax: 0,
        linkedJobs: 0,
        thumbnail: 'https://picsum.photos/seed/banking/400/300',
        language: 'hi-IN',
        availableLanguages: ['hi-IN', 'en-IN'],
        completionPercentage: 0,
        earnedBadges: [],
        nextBadge: 'डिजिटल सक्षम',
        videosToNextBadge: 4,
        modules: [
          {
            id: 'bank-m1',
            title: 'UPI Payments',
            titleHindi: 'UPI पेमेंट',
            badge: '🏅 डिजिटल सक्षम',
            isCompleted: false,
            videos: [
              { id: 'b1', title: 'What is UPI', titleHindi: 'UPI क्या है', durationSeconds: 180, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['UPI basics'] },
              { id: 'b2', title: 'Making Payments', titleHindi: 'पेमेंट करना', durationSeconds: 240, thumbnailUrl: '', videoUrl: '', isWatched: false, isDownloaded: false, keyPoints: ['Step by step'] }
            ]
          }
        ]
      }
    ];
  }

  // Get all courses
  getAllCourses(): SkillCourse[] {
    return this.courses;
  }

  // Get course by ID
  getCourse(courseId: string): SkillCourse | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  // Get recommended courses based on user profile
  getRecommendedCourses(userProfile: { daysWorked: number; category?: string }): SkillCourse[] {
    // Simple recommendation logic - can be enhanced
    return this.courses.filter(c => {
      if (userProfile.daysWorked > 30 && c.level === 'beginner') return true;
      if (userProfile.daysWorked > 60 && c.level === 'intermediate') return true;
      return c.category === 'construction' || c.category === 'agriculture';
    }).slice(0, 3);
  }

  // Mark video as watched
  markVideoWatched(courseId: string, videoId: string) {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return;

    course.modules.forEach(module => {
      const video = module.videos.find(v => v.id === videoId);
      if (video) {
        video.isWatched = true;
        
        // Recalculate completion percentage
        const totalVideos = course.modules.reduce((sum, m) => sum + m.videos.length, 0);
        const watchedVideos = course.modules.reduce((sum, m) => 
          sum + m.videos.filter(v => v.isWatched).length, 0
        );
        course.completionPercentage = Math.round((watchedVideos / totalVideos) * 100);

        // Check if module completed
        const allWatched = module.videos.every(v => v.isWatched);
        if (allWatched && !module.isCompleted) {
          module.isCompleted = true;
          course.earnedBadges.push(module.badge);
        }

        // Update next badge info
        const nextModule = course.modules.find(m => !m.isCompleted);
        if (nextModule) {
          course.nextBadge = nextModule.badge;
          course.videosToNextBadge = nextModule.videos.filter(v => !v.isWatched).length;
        }
      }
    });
  }

  // Get linked jobs after course completion
  getLinkedJobs(courseId: string): { title: string; wage: string; location: string; contact?: string }[] {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return [];

    // Return mock linked jobs
    if (course.category === 'construction') {
      return [
        { title: 'PM आवास निर्माण', wage: '₹450/day', location: '3 km', contact: 'राम प्रसाद' },
        { title: 'स्कूल मरम्मत', wage: '₹400/day', location: '5 km', contact: 'शिक्षा विभाग' },
        { title: 'मंदिर निर्माण', wage: '₹500/day', location: '7 km', contact: 'मंदिर समिति' }
      ];
    }
    return [];
  }

  // Download video for offline access
  async downloadVideo(courseId: string, videoId: string): Promise<boolean> {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return false;

    for (const module of course.modules) {
      const video = module.videos.find(v => v.id === videoId);
      if (video) {
        // Simulate download
        video.isDownloaded = true;
        return true;
      }
    }
    return false;
  }
}

export const skillAcademyService = new SkillAcademyService();
