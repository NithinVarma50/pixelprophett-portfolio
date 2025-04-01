
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import { motion, useScroll, useSpring } from "framer-motion";
import LokiEffects from "@/components/effects/LokiEffects";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load non-critical components
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Conclusion = lazy(() => import("@/components/Conclusion"));

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="py-16 px-4">
    <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
    <Skeleton className="h-4 w-2/3 mx-auto mb-4" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <Skeleton className="h-32 rounded-md" />
      <Skeleton className="h-32 rounded-md" />
      <Skeleton className="h-32 rounded-md" />
      <Skeleton className="h-32 rounded-md" />
    </div>
  </div>
);

const Index = () => {
  // Performance-optimized scroll tracking
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // More responsive spring physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.5 // Further reduced mass for even more responsive movement
  });
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollingRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimized scroll handler with passive event listener
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
      {/* Highly optimized progress bar */}
      <motion.div 
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] transform-gpu"
        style={{ 
          scaleX,
          transformOrigin: "left"
        }}
        aria-hidden="true"
      />
      
      {/* Reduced initial render load - load only what's visible */}
      <LokiEffects />
      <Hero />
      
      {/* Lazy-loaded sections with suspense fallbacks */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Achievements />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Conclusion />
      </Suspense>
      
      {/* Optimized button with GPU acceleration */}
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
