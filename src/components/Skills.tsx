
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
      { name: "Communication", icon: "💬" },
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold playfair mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical, business, and soft skills developed through education and project experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <Card className="hover-card glass h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-center">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-muted-foreground">{skill.name}</span>
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
