import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Instagram, Linkedin, Globe, MessageCircle, Twitter, Mail, Send } from "lucide-react";
import teamImage from "./assets/recap/image.png";
import coderedImage from "./assets/recap/codered.png";
import websiteImage from "./assets/recap/website.png";
import flowerImg from "./assets/recap/flower-branch.png";
import paperPlaneImg from "./assets/recap/paper-plane.png";
// import tornPaperImg from "./assets/recap/torn-paper.png";
// import cardFrameImg from "./assets/recap/card-frame.png";
import VintageImage from "../components/VintageImage";
import { StaggeredGrid } from "../components/ui/staggered-grid";
import { SmoothScroll } from "../components/ui/smooth-scroll";
import maxsonImg from "./assets/team/maxson.JPG";
import mohitImg from "./assets/team/mohit.jpeg";
import nishithaImg from "./assets/team/nishitha.jpeg";
import atulImg from "./assets/team/atul.jpg";
import tirthImg from "./assets/team/tirth.jpg";
import akhileshImg from "./assets/team/akhilesh.jpeg";
import gaganjithImg from "./assets/team/gaganjith.jpg";
import shriyaImg from "./assets/team/shriya.jpg";
import hiteshImg from "./assets/team/hitesh.jpeg";
import bhanuImg from "./assets/team/bhanu.JPG";
import fardeeImg from "./assets/team/fardeen.jpeg";
import img1 from "../assets/image1.jpg";
import img3 from "../assets/image3.jpg";
import img5 from "../assets/image5.jpg";
import img7 from "../assets/image7.jpg";
import img9 from "../assets/image9.jpg";
import img11 from "../assets/image11.jpg";
import img13 from "../assets/image13.jpg";
import img15 from "../assets/image15.jpg";
import img17 from "../assets/image17.jpg";
import img19 from "../assets/image19.jpg";
import img21 from "../assets/image21.jpg";
import img23 from "../assets/image23.jpg";
import img25 from "../assets/image25.jpg";
import img27 from "../assets/image27.jpg";
import img29 from "../assets/image29.jpg";
import img31 from "../assets/image31.jpg";
import img33 from "../assets/image33.jpg";
import img35 from "../assets/image35.jpg";
import ecellLogo from "../assets/ecellor.png";
import ecellIllustration from "../assets/ecell_illustration_transparent.png";

const waveSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'%3E%3Cpath d='M0,500 Q 125,650 250,500 T 500,500 Q 625,650 750,500 T 1000,500 L1000,1000 L0,1000 Z' fill='%2318181b'/%3E%3C/svg%3E`;

const ScrollWord = ({ children, progress, range }) => {
  const fillProgress = useTransform(progress, range, ["0%", "100%"]);
  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0 pb-2">
      {/* Outline */}
      <span className="text-transparent" style={{ WebkitTextStroke: "1px #18181b" }}>{children}</span>
      {/* Wavy Liquid Fill overlay */}
      <motion.span 
        className="absolute left-0 top-0 w-full h-full text-transparent animate-text-wave" 
        style={{ 
          backgroundImage: `url("${waveSvg}")`,
          backgroundSize: '200% 200%',
          backgroundRepeat: 'repeat-x',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          backgroundPositionY: fillProgress,
          color: 'transparent',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const ScrollFillText = ({ text }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 90%", "start 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  const words = text.split(" ");
  return (
    <>
      <style>{`
        @keyframes textWave {
          0% { background-position-x: 0%; }
          100% { background-position-x: 100%; }
        }
        .animate-text-wave {
          animation: textWave 3s linear infinite;
        }
      `}</style>
      <h2 ref={container} className="relative text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <ScrollWord key={i} range={[start, end]} progress={smoothProgress}>
              {word}
            </ScrollWord>
          );
        })}
      </h2>
    </>
  );
};
const Balloon = ({ delay, left, size = 40, color = "#2d2b27" }) => {
  const swayAmount = Math.random() * 40 - 20;
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.5, rotate: 0 }}
      whileInView={{ 
        y: -400, 
        x: [0, swayAmount, -swayAmount, swayAmount * 0.5], 
        opacity: [0, 1, 1, 0], 
        scale: 1,
        rotate: [0, swayAmount > 0 ? 5 : -5, swayAmount > 0 ? -5 : 5, 0] 
      }}
      viewport={{ once: true }}
      transition={{ duration: 3, delay: delay, ease: "easeOut", times: [0, 0.3, 0.6, 1] }}
      className="absolute flex flex-col items-center z-0"
      style={{ left }}
    >
      <svg width={size} height={size * 1.375} viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.9543 0 0 9.85 0 22C0 34.15 8.9543 44 20 44C31.0457 44 40 34.15 40 22C40 9.85 31.0457 0 20 0Z" fill={color}/>
        <path d="M15 44H25L20 50L15 44Z" fill={color}/>
      </svg>
      <div className="w-[1px] h-16 bg-black/20" />
    </motion.div>
  );
};

const ConfettiPiece = ({ delay }) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = 50 + Math.random() * 200;
  const targetX = Math.cos(angle) * velocity;
  const targetY = Math.sin(angle) * velocity;
  const isCircle = Math.random() > 0.5;
  const color = ["bg-zinc-800", "bg-zinc-600", "bg-zinc-400"][Math.floor(Math.random() * 3)];
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
      whileInView={{ 
        x: targetX, 
        y: [0, targetY, targetY + 150], 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        rotate: 360 * Math.random()
      }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 + Math.random(), delay: delay, times: [0, 0.4, 0.8, 1], ease: "easeOut" }}
      className={`absolute w-2 h-2 md:w-3 md:h-3 ${color} ${isCircle ? 'rounded-full' : 'rounded-sm'} z-0`}
    />
  );
};

const DustParticle = ({ delay }) => {
  const startX = (Math.random() - 0.5) * 400;
  const endY = -150 - Math.random() * 200;
  return (
    <motion.div
      initial={{ x: startX, y: 0, opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
      whileInView={{ 
        y: endY, 
        x: startX + (Math.random() * 100 - 50),
        opacity: [0, 0.8, 0] 
      }}
      viewport={{ once: true }}
      transition={{ duration: 3 + Math.random() * 2, delay: delay, ease: "linear" }}
      className="absolute w-2 h-2 rounded-full bg-zinc-500 blur-[1px] mix-blend-multiply z-0 pointer-events-none"
    />
  );
};

const TiltCard = ({ children, rotation }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`group relative flex flex-col items-center justify-center transition-transform duration-500 hover:scale-[1.05] hover:z-20 mb-8 ${rotation}`} 
      style={{ perspective: "1000px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative flex items-center justify-center cursor-pointer"
      >
        {/* Invisible overlay to catch mouse events over the entire card area */}
        <div className="absolute inset-0 z-[100]" />
        {children}
      </motion.div>
    </motion.div>
  );
};

const Recap2025 = () => {
  const images = [
    img1, img3, img5, img7, img9, img11,
    img13, img15, img17, img19, img21, img23,
    img25, img27, img29, img31, img33, img35,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#e8dfd1] text-[#2d2b27] font-serif selection:bg-[#2d2b27] selection:text-[#e8dfd1] relative overflow-x-hidden"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(180deg, #e4d7c5 0%, #ede6db 50%, #e4d7c5 100%)",
        backgroundBlendMode: "overlay, normal"
      }}
    >

      {/* Vignette & Scanline Overlay - Fixed to viewport */}
      <div className="pointer-events-none fixed inset-0 z-50 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] md:shadow-[inset_0_0_200px_rgba(0,0,0,0.5)] mix-blend-multiply"></div>
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.05]"
        style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }}
      ></div>

      {/* Hero Image - Full bleed */}
      <div className="relative w-full h-[70vh] md:h-[78vh] overflow-hidden">
        <div className="absolute inset-0">
          <VintageImage
            src={teamImage}
            alt="E-Cell Team"
            className="w-full h-full"
            imgClassName="object-[center_25%]"
          />
        </div>
      </div>

      {/* Rest of Content - with padding */}
      <div className="px-6 md:px-16 max-w-screen-2xl mx-auto">
        <main className="w-full">
          {/* Massive Headline */}


          {/* Newspaper Section (EXTRA KUNST Broadsheet Layout) */}
          <motion.section
            id="news-flash-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-32 mt-12 bg-[#f4f1ea] text-black font-serif border-t-4 border-b-2 border-black py-4"
          >
            {/* Masthead Header */}
            <div className="flex justify-between items-center text-xs font-sans tracking-widest uppercase mb-4 px-2">
              <span>Where Ideas Turn Into Impact</span>
            </div>

            {/* Massive Masthead Title */}
            <h1 className="text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[11.5rem] leading-[0.8] font-bold text-center tracking-tighter mb-6 uppercase">
              E-CELL BMSIT TIMES
            </h1>

            {/* Thick Separator */}
            <div className="border-t-4 border-b border-black py-1 mb-8"></div>

            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 text-black">

              {/* Column 1 (Left) */}
              <motion.div variants={fadeUp} className="md:col-span-1 border-b md:border-b-0 md:border-r border-black p-4 md:p-6 flex flex-col">
                <div className="w-full border-b border-black mb-6">
                  <img src={coderedImage} alt="E-Cell Event" className="w-full h-auto object-cover block" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-none mb-4 tracking-tight uppercase">
                  A Landmark Year of Innovation, Impact, and Growth
                </h2>
                <p className="text-sm leading-snug text-justify mb-4">
                  <span className="font-bold">E-Cell BMSIT concludes a landmark year.</span> From hosting high-energy startup competitions to building a thriving entrepreneurial ecosystem within campus, the Entrepreneurship Cell of BMSIT has wrapped up one of its most defining years yet.
                </p>
                <p className="text-sm leading-snug text-justify mb-4">
                  With record-breaking participation, impactful collaborations, and a strong focus on student-led innovation, 2025–26 stands as a milestone in the club’s journey.
                </p>

                <div className="border-t-2 border-black my-6"></div>

                <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Our Vision</h3>
                <p className="text-sm leading-snug text-justify mb-6">
                  To cultivate a culture of innovation and entrepreneurship among students, empowering them to build solutions that create real-world impact.
                </p>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Our Mission</h3>
                <ul className="text-sm leading-snug text-justify list-disc pl-4 space-y-2">
                  <li>To provide a platform for aspiring entrepreneurs to ideate, build, and scale.</li>
                  <li>To bridge the gap between students and the startup ecosystem.</li>
                  <li>To foster leadership, creativity, and problem-solving skills.</li>
                  <li>To enable hands-on learning through events, competitions, and real projects.</li>
                </ul>
              </motion.div>

              {/* Columns 2 & 3 (Middle) */}
              <motion.div variants={fadeUp} className="md:col-span-2 border-b md:border-b-0 md:border-r border-black flex flex-col">
                <div className="w-full border-b border-black">
                  <img src={websiteImage} alt="Website Launch" className="w-full h-auto object-cover object-top block" />
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <h2 className="text-5xl md:text-6xl font-bold leading-[0.9] mb-8 mt-4 uppercase tracking-tighter text-center">
                    Flagship Events & Initiatives
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-snug text-justify">
                    <div>
                      <h4 className="font-bold text-lg mb-2 uppercase">CODE RED 3.0 – The Ultimate Hackathon</h4>
                      <p className="mb-8">
                        One of the biggest highlights of the year, CODE RED 3.0 brought together some of the brightest minds to solve real-world problems through innovation and technology. The event saw intense competition, creative solutions, and a vibrant display of teamwork.
                      </p>

                      <h4 className="font-bold text-lg mb-2 uppercase">Startup Premier League (SPL)</h4>
                      <p>
                        Blending the thrill of auctions with business acumen, SPL turned entrepreneurship into a strategic game. Participants bid, built, and battled it out, showcasing their understanding of startups and valuations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 uppercase">Speaker Sessions & Workshops</h4>
                      <p className="mb-8">
                        From industry leaders to startup founders, E-Cell hosted sessions that provided students with real-world insights, practical knowledge, and inspiration to pursue entrepreneurial journeys.
                      </p>

                      <h4 className="font-bold text-lg mb-2 uppercase">Ideathons & Pitch Competitions</h4>
                      <p>
                        Students pitched innovative ideas across domains, receiving feedback from experienced judges and mentors, helping them refine and elevate their concepts.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Column 4 (Right) */}
              <motion.div variants={fadeUp} className="md:col-span-1 p-4 md:p-6 flex flex-col">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">The People Behind the Journey</h3>
                <p className="text-sm leading-snug mb-4">
                  Behind every successful event was a team of passionate individuals who worked tirelessly to make it happen.
                </p>
                <p className="text-sm leading-snug mb-6">
                  From brainstorming ideas at midnight to executing large-scale events seamlessly, the E-Cell team demonstrated dedication, creativity, and resilience throughout the year.
                </p>

                <div className="border-t-2 border-black my-6"></div>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Farewell: Legacy That Stays</h3>
                <p className="text-sm leading-snug mb-4">
                  As we bid farewell to our senior members, we celebrate not just their contributions but the legacy they leave behind.
                </p>
                <p className="text-sm leading-snug mb-6">
                  Their leadership, guidance, and vision have shaped E-Cell into what it is today. From mentoring juniors to leading major initiatives, their impact will continue to inspire future batches.
                </p>
                <p className="text-sm italic font-bold mb-8 text-center text-[#555]">“You built the foundation we now stand on.”</p>

                <div className="border-t-4 border-black pt-4 mt-auto mb-4">
                  <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-center">Events Conducted</h3>
                  <ul id="events-section" className="text-sm font-sans uppercase tracking-widest space-y-2 text-center">
                    <li className="border-b border-black/30 pb-1">Codered 3.0</li>
                    <li className="border-b border-black/30 pb-1">SPL</li>
                    <li className="border-b border-black/30 pb-1">Case Crackers</li>
                    <li className="border-b border-black/30 pb-1">Advert 1.0</li>
                    <li className="border-b border-black/30 pb-1">Speaker Sessions</li>
                    <li className="border-b border-black/30 pb-1">Panel Discussion</li>

                  </ul>
                </div>
              </motion.div>

            </div>
          </motion.section>

          {/* Gallery */}
          <section id="gallery-section" className="mb-24">
            <StaggeredGrid
              images={images}
              bentoItems={[]}
              centerText="Moments That Defined the Year"
              showFooter={false}
            />
          </section>

          {/* Farewell Section */}
          <section id="farewell-section" className="mb-32 px-4 max-w-[90rem] mx-auto relative mt-20">
            {/* Decorative Elements */}
            <div
              className="absolute -top-10 md:-top-24 -left-10 md:-left-40 w-48 md:w-[26rem] pointer-events-none z-0"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 60%, transparent 95%), linear-gradient(to bottom, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 60%, transparent 95%), linear-gradient(to bottom, black 55%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <img
                src={flowerImg}
                alt="decorative flower"
                className="w-full h-full object-contain mix-blend-multiply opacity-90"
              />
            </div>

            <div className="border-t-2 border-b-2 border-zinc-900 py-8 mb-16 flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
              <ScrollFillText text="The Farewell Chronicle" />
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium">Class of 2025–26</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-16 relative z-10">
              {[
                { name: "Maxson Mathew", img: maxsonImg, rotation: "-rotate-2" },
                { name: "Mohit Monnappa T N", img: mohitImg, imgClass: "scale-[1.1] object-top origin-top", rotation: "rotate-2" },
                { name: "Nishitha Bodipati", img: nishithaImg, rotation: "rotate-3" },
                { name: "Gaganjith R", img: gaganjithImg, rotation: "-rotate-2" },
                { name: "Shriya Chowdary", img: shriyaImg, rotation: "rotate-2" },
                { name: "Fardeen Khan K", img: fardeeImg, rotation: "-rotate-2" },
                { name: "Atul Kumar", img: atulImg, rotation: "rotate-1" },
                { name: "Hitesh R", img: hiteshImg, rotation: "-rotate-3" },
                { name: "Tirth Panchori", img: tirthImg, rotation: "rotate-2" },
                { name: "Akhilesh Pachnanda", img: akhileshImg, rotation: "rotate-1" },
                { name: "Bhanu Prasad N", img: bhanuImg, rotation: "-rotate-2" },
              ].map((person, i) => (
                <TiltCard key={i} rotation={person.rotation}>
                  {/* Clean CSS Polaroid Frame */}
                  <div className="relative w-full aspect-[3/4] bg-[#18181b] drop-shadow-xl border border-black/30 z-0 flex flex-col justify-between p-3 md:p-4 pb-12 md:pb-14">
                      
                      {/* Photo Area */}
                      <div className="w-full h-full overflow-hidden bg-[#2a231a] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 z-10 relative">
                          <img
                            src={person.img}
                            alt={person.name}
                            className={`w-full h-full object-cover ${person.imgClass || ""}`}
                          />
                      </div>

                      {/* Name text */}
                      <div className="absolute bottom-4 md:bottom-5 left-0 w-full text-center px-2 z-20" style={{ transform: 'translateZ(10px)' }}>
                          <p className="text-[0.65rem] md:text-[0.8rem] font-sans tracking-[0.2em] font-bold uppercase text-[#f4f1ea] opacity-90" style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                            {person.name}
                          </p>
                      </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>

          {/* Vision & Mission Section */}


          {/* E-CELL Editorial Poster Section */}
          <section id="network-section" className="relative w-full mt-20 md:mt-28 pb-20 overflow-hidden">
            <div className="relative text-[#2d2b27]">

              {/* Zone 1 — Top Social Navigation Bar */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={staggerContainer}
                className="flex flex-col items-center justify-center pt-10 pb-8 px-6 border-b-2 border-[#2d2b27] gap-16 md:gap-24"
              >
                {/* Centered Section Heading */}
                <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-[#2d2b27] text-center">
                  Let's Stay Connected
                </motion.h2>

                {/* Social links with dividers */}
                <div className="flex items-center">
                  {[
                    { name: "Instagram",  icon: Instagram,      href: "https://www.instagram.com/ecell.bmsit" },
                    { name: "LinkedIn",   icon: Linkedin,       href: "https://www.linkedin.com/company/ecellbmsit" },
                    { name: "Website",    icon: Globe,          href: "/" },
                    { name: "WhatsApp",   icon: MessageCircle,  href: "https://chat.whatsapp.com/L5GdDKv23ikGUTposaqLDV" },
                  ].map((s, i) => (
                    <motion.a
                      variants={fadeUp}
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-1.5 px-4 md:px-6 py-1 text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#2d2b27] hover:!text-[#2d2b27] hover:opacity-50 transition-all duration-200 ${i > 0 ? 'border-l border-[#2d2b27]/20' : ''}`}
                    >
                      <s.icon className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={1.8} />
                      {s.name}
                      <span className="text-[10px] md:text-[11px] inline-block ml-0.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Zone 2 — Hero Center */}
              <div className="flex flex-col items-center pt-10 pb-2 px-4 overflow-hidden">

                {/* Star + taglines */}
                <div className="flex flex-col items-center gap-1 mb-5 text-center">
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-[#2d2b27] text-xl leading-none select-none inline-block"
                  >✦</motion.span>
                  <p className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] text-[#2d2b27] mt-3">
                    The Journey Continues.
                  </p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#2d2b27]/70 mt-2">
                    Be Part of What's Next.
                  </p>
                </div>

                {/* E-CELL Illustration */}
                <div className="w-full">
                  <img
                    src={ecellIllustration}
                    alt="E-Cell BMSIT — Ideate. Innovate. Inspire."
                    className="w-full h-auto object-contain mix-blend-multiply opacity-90"
                    draggable={false}
                  />
                </div>

                {/* Tagline below illustration */}
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] text-[#2d2b27] mt-2 mb-8 text-center ml-[0.5em] md:ml-[0.8em]">
                  Ideate.&nbsp;&nbsp;&nbsp;Innovate.&nbsp;&nbsp;&nbsp;Inspire.
                </p>
              </div>


            </div>
          </section>

        </main>

      </div>
      </div>
    </SmoothScroll>
  );
};

export default Recap2025;
