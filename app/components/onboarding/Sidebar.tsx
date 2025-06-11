import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banks = ["HDFC", "Axis", "ICICI", "SBI", "Kotak", "Yes Bank", "IndusInd"];
const features = ["Lounge Access", "Cashback", "Fuel", "Travel", "No Annual Fee"];

export default function Sidebar({ onFilterChange }: { onFilterChange?: (filters: { banks: string[]; features: string[] }) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Call onFilterChange only after state changes, not during render
  useEffect(() => {
    onFilterChange?.({ banks: selectedBanks, features: selectedFeatures });
  }, [selectedBanks, selectedFeatures, onFilterChange]);

  function handleBankChange(bank: string) {
    setSelectedBanks(prev =>
      prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]
    );
  }
  function handleFeatureChange(feature: string) {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-6 left-6 z-50 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open filters sidebar"
      >
        <span className="text-xl">☰</span>
      </button>
      {/* Desktop Sidebar (fixed left, full height) */}
      <aside className="hidden md:flex flex-col gap-6 w-72 bg-white shadow-xl rounded-r-2xl p-6 fixed left-0 top-0 h-screen border-r border-blue-100 z-40">
        <h3 className="font-bold text-lg mb-2">Filters</h3>
        <div>
          <div className="font-semibold mb-1">By Bank</div>
          <div className="flex flex-wrap gap-2">
            {banks.map(b => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" checked={selectedBanks.includes(b)} onChange={() => handleBankChange(b)} /> {b}
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-1 mt-4">By Feature</div>
          <div className="flex flex-wrap gap-2">
            {features.map(f => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" checked={selectedFeatures.includes(f)} onChange={() => handleFeatureChange(f)} /> {f}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <button className="w-full py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition">Compare Mode</button>
          <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">Save Card</button>
        </div>
      </aside>
      {/* Mobile Drawer (bottom) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white w-full rounded-t-3xl p-6 shadow-2xl border-t border-blue-100"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setOpen(false)} className="text-2xl">×</button>
              </div>
              <div>
                <div className="font-semibold mb-1">By Bank</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {banks.map(b => (
                    <label key={b} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-blue-600" checked={selectedBanks.includes(b)} onChange={() => handleBankChange(b)} /> {b}
                    </label>
                  ))}
                </div>
                <div className="font-semibold mb-1">By Feature</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {features.map(f => (
                    <label key={f} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-blue-600" checked={selectedFeatures.includes(f)} onChange={() => handleFeatureChange(f)} /> {f}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <button className="w-full py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition">Compare Mode</button>
                  <button className="w-full py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">Save Card</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 