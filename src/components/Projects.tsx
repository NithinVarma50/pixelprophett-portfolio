
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/types";
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
  Rocket,
  Loader2
} from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  cloud: <Cloud className="w-12 h-12 text-primary/60" />,
  leaf: <Leaf className="w-12 h-12 text-primary/60" />,
  radio: <Radio className="w-12 h-12 text-primary/60" />,
  monitor: <Monitor className="w-12 h-12 text-primary/60" />,
  shirt: <ShirtIcon className="w-12 h-12 text-primary/60" />,
  cpu: <Cpu className="w-12 h-12 text-primary/60" />,
  graduation: <GraduationCap className="w-12 h-12 text-primary/60" />,
  bot: <Bot className="w-12 h-12 text-primary/60" />,
  utensils: <UtensilsCrossed className="w-12 h-12 text-primary/60" />,
  zap: <Zap className="w-12 h-12 text-primary/60" />,
  lightbulb: <Lightbulb className="w-12 h-12 text-primary/60" />,
  rocket: <Rocket className="w-12 h-12 text-primary/60" />
};

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "AI Assistant",
    description: "An intelligent virtual assistant powered by machine learning",
    category: "Artificial Intelligence",
    icon: "bot"
  },
  {
    id: 2,
    title: "Smart Home Hub",
    description: "Central control system for home automation",
    category: "IoT",
    icon: "cpu"
  },
  {
    id: 3,
    title: "Eco Monitor",
    description: "Environmental monitoring and analytics platform",
    category: "Sustainability",
    icon: "leaf"
  }
];

export default function Projects() {
  const { data: projects = defaultProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });
      
      return (data || defaultProjects) as Project[];
    },
    initialData: defaultProjects,
    retry: false,
    refetchOnWindowFocus: false
  });

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
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-card glass h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    {iconMap[project.icon?.toLowerCase() || 'rocket']}
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
