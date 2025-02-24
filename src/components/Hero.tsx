
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
