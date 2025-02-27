
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
        className="flex-1"
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isDisabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
