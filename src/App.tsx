
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";

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

// Optimized loading component with better performance
const LoadingFallback = () => {
  // Mark document as ready once loaded for better UX
  useEffect(() => {
    document.documentElement.dataset.loaded = "true";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1, 0.98]
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
      
      <div className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary origin-left transform-gpu"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ 
            duration: 1.5, // Reduced from 2s for faster feedback
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }} // Faster appearance
        className="text-muted-foreground mt-4 text-sm"
      >
        Loading portfolio...
      </motion.p>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
