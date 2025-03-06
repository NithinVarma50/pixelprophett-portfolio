
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface ActionButtonsProps {
  scrollToProjects: () => void;
}

export default function ActionButtons({ scrollToProjects }: ActionButtonsProps) {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="lg" 
          className="bg-background/80 border border-white/10 text-white hover:bg-white/10 w-full sm:w-auto transition-all duration-300"
          onClick={scrollToProjects}
        >
          <span>View Projects</span>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
        <a href="mailto:nithinvarma009@gmail.com" className="block w-full sm:w-auto">
          <Button 
            variant="outline"
            size="lg" 
            className="bg-background/80 border border-white/10 text-white hover:bg-white/10 w-full transition-all duration-300"
          >
            <span>Get in Touch</span>
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}
