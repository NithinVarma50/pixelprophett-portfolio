
import { supabase } from "@/integrations/supabase/client";
import { personalInfo } from "@/data/personal-info";

export async function sendChatMessage(message: string, chatHistory: any[] = []) {
  try {
    console.log("Sending chat message:", message);
    console.log("Chat history:", chatHistory);
    
    const { data, error } = await supabase.functions.invoke("chat-with-portfolio", {
      body: { message, chatHistory },
    });

    if (error) {
      console.error("Error calling chat-with-portfolio function:", error);
      throw new Error(error.message || "Failed to get a response");
    }

    console.log("Response from chat-with-portfolio:", data);

    if (data.error) {
      console.error("Error returned from chat-with-portfolio:", data.error);
      throw new Error(data.error || "Failed to get a response from AI");
    }

    return data.response;
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    throw error;
  }
}
