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

If user is greeting you, just say "Hello, how can I help you today?"

Now your job is to read all the card details and return user which the data from a specific json object. that's if card matches, all of it and if not, return the user a message that no card matches and suggest the user with some other card similar one with name and benefits and all the details. greet the user if they are greeting you in that case don't return the card details, do it only if user asks for card details, don't greet if there is no card match return the user a message that no card matches instead of greeting.
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
