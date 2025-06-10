"use client"; 

import Header from "@/app/components/Landing/Header"
import HowItWorksCard from "@/app/components/Landing/HowItWorksCard"
import HeroSection from "../../components/Landing/HeroSection"
import { FaRupeeSign, FaRegCreditCard, FaRegStar } from "react-icons/fa"
import { FaSearch, FaRobot, FaExchangeAlt, FaRegSmile } from "react-icons/fa"

const GitHubIcon = () => (
  <svg className="inline-block mr-2 -mt-1" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
);

export default function LandingPage() {
  const howItWorksData = [
    {
      icon: <FaSearch />,
      title: "Explore Cards",
      description: "Browse and search 100+ credit cards from all major Indian banks, with up-to-date offers and features.",
      color: "#2563eb",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Compare Instantly",
      description: "Select cards to compare side-by-side on rewards, fees, lounge access, and more.",
      color: "#f59e42",
    },
    {
      icon: <FaRobot />,
      title: "Ask AI Anything",
      description: "Use our GenAI chat to ask for the best cards for your needs, or get summaries in plain English.",
      color: "#10b981",
    },
    {
      icon: <FaRegSmile />,
      title: "Apply Easily",
      description: "Get direct links to apply, or save your favorite cards for later. Enjoy a seamless experience!",
      color: "#a21caf",
    },
  ];

  return (
    <div className=" bg-gray-50 min-h-screen w-full flex flex-col">
      <div className="z-50 h-10">
        <Header />
      </div>
      {/* Centered Demo Video and GitHub buttons below header */}
      <div className="flex justify-center items-center gap-6 mt-20 mb-2 animate-fade-in">
        <a
          href="#demo-video"
          className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          🎬 Demo Video
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-lg shadow-lg hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center"
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
      
      <HeroSection />
      {/* Banks Row */}
     
      {/* How it works Section */}
      <section id="how-it-works" className="w-full py-20 bg-white rounded-t-3xl shadow-xl flex flex-col items-center border-t border-blue-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center animate-fade-in-up">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-4 animate-fade-in-up">
          {howItWorksData.map((card, idx) => (
            <HowItWorksCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              color={card.color}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

