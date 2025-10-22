import { useState } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  icon: string;
}

export default function YouTubeVideo({ videoId, title, icon }: YouTubeVideoProps) {
  const [imageError, setImageError] = useState(false);
  const thumbnailUrl = imageError 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="glass-card video-card rounded-2xl p-6 fade-in-up">
      <div className="text-5xl text-center mb-4">{icon}</div>
      <a 
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block youtube-embed mb-4 relative group"
      >
        <img 
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          onError={() => setImageError(true)}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all rounded-xl">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </a>
      <h3 className="text-xl font-semibold text-center text-white">
        {title}
      </h3>
    </div>
  );
}

