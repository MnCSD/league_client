"use client";

import TitleBar from "@/components/TitleBar";

export default function Home() {

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundImage: "url('/npe-ft-league-button-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      {/* Mask overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "url('/mask.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        mixBlendMode: "multiply",
        opacity: 0.7
      }}></div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40">
        <div className="w-full h-px bg-[#C79b3b]"></div>
        <div className="w-full h-full">
          {/* Custom Title Bar */}
          <TitleBar />
          
          {/* Main Content */}
          <div className="p-8 pt-4">
            <main>
              
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
