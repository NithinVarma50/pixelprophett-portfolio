
import { motion } from "framer-motion";

export default function About() {
  const polymathQualities = [
    "Business Analytics",
    "Data Science",
    "Entrepreneurship",
    "Problem Solving",
    "Innovation",
    "Creative Thinking"
  ];

  return (
    <section className="section-padding bg-secondary/20" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-3 sm:mb-6">About Me</h2>
          <p className="text-lg sm:text-xl text-primary font-medium">A Polymath's Journey</p>
        </div>
        
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
          <p>
            As a modern polymath, I cultivate expertise across multiple domains including business analytics, 
            data science, and entrepreneurship. This multidisciplinary approach allows me to see connections 
            others might miss and develop innovative solutions at the intersection of different fields.
          </p>
          
          <div className="my-6 sm:my-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Areas of Expertise</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {polymathQualities.map((quality, index) => (
                <motion.div
                  key={quality}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-primary/20 text-center shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
                >
                  {quality}
                </motion.div>
              ))}
            </div>
          </div>
          
          <p>
            My unique blend of business acumen and technical knowledge empowers me to identify innovative 
            solutions for complex business challenges. Like the Renaissance polymaths who excelled in 
            multiple disciplines, I believe that the most groundbreaking innovations happen at the 
            intersection of different domains.
          </p>
          
          <p>
            I've demonstrated this multifaceted approach through various projects and achievements, 
            including participating in a Shark Tank-style event where I pitched original startup ideas 
            and organizing the Innovators Den event at college. My goal is to continue developing 
            as a polymath, constantly expanding my knowledge and skills across disciplines to create 
            meaningful impact through entrepreneurial ventures.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
