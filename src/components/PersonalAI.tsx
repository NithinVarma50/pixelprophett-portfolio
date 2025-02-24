
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: 'user' | 'ai';
  content: string;
}

export default function PersonalAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  // Personal information database
  const personalInfo = {
    collegeTime: "9:00 AM to 2:00 PM",
    name: "Nithin Varma",
    course: "BBA Business Analytics with Data Science",
    interests: ["Business Analytics", "Data Science", "Entrepreneurship", "Innovation"],
    skills: ["Data Analytics", "Business Technology", "Project Management", "Creative Ideation"],
  };

  const generateResponse = (question: string): string => {
    question = question.toLowerCase();
    
    if (question.includes('college') && question.includes('time')) {
      return `My college timing is ${personalInfo.collegeTime}.`;
    }
    
    if (question.includes('name')) {
      return `I am ${personalInfo.name}.`;
    }
    
    if (question.includes('course') || question.includes('study')) {
      return `I am pursuing ${personalInfo.course}.`;
    }
    
    if (question.includes('interest')) {
      return `My interests include: ${personalInfo.interests.join(', ')}.`;
    }
    
    if (question.includes('skill')) {
      return `My key skills are: ${personalInfo.skills.join(', ')}.`;
    }

    return "I can only answer questions about Nithin Varma. You can ask about my college timing, course, interests, or skills.";
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
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold">Personal AI Assistant</h3>
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
  );
}
