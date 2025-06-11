import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatInput({ onSubmit, loading }: { onSubmit: (msg: string) => void, loading?: boolean }) {
  const [value, setValue] = useState("");

  return (
    <motion.form
      className="w-full max-w-xl mx-auto flex items-center bg-white rounded-2xl shadow-lg px-4 py-3 mt-4"
      initial={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
      whileFocus={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)" }}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() && !loading) {
          onSubmit(value);
          setValue("");
        }
      }}
    >
      <input
        className="flex-1 bg-transparent outline-none text-lg px-2 font-sans placeholder-gray-400"
        placeholder="Enter what you're looking for in credit cards..."
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="ml-3 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
        disabled={loading || !value.trim()}
      >
        Ask
      </button>
    </motion.form>
  );
} 