
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types/chat";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { generateAIResponse } from "@/utils/ai-utils";
import { personalInfo } from "@/data/personal-info";

export default function PersonalAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const { toast } = useToast();

  const MAX_MESSAGES = 50;
  const MESSAGE_COOLDOWN = 1000;
  const lastMessageTime = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageCount >= MAX_MESSAGES) {
      toast({
        title: "Message limit reached",
        description: `You've reached the maximum limit of ${MAX_MESSAGES} messages. Please refresh to start a new session.`,
        variant: "destructive",
      });
      return;
    }

    const now = Date.now();
    if (now - lastMessageTime[0] < MESSAGE_COOLDOWN) {
      toast({
        title: "Please wait",
        description: "A moment before sending another message.",
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
    setInput('');
    lastMessageTime[1](now);

    try {
      const aiResponseContent = await generateAIResponse(input, personalInfo);
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
            <Card className="w-[400px] shadow-2xl">
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

                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && <ChatMessage isLoading />}
                  </div>
                </ScrollArea>

                <ChatInput
                  input={input}
                  setInput={setInput}
                  onSubmit={handleSubmit}
                  isDisabled={isLoading || messageCount >= MAX_MESSAGES}
                />

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
