
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

// Improved loading component with animation
const LoadingFallback = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
    <motion.div
      animate={{ 
        opacity: [0.5, 1, 0.5],
        scale: [0.95, 1, 0.95]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2
      }}
      className="text-3xl md:text-4xl font-bold playfair mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
    >
      Nithin Varma
    </motion.div>
    
    <motion.div
      className="w-16 h-1 bg-primary/50 rounded-full overflow-hidden relative"
    >
      <motion.div 
        className="absolute top-0 left-0 h-full bg-primary"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ 
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      />
    </motion.div>
    
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
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
