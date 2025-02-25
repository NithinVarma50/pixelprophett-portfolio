
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  type: 'user' | 'ai';
  content: string;
}

export default function PersonalAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Comprehensive personal information database
  const personalInfo = {
    basics: {
      name: "Nithin Varma",
      age: "17",
      birthDate: "May 4, 2007",
      email: "nv787265@gmail.com",
      phone: "9381904726",
      location: "India"
    },
    education: {
      current: "BBA in Business Analytics",
      institution: "Tapasya Degree College",
      graduationYear: "2026",
      collegeTime: "9:00 AM to 2:00 PM",
      skills: ["Data Science", "Business Analytics", "MS Excel", "Business Problem-Solving"]
    },
    projects: [
      "Cloudix", "Green Terra", "Feastify", "Waveroo", "Minimate",
      "Brain Candy", "BrainCandy AI Study Assistant", "Matrix-Based Computer",
      "Radianto", "Velox", "Evolvion", "Gravix", "Lumin"
    ],
    achievements: [
      "Organizing Innovators Den event at college",
      "Participated in Shark Tank event with startup pitch",
      "Created multiple startup ideas across industries"
    ],
    interests: [
      "Entrepreneurship",
      "Business Innovation",
      "Technology",
      "Fitness",
      "Badminton",
      "Jump rope exercises"
    ],
    goals: "To become a great entrepreneur and billionaire, building and scaling groundbreaking businesses that disrupt industries"
  };

  const generateResponse = (question: string): string => {
    question = question.toLowerCase();
    
    // Basic information
    if (question.includes('name') || question.includes('who are you')) {
      return `I am ${personalInfo.basics.name}, a ${personalInfo.basics.age}-year-old entrepreneur from ${personalInfo.basics.location}.`;
    }
    
    if (question.includes('age') || question.includes('born') || question.includes('birth')) {
      return `I am ${personalInfo.basics.age} years old, born on ${personalInfo.basics.birthDate}.`;
    }

    if (question.includes('contact') || question.includes('email') || question.includes('phone')) {
      return `You can reach me at:\nEmail: ${personalInfo.basics.email}\nPhone: ${personalInfo.basics.phone}`;
    }

    // Education
    if (question.includes('study') || question.includes('course') || question.includes('education')) {
      return `I am pursuing ${personalInfo.education.current} at ${personalInfo.education.institution}, set to graduate in ${personalInfo.education.graduationYear}.`;
    }

    if (question.includes('college') && question.includes('time')) {
      return `My college timing is ${personalInfo.education.collegeTime}.`;
    }

    if (question.includes('skill')) {
      return `My key skills include: ${personalInfo.education.skills.join(', ')}.`;
    }

    // Projects
    if (question.includes('project') || question.includes('startup') || question.includes('business')) {
      return `I have worked on various projects including: ${personalInfo.projects.join(', ')}.`;
    }

    // Achievements
    if (question.includes('achievement') || question.includes('accomplish')) {
      return `Some of my key achievements include: ${personalInfo.achievements.join('; ')}.`;
    }

    // Interests
    if (question.includes('interest') || question.includes('hobby') || question.includes('like')) {
      return `My interests include: ${personalInfo.interests.join(', ')}.`;
    }

    // Goals
    if (question.includes('goal') || question.includes('aim') || question.includes('future')) {
      return `My goal is ${personalInfo.goals}.`;
    }

    // Event-specific
    if (question.includes('innovators den') || question.includes('event')) {
      return "I am organizing Innovators Den, a major event at my college that brings together ambitious minds to showcase and discuss groundbreaking ideas.";
    }

    // Lifestyle
    if (question.includes('fitness') || question.includes('exercise') || question.includes('sports')) {
      return "I am dedicated to fitness and play badminton. I also include jump rope exercises in my routine for fitness and growth.";
    }

    return "I can answer questions about Nithin Varma's background, education, projects, achievements, interests, and goals. Please feel free to ask about any of these topics!";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        title: "Empty message",
        description: "Please type a message first.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      type: 'user',
      content: input
    };

    const aiResponse: Message = {
      type: 'ai',
      content: generateResponse(input)
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-[350px] shadow-2xl">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Personal AI Assistant</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Nithin..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
