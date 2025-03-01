
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Key } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isDisabled }: ChatInputProps) {
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiType, setApiType] = useState<"mistral" | "openrouter">("mistral");

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) return;
    
    if (apiType === "mistral") {
      localStorage.setItem('VITE_MISTRAL_API_KEY', apiKey);
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_MISTRAL_API_KEY = apiKey;
    } else {
      localStorage.setItem('VITE_OPENROUTER_API_KEY', apiKey);
      // @ts-ignore - We know this is safe in the browser
      import.meta.env.VITE_OPENROUTER_API_KEY = apiKey;
    }
    
    setApiKey("");
    setShowApiInput(false);
  };

  return (
    <div className="space-y-2">
      {showApiInput ? (
        <div className="flex flex-col space-y-2">
          <div className="flex gap-2 items-center">
            <select 
              className="h-8 sm:h-10 px-2 text-xs sm:text-sm border rounded-md"
              value={apiType}
              onChange={(e) => setApiType(e.target.value as "mistral" | "openrouter")}
            >
              <option value="mistral">Mistral AI</option>
              <option value="openrouter">OpenRouter</option>
            </select>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter ${apiType === "mistral" ? "Mistral" : "OpenRouter"} API key`}
              className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSaveApiKey}
              className="h-8 sm:h-10 text-xs sm:text-sm flex-1"
              size="sm"
            >
              Save Key
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowApiInput(false)}
              className="h-8 sm:h-10 text-xs sm:text-sm flex-1"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
            disabled={isDisabled}
          />
          <Button 
            type="button" 
            variant="outline"
            size="icon" 
            onClick={() => setShowApiInput(true)}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Key className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            disabled={isDisabled}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
