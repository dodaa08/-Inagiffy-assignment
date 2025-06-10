"use client";

import GoogleLogo from "@/app/utils/logs/google";
import supabase from "@/app/utils/supabaseClient";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/onboarding`,
      },
    });
    if (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl rounded-3xl bg-gray-50 shadow-lg flex items-center justify-between px-8 py-4 animate-fade-in text-center">
      <div className="font-bold text-xl tracking-tight text-gray-900 select-none cursor-pointer">
        <a href="/">
        FindCards
        </a>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">How it works</a>
      </div>
      {user ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSignOut}
            className="flex justify-center items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full shadow transition-all border border-red-100 cursor-pointer"
            style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 500, fontSize: '15px', height: '40px' }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 bg-white border border-[#dadce0] text-[#3c4043] font-medium px-5 py-2 rounded hover:bg-[#f7f8fa] transition-all shadow cursor-pointer rounded-xl"
          style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 500, fontSize: '15px', height: '40px', borderRadius: '4px' }}
        >
          <GoogleLogo />
          Sign in with Google
        </button>
      )}
    </div>
  );
}

// Add animation via Tailwind (in globals.css or tailwind.config.js):
// .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }