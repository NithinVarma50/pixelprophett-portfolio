
import { motion } from "framer-motion";
import { Github, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center section-padding text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.span 
          className="text-primary font-medium mb-4 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hello, I'm
        </motion.span>
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold playfair mb-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-background-shine">
            Nithin Varma
          </span>
          <motion.span 
            className="absolute -top-1 -right-1 md:top-0 md:right-8 text-2xl"
            animate={{ rotate: [0, 20, 0] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          >
            👋
          </motion.span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Innovating the Future | Solving Business Problems
        </motion.p>
        <motion.p 
          className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          BBA Business Analytics (ongoing) student with a passion for developing innovative solutions 
          that merge technology and business. Also pursuing a Data Science course (ongoing).
        </motion.p>
        
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

        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              size="lg" 
              className="glass relative overflow-hidden group"
              onClick={scrollToProjects}
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="mailto:nithinvarma009@gmail.com">
              <Button size="lg" className="glass bg-primary/80 hover:bg-primary/90 relative overflow-hidden group">
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Moving gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-accent/5 to-background blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 backdrop-blur-md"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
