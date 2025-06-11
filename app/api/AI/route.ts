import { NextRequest, NextResponse } from "next/server";
import { cardDetails } from "@/app/Data/cardDetails/Data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  
  const prompt = `
You are a credit card AI agent.
Based on the following available card details,

CARD DETAILS:
${JSON.stringify(cardDetails, null, 2)}

QUERY:
${query}

If the user is greeting you, just say "Hello, how can I help you today?"

If a card matches the user's query, return ONLY the card details in this exact JSON format (no extra text):
{
  "issuer": "...",
  "name": "...",
  "joining_fee": "...",
  "annual_fee": "...",
  "reward_rate": "...",
  "welcome_voucher": "...",
  "movie_vouchers": "...",
  "lounge_access": "...",
  "benefits": ["...", "..."]
}
If no card matches, return a plain text suggestion message (do not use JSON, do not greet).
If the user is greeting, just greet (no card details, no JSON).
Show user only one card at a time.
can u also show the parsed json in a readable format?
`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  const rawResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

  // ✅ Remove extra \n and trim spaces
  const cleanResult = rawResult.replace(/\n+/g, " ").trim();

  return NextResponse.json({
    result: cleanResult,
  });
}

export function GET() {
  return NextResponse.json({ message: "Gemini AI API route working ✅" });
}
