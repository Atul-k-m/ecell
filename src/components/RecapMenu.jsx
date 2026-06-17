import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import flowerImg from "../Pages/assets/recap/farewell-flower.png";

const RecapMenu = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { delayChildren: 0.2, staggerChildren: 0.08, staggerDirection: 1 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const contentVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.25 } }
  };

  const scrollToSection = (id) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const BORDER = "border-[#f4f1ea]/15";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 cursor-pointer"
            onClick={onClose}
          />

          {/* Side Drawer Container */}
          <motion.div
            className={`relative w-[85%] sm:w-[400px] xl:w-[420px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] my-4 mx-4 sm:my-6 sm:mx-6 flex flex-col gap-4`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top Cream Card */}
            <div className="flex-1 bg-[#f4f1ea] rounded-[2rem] shadow-2xl flex flex-col p-6 xl:p-8 relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[130] cursor-pointer hover:opacity-50 transition-opacity"
                style={{ background: 'none', border: 'none', outline: 'none', padding: '10px', boxShadow: 'none', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
              >
                <X size={24} strokeWidth={2.5} color="#2d2b27" />
              </button>
              
              <div className="flex flex-col w-full h-full pt-14 justify-between">
                {/* Top Section */}
                <motion.div variants={contentVars} className="px-2 pt-2">
                  <h2 className="text-[5.5rem] xl:text-[6.5rem] font-serif font-bold leading-[0.9] text-[#2d2b27]">Recap<br/>2025</h2>
                </motion.div>

                {/* Navigation List */}
                <div className="flex flex-col w-full gap-3 relative z-10 px-2 pb-4">
                  {[
                    { title: "News flash", id: "news-flash-section" },
                    { title: "Events", id: "events-section" },
                    { title: "Moments", id: "gallery-section" },
                    { title: "Farewell", id: "farewell-section" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={contentVars}
                      className="group flex flex-row items-center cursor-pointer transition-colors"
                      onClick={() => scrollToSection(item.id)}
                    >
                      <h3 className="text-[2.5rem] leading-tight font-sans font-medium text-[#2d2b27] transition-all duration-300 group-hover:text-[#e15b3e]">
                        {item.title}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Red Contact Card */}
            <motion.div 
              variants={contentVars}
              onClick={() => scrollToSection('network-section')}
              className="h-28 sm:h-32 bg-[#e15b3e] rounded-[2rem] shadow-2xl flex items-center justify-center cursor-pointer hover:bg-[#d04a2d] transition-colors relative flex-shrink-0"
            >
              <h3 className="text-[2.5rem] leading-tight font-sans font-semibold text-[#2d2b27]">Contact</h3>
              <div className="absolute bottom-5 right-5 w-12 h-12 bg-[#2d2b27] rounded-full flex items-center justify-center">
                {/* SVG Chat bubble icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f4f1ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M16 10h.01"></path>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecapMenu;
