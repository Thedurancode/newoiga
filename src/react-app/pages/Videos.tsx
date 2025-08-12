import React from 'react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';

const videoData = [
  {
    id: '1',
    title: 'Event Highlights 2023',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Best moments from our 2023 events'
  },
  {
    id: '2', 
    title: 'Venue Tour',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'A look inside our main venue'
  },
  {
    id: '3',
    title: 'Artist Interview',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Exclusive interview with featured artist'
  }
];

const Videos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col">
      <Navigation />
      
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-2">
            Video Gallery
          </h1>
          <p className="text-gray-400">Watch highlights from our events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoData.map((video) => (
            <div key={video.id} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;
