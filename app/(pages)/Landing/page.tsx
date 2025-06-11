"use client"; 
import Header from "@/app/components/Landing/Header"
import HowItWorksCard from "@/app/components/Landing/HowItWorksCard"
import HeroSection from "../../components/Landing/HeroSection"
import { FaRupeeSign, FaRegCreditCard, FaRegStar } from "react-icons/fa"
import { FaSearch, FaRobot, FaExchangeAlt, FaRegSmile } from "react-icons/fa"
import Link from "next/link";
import GitHubIcon from "@/app/utils/logos/github";
import { FaVideo } from "react-icons/fa6";



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
     
      {/* Centered Demo Video and GitHub buttons below header */}
{/*      
      <div className="flex justify-center items-center gap-6 mb-2 animate-fade-in z-10">
            <Link href="/">
            <div className="flex items-center border-2 gap-2 cursor-pointer border-gray-300 rounded-md px-2 text-black py-2 px-5">
              <FaVideo />
             <button className="cursor-pointer">Demo</button>
            </div>
            </Link>
            <Link href="https://github.com/dodaa08/-Inagiffy-assignment.git" target="_blank">
            <div className="flex items-center border-2 cursor-pointer border-gray-300 rounded-md px-2 py-1 text-black py-2 px-5">
              <GitHubIcon />
            <button className="cursor-pointer">Github</button>
            </div>
            </Link>
        </div> */}
        <div className="bg-gray-50 h-max py-5">
        <Header />
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

