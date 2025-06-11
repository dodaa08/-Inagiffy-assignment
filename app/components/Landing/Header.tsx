"use client";

import GoogleLogo from "@/app/utils/logos/google";
import supabase from "@/app/utils/supabaseClient";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import GitHubIcon from "@/app/utils/logos/github";
import { FaVideo } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


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
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl bg-gray-50 border-2 shadow-lg flex items-center justify-between px-7  py-2 animate-fade-in text-center">
      <div className="font-bold text-xl tracking-tight text-gray-900 select-none cursor-pointer">
        <a href="/">
          Cardify
        </a>
      </div>


      <div className="flex justify-center items-center gap-4 mb-2 mt-3 animate-fade-in z-10 text-l">
            <Link href="/">
            <div className="flex items-center border-2 gap-2 cursor-pointer border-gray-200 rounded-md px-2 text-black py-2 px-5">
              <FaVideo />
             <button className="cursor-pointer">Demo</button>
            </div>
            </Link>
            <Link href="https://github.com/dodaa08/-Inagiffy-assignment.git" target="_blank">
            <div className="flex items-center border-2 cursor-pointer border-gray-200 rounded-md px-2 py-1 text-black py-2 px-5">
              <GitHubIcon />
            <button className="cursor-pointer">Github</button>
            </div>
            </Link>
        </div>
      
      {user ? (
        <div className="flex items-center gap-3 cursor-pointer">
          <button
            onClick={handleSignOut}
            className="flex justify-center items-center gazp-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-full shadow transition-all border border-red-100 cursor-pointer"
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
           Sign In
        </button>
        
      )}
      
    </div>
  );
}

// Add animation via Tailwind (in globals.css or tailwind.config.js):
// .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }