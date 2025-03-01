
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isDisabled }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about Nithin..."
        className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isDisabled}
        className="h-8 w-8 sm:h-10 sm:w-10"
      >
        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </form>
  );
}
