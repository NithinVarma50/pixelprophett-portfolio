
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Gamepad } from "lucide-react";

export default function GameShowcase() {
  return (
    <section className="section-padding bg-background" id="game">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-3 sm:mb-4">
            Play My Game
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Check out my creative approach to game design
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center px-4">
          <motion.div 
            className="flex-1" 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover-card loki-glass border-primary/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-4">
                  <Gamepad className="w-16 h-16 text-primary mx-auto animate-float" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center loki-text">Strategic Tic Tac Toe</h3>
                <p className="text-sm sm:text-base mb-6">
                  Tic Tac Toe is usually known as a simple game that often ends in a tie. But I challenged that norm by redesigning the game to be more competitive and less predictable. I added new rules that make it harder to draw and more likely for one player to win. In my version, strategic thinking is more important, and matches rarely end in a tie—someone almost always wins or loses. It's the same game at its core, but with a twist that makes it much more exciting and challenging!
                </p>
                <div className="mt-auto text-center">
                  <Button 
                    className="mt-4 text-base sm:text-lg py-6 px-8 relative overflow-hidden group"
                    size="lg"
                    asChild
                  >
                    <a 
                      href="https://tic-tac-toe-by-nithinvarma.tiiny.site" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative z-10"
                    >
                      <span className="relative z-10">Play the Game</span>
                      <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
