import { FaRupeeSign, FaRegCreditCard, FaRegStar } from "react-icons/fa";
import React from "react";

const banks = [
  { name: "HDFC", color: "bg-blue-50 text-blue-700" },
  { name: "Axis", color: "bg-green-50 text-green-700" },
  { name: "ICICI", color: "bg-yellow-50 text-yellow-700" },
  { name: "SBI", color: "bg-purple-50 text-purple-700" },
  { name: "Bank of Maharashtra", color: "bg-pink-50 text-pink-700" },
  { name: "Kotak", color: "bg-red-50 text-red-700" },
  { name: "Yes Bank", color: "bg-indigo-50 text-indigo-700" },
  { name: "IndusInd", color: "bg-teal-50 text-teal-700" },
  { name: "+ many more", color: "bg-gray-100 text-gray-600" },
];

const HeroSection = () => (
  <section className="flex flex-col items-center justify-between py-40 min-h-screen px-6 md:px-16 animate-fade-in w-full -mt-16 ">
    <div className="flex flex-col  md:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto">
      {/* Left: Headline, Subheadline, CTA */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Credit card comparison<br />
          <span className="text-blue-600">reimagined</span> for India
        </h1>
        {/* Subheadline */}
        <p className="text-lg text-gray-600 mb-8">
          Find the best credit card offers, compare benefits, and get AI-powered recommendations. Discover cards with lounge access, cashback, travel perks, and more—tailored to your needs.
        </p>
        {/* CTA Buttons */}
        <div className="flex gap-4 mb-8">
          <a
            href="#get-started"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all text-base"
          >
            Get Started Free
          </a>
          <a
            href="#how-it-works"
            className="bg-white border border-gray-300 text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all text-base"
          >
            See How It Works
          </a>
        </div>
      </div>
      {/* Right: Card Comparison Illustration */}
      <div className="flex-1 flex items-center justify-center relative min-w-[340px]">
        <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[340px] animate-fade-in-up">
          {/* Card 1 */}
          <div className="flex items-center gap-3 mb-4">
            <FaRegCreditCard className="text-blue-500 text-2xl" />
            <span className="font-bold text-gray-800">Axis Magnus</span>
            <span className="ml-auto bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Cashback</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Lounge Access, 2% Cashback, ₹10,000 Limit</div>
          {/* Card 2 */}
          <div className="flex items-center gap-3 mb-4">
            <FaRegCreditCard className="text-yellow-500 text-2xl" />
            <span className="font-bold text-gray-800">HDFC Regalia</span>
            <span className="ml-auto bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">Travel</span>
          </div>
          <div className="text-sm text-gray-600">Airport Lounge, 1.5% Rewards, ₹8,000 Limit</div>
          {/* Floating icons */}
          <FaRupeeSign className="absolute -top-4 -left-4 text-green-400 text-3xl animate-float" />
          <FaRegStar className="absolute -bottom-4 -right-4 text-yellow-400 text-3xl animate-float-delay" />
        </div>
      </div>
    </div>
    {/* Banks Row just below hero content */}
    <div className="flex flex-wrap  gap-3  animate-fade-in w-full max-w-4xl">
      {banks.map((bank) => (
        <span key={bank.name} className={`${bank.color} px-4 py-2 rounded-full text-sm font-medium`}>
          {bank.name}
        </span>
      ))}
    </div>
  </section>
);

export default HeroSection; 