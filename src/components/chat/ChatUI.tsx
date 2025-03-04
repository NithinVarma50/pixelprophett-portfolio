
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { MessageCircle, X } from "lucide-react";
import { sendChatMessage } from "@/utils/ai-utils";
import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export function ChatUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Add welcome message if opening chat for the first time and no messages
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          type: "ai",
          content: "Hi there! I'm Astro, Nithin Varma's portfolio assistant. How can I help you today? by NithinVarma"
        }
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      type: "user",
      content: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare chat history for the API in the correct format
      const formattedHistory = messages.map(msg => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content
      }));

      // Send message to API
      const response = await sendChatMessage(input, formattedHistory);
      
      // Add AI response to chat
      const aiMessage: Message = {
        type: "ai",
        content: response
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        type: "ai",
        content: "Sorry, I couldn't process your request. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className="rounded-full w-12 h-12 p-0 shadow-lg"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-background border border-border rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary text-primary-foreground p-3 font-medium flex justify-between items-center">
            <span>Chat with Astro</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={toggleChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && <ChatMessage isLoading />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t">
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              isDisabled={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
