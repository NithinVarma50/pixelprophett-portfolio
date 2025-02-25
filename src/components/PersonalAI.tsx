
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
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const { toast } = useToast();

  const MAX_MESSAGES = 20; // Limit for messages per session
  const MESSAGE_COOLDOWN = 2000; // 2 seconds cooldown between messages
  const lastMessageTime = useState<number>(0);

  // Personal information database
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
      return `I am NithinVarma's AI assistant. I can tell you that Nithin is a ${personalInfo.basics.age}-year-old entrepreneur from ${personalInfo.basics.location}, born on ${personalInfo.basics.birthDate}.`;
    }
    
    if (question.includes('age') || question.includes('born') || question.includes('birth')) {
      return `Nithin is ${personalInfo.basics.age} years old, born on ${personalInfo.basics.birthDate}.`;
    }

    if (question.includes('contact') || question.includes('email') || question.includes('phone')) {
      return `You can reach Nithin at:\nEmail: ${personalInfo.basics.email}\nPhone: ${personalInfo.basics.phone}`;
    }

    // Education
    if (question.includes('study') || question.includes('course') || question.includes('education')) {
      return `Nithin is pursuing ${personalInfo.education.current} at ${personalInfo.education.institution}, set to graduate in ${personalInfo.education.graduationYear}.`;
    }

    if (question.includes('college') && question.includes('time')) {
      return `Nithin's college timing is ${personalInfo.education.collegeTime}.`;
    }

    if (question.includes('skill')) {
      return `Nithin's key skills include: ${personalInfo.education.skills.join(', ')}.`;
    }

    // Projects
    if (question.includes('project') || question.includes('startup') || question.includes('business')) {
      return `Nithin has worked on various innovative projects including: ${personalInfo.projects.join(', ')}.`;
    }

    // Achievements
    if (question.includes('achievement') || question.includes('accomplish')) {
      return `Some of Nithin's key achievements include: ${personalInfo.achievements.join('; ')}.`;
    }

    // Interests
    if (question.includes('interest') || question.includes('hobby') || question.includes('like')) {
      return `Nithin's interests include: ${personalInfo.interests.join(', ')}.`;
    }

    // Goals
    if (question.includes('goal') || question.includes('aim') || question.includes('future')) {
      return `Nithin's goal is ${personalInfo.goals}.`;
    }

    // Event-specific
    if (question.includes('innovators den') || question.includes('event')) {
      return "Nithin is organizing Innovators Den, a major event at his college that brings together ambitious minds to showcase and discuss groundbreaking ideas.";
    }

    // Lifestyle
    if (question.includes('fitness') || question.includes('exercise') || question.includes('sports')) {
      return "Nithin is dedicated to fitness and plays badminton. He also includes jump rope exercises in his routine for fitness and growth.";
    }

    return "I'm NithinVarma's AI assistant. I can tell you about Nithin's background, education, projects, achievements, interests, and goals. Please feel free to ask about any of these topics!";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check message limits
    if (messageCount >= MAX_MESSAGES) {
      toast({
        title: "Message limit reached",
        description: "You've reached the maximum number of messages for this session. Please refresh to start a new session.",
        variant: "destructive",
      });
      return;
    }

    // Check cooldown
    const now = Date.now();
    if (now - lastMessageTime[0] < MESSAGE_COOLDOWN) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
      });
      return;
    }

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

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    lastMessageTime[1](now);

    try {
      const aiResponse: Message = {
        type: 'ai',
        content: generateResponse(input)
      };

      setMessages(prev => [...prev, aiResponse]);
      setMessageCount(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      console.error('AI response error:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
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
                    <h3 className="text-lg font-semibold">NithinVarma's AI</h3>
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
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-lg px-4 py-2 bg-muted">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Nithin..."
                    className="flex-1"
                    disabled={isLoading || messageCount >= MAX_MESSAGES}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || messageCount >= MAX_MESSAGES}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                {messageCount > 0 && (
                  <div className="text-xs text-muted-foreground text-center">
                    {MAX_MESSAGES - messageCount} messages remaining
                  </div>
                )}
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
