import { FaRegCreditCard } from "react-icons/fa";

interface CreditCardResultProps {
  card: any;
  responseText?: string;
}

// List of common bank/issuer names for extraction
const BANK_NAMES = [
  "Axis", "HDFC", "ICICI", "SBI", "Standard Chartered", "Kotak", "IndusInd", "Yes Bank", "HSBC", "RBL", "AU", "IDFC", "Bank of Baroda", "American Express", "Citi", "Federal", "PNB", "Canara", "Union Bank", "IDBI", "DBS", "Bank of India"
];

function extractBankName(text?: string): string | null {
  if (!text) return null;
  const regex = new RegExp(BANK_NAMES.join("|"), "i");
  const match = text.match(regex);
  return match ? match[0] : null;
}

export default function CreditCardResult({ card, responseText }: CreditCardResultProps) {
  let bankName = card?.issuer;
  if (!bankName) {
    bankName = extractBankName(responseText) || "Bank Name";
  }
  const website = card?.website || card?.source || null;
  const mainText = responseText || card?.name || "No result found.";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-[340px] h-[210px] rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between mb-6 border border-blue-100">
        {/* Top Blue Half */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 h-1/2 w-full px-6 pt-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg tracking-wide text-white">{bankName}</span>
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
          <div className="w-full text-center text-gray-800 text-base font-semibold leading-relaxed mt-2 flex-1 flex items-center justify-center">
            {mainText}
          </div>
          {/* Website Button */}
          <a
            href={website || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute right-6 bottom-4 px-4 py-1.5 rounded-full font-semibold shadow transition-all text-xs ${website ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'}`}
            tabIndex={website ? 0 : -1}
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
} 