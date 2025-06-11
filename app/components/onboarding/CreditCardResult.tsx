interface CreditCardResultProps {
  card: any;
}

export default function CreditCardResult({ card }: CreditCardResultProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full flex flex-col gap-3 border border-blue-50">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-blue-600 font-bold text-lg">{card.issuer}</span>
        <span className="ml-auto text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold">{card.name}</span>
      </div>
      {card.joining_fee && (
        <div className="text-gray-500 text-sm">Joining Fee: <span className="font-medium text-gray-700">{card.joining_fee}</span></div>
      )}
      {card.annual_fee && (
        <div className="text-gray-500 text-sm">Annual Fee: <span className="font-medium text-gray-700">{card.annual_fee}</span></div>
      )}
      {card.reward_rate && (
        <div className="text-gray-500 text-sm">Reward Rate: <span className="font-medium text-gray-700">{typeof card.reward_rate === 'string' ? card.reward_rate : Object.entries(card.reward_rate).map(([k, v]) => `${k}: ${v}`).join(", ")}</span></div>
      )}
      {card.lounge_access && (
        <div className="text-gray-500 text-sm">Lounge Access: <span className="font-medium text-gray-700">{typeof card.lounge_access === 'string' ? card.lounge_access : Object.entries(card.lounge_access).map(([k, v]) => `${k}: ${v}`).join(", ")}</span></div>
      )}
      {card.benefits && Array.isArray(card.benefits) && (
        <div className="text-gray-500 text-sm">Benefits:
          <ul className="list-disc ml-5 mt-1">
            {card.benefits.map((b: string, i: number) => <li key={i} className="text-gray-700">{b}</li>)}
          </ul>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <a
          href={card.website || card.source}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all text-sm"
        >
          Visit Card Website
        </a>
      </div>
    </div>
  );
} 