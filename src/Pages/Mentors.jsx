import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Linkedin, FileText } from "lucide-react";
import Footer from "../components/Footer/Footer";
import mentorsData from "../data/mentors.json";

const Mentors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeMentor, setActiveMentor] = useState(mentorsData[0] || null);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleNext = (e) => {
    e.stopPropagation();
    if (!selectedMentor) return;
    const currentIndex = mentorsData.findIndex(m => m.id === selectedMentor.id);
    const nextIndex = (currentIndex + 1) % mentorsData.length;
    setSelectedMentor(mentorsData[nextIndex]);
    setActiveMentor(mentorsData[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!selectedMentor) return;
    const currentIndex = mentorsData.findIndex(m => m.id === selectedMentor.id);
    const prevIndex = (currentIndex - 1 + mentorsData.length) % mentorsData.length;
    setSelectedMentor(mentorsData[prevIndex]);
    setActiveMentor(mentorsData[prevIndex]);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMentor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedMentor]);

  return (
    <div className="min-h-screen bg-black text-white pt-28 font-sans transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
        <h1 
          className="font-black mb-16 font-sans text-center tracking-[0.1em] uppercase w-full leading-none"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
        >
          OUR MENTORS
        </h1>

        <div className="flex flex-col md:flex-row gap-0 md:gap-12 items-start relative">
          {/* Left Column - Sticky Image */}
          <div className="w-full md:w-[35%] md:sticky md:top-32 hidden md:block aspect-[4/5] overflow-hidden bg-gray-900 rounded-sm relative">
            <AnimatePresence>
              {activeMentor && (
                <motion.div
                  key={activeMentor.id}
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute inset-0 w-full h-full bg-cover bg-center preserve-color"
                  style={{ backgroundImage: `url(${activeMentor.image})` }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Mentor List */}
          <div className="w-full md:w-[65%] flex flex-col border-t border-gray-800">
            {mentorsData.map((mentor) => (
              <div
                key={mentor.id}
                onMouseEnter={() => setActiveMentor(mentor)}
                onClick={() => setSelectedMentor(mentor)}
                className="group flex flex-col lg:flex-row lg:items-center justify-between py-6 md:py-8 border-b border-gray-800 cursor-pointer hover:bg-neutral-900 transition-colors duration-300 px-4 -mx-4 rounded-sm"
              >
                {/* Mobile Image */}
                <div className="md:hidden w-full aspect-square mb-6 overflow-hidden rounded-sm bg-neutral-900 relative">
                   <div className="absolute inset-0 w-full h-full bg-cover bg-center preserve-color" style={{ backgroundImage: `url(${mentor.image})` }} />
                </div>
                
                <div className="flex-1 lg:w-[30%] mb-3 lg:mb-0 flex items-center">
                  <h3 className="text-xl md:text-2xl font-medium flex items-center gap-3 text-left">
                     <span className={`w-1.5 h-1.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block`}></span>
                     {mentor.name}
                  </h3>
                </div>
                
                <div className="flex-1 lg:w-[45%] px-0 lg:px-4 mb-3 lg:mb-0 flex items-center justify-start">
                  <p className="text-[15px] md:text-[16px] text-gray-300 leading-snug text-left">
                    {mentor.role}
                  </p>
                </div>
                
                <div className="flex-1 lg:w-[25%] flex items-center justify-between gap-4">
                  <p className="text-[13px] text-gray-400 font-medium text-left">
                    {mentor.industries.join(", ")}
                  </p>
                  <div className="flex items-center justify-center w-8 h-8 shrink-0">
                    <svg width="32" height="32" viewBox="-12 -12 24 24" className="preserve-color transition-transform duration-300 group-hover:scale-110">
                      {/* Background: Transparent by default, orange on hover */}
                      <path 
                        d="M-12,-11 C-12,-11.551899909973145 -11.551899909973145,-12 -11,-12 C-11,-12 11,-12 11,-12 C11.551899909973145,-12 12,-11.551899909973145 12,-11 C12,-11 12,11 12,11 C12,11.551899909973145 11.551899909973145,12 11,12 C11,12 -11,12 -11,12 C-11.551899909973145,12 -12,11.551899909973145 -12,11 C-12,11 -12,-11 -12,-11z" 
                        className="fill-transparent group-hover:fill-[#F97316] transition-colors duration-300"
                      />
                      {/* Arrow: Orange by default, white on hover */}
                      <g transform="translate(-3.87, -3.87)">
                        <path 
                          d="M4.64551 7.74219H3.09668V6.19336H4.64551V7.74219ZM6.19336 6.19336H4.64551V4.64551H6.19336V6.19336ZM4.64551 3.09668V4.64551H0V0H1.54883V3.09668H4.64551ZM7.74219 4.64551H6.19336V3.09668H7.74219V4.64551ZM6.19336 3.09668H4.64551V1.54883H6.19336V3.09668ZM4.64551 1.54883H3.09668V0H4.64551V1.54883Z" 
                          className="fill-[#F97316] group-hover:fill-white transition-colors duration-300"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal - rendered via portal to escape .light-theme filter which breaks fixed positioning */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {selectedMentor && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMentor(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                style={{ zIndex: 99999 }}
              />
              
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 w-full max-w-[720px]"
                style={{ zIndex: 100000, height: '100vh' }}
              >
                {/* Close button (Floating on the left) */}
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-1/2 -left-20 -translate-y-1/2 z-50 w-14 h-14 shadow-lg hidden md:flex items-center justify-center hover:scale-105 transition-transform rounded-sm preserve-color"
                  style={{ backgroundColor: '#ffffff', color: '#F97316' }}
                >
                  <svg width="20" height="20" viewBox="0 0 5 5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}>
                    <path d="M0,0 h1 v1 h1 v1 h1 v-1 h1 v-1 h1 v1 h-1 v1 h-1 v1 h1 v1 h1 v1 h-1 v-1 h-1 v-1 h-1 v1 h-1 v1 h-1 v-1 h1 v-1 h1 v-1 h-1 v-1 h-1 v-1 Z" />
                  </svg>
                </button>

                <div className="w-full h-full bg-[#f2f2f2] text-black shadow-2xl overflow-y-auto relative">
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="md:hidden absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 5 5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                    <path d="M0,0 h1 v1 h1 v1 h1 v-1 h1 v-1 h1 v1 h-1 v1 h-1 v1 h1 v1 h1 v1 h-1 v-1 h-1 v-1 h-1 v1 h-1 v1 h-1 v-1 h1 v-1 h1 v-1 h-1 v-1 h-1 v-1 Z" />
                  </svg>
                </button>

                {/* Content */}
                <div className="p-6 md:p-10">
                  {/* Image Section */}
                  <div className="w-full relative rounded-sm overflow-hidden shadow-sm mb-6 flex justify-center bg-[#050505]">
                    <img
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      className="w-full object-contain"
                      style={{ maxHeight: '450px' }}
                    />
                  </div>

                  {/* Top Row: Navigation, Name, LinkedIn */}
                  <div className="flex items-center gap-4 md:gap-6 mb-12 mt-4">
                    {/* Prev/Next Buttons */}
                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={handlePrev}
                        className="w-12 h-12 hover:opacity-80 flex items-center justify-center transition-opacity rounded-sm"
                        style={{ backgroundColor: '#FDBA74' }}
                      >
                        <svg className="w-[10px] h-[16px] shrink-0 block" viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg" fill="white">
                          <path d="M8 0h4v4H8V0zM4 4h4v4H4V4zM0 8h4v4H0V8zM4 12h4v4H4v-4zM8 16h4v4H8v-4z" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-12 h-12 hover:opacity-80 flex items-center justify-center transition-opacity rounded-sm"
                        style={{ backgroundColor: '#F97316' }}
                      >
                        <svg className="w-[10px] h-[16px] shrink-0 block" viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg" fill="white">
                          <path d="M0 0h4v4H0V0zm4 4h4v4H4V4zm4 4h4v4H8V8zm-4 4h4v4H4v-4zm-4 4h4v4H0v-4z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Name */}
                    <h2 className="text-4xl md:text-[4.5rem] font-sans tracking-tight text-black font-medium flex-1 text-left px-2 md:px-4 truncate leading-none">
                      {selectedMentor.name}
                    </h2>
                    
                    {/* LinkedIn */}
                    <div className="shrink-0 flex justify-end self-start mt-2">
                      {selectedMentor.linkedin && (
                        <a href={selectedMentor.linkedin} target="_blank" rel="noreferrer">
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white hover:opacity-80 transition-colors" style={{ backgroundColor: '#0077b5' }}>
                            <span className="font-bold text-sm leading-none mt-0.5">in</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col gap-10">
                    
                    {/* Highlights Row */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      <div className="w-32 shrink-0">
                        <div className="bg-white text-gray-600 border border-gray-200 text-[13px] font-sans py-2 px-3 rounded-sm shadow-sm inline-block">
                          Highlights
                        </div>
                      </div>
                      <div className="flex-1 max-w-none">
                        <p className="text-black text-base md:text-[17px] leading-relaxed font-sans whitespace-pre-wrap">
                          {selectedMentor.bio}
                        </p>
                      </div>
                    </div>

                    {/* Industries Row */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      <div className="w-32 shrink-0">
                        <div className="bg-white text-gray-600 border border-gray-200 text-[13px] font-sans py-2 px-3 rounded-sm shadow-sm inline-block">
                          Industries
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <p className="text-black text-base md:text-[17px] leading-relaxed font-sans mb-6">
                          {selectedMentor.industries?.join(', ') || "N/A"}
                        </p>
                        
                        <div className="w-full h-px bg-gray-800 mb-2"></div>
                        
                        {(selectedMentor.articles || [
                          "Semantic Mechanical Search with Large Vision and Language Models",
                          "Just got my author copy of ai for robotics activity",
                          "Student-entrepreneur: You don't have to wait to change the world"
                        ]).map((article, idx) => (
                          <div key={idx} className="flex items-center gap-4 py-5 border-b border-gray-800 cursor-pointer group">
                            <div className="shrink-0">
                              <FileText color="#F97316" strokeWidth={1.5} size={24} />
                            </div>
                            <p className="flex-1 text-black text-base font-sans pr-4">
                              {article}
                            </p>
                            <div className="shrink-0" style={{ color: '#F97316' }}>
                              <svg className="w-[12px] h-[12px]" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <rect x="8" y="0" width="4" height="4" />
                                <rect x="4" y="0" width="4" height="4" />
                                <rect x="8" y="4" width="4" height="4" />
                                <rect x="4" y="4" width="4" height="4" />
                                <rect x="0" y="8" width="4" height="4" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Mentors;
