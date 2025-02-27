
import { Message } from "@/types/chat";
import { Loader2 } from "lucide-react";

interface ChatMessageProps {
  message?: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  if (isLoading) {
    return (
      <div className="flex justify-start">
        <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Thinking...
        </div>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div
      className={`flex ${
        message.type === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`rounded-lg px-4 py-2 max-w-[90%] ${
          message.type === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        } ${
          message.type === 'ai' ? 'prose prose-sm dark:prose-invert' : ''
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
