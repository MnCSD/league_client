"use client";

import { useState, useEffect } from "react";

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.windowIsMaximized().then(setIsMaximized);
    }
  }, []);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.windowMinimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.windowMaximize().then(() => {
        window.electronAPI.windowIsMaximized().then(setIsMaximized);
      });
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.windowClose();
    }
  };

  return (
    <div className="flex justify-between items-center h-8 bg-transparent relative z-50" style={{WebkitAppRegion: 'drag'}}>
      <div className="flex items-center pl-4">
        <img 
          src="/lol-icon.png" 
          alt="League of Legends" 
          className="w-8 h-8"
        />
      </div>
      
      <div className="flex" style={{WebkitAppRegion: 'no-drag'}}>
        <button
          onClick={handleMinimize}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        
        <button
          onClick={handleMaximize}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          {isMaximized ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 3.5h7v7h-7v-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M5.5 5.5V2h7v7h-1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          )}
        </button>
        
        <button
          onClick={handleClose}
          className="w-12 h-12 flex items-center justify-center text-gray-400 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}