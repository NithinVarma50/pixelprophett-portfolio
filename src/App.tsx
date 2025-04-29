
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load pages for optimal code-splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Reduces unnecessary refetches
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Enhanced loading component with Loki-inspired effects
const LoadingFallback = () => {
  // Mark document as ready once loaded for better UX
  useEffect(() => {
    document.documentElement.dataset.loaded = "true";
  }, []);

  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Improved particle count for a more magical effect
  const particles = [...Array(20)].map((_, i) => ({
    size: Math.random() * 4 + 1,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-background relative overflow-hidden"
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute w-[50vw] h-[50vh] rounded-full bg-primary/5 filter blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "25%",
          left: "25%",
        }}
      />
      
      {/* Timeline effect */}
      <motion.div
        className="absolute w-full h-[1px] bg-primary/30"
        style={{ top: "50%" }}
        animate={{
          scaleX: [0, 1],
          opacity: [0.2, 0.5, 0.2],
          boxShadow: [
            "0 0 5px rgba(57, 255, 20, 0.2)",
            "0 0 15px rgba(57, 255, 20, 0.4)",
            "0 0 5px rgba(57, 255, 20, 0.2)"
          ]
        }}
        transition={{
          scaleX: {
            duration: 2,
            ease: "easeInOut",
          },
          opacity: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          boxShadow: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />
      
      {/* TVA-like circular runes with enhanced glow effects */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-primary/30"
        style={{
          top: "calc(50% - 150px)",
          left: "calc(50% - 150px)",
        }}
        animate={{
          rotate: [0, 360],
          borderColor: ["rgba(57, 255, 20, 0.3)", "rgba(57, 255, 20, 0.6)", "rgba(57, 255, 20, 0.3)"],
          boxShadow: [
            "0 0 10px rgba(57, 255, 20, 0.1)",
            "0 0 20px rgba(57, 255, 20, 0.3)",
            "0 0 10px rgba(57, 255, 20, 0.1)"
          ]
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
          borderColor: {
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
          },
          boxShadow: {
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />
      
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-primary/40"
        style={{
          top: "calc(50% - 100px)",
          left: "calc(50% - 100px)",
        }}
        animate={{
          rotate: [360, 0],
          borderColor: ["rgba(57, 255, 20, 0.4)", "rgba(57, 255, 20, 0.7)", "rgba(57, 255, 20, 0.4)"],
          boxShadow: [
            "0 0 10px rgba(57, 255, 20, 0.2)",
            "0 0 25px rgba(57, 255, 20, 0.4)",
            "0 0 10px rgba(57, 255, 20, 0.2)"
          ]
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          },
          borderColor: {
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
          },
          boxShadow: {
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />

      <motion.div
        className="absolute w-[120px] h-[120px] rounded-full border border-primary/50"
        style={{
          top: "calc(50% - 60px)",
          left: "calc(50% - 60px)",
        }}
        animate={{
          rotate: [0, -360],
          borderColor: ["rgba(57, 255, 20, 0.5)", "rgba(57, 255, 20, 0.8)", "rgba(57, 255, 20, 0.5)"],
          boxShadow: [
            "0 0 15px rgba(57, 255, 20, 0.2)",
            "0 0 30px rgba(57, 255, 20, 0.5)",
            "0 0 15px rgba(57, 255, 20, 0.2)"
          ]
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
          borderColor: {
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
          },
          boxShadow: {
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />
      
      {/* Magic particles with more dynamic animations */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{ 
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
            x: particle.x + (Math.random() * 200 - 100),
            y: particle.y + (Math.random() * 200 - 100),
            boxShadow: [
              "0 0 0px rgba(57, 255, 20, 0)",
              "0 0 10px rgba(57, 255, 20, 0.8)",
              "0 0 0px rgba(57, 255, 20, 0)"
            ]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Main content with enhanced animations */}
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1, 0.98],
            textShadow: [
              "0 0 5px rgba(57, 255, 20, 0.3)",
              "0 0 20px rgba(57, 255, 20, 0.6)",
              "0 0 5px rgba(57, 255, 20, 0.3)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
          className="text-3xl md:text-4xl font-bold playfair mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transform-gpu"
        >
          Nithin Varma
        </motion.div>
        
        {/* Progress Bar with enhanced visual effects */}
        <div className="w-48 h-1 bg-primary/10 rounded-full overflow-hidden mb-2 relative">
          <motion.div 
            className="h-full bg-primary origin-left transform-gpu"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: loadingProgress / 100,
              boxShadow: [
                "0 0 5px rgba(57, 255, 20, 0.5)",
                "0 0 15px rgba(57, 255, 20, 0.8)",
                "0 0 5px rgba(57, 255, 20, 0.5)"
              ]
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut",
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-muted-foreground text-sm"
        >
          {loadingProgress === 100 ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                color: [
                  "rgba(57, 255, 20, 0.7)", 
                  "rgba(57, 255, 20, 1)", 
                  "rgba(57, 255, 20, 0.7)"
                ]
              }}
              transition={{ 
                duration: 0.3,
                color: {
                  delay: 0.3,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="font-medium"
            >
              Ready
            </motion.span>
          ) : (
            `Loading portfolio... ${Math.round(loadingProgress)}%`
          )}
        </motion.p>
      </div>
    </motion.div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
