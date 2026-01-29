
import React, { useState, useEffect } from 'react';
import { UIMode, SkillCourse } from '../../types';
import { skillAcademyService } from '../../services/skillService';

interface Props {
  uiMode: UIMode;
}

// Skill Development from unified.md Module 6
// "सीखो, बढ़ो, कमाओ" / "Learn, Grow, Earn"
const SkillsModule: React.FC<Props> = ({ uiMode }) => {
  const [courses, setCourses] = useState<SkillCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<SkillCourse | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isHighContrast = uiMode === UIMode.HIGH_CONTRAST;
  const isPictureMode = uiMode === UIMode.PICTURE;

  useEffect(() => {
    setCourses(skillAcademyService.getAllCourses());
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  // Video Player View
  if (selectedVideoId && selectedCourse) {
    const currentModule = selectedCourse.modules.find(m => 
      m.videos.some(v => v.id === selectedVideoId)
    );
    const currentVideo = currentModule?.videos.find(v => v.id === selectedVideoId);
    const videoIndex = currentModule?.videos.findIndex(v => v.id === selectedVideoId) || 0;

    if (!currentVideo) return null;

    return (
      <div className="p-6 space-y-4">
        <button 
          onClick={() => setSelectedVideoId(null)}
          className="flex items-center gap-2 text-blue-600 font-bold"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        {/* Video Player */}
        <div className={`aspect-video rounded-2xl overflow-hidden relative ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-slate-900'}`}>
          <img 
            src={`https://picsum.photos/seed/${selectedVideoId}/800/450`} 
            className="w-full h-full object-cover"
            alt={currentVideo.title}
          />
          
          {/* Play/Pause Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isPlaying ? 'bg-white/20' : 'bg-white/90'}`}>
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-3xl ${isPlaying ? 'text-white' : 'text-slate-800'} pl-1`}></i>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/3"></div>
            </div>
            <div className="flex justify-between text-white text-xs mt-1">
              <span>1:24</span>
              <span>{formatDuration(currentVideo.durationSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="flex justify-around">
          <button className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100">
            <i className="fa-solid fa-globe text-xl"></i>
            <span className="text-xs">Language</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100">
            <i className="fa-solid fa-gauge text-xl"></i>
            <span className="text-xs">Speed</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100">
            <i className="fa-solid fa-download text-xl"></i>
            <span className="text-xs">Download</span>
          </button>
          <button className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100">
            <i className="fa-solid fa-microphone text-xl"></i>
            <span className="text-xs">Ask SATHI</span>
          </button>
        </div>

        {/* Video Info */}
        <div className={`p-4 rounded-2xl ${isHighContrast ? 'border border-yellow-400' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-lg">{currentVideo.titleHindi}</h3>
          <p className="text-sm opacity-60">{currentVideo.title}</p>
          
          <div className="mt-4">
            <p className="text-xs font-bold opacity-60 mb-2">इस वीडियो में / Key Points:</p>
            <ul className="space-y-1">
              {currentVideo.keyPoints.map((point, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button 
            disabled={videoIndex === 0}
            className={`flex-1 py-3 rounded-xl font-bold ${videoIndex === 0 ? 'opacity-30' : ''} ${isHighContrast ? 'border border-yellow-400' : 'bg-slate-100'}`}
          >
            <i className="fa-solid fa-chevron-left mr-2"></i>Previous
          </button>
          <button 
            onClick={() => {
              skillAcademyService.markVideoWatched(selectedCourse.id, selectedVideoId);
              const nextVideo = currentModule?.videos[videoIndex + 1];
              if (nextVideo) setSelectedVideoId(nextVideo.id);
              else setSelectedVideoId(null);
            }}
            className={`flex-1 py-3 rounded-xl font-bold ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-blue-600 text-white'}`}
          >
            Next<i className="fa-solid fa-chevron-right ml-2"></i>
          </button>
        </div>
      </div>
    );
  }

  // Course Detail View
  if (selectedCourse) {
    const linkedJobs = skillAcademyService.getLinkedJobs(selectedCourse.id);
    
    return (
      <div className="p-6 space-y-6">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-blue-600 font-bold"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        {/* Course Header */}
        <div className={`p-6 rounded-3xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              {selectedCourse.level.toUpperCase()}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              {Math.floor(selectedCourse.durationMinutes / 60)}h {selectedCourse.durationMinutes % 60}m
            </span>
          </div>
          <h2 className="text-2xl font-bold">{selectedCourse.titleHindi}</h2>
          <p className="opacity-80">{selectedCourse.title}</p>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{selectedCourse.completionPercentage}% Complete</span>
              <span>{selectedCourse.totalVideos} videos</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400" 
                style={{ width: `${selectedCourse.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Earning Potential */}
          <div className="mt-4 p-4 bg-white/10 rounded-xl">
            <p className="text-sm opacity-80">After completion, you can earn:</p>
            <p className="text-2xl font-bold">{selectedCourse.earnPotential}</p>
            <p className="text-sm opacity-60">{selectedCourse.linkedJobs} jobs available nearby</p>
          </div>
        </div>

        {/* Next Badge */}
        {selectedCourse.nextBadge && (
          <div className={`p-4 rounded-2xl flex items-center gap-4 ${isHighContrast ? 'border border-yellow-400' : 'bg-yellow-50'}`}>
            <div className="text-3xl">🏅</div>
            <div>
              <p className="text-sm font-bold">Next Badge: {selectedCourse.nextBadge}</p>
              <p className="text-xs opacity-60">{selectedCourse.videosToNextBadge} videos remaining</p>
            </div>
          </div>
        )}

        {/* Modules */}
        <div className="space-y-4">
          <h3 className="font-bold">Modules / पाठ्यक्रम</h3>
          {selectedCourse.modules.map((module, idx) => (
            <div key={module.id} className={`rounded-2xl overflow-hidden ${isHighContrast ? 'border border-yellow-400' : 'bg-white shadow-sm'}`}>
              <div className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${module.isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100'}`}>
                  {module.isCompleted ? <i className="fa-solid fa-check"></i> : idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{module.titleHindi}</h4>
                  <p className="text-xs opacity-60">{module.videos.length} videos • {module.badge}</p>
                </div>
              </div>
              
              {/* Videos */}
              <div className="border-t">
                {module.videos.map((video, vIdx) => (
                  <button 
                    key={video.id}
                    onClick={() => setSelectedVideoId(video.id)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-all border-b last:border-b-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${video.isWatched ? 'bg-green-100 text-green-600' : 'bg-slate-100'}`}>
                      {video.isWatched ? <i className="fa-solid fa-check"></i> : vIdx + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{video.titleHindi}</p>
                      <p className="text-xs opacity-60">{formatDuration(video.durationSeconds)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {video.isDownloaded && <i className="fa-solid fa-download text-green-500 text-sm"></i>}
                      <i className="fa-solid fa-play text-blue-600"></i>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Linked Jobs */}
        {linkedJobs.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold">Jobs After Completion / कोर्स के बाद नौकरी</h3>
            {linkedJobs.map((job, idx) => (
              <div key={idx} className={`p-4 rounded-2xl flex items-center gap-4 ${isHighContrast ? 'border border-yellow-400' : 'bg-green-50'}`}>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-briefcase text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{job.title}</h4>
                  <p className="text-sm text-green-700">{job.wage}</p>
                  <p className="text-xs opacity-60">📍 {job.location} • {job.contact}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Course List View
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Skill Academy / कौशल अकादमी</h2>
      
      {/* Hero Banner */}
      <div className={`p-6 rounded-3xl ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-gradient-to-br from-blue-600 to-purple-700 text-white'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">FREE / मुफ्त</span>
        </div>
        <h3 className="text-xl font-bold">सीखो, बढ़ो, कमाओ!</h3>
        <p className="text-sm opacity-80 mt-2">
          Skilled workers earn ₹150+ more per day. Learn new skills with bite-sized videos.
        </p>
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{courses.length}</div>
            <div className="text-xs opacity-60">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">22</div>
            <div className="text-xs opacity-60">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3-7</div>
            <div className="text-xs opacity-60">Min/Video</div>
          </div>
        </div>
      </div>

      {/* Language Note */}
      <div className={`p-4 rounded-2xl flex items-center gap-4 ${isHighContrast ? 'border border-yellow-400' : 'bg-slate-50'}`}>
        <i className="fa-solid fa-globe text-2xl text-blue-600"></i>
        <div>
          <p className="font-medium">All videos in your language</p>
          <p className="text-xs opacity-60">Hindi, Bhojpuri, Bengali, Tamil & 18 more</p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        <h3 className="font-bold">Recommended for You / आपके लिए</h3>
        {courses.map(course => (
          <button 
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all hover:shadow-md ${isHighContrast ? 'border-2 border-yellow-400' : 'bg-white shadow-sm'}`}
          >
            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={course.thumbnail} 
                className="w-full h-full object-cover"
                alt={course.title}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{course.titleHindi}</h4>
              <p className="text-xs opacity-60">{course.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${isHighContrast ? 'border border-yellow-400' : 'bg-green-100 text-green-700'}`}>
                  {course.earnPotential}
                </span>
                <span className="text-xs opacity-60">{course.totalVideos} videos</span>
              </div>
              {course.completionPercentage > 0 && (
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${course.completionPercentage}%` }}></div>
                </div>
              )}
            </div>
            <i className="fa-solid fa-chevron-right opacity-30"></i>
          </button>
        ))}
      </div>

      {/* Ask SATHI */}
      <div className={`p-4 rounded-2xl text-center ${isHighContrast ? 'border-2 border-dashed border-yellow-400' : 'border-2 border-dashed border-slate-200'}`}>
        <p className="text-sm opacity-60">
          <i className="fa-solid fa-microphone mr-2"></i>
          "साथी, मुझे राजमिस्त्री का कोर्स बताओ"
        </p>
      </div>
    </div>
  );
};

export default SkillsModule;
