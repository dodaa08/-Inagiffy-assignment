import { FaRegCreditCard } from "react-icons/fa";

interface CreditCardResultProps {
  card: any;
  responseText?: string;
}

export default function CreditCardResult({ card, responseText }: CreditCardResultProps) {
  // Masked card number for demo
  const maskedNumber = "1234 5678 9012 3456";
  const expiry = "01/25";
  const cardholder = "CARDHOLDER NAME";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Credit Card Visual 50/50 split */}
      <div className="relative w-[340px] h-[210px] rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between mb-6 border border-blue-100">
        {/* Top Blue Half */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 h-1/2 w-full px-6 pt-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg tracking-wide text-white">{card.issuer || "Bank Name"}</span>
            <span className="font-semibold text-base text-white opacity-80">Credit Card</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-7 bg-yellow-300 rounded-sm shadow-inner flex items-center justify-center">
              <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" rx="3" fill="#f7c948"/></svg>
            </div>
            <FaRegCreditCard className="text-2xl text-white opacity-60" />
          </div>
        </div>
        {/* Bottom White Half */}
        <div className="bg-white h-1/2 w-full px-6 pb-6 flex flex-col justify-center items-center relative">
          {/* Main Response or Card Details */}
          <div className="w-full text-center text-gray-800 text-base font-medium leading-relaxed mt-2">
            {responseText || card.name}
          </div>
          {/* Card Number, Expiry, Cardholder (optional, can be hidden for pure response) */}
          <div className="flex justify-between items-end w-full mt-4">
            <div className="flex flex-col text-xs">
              <span className="opacity-60">VALID THRU</span>
              <span className="tracking-wider font-semibold text-gray-700">{expiry}</span>
            </div>
            <div className="text-lg font-mono tracking-widest text-gray-700 select-none">{maskedNumber}</div>
            <div className="font-semibold tracking-wide text-sm text-gray-700">{cardholder}</div>
          </div>
        </div>
        {/* Card Name Overlay (optional) */}
        {/* <div className="absolute bottom-5 left-6 text-lg font-bold tracking-wide opacity-90 text-blue-700">{card.name}</div> */}
      </div>
    </div>
  );
} 