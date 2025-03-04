
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types/chat";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { sendChatMessage } from "@/utils/ai-utils";

export default function PersonalAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const { toast } = useToast();
  
  const MAX_MESSAGES = 50;
  const MESSAGE_COOLDOWN = 1000;
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  
  // Send initial greeting message when the chat is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        type: 'ai',
        content: "Hi there! 👋 I'm Astro, your guide to Nithin Varma's portfolio. Ask me anything about Nithin's education, skills, projects, or achievements! by NithinVarma"
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

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
    if (now - lastMessageTime < MESSAGE_COOLDOWN) {
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
    setLastMessageTime(now);

    try {
      // Prepare the chat history for the API
      const chatHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const aiResponseContent = await sendChatMessage(input, chatHistory);
      const aiResponse: Message = {
        type: 'ai',
        content: aiResponseContent
      };

      setMessages(prev => [...prev, aiResponse]);
      setMessageCount(prev => prev + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error('AI response error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-[380px] md:w-[400px]" 
          >
            <Card className="shadow-2xl">
              <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <h3 className="text-base sm:text-lg font-semibold">Astro</h3>
                    <span className="text-xs text-muted-foreground">by NithinVarma</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <ScrollArea className="h-[280px] sm:h-[320px] md:h-[400px] pr-2 sm:pr-4">
                  <div className="space-y-3 sm:space-y-4">
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
