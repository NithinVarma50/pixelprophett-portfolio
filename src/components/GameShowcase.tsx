
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Gamepad } from "lucide-react";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const GameShowcase = memo(() => {
  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Fixed the repeatType to use an explicit valid value "reverse" instead of a string
  const titleVariants = {
    initial: { textShadow: "0 0 5px rgba(57, 255, 20, 0.3)" },
    animate: { 
      textShadow: ["0 0 5px rgba(57, 255, 20, 0.3)", "0 0 15px rgba(57, 255, 20, 0.6)", "0 0 5px rgba(57, 255, 20, 0.3)"],
      transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const }
    }
  };

  return (
    <section className="section-padding bg-background" id="game">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-3 sm:mb-4 animate-text-focus-in"
          >
            Play My Game
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Check out my creative approach to game design
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center px-4">
          <motion.div 
            className="flex-1" 
            variants={itemVariants}
          >
            <Card className="hover-card loki-glass border-primary/20 overflow-hidden will-change-transform">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-4">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  >
                    <Gamepad className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-xl sm:text-2xl font-semibold mb-4 text-center loki-text"
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                >
                  Strategic Tic Tac Toe
                </motion.h3>
                <motion.p 
                  variants={itemVariants}
                  className="text-sm sm:text-base mb-6"
                >
                  Experience Tic Tac Toe like never before with multiple exciting game modes! Challenge yourself in Classic mode for the traditional experience, test your skills against an AI opponent, or invite a friend for local multiplayer matches. Each mode offers a unique twist on the classic game, making it more engaging and strategic. The game features a modern design, smooth animations, and an intuitive interface that makes it easy to jump right in and start playing.
                </motion.p>
                <motion.div 
                  className="mt-auto text-center"
                  variants={itemVariants}
                >
                  <Button 
                    className="mt-4 text-base sm:text-lg py-6 px-8 relative overflow-hidden group"
                    size="lg"
                    asChild
                  >
                    <motion.a 
                      href="https://nithinvarma-tic-tac-toe.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative z-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <span className="relative z-10">
                        Play the Game
                      </span>
                      <motion.span 
                        className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                        animate={{
                          boxShadow: [
                            "inset 0 0 10px rgba(57, 255, 20, 0.2)",
                            "inset 0 0 20px rgba(57, 255, 20, 0.4)",
                            "inset 0 0 10px rgba(57, 255, 20, 0.2)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      ></motion.span>
                    </motion.a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

GameShowcase.displayName = "GameShowcase";

export default GameShowcase;
