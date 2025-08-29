"use client";

import TitleBar from "@/components/TitleBar";
import React from "react";

export default function Home() {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex"
      style={{
        backgroundImage: "url('/npe-ft-league-button-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mask overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/mask.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
          opacity: 0.7,
        }}
      ></div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Golden border across full width */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#C79b3b] z-20"></div>

      {/* Main content area */}
      <div className="flex-1 relative z-10">
        <div className="w-full h-full">
          {/* Custom Title Bar */}
          <TitleBar />

          {/* Main Content */}
          <div className="p-8 pt-4">
            <main></main>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Full height, fixed to right edge */}
      <div
        className="w-[250px] h-screen relative z-10"
        style={{ backgroundColor: "#010A13" }}
      >
        {/* Window Controls - Positioned at very top-right of window */}
        <div
          className="absolute top-0 right-0 flex z-50"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        >
          <button
            onClick={() => window.electronAPI?.windowMinimize()}
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
            onClick={() => window.electronAPI?.windowMaximize()}
            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
          >
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
          </button>

          <button
            onClick={() => window.electronAPI?.windowClose()}
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
    </div>
  );
}
