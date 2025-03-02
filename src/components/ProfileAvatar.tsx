
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
      <Avatar className="h-24 w-24 border-2 border-primary shadow-lg">
        <AvatarImage src="/avatar.png" alt="Nithin Varma" />
        <AvatarFallback className="bg-primary/20 text-xl font-bold">NV</AvatarFallback>
      </Avatar>
      <motion.div 
        className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs">✓</span>
      </motion.div>
    </motion.div>
  );
}
