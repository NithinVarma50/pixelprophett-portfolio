
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const skills = [
  {
    category: "Business Innovation & Strategy",
    projects: ["Cloudix", "Green Terra", "Feastify", "Evolvion"],
    icon: "💡"
  },
  {
    category: "Technology & Product Development",
    projects: ["Minimate", "Matrix-Based Computer", "Lumin", "Velox AI"],
    icon: "⚙️"
  },
  {
    category: "AI & Automation",
    projects: ["BrainCandy AI Study Assistant", "Velox AI"],
    icon: "🤖"
  },
  {
    category: "EdTech & Learning Solutions",
    projects: ["BrainCandy", "BrainCandy AI Study Assistant"],
    icon: "📚"
  },
  {
    category: "Cloud Computing & Gaming",
    projects: ["Cloudix"],
    icon: "☁️"
  },
  {
    category: "E-commerce & Digital Business",
    projects: ["Feastify", "Green Terra"],
    icon: "🛒"
  },
  {
    category: "Smart Devices & Wearables",
    projects: ["Waveroo", "Lumin"],
    icon: "⌚"
  },
  {
    category: "Sustainable & Eco-Friendly Innovations",
    projects: ["Green Terra", "Vastramukti"],
    icon: "🌱"
  },
  {
    category: "Event Organization & Public Speaking",
    description: "Shark Tank event participation, Innovators Den",
    icon: "🎤"
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
            My skills span across various domains, demonstrated through successful projects and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-card glass h-full">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{skill.category}</h3>
                  {skill.projects ? (
                    <p className="text-sm text-muted-foreground">
                      Projects: {skill.projects.join(", ")}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
