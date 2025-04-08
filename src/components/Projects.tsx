import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Project } from "@/lib/types";
import { 
  Brain,
  Bot,
  Cpu, 
  Monitor,
  Cloud,
  Leaf,
  UtensilsCrossed,
  Radio,
  Rocket,
  Car,
  Gamepad,
  Zap,
  Lightbulb,
  Shirt,
  ShoppingBag
} from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  brain: <Brain className="w-12 h-12 text-primary/60" />,
  bot: <Bot className="w-12 h-12 text-primary/60" />,
  cpu: <Cpu className="w-12 h-12 text-primary/60" />,
  monitor: <Monitor className="w-12 h-12 text-primary/60" />,
  cloud: <Cloud className="w-12 h-12 text-primary/60" />,
  leaf: <Leaf className="w-12 h-12 text-primary/60" />,
  utensils: <UtensilsCrossed className="w-12 h-12 text-primary/60" />,
  radio: <Radio className="w-12 h-12 text-primary/60" />,
  rocket: <Rocket className="w-12 h-12 text-primary/60" />,
  car: <Car className="w-12 h-12 text-primary/60" />,
  gamepad: <Gamepad className="w-12 h-12 text-primary/60" />,
  zap: <Zap className="w-12 h-12 text-primary/60" />,
  lightbulb: <Lightbulb className="w-12 h-12 text-primary/60" />,
  shirt: <Shirt className="w-12 h-12 text-primary/60" />,
  shoppingbag: <ShoppingBag className="w-12 h-12 text-primary/60" />
};

const projects: Project[] = [
  {
    id: 1,
    title: "Brain Candy",
    description: "An innovative education platform designed to enhance learning experiences",
    category: "Education",
    icon: "brain"
  },
  {
    id: 2,
    title: "BrainCandy AI Study Assistant",
    description: "An AI-powered study assistant that helps students with learning and productivity",
    category: "AI & Education",
    icon: "bot"
  },
  {
    id: 3,
    title: "Matrix-Based Computer",
    description: "A next-generation computing system utilizing a multidimensional matrix structure",
    category: "Computing",
    icon: "cpu"
  },
  {
    id: 4,
    title: "Cloudix",
    description: "A cloud gaming service offering optimized connectivity and performance",
    category: "Gaming",
    icon: "cloud"
  },
  {
    id: 5,
    title: "Green Terra",
    description: "A plant-based food service with eco-friendly packaging and a sustainable approach",
    category: "Sustainability",
    icon: "leaf"
  },
  {
    id: 6,
    title: "Feastify",
    description: "A cloud restaurant concept providing high-quality meals through online delivery",
    category: "Food Tech",
    icon: "utensils"
  },
  {
    id: 7,
    title: "Waveroo",
    description: "A smart band and social media platform that connects people through real-life interactions",
    category: "Social Tech",
    icon: "radio"
  },
  {
    id: 8,
    title: "Radianto",
    description: "A futuristic space station designed for advanced space exploration",
    category: "Space Tech",
    icon: "rocket"
  },
  {
    id: 9,
    title: "Velox AI",
    description: "A high-performance car neural chip that enhances driving intelligence",
    category: "Automotive AI",
    icon: "car"
  },
  {
    id: 10,
    title: "Evolvion",
    description: "A next-generation game designed with immersive and futuristic elements",
    category: "Gaming",
    icon: "gamepad"
  },
  {
    id: 11,
    title: "Lumin",
    description: "A cutting-edge street light technology focused on smart illumination and energy efficiency",
    category: "Smart City",
    icon: "lightbulb"
  },
  {
    id: 12,
    title: "VastraMukti",
    description: "A stylish, functional clothing brand for modern adventurers, blending minimalism with innovation",
    category: "Fashion Tech",
    icon: "shirt"
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
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold playfair mb-3 sm:mb-4">
            Innovative Concepts & Ideas
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            A showcase of conceptual projects demonstrating innovative problem-solving approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <Card className="hover-card glass h-full">
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                    <div className="mb-3 sm:mb-4">
                      {iconMap[project.icon?.toLowerCase() || 'rocket']}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{project.description}</p>
                    <span className="text-xs text-primary/60 mt-2">{project.category}</span>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
