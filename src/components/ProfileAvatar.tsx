
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ProfileAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-primary shadow-lg">
        <AvatarImage src="/lovable-uploads/69539b53-de64-4e8f-bd06-984c03478595.png" alt="Nithin Varma" />
        <AvatarFallback className="bg-primary/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-full h-full text-primary/80"
          >
            <circle cx="32" cy="18" r="12" fill="currentColor" />
            <path
              d="M54,56c0-12.15-9.85-22-22-22S10,43.85,10,56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
            />
          </svg>
        </AvatarFallback>
      </Avatar>
      <motion.div 
        className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs">✓</span>
      </motion.div>
    </motion.div>
  );
}
