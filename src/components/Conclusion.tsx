
import { motion } from "framer-motion";

export default function Conclusion() {
  return (
    <section className="section-padding bg-secondary/10" id="conclusion">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-4 sm:mb-6 text-center">Looking Forward</h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
          <p>
            As I continue my journey in Business Analytics and Data Science, I remain committed 
            to creating innovative solutions that make a meaningful impact. My diverse project 
            portfolio and achievements reflect my passion for combining business insight with 
            technical expertise.
          </p>
          <p>
            I'm always eager to collaborate on challenging projects and contribute to 
            innovative initiatives. Whether it's developing new technologies, creating 
            sustainable solutions, or revolutionizing existing systems, I bring dedication, 
            creativity, and strategic thinking to every endeavor.
          </p>
          <div className="mt-6 sm:mt-8 font-medium text-center">
            Let's connect and explore how we can create impactful solutions together.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
