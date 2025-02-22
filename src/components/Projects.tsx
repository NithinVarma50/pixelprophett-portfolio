
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const projects = [
  {
    title: "Cloudix",
    description: "A cloud gaming service with dedicated servers and a custom gaming router.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Cloud Computing & Gaming"
  },
  {
    title: "Green Terra",
    description: "A plant-based food service with sustainable packaging and eco-friendly options.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "E-commerce & Sustainability"
  },
  {
    title: "Waveroo",
    description: "A smart band & social media app enhancing real-world and virtual connectivity.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    category: "Smart Devices & Social"
  },
  {
    title: "Minimate",
    description: "An affordable portable computer software for accessibility.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Software"
  },
  {
    title: "Vastramukti",
    description: "A compact travel and fitness product blending fashion and function.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "Fashion & Fitness"
  },
  {
    title: "Matrix-Based Computer",
    description: "A computing concept using multi-dimensional processing for efficiency.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Technology"
  },
  {
    title: "BrainCandy",
    description: "An education platform making learning engaging and interactive.",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    category: "EdTech"
  },
  {
    title: "BrainCandy AI Study Assistant",
    description: "An AI-powered tool for personalized study assistance.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "AI & EdTech"
  },
  {
    title: "Feastify",
    description: "A cloud restaurant concept optimized for digital ordering and delivery.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Cloud & Food Tech"
  },
  {
    title: "Velox AI",
    description: "An AI automation tool improving business productivity.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "AI & Automation"
  },
  {
    title: "Lumin",
    description: "A smart lighting system with energy-efficient AI control.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "Smart Home & IoT"
  },
  {
    title: "Evolvion",
    description: "A tech-driven startup focused on innovation and futuristic solutions.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of innovative solutions spanning various technology domains and business sectors.
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
              <Card className="hover-card glass overflow-hidden h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <Button variant="outline" className="w-full group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
