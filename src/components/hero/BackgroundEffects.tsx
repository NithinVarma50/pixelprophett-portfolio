
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function BackgroundEffects() {
  const orbs = useRef<Array<{ x: number; y: number; size: number }>>([]);
  
  // Generate orb positions only once
  useEffect(() => {
    orbs.current = [...Array(6)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 20
    }));
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-accent/5 to-background blur-3xl opacity-50"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {orbs.current.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 backdrop-blur-md"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </>
  );
}
