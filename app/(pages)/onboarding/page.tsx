"use client";
import { useState } from "react";
import AnimatedBot from "@/app/components/onboarding/AnimatedBot";
import ChatInput from "@/app/components/onboarding/ChatInput";
import Sidebar from "@/app/components/onboarding/Sidebar";
import LoadingOverlay from "@/app/components/onboarding/LoadingOverlay";

const suggestions = [
  "Best credit cards for fuel cashback",
  "Which cards give free lounge access?",
  "Compare Axis Magnus vs HDFC Regalia",
  "No annual fee cards for students"
];

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [blur, setBlur] = useState(false);

  // Simulate loading for demo
  const handleSubmit = async (msg: string) => {
    setInput(msg);
    setLoading(true);
    setBlur(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1800));
    setLoading(false);
    setBlur(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black  w-full flex flex-col font-sans relative" style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
      {/* Sidebar (desktop/right, mobile: drawer) */}
      <Sidebar />
      {/* Main content */}
      <div className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${blur ? 'filter blur-sm pointer-events-none select-none' : ''}`} style={{ minHeight: '80vh' }}>
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-xl mx-auto pt-20 pb-8">
          <AnimatedBot />
          {/* Suggestions */}
          <div className="w-full flex flex-col items-center gap-2 mt-6">
            <div className="text-gray-500 text-sm mb-1">Suggestions:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map(s => (
                <button
                  key={s}
                  className="px-4 py-2 rounded-full bg-white shadow text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition text-sm font-medium border border-gray-100"
                  onClick={() => handleSubmit(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Chat input at bottom */}
      <div className="fixed bottom-0 left-0 w-full z-30 bg-gradient-to-t from-gray-100 via-gray-50/80 to-transparent pb-6 pt-2">
        <ChatInput onSubmit={handleSubmit} loading={loading} />
      </div>
      {/* Loading overlay */}
      {loading && <LoadingOverlay />}
    </div>
  );
}


