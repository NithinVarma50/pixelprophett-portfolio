
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Optimized loading component with smoother animations
const LoadingFallback = () => (
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
      className="text-3xl md:text-4xl font-bold playfair mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary will-change-transform"
    >
      Nithin Varma
    </motion.div>
    
    <div className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{ willChange: "transform" }}
      />
    </div>
    
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className="text-muted-foreground mt-4 text-sm"
    >
      Loading portfolio...
    </motion.p>
  </div>
);

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
