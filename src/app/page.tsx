"use client";

import TitleBar from "@/components/TitleBar";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [appVersion, setAppVersion] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.electronAPI) {
      window.electronAPI.getAppVersion().then(setAppVersion);
    }
  }, []);

  const testApiRoute = async () => {
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setApiResponse(data.message);
    } catch (error) {
      setApiResponse("Error calling API");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Gold Top Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="w-full h-px bg-[#C79b3b]"></div>
        <div className="w-full h-full">
          {/* Custom Title Bar */}
          <TitleBar />
          
          {/* Main Content */}
          <div className="p-8 pt-4">
            <main className="flex flex-col gap-8 items-center">
              <div className="text-center">
                <img
                  className="mx-auto mb-4"
                  src="/lol-icon.png"
                  alt="League of Legends logo"
                  width={120}
                  height={120}
                />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                  League of Legends
                </h1>
                <p className="text-gray-400">The Rift Awaits</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold text-white mb-4 text-center">System Info</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-yellow-400">{appVersion || "Development"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">Connected</span>
                  </div>
                </div>
                
                <button 
                  onClick={testApiRoute}
                  className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-2 px-4 rounded transition-all duration-200 transform hover:scale-105"
                >
                  Test API Connection
                </button>
                
                {apiResponse && (
                  <div className="mt-3 p-3 bg-green-900/20 border border-green-500/30 rounded text-center">
                    <p className="text-green-400 text-sm">{apiResponse}</p>
                  </div>
                )}
              </div>

              {/* LoL-style decorative elements */}
              <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
                <div className="w-full h-full border-2 border-yellow-500 rotate-45 transform"></div>
              </div>
              <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10">
                <div className="w-full h-full border-2 border-blue-400 rotate-12 transform"></div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
