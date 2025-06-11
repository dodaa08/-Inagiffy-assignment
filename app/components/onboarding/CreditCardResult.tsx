import { FaRegCreditCard } from "react-icons/fa";
import { useMemo } from "react";

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

// Parse all JSON objects from the response
function tryParseAllJSON(text?: string): any[] {
  if (!text) return [];
  // Remove code block markers and language label if present
  const cleaned = text.replace(/```json|```/gi, '').trim();
  const matches = [...cleaned.matchAll(/\{[\s\S]*?\}/g)];
  return matches.map(m => {
    try { return JSON.parse(m[0]); } catch { return null; }
  }).filter(Boolean);
}

export default function CreditCardResult({ card, responseText }: CreditCardResultProps) {
  const parsedList = useMemo(() => tryParseAllJSON(responseText), [responseText]);
  const mainText = responseText || card?.name || "No result found.";

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('CreditCardResult debug:');
    console.log('Raw responseText:', responseText);
    console.log('Parsed JSON list:', parsedList);
  }

  // Render a single card
  function renderCard(parsed: any, idx: number) {
    let bankName = parsed?.issuer || extractBankName(responseText) || "Bank Name";
    const website = parsed?.website || parsed?.source || card?.website || card?.source || null;
    return (
      <div key={idx} className="relative w-[480px] h-max py-5 rounded-3xl shadow-2xl shadow-blue-200 overflow-hidden flex flex-col justify-between mb-8 border border-blue-100 bg-white transition-all mx-auto">
        {/* Top Blue Half */}
        <div className="bg-blue-700 w-full h-max px-10 pt-10 flex flex-col justify-between py-5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-2xl tracking-wide text-white drop-shadow">{bankName}</span>
            <span className="font-semibold text-lg text-white opacity-80">Credit Card</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-14 h-9 bg-yellow-300 rounded-md shadow-inner flex items-center justify-center">
              <svg width="32" height="20" viewBox="0 0 24 16"><rect width="24" height="16" rx="3" fill="#f7c948"/></svg>
            </div>
            <FaRegCreditCard className="text-4xl text-white opacity-70" />
          </div>
        </div>
        {/* Bottom White Half */}
        <div className="bg-white h-[60%] w-full  px-10 pb-10 flex flex-col justify-center items-center relative">
          <div className="w-full flex flex-col gap-3 mt-0 py-5">
            {/* Card Name */}
            <div className="text-center text-xl font-extrabold text-blue-700 mb-2 whitespace-normal break-words">{parsed.name}</div>
            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base text-gray-700 w-full">
              {parsed.issuer && (<><span className="font-semibold">Issuer:</span><span className="break-words">{parsed.issuer}</span></>)}
              {parsed.joining_fee && (<><span className="font-semibold">Joining Fee:</span><span className="break-words">{parsed.joining_fee}</span></>)}
              {parsed.annual_fee && (<><span className="font-semibold">Annual Fee:</span><span className="break-words">{parsed.annual_fee}</span></>)}
              {parsed.reward_rate && (
                <>
                  <span className="font-semibold">Reward Rate:</span>
                  <span className="break-words">
                    {typeof parsed.reward_rate === 'string'
                      ? parsed.reward_rate
                      : Object.entries(parsed.reward_rate).map(([k, v]) => (
                          <div key={k}>{`${k}: ${v}`}</div>
                        ))}
                  </span>
                </>
              )}
              {parsed.welcome_voucher && (<><span className="font-semibold">Welcome Voucher:</span><span className="break-words">{parsed.welcome_voucher}</span></>)}
              {parsed.movie_vouchers && (<><span className="font-semibold">Movie Vouchers:</span><span className="break-words">{parsed.movie_vouchers}</span></>)}
              {parsed.lounge_access && (<><span className="font-semibold">Lounge Access:</span><span className="break-words">{typeof parsed.lounge_access === 'string' ? parsed.lounge_access : JSON.stringify(parsed.lounge_access)}</span></>)}
            </div>
            {/* Benefits List */}
            {parsed.benefits && Array.isArray(parsed.benefits) && parsed.benefits.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 w-full">
                <span className="font-semibold">Benefits:</span>
                <ul className="list-disc ml-5 mt-1">
                  {parsed.benefits.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
          {/* Website Button */}
          <div className="w-full flex justify-center">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 px-6 py-2 rounded-full font-semibold shadow transition-all text-base bg-blue-600 text-white hover:bg-blue-700"
                tabIndex={0}
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If multiple cards, render all; if none, show plain text
  if (parsedList.length > 0) {
    return (
      <div className="flex flex-col items-center w-full">
        {/* Cool Heading */}
        <div className="w-[480px] text-center text-2xl font-extrabold text-black mb-5 flex justify-center gap-2">
          <span>✨ Card Details</span>
        </div>
        {parsedList.map((parsed, idx) => renderCard(parsed, idx))}
      </div>
    );
  }

  // Fallback: plain text
  return (
    <div className="flex flex-col items-center w-full">
      {/* Cool Heading */}
      <div className="w-[480px] text-center text-2xl font-extrabold text-black mb-5 flex justify-center gap-2">
        <span>✨ Card Details</span>
      </div>
      <div className="relative w-[480px] h-max py-5 rounded-3xl shadow-2xl shadow-blue-200 overflow-hidden flex flex-col justify-between mb-8 border border-blue-100 bg-white transition-all">
        <div className="w-full text-center text-gray-800 text-lg font-semibold leading-relaxed mt-2 flex-1 flex items-center justify-center min-h-[120px]">
          {mainText}
        </div>
      </div>
    </div>
  );
} 