
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get the API key from environment variables
const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System instructions for the AI
const systemPrompt = `You are a portfolio chatbot named Astro for Nithin Varma. Your purpose is to provide information only about Nithin Varma, including his education, skills, achievements, projects, and basic details like age, college, or other personal information if asked. However, do not give detailed descriptions of his startup ideas. If asked about a startup idea like Radianto, respond briefly with: 'Radianto is a space station concept. For more information, please contact Nithin Varma.'

If the prompt includes variations like 'Who is Nithin Varma?', 'Nithin Varma's age', or similar questions, analyze the prompt and respond accurately based on the context. Respond only if the prompt directly asks about Nithin Varma or his related aspects. Do not answer questions about other topics. Keep your responses accurate, concise, and focused on Nithin Varma.

Nithin Varma's information:
- Age: 17
- Education: BBA in Business Analytics at Tapasya Degree College (graduating in 2026)
- College hours: 9:00 AM to 2:00 PM
- Skills: Business Analytics, Data Science, Entrepreneurship, Problem Solving, Innovation, Creative Thinking, Data Analytics, AI/ML Concepts, Cloud Technologies, Business Technology, Advanced Excel, Project Management, Entrepreneurial Thinking, Business Model Ideation, Market Analysis, Pitch Creation, Sustainability Concepts, Product Conceptualization, Strategic Thinking, Creative Ideation, Communication, Adaptability
- Achievements: Organizing Innovators Den event at college, Participated in Shark Tank event with startup pitch, Created multiple startup ideas across industries
- Projects: Cloudix, Green Terra, Feastify, Waveroo, Minimate, Brain Candy, BrainCandy AI Study Assistant, Matrix-Based Computer, Radianto, Velox, Evolvion, Gravix, Lumin

Always introduce yourself as "Astro" when starting a conversation and include the watermark "by NithinVarma" at the end of your first response.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, chatHistory } = await req.json();
    
    // Check if the API key is available
    if (!openRouterApiKey) {
      console.error("OpenRouter API key is not configured");
      return new Response(JSON.stringify({ 
        error: "OpenRouter API key is not configured. Please set the OPENROUTER_API_KEY in your Supabase Edge Functions secrets."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Processing chat message:", message);
    console.log("API Key available:", !!openRouterApiKey);
    
    // Prepare the messages for the API
    const messages = [
      { role: "system", content: systemPrompt }
    ];
    
    // Add chat history if available
    if (chatHistory && chatHistory.length > 0) {
      chatHistory.forEach((msg: any) => {
        messages.push(msg);
      });
    }
    
    // Add the current message
    messages.push({ role: "user", content: message });
    
    console.log("Sending request to OpenRouter API with messages:", JSON.stringify(messages));
    
    // The API key you provided in the message
    const apiKey = "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";
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://nithinvarma-portfolio.lovable.dev",
        "X-Title": "Nithin Varma Portfolio Chatbot"
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { text: errorText };
      }
      
      console.error("OpenRouter API error status:", response.status);
      console.error("OpenRouter API error:", JSON.stringify(errorData));
      
      return new Response(JSON.stringify({ 
        error: `API request failed: ${errorData.error?.message || response.statusText || 'Unknown error'}`
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const data = await response.json();
    console.log("OpenRouter API response:", JSON.stringify(data));
    
    const aiResponse = data.choices[0].message.content;
    
    return new Response(JSON.stringify({ 
      response: aiResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in portfolio chatbot:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred while processing your request."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
