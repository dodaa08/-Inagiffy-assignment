"use client";

export default function AnimatedBot() {
  return (
    <div className="flex items-center justify-center h-full animate-bounce-slow">
      <video
        src="https://cdnl.iconscout.com/lottie/premium/thumb/robot-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--bot-talk-chatting-technology-processing-information-and-data-pack-business-icons-6080730.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 object-contain rounded-full shadow-lg bg-white"
      />
    </div>
  );
} 