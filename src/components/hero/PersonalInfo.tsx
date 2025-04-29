
import { motion } from "framer-motion";
import ProfileAvatar from "../ProfileAvatar";

export default function PersonalInfo() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mb-4 sm:mb-6"
      >
        <ProfileAvatar />
        <motion.span 
          className="text-primary font-medium mt-3 sm:mt-4 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          Hello, I'm
        </motion.span>
      </motion.div>
      
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold playfair mb-4 sm:mb-6 relative will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-background-shine">
          Nithin Varma
        </span>
        <motion.span 
          className="absolute -top-1 -right-1 md:top-0 md:right-8 text-xl sm:text-2xl"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" }}
        >
          👋
        </motion.span>
      </motion.h1>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-lg sm:text-xl md:text-2xl text-white font-medium">Polymath</span>
        <span className="text-xl sm:text-2xl text-primary">•</span>
        <span className="text-lg sm:text-xl md:text-2xl text-white font-medium">Innovator</span>
        <span className="text-xl sm:text-2xl text-primary">•</span>
        <span className="text-lg sm:text-xl md:text-2xl text-white font-medium">Aspiring Entrepreneur</span>
      </motion.div>
      <motion.p 
        className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
      >
        Bridging business, technology, and creativity to solve complex problems.
        BBA Business Analytics student with parallel pursuits in Data Science,
        entrepreneurship, and innovation.
      </motion.p>
    </>
  );
}
