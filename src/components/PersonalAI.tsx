
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, X, Settings } from "lucide-react";
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
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [mistralKey, setMistralKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const { toast } = useToast();
  
  const MAX_MESSAGES = 50;
  const MESSAGE_COOLDOWN = 1000;
  const lastMessageTime = useState<number>(0);
  
  // Check if API keys exist in local storage on component mount
  useEffect(() => {
    const storedMistralKey = localStorage.getItem('VITE_MISTRAL_API_KEY');
    const storedOpenRouterKey = localStorage.getItem('VITE_OPENROUTER_API_KEY');
    
    if (storedMistralKey) {
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_MISTRAL_API_KEY = storedMistralKey;
      setMistralKey(storedMistralKey);
    }
    
    if (storedOpenRouterKey) {
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_OPENROUTER_API_KEY = storedOpenRouterKey;
      setOpenRouterKey(storedOpenRouterKey);
    }
    
    // Show API key prompt if no keys are available
    if (!storedMistralKey && !storedOpenRouterKey) {
      setShowApiKeyPrompt(true);
    }
  }, []);

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
      setShowApiKeyPrompt(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveApiKeys = () => {
    if (mistralKey) {
      localStorage.setItem('VITE_MISTRAL_API_KEY', mistralKey);
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_MISTRAL_API_KEY = mistralKey;
    }
    
    if (openRouterKey) {
      localStorage.setItem('VITE_OPENROUTER_API_KEY', openRouterKey);
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_OPENROUTER_API_KEY = openRouterKey;
    }
    
    setShowApiKeyPrompt(false);
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved for this session.",
    });
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
                    <h3 className="text-base sm:text-lg font-semibold">NithinVarma's AI</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowApiKeyPrompt(true)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {showApiKeyPrompt ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Enter your API Keys</h4>
                    <div className="space-y-2">
                      <label className="text-xs">
                        Mistral AI Key:
                        <input 
                          type="password"
                          className="w-full p-2 mt-1 text-xs border rounded"
                          value={mistralKey}
                          onChange={(e) => setMistralKey(e.target.value)}
                          placeholder="Enter Mistral AI key"
                        />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs">
                        OpenRouter Key:
                        <input 
                          type="password"
                          className="w-full p-2 mt-1 text-xs border rounded"
                          value={openRouterKey}
                          onChange={(e) => setOpenRouterKey(e.target.value)}
                          placeholder="Enter OpenRouter key"
                        />
                      </label>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={saveApiKeys}
                        className="text-xs h-8"
                        size="sm"
                      >
                        Save Keys
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowApiKeyPrompt(false)}
                        className="text-xs h-8"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Note: API keys are stored in your browser's local storage, not on our servers.
                    </p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="h-[280px] sm:h-[320px] md:h-[400px] pr-2 sm:pr-4">
                      <div className="space-y-3 sm:space-y-4">
                        {messages.length === 0 && (
                          <div className="text-xs sm:text-sm text-center text-muted-foreground p-4">
                            Ask me anything about Nithin Varma!
                          </div>
                        )}
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
                      isDisabled={isLoading || messageCount >= MAX_MESSAGES || showApiKeyPrompt}
                    />

                    {messageCount > 0 && (
                      <div className="text-xs text-muted-foreground text-center">
                        {MAX_MESSAGES - messageCount} messages remaining
                      </div>
                    )}
                  </>
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
