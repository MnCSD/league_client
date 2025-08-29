"use client";

import { useState, useEffect, useRef } from "react";

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [playButtonState, setPlayButtonState] = useState<
    "default" | "hover" | "active"
  >("default");
  const playVideoRef = useRef<HTMLVideoElement>(null);

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

  const handlePlayMouseEnter = () => {
    setPlayButtonState("hover");
  };

  const handlePlayMouseLeave = () => {
    setPlayButtonState("default");
  };

  const handlePlayMouseDown = () => {
    setPlayButtonState("active");
  };

  const handlePlayMouseUp = () => {
    setPlayButtonState("hover");
  };

  const handlePlayClick = () => {
    // Handle play button click logic here
  };

  const getPlayVideoSrc = () => {
    switch (playButtonState) {
      case "hover":
        return "/play-button-hover-intro.webm";
      case "active":
        return "/play-button-release.webm";
      default:
        return "/play-button-enabled-intro.webm";
    }
  };

  return (
    <div
      className="flex justify-between items-center h-20 bg-transparent relative z-50"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <div className="flex items-center pl-6">
        <video
          src="/league-logo-loop-active.webm"
          autoPlay
          loop
          muted
          className="w-14 h-14 -mt-0.5"
        />
        <button
          className="relative -ml-7.5 flex items-center justify-center w-36 h-20"
          style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
          onMouseEnter={handlePlayMouseEnter}
          onMouseLeave={handlePlayMouseLeave}
          onMouseDown={handlePlayMouseDown}
          onMouseUp={handlePlayMouseUp}
          onClick={handlePlayClick}
        >
          <video
            key={playButtonState}
            ref={playVideoRef}
            src={getPlayVideoSrc()}
            autoPlay
            muted
            className="w-36 h-20 object-contain absolute inset-0 pointer-events-none"
          />
          <span
            className="relative z-10 text-white font-semibold text-[14px] drop-shadow-lg mt-0.5 tracking-widest select-none"
            style={{ fontFamily: "BeaufortforLOL, sans-serif" }}
          >
            PLAY
          </span>
        </button>
      </div>

      <div
        className="flex"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <button
          onClick={handleMinimize}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          onClick={handleMaximize}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          {isMaximized ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 3.5h7v7h-7v-7z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M5.5 5.5V2h7v7h-1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="2"
                y="2"
                width="10"
                height="10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>

        <button
          onClick={handleClose}
          className="w-12 h-12 flex items-center justify-center text-gray-400 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 3.5l7 7M10.5 3.5l-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
