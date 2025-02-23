
import { motion } from "framer-motion";
import { Github, Instagram, Discord } from "lucide-react";
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
        className="max-w-4xl mx-auto"
      >
        <span className="text-primary font-medium mb-4 block">Hello, I'm</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold playfair mb-6">
          Nithin Varma
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Innovating the Future | Solving Business Problems
        </p>
        <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
          BBA Business Analytics (ongoing) student with a passion for developing innovative solutions 
          that merge technology and business. Also pursuing a Data Science course (ongoing).
        </p>
        
        <div className="flex gap-6 justify-center mb-8">
          <a 
            href="https://www.instagram.com/this_is_nithinvarma?igsh=ZmRjcGVsOGp4enlq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="https://discord.gg/xW8fEam2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Discord className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/nithinvarma009" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="glass"
            onClick={scrollToProjects}
          >
            View Projects
          </Button>
          <a href="mailto:nithinvarma009@gmail.com">
            <Button size="lg" className="glass bg-primary hover:bg-primary/90">
              Get in Touch
            </Button>
          </a>
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-accent/5 to-background blur-3xl" />
      </div>
    </section>
  );
}
