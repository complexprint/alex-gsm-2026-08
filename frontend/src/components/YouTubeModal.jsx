import React from 'react';
import { X, ExternalLink } from 'lucide-react';

const YouTubeModal = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl mx-4 bg-slate-900 border-2 border-pink-500/30 rounded-2xl shadow-2xl shadow-pink-500/20 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <ExternalLink className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          
          <p className="text-gray-400">
            {title.includes('Deutsch') || title.includes('Klicken') 
              ? 'Klicken Sie auf die Schaltfläche unten, um das Video auf YouTube anzusehen' 
              : 'Click the button below to watch the video on YouTube'}
          </p>

          {/* Direct link for mobile compatibility */}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
          >
            <ExternalLink className="w-6 h-6" />
            <span>
              {title.includes('Deutsch') || title.includes('Klicken') 
                ? 'Video auf YouTube öffnen' 
                : 'Open Video on YouTube'}
            </span>
          </a>

          <p className="text-sm text-gray-500 break-all">
            {videoUrl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeModal;