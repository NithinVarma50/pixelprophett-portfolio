
import { motion } from "framer-motion";
import { Github, Instagram } from "lucide-react";

export default function SocialLinks() {
  return (
    <motion.div 
      className="flex gap-6 justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <motion.a 
        href="https://www.instagram.com/this_is_nithinvarma?igsh=ZmRjcGVsOGp4enlq" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Instagram className="w-6 h-6" />
      </motion.a>
      <motion.a 
        href="https://discord.gg/xW8fEam2" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6"
        >
          <circle cx="9" cy="12" r="1"/>
          <circle cx="15" cy="12" r="1"/>
          <path d="M7.5 7.2C8.4 6.5 9.7 6 11 6c1.3 0 2.6.5 3.5 1.2"/>
          <path d="M15.5 17a3.5 3.5 0 0 1-7 0"/>
          <path d="M16 12v.01"/>
          <path d="M8 12v.01"/>
          <path d="M8.5 17c0 1 .7 3 3.5 3s3.5-2 3.5-3"/>
          <path d="M14 7.5c1.1.3 2 1 2.5 2"/>
          <path d="M10 7.5c-1.1.3-2 1-2.5 2"/>
          <path d="M16 22H8"/>
          <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
        </svg>
      </motion.a>
      <motion.a 
        href="https://github.com/nithinvarma009" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Github className="w-6 h-6" />
      </motion.a>
    </motion.div>
  );
}
