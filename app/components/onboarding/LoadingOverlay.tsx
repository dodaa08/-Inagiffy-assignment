import { motion } from "framer-motion";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-white/40">
      <motion.div
        className="w-48 h-4 rounded-full bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 animate-pulse"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />
    </div>
  );
} 