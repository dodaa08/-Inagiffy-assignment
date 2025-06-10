import React from "react";

interface HowItWorksCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ icon, title, description, color }) => {
  return (
    <div
      className={`backdrop-blur-md bg-white/70 border border-gray-100 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 min-w-[220px] max-w-xs animate-fade-in-up`}
      style={{ boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.10)`, borderColor: color || '#e0e7ff' }}
    >
      <div className="text-4xl mb-4" style={{ color: color || '#2563eb' }}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

export default HowItWorksCard; 