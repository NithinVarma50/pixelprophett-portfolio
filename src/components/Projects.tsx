import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { 
  Cloud, 
  Leaf, 
  Radio, 
  Monitor, 
  ShirtIcon, 
  Cpu, 
  GraduationCap,
  Bot,
  UtensilsCrossed,
  Zap,
  Lightbulb,
  Rocket
} from "lucide-react";

const projects = [
  {
    title: "Cloudix",
    description: "Cloud gaming service with custom gaming router",
    icon: <Cloud className="w-12 h-12 text-primary/60" />,
    category: "Cloud Computing"
  },
  {
    title: "Green Terra",
    description: "Sustainable food service platform",
    icon: <Leaf className="w-12 h-12 text-primary/60" />,
    category: "Sustainability"
  },
  {
    title: "Waveroo",
    description: "Smart band enhancing connectivity",
    icon: <Radio className="w-12 h-12 text-primary/60" />,
    category: "Smart Devices"
  },
  {
    title: "Minimate",
    description: "Portable computer software solution",
    icon: <Monitor className="w-12 h-12 text-primary/60" />,
    category: "Software"
  },
  {
    title: "Vastramukti",
    description: "Innovative travel and fitness wear",
    icon: <ShirtIcon className="w-12 h-12 text-primary/60" />,
    category: "Fashion"
  },
  {
    title: "Matrix-Based Computer",
    description: "Multi-dimensional processing system",
    icon: <Cpu className="w-12 h-12 text-primary/60" />,
    category: "Computing"
  },
  {
    title: "BrainCandy",
    description: "Interactive learning platform",
    icon: <GraduationCap className="w-12 h-12 text-primary/60" />,
    category: "EdTech"
  },
  {
    title: "BrainCandy AI",
    description: "AI-powered study assistant",
    icon: <Bot className="w-12 h-12 text-primary/60" />,
    category: "AI"
  },
  {
    title: "Feastify",
    description: "Cloud restaurant platform",
    icon: <UtensilsCrossed className="w-12 h-12 text-primary/60" />,
    category: "Food Tech"
  },
  {
    title: "Velox AI",
    description: "Business automation solution",
    icon: <Zap className="w-12 h-12 text-primary/60" />,
    category: "Automation"
  },
  {
    title: "Lumin",
    description: "Smart lighting system",
    icon: <Lightbulb className="w-12 h-12 text-primary/60" />,
    category: "IoT"
  },
  {
    title: "Evolvion",
    description: "Future-focused tech innovations",
    icon: <Rocket className="w-12 h-12 text-primary/60" />,
    category: "Innovation"
  }
];

export default function Projects() {
  return (
    <section className="section-padding" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold playfair mb-4">
            Innovative Concepts & Ideas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of conceptual projects demonstrating innovative problem-solving approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-card glass h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <span className="text-xs text-primary/60 mt-2">{project.category}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
