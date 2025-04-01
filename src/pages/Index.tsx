
import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Conclusion from "@/components/Conclusion";
import { motion, useScroll, useSpring } from "framer-motion";
import LokiEffects from "@/components/effects/LokiEffects";

const Index = () => {
  // Use a more direct scrollYProgress implementation
  const { scrollYProgress } = useScroll({
    // Measure the entire document scroll
    offset: ["start start", "end end"]
  });
  
  // Apply smoother spring physics for better performance
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.8 // Reduced mass for more responsive movement
  });
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollingRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimized scroll handler
    const handleScroll = () => {
      if (!scrollingRef.current) {
        setShowScrollButton(window.scrollY > window.innerHeight * 0.5);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    scrollingRef.current = true;
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    
    setTimeout(() => {
      scrollingRef.current = false;
    }, 1000);
  };

  return (
    <main className="min-h-screen relative">
      {/* Fixed progress bar with GPU acceleration and adjusted styles */}
      <motion.div 
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left transform-gpu"
        style={{ 
          scaleX,
          transformOrigin: "left"
        }}
        aria-hidden="true"
      />
      
      <LokiEffects />
      
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Conclusion />
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary/80 hover:bg-primary text-white shadow-lg z-40 transition-colors transform-gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.button>
      )}
    </main>
  );
};

export default Index;
