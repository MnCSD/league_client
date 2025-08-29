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

        {/* Navigation Links */}
        <div className="flex items-center ml-8 gap-6">
          <a
            href="#"
            className="font-semibold text-sm hover:text-yellow-400 transition-colors"
            style={
              {
                fontFamily: "BeaufortforLOL, sans-serif",
                color: "#CDBF91",
                WebkitAppRegion: "no-drag",
              } as React.CSSProperties
            }
          >
            HOME
          </a>
          <a
            href="#"
            className="font-semibold text-sm hover:text-yellow-400 transition-colors"
            style={
              {
                fontFamily: "BeaufortforLOL, sans-serif",
                WebkitAppRegion: "no-drag",
                color: "#CDBF91",
              } as React.CSSProperties
            }
          >
            PROFILE
          </a>
          <a
            href="#"
            className="font-semibold text-sm hover:text-yellow-400 transition-colors"
            style={
              {
                fontFamily: "BeaufortforLOL, sans-serif",
                WebkitAppRegion: "no-drag",
                color: "#CDBF91",
              } as React.CSSProperties
            }
          >
            COLLECTION
          </a>
        </div>
      </div>

      {/* Right Side - Icons */}
      <div
        className="flex items-center gap-6 pr-6"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        {/* Navigation Icons */}
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <img src="/nav-icon-profile.svg" alt="Profile" className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <img
            src="/nav-icon-collections.svg"
            alt="Collections"
            className="w-6 h-6"
          />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <img src="/nav-icon-loot.svg" alt="Loot" className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <img src="/nav-icon-store.svg" alt="Store" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
