
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="section-padding bg-secondary/20" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold playfair mb-6">About Me</h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            As a BBA Business Analytics student with a parallel pursuit in Data Science, 
            I bring a unique blend of business acumen and technical expertise to every project.
            My entrepreneurial mindset drives me to identify innovative solutions for complex 
            business challenges.
          </p>
          <p>
            I've demonstrated my problem-solving abilities through various projects and achievements, 
            including participating in a Shark Tank-style event where I pitched original startup ideas. 
            My role in organizing the Innovators Den event at college showcases my commitment to 
            fostering creative business thinking.
          </p>
          <p>
            My passion lies in developing innovative solutions that bridge the gap between 
            technology and business needs, always striving to create meaningful impact through 
            entrepreneurial initiatives.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
