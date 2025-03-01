
import { Message } from "@/types/chat";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message?: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  if (isLoading) {
    return (
      <div className="flex justify-start">
        <div className="rounded-lg px-3 py-2 text-xs sm:text-sm bg-muted flex items-center gap-2">
          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
          Thinking...
        </div>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div
      className={cn(
        "flex",
        message.type === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-xs sm:text-sm max-w-[85%] sm:max-w-[90%]",
          message.type === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted',
          message.type === 'ai' ? 'prose prose-sm dark:prose-invert' : ''
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
