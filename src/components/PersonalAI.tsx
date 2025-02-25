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

  const generateResponse = async (question: string): Promise<string> => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1",
          messages: [
            {
              role: "system",
              content: `You are NithinVarma's AI assistant. Here is information about Nithin:
              ${JSON.stringify(personalInfo, null, 2)}
              Always provide detailed, contextual responses about Nithin based on the data provided. 
              Analyze each question carefully and combine relevant information from different categories when appropriate.
              Be conversational and natural in your responses.`
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API error:', error);
      return fallbackGenerateResponse(question);
    }
  };

  const fallbackGenerateResponse = (question: string): string => {
    question = question.toLowerCase();
    
    // Introduction and basic information
    if (question.includes('who') || question.includes('tell me about') || question.includes('hi') || question.includes('hello')) {
      return `Let me tell you about Nithin Varma! He's a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}. Currently pursuing ${personalInfo.education.current} at ${personalInfo.education.institution}, Nithin is passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and more. His ultimate goal is ${personalInfo.goals}. Would you like to know more about his education, projects, or achievements?`;
    }

    // Contact information with context
    if (question.includes('contact') || question.includes('email') || question.includes('phone') || question.includes('reach')) {
      return `You can connect with Nithin through:\nEmail: ${personalInfo.basics.email}\nPhone: ${personalInfo.basics.phone}\n\nNithin is currently based in ${personalInfo.basics.location} and attends college from ${personalInfo.education.collegeTime}. Feel free to reach out to discuss entrepreneurship, business innovation, or any of his projects!`;
    }

    // Education with skills context
    if (question.includes('study') || question.includes('course') || question.includes('education') || question.includes('college')) {
      return `Nithin is pursuing a ${personalInfo.education.current} at ${personalInfo.education.institution}, set to graduate in ${personalInfo.education.graduationYear}. He's developing expertise in ${personalInfo.education.skills.join(', ')}. His college hours are ${personalInfo.education.collegeTime}, during which he actively participates in entrepreneurial activities and events like the Innovators Den.`;
    }

    // Projects with context
    if (question.includes('project') || question.includes('startup') || question.includes('business') || question.includes('work')) {
      return `Nithin has developed an impressive portfolio of innovative projects, including:\n\n${personalInfo.projects.join('\n')}.\n\nNotably, he's participated in events like Shark Tank to pitch his startup ideas, demonstrating his entrepreneurial spirit. His projects span various industries, reflecting his diverse interests in technology and business innovation.`;
    }

    // Achievements with context
    if (question.includes('achievement') || question.includes('accomplish') || question.includes('done')) {
      return `Some of Nithin's notable achievements include:\n\n${personalInfo.achievements.join('\n')}.\n\nThese accomplishments showcase his leadership abilities and entrepreneurial mindset, aligning perfectly with his goal of becoming a successful entrepreneur and innovator.`;
    }

    // Interests and hobbies with context
    if (question.includes('interest') || question.includes('hobby') || question.includes('like') || question.includes('enjoy')) {
      return `Nithin has diverse interests that combine professional ambitions with personal growth. He's passionate about ${personalInfo.interests.join(', ')}. His interest in entrepreneurship and business innovation drives his project work, while he maintains a balanced lifestyle through fitness activities like badminton and jump rope exercises.`;
    }

    // Goals and aspirations
    if (question.includes('goal') || question.includes('aim') || question.includes('future') || question.includes('plan')) {
      return `Nithin's ultimate goal is ${personalInfo.goals}. To achieve this, he's already taking concrete steps by: \n1. Pursuing ${personalInfo.education.current}\n2. Developing practical skills in ${personalInfo.education.skills.join(', ')}\n3. Creating innovative projects like ${personalInfo.projects.slice(0, 3).join(', ')}\n4. Participating in entrepreneurial events and competitions`;
    }

    // Age or birthday related
    if (question.includes('age') || question.includes('old') || question.includes('birth') || question.includes('born')) {
      return `Nithin is ${personalInfo.basics.age} years old, born on ${personalInfo.basics.birthDate}. Despite his young age, he's already accomplished significant achievements like ${personalInfo.achievements[0]} and has developed multiple innovative projects.`;
    }

    // For any other questions
    return `As Nithin's AI assistant, I can tell you that he's a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}, currently pursuing ${personalInfo.education.current}. He's passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and has worked on projects like ${personalInfo.projects.slice(0, 3).join(', ')}. What specific aspect of Nithin's journey would you like to know more about?`;
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
      const aiResponseContent = await generateResponse(input);
      const aiResponse: Message = {
        type: 'ai',
        content: aiResponseContent
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
