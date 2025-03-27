import React from "react";
import { motion } from "framer-motion";

const TarotCard = ({ card, isBackShowing = false }) => {
  return (
    <motion.div
      className={`relative w-28 h-48 sm:w-32 sm:h-56 rounded-lg overflow-hidden shadow-lg ${
        card?.isReversed ? "rotate-180" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isBackShowing ? (
        // Card back
        <div className="w-full h-full bg-[#2a1045] border border-[#f0c05a]/50 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-[#2a1045]">
            <div className="w-16 h-16 rounded-full bg-[#f0c05a]/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#f0c05a]/30 flex items-center justify-center">
                <span className="text-[#f0c05a] text-2xl">✦</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Card front
        <div className="w-full h-full bg-gradient-to-b from-[#2a1045] to-[#1a0933] border border-[#f0c05a]/50 rounded-lg overflow-hidden">
          <div className="p-2 h-full flex flex-col">
            <div className="text-center text-xs font-semibold text-[#f0c05a] mb-1">{card?.name}</div>
            <div className="flex-grow relative">
              <img
                src={card?.image || "/placeholder.svg"}
                alt={card?.name || "Tarot Card"}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text-center text-xs text-[#f0c05a] mt-1">{card?.isReversed ? "Ngược" : "Xuôi"}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TarotCard;