
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
          className="glass relative overflow-hidden group w-full sm:w-auto"
          onClick={scrollToProjects}
        >
          <span className="relative z-10">View Projects</span>
          <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
        <a href="mailto:nithinvarma009@gmail.com" className="block w-full sm:w-auto">
          <Button 
            variant="outline"
            size="lg" 
            className="glass relative overflow-hidden group w-full transition-all duration-300"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
        </a>
      </motion.div>
    </motion.div>
  );
}
