
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Technical Skills",
    skills: [
      { name: "Data Analytics", icon: "📊" },
      { name: "AI/ML Concepts", icon: "🤖" },
      { name: "Cloud Technologies", icon: "☁️" },
      { name: "Business Technology", icon: "💻" },
      { name: "Advanced Excel", icon: "📈" },
      { name: "Project Management", icon: "📋" }
    ]
  },
  {
    title: "Business Skills",
    skills: [
      { name: "Entrepreneurial Thinking", icon: "💡" },
      { name: "Business Model Ideation", icon: "🎯" },
      { name: "Market Analysis", icon: "📊" },
      { name: "Pitch Creation", icon: "🎤" },
      { name: "Sustainability Concepts", icon: "🌱" },
      { name: "Product Conceptualization", icon: "⚡" }
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Strategic Thinking", icon: "🧠" },
      { name: "Creative Ideation", icon: "✨" },
      { name: "Developing Proficiency in communication", icon: "💬" },
      { name: "Adaptability", icon: "🔄" },
      { name: "Problem Solving", icon: "🎯" }
    ]
  }
];

export default function Skills() {
  return (
    <section className="section-padding bg-secondary/10" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-3 sm:mb-4">Skills & Expertise</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            A comprehensive overview of my technical, business, and soft skills developed through education and project experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <Card className="hover-card glass h-full">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">{category.title}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <span className="text-lg sm:text-xl">{skill.icon}</span>
                        <span className="text-sm sm:text-base text-muted-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
