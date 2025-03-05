
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LokiEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportDimensions, setViewportDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEffect(() => {
    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle viewport resizing
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate positions for the effects based on mouse movement
  const xFactor = mousePosition.x / viewportDimensions.width;
  const yFactor = mousePosition.y / viewportDimensions.height;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Main Loki TVA timeline glow effect */}
      <motion.div 
        className="absolute w-[50vw] h-[50vh] rounded-full bg-[#8B5CF6]/20 blur-[100px]"
        animate={{
          x: xFactor * 20 - 10,
          y: yFactor * 20 - 10,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          left: "30%",
          top: "20%",
        }}
      />
      
      {/* Secondary timeline branch effect */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full bg-[#D946EF]/15 blur-[80px]"
        animate={{
          x: -xFactor * 25,
          y: -yFactor * 25,
          scale: [1, 1.15, 1],
        }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
        }}
        style={{
          right: "20%",
          bottom: "30%",
        }}
      />
      
      {/* Tertiary timeline effect */}
      <motion.div 
        className="absolute w-[30vw] h-[30vh] rounded-full bg-[#0EA5E9]/20 blur-[70px]"
        animate={{
          x: xFactor * 15 - yFactor * 10,
          y: yFactor * 15 - xFactor * 10,
          scale: [1, 1.08, 1],
        }}
        transition={{
          x: { duration: 3, ease: "easeOut" },
          y: { duration: 3, ease: "easeOut" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          left: "60%",
          top: "60%",
        }}
      />
      
      {/* Timeline branch lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`timeline-${i}`}
          className="absolute h-[1px] bg-[#9b87f5]/40 left-0 right-0"
          style={{
            top: `${20 + i * 20}%`,
            width: "100%",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Loki-inspired time variance glowing dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: [
              "rgba(155, 135, 245, 0.7)", // Purple
              "rgba(217, 70, 239, 0.7)",  // Magenta
              "rgba(14, 165, 233, 0.7)"   // Blue
            ][Math.floor(Math.random() * 3)],
            filter: "blur(1px)"
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Sacred timeline "prune" effect - appears occasionally */}
      <motion.div
        className="absolute w-full h-[2px] bg-[#F97316] left-0 origin-left"
        style={{ top: "50%" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.7, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default LokiEffects;
