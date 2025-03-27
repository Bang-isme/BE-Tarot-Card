// src/components/tarot/TarotCardMeaning.js
import React from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react';

const TarotCardMeaning = ({ card, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a0933] rounded-lg border border-[#f0c05a]/30 shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#f0c05a]">
            {card.name} {card.isReversed ? "(Ngược)" : "(Xuôi)"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-[#f0c05a]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-shrink-0 flex justify-center">
            <div className={`w-32 h-56 ${card.isReversed ? "rotate-180" : ""}`}>
              <div className="w-full h-full bg-gradient-to-b from-[#2a1045] to-[#1a0933] border border-[#f0c05a]/50 rounded-lg overflow-hidden">
                <div className="p-2 h-full flex flex-col">
                  <div className="text-center text-xs font-semibold text-[#f0c05a] mb-1">{card.name}</div>
                  <div className="flex-grow relative">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-[#f0c05a]">
              {card.isReversed ? "Ý nghĩa khi ngược" : "Ý nghĩa khi xuôi"}
            </h3>
            <p className="text-white/90 mb-4">{card.isReversed ? card.reversedMeaning : card.uprightMeaning}</p>

            <h3 className="text-lg font-semibold mb-2 text-[#f0c05a]">Từ khóa</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(card.isReversed ? card.reversedKeywords : card.uprightKeywords).map((keyword, index) => (
                <span
                  key={index}
                  className="bg-[#2a1045] text-[#f0c05a] px-2 py-1 rounded-full text-xs border border-[#f0c05a]/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#f0c05a]">Mô tả</h3>
          <p className="text-white/90">{card.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TarotCardMeaning;