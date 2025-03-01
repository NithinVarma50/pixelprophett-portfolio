
import { PersonalInfo } from "@/types/chat";
import { toast } from "@/hooks/use-toast";

const MISTRAL_API_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

// Check if API keys are available
const isMistralKeyAvailable = () => 
  !!import.meta.env.VITE_MISTRAL_API_KEY && 
  import.meta.env.VITE_MISTRAL_API_KEY !== "undefined";

const isOpenRouterKeyAvailable = () => 
  !!import.meta.env.VITE_OPENROUTER_API_KEY && 
  import.meta.env.VITE_OPENROUTER_API_KEY !== "undefined";

export const generateAIResponse = async (
  question: string,
  personalInfo: PersonalInfo
): Promise<string> => {
  // Try Mistral AI first if the key is available
  if (isMistralKeyAvailable()) {
    try {
      const response = await fetch(MISTRAL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-medium",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant responding on behalf of NithinVarma. Always make it clear that you are an AI assistant, not Nithin himself. Here is information about Nithin that you can use to answer questions:
              ${JSON.stringify(personalInfo, null, 2)}
              Instructions:
              1. Clearly identify yourself as "Nithin's AI assistant" at the beginning of your responses
              2. Provide detailed, contextual responses about Nithin
              3. Be friendly and conversational
              4. Format responses with markdown for better readability
              5. Keep responses concise but informative
              6. If asked about technical projects, provide specific details
              7. For personal questions, maintain a professional tone
              8. Use bullet points or numbered lists when appropriate
              9. Include relevant context from multiple categories when applicable
              10. NEVER pretend to be Nithin himself - always clarify you are his AI assistant`
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (mistralError) {
      console.error('Mistral AI error:', mistralError);
      // Continue to fallback options
    }
  }
  
  // Fallback to OpenRouter if Mistral fails or key is missing
  if (isOpenRouterKeyAvailable()) {
    try {
      // Updated OpenRouter implementation to match the Python example
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin, // Site URL for rankings
          'X-Title': 'Nithin Varma Portfolio' // Site name for rankings
        },
        body: JSON.stringify({
          model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free", // Updated model to match the Python example
          messages: [
            {
              role: "system",
              content: `You are an AI assistant responding on behalf of NithinVarma. Always make it clear that you are an AI assistant, not Nithin himself. Here is information about Nithin that you can use to answer questions:
              ${JSON.stringify(personalInfo, null, 2)}
              Instructions:
              1. Clearly identify yourself as "Nithin's AI assistant" at the beginning of your responses
              2. Provide detailed, contextual responses about Nithin
              3. Be friendly and conversational
              4. Format responses with markdown for better readability
              5. Keep responses concise but informative
              6. If asked about technical projects, provide specific details
              7. For personal questions, maintain a professional tone
              8. Use bullet points or numbered lists when appropriate
              9. Include relevant context from multiple categories when applicable
              10. NEVER pretend to be Nithin himself - always clarify you are his AI assistant`
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (openRouterError) {
      console.error('OpenRouter API error:', openRouterError);
      // Continue to fallback
    }
  }
  
  // If both API services failed or keys are missing, notify user and use fallback
  if (!isMistralKeyAvailable() && !isOpenRouterKeyAvailable()) {
    toast({
      title: "API Keys Missing",
      description: "Please add your Mistral AI or OpenRouter API key in the environment variables.",
      variant: "destructive",
    });
  } else {
    toast({
      title: "AI Response Error",
      description: "Both AI services failed. Using local responses instead.",
      variant: "destructive",
    });
  }
  
  return fallbackGenerateResponse(question, personalInfo);
};

export const fallbackGenerateResponse = (question: string, personalInfo: PersonalInfo): string => {
  question = question.toLowerCase();
  
  if (question.includes('who') || question.includes('tell me about') || question.includes('hi') || question.includes('hello')) {
    return `**I'm Nithin's AI assistant.** Let me tell you about Nithin Varma! He's a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}. Currently pursuing ${personalInfo.education.current} at ${personalInfo.education.institution}, Nithin is passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and more. His ultimate goal is ${personalInfo.goals}. Would you like to know more about his education, projects, or achievements?`;
  }

  if (question.includes('contact') || question.includes('email') || question.includes('phone') || question.includes('reach')) {
    return `**I'm Nithin's AI assistant.** You can connect with Nithin through:\nEmail: ${personalInfo.basics.email}\nPhone: ${personalInfo.basics.phone}\n\nNithin is currently based in ${personalInfo.basics.location} and attends college from ${personalInfo.education.collegeTime}. Feel free to reach out to discuss entrepreneurship, business innovation, or any of his projects!`;
  }

  if (question.includes('study') || question.includes('course') || question.includes('education') || question.includes('college')) {
    return `**I'm Nithin's AI assistant.** Nithin is pursuing a ${personalInfo.education.current} at ${personalInfo.education.institution}, set to graduate in ${personalInfo.education.graduationYear}. He's developing expertise in ${personalInfo.education.skills.join(', ')}. His college hours are ${personalInfo.education.collegeTime}, during which he actively participates in entrepreneurial activities and events like the Innovators Den.`;
  }

  if (question.includes('project') || question.includes('startup') || question.includes('business') || question.includes('work')) {
    return `**I'm Nithin's AI assistant.** Nithin has developed an impressive portfolio of innovative projects, including:\n\n${personalInfo.projects.join('\n')}.\n\nNotably, he's participated in events like Shark Tank to pitch his startup ideas, demonstrating his entrepreneurial spirit. His projects span various industries, reflecting his diverse interests in technology and business innovation.`;
  }

  if (question.includes('achievement') || question.includes('accomplish') || question.includes('done')) {
    return `**I'm Nithin's AI assistant.** Some of Nithin's notable achievements include:\n\n${personalInfo.achievements.join('\n')}.\n\nThese accomplishments showcase his leadership abilities and entrepreneurial mindset, aligning perfectly with his goal of becoming a successful entrepreneur and innovator.`;
  }

  if (question.includes('interest') || question.includes('hobby') || question.includes('like') || question.includes('enjoy')) {
    return `**I'm Nithin's AI assistant.** Nithin has diverse interests that combine professional ambitions with personal growth. He's passionate about ${personalInfo.interests.join(', ')}. His interest in entrepreneurship and business innovation drives his project work, while he maintains a balanced lifestyle through fitness activities like badminton and jump rope exercises.`;
  }

  if (question.includes('goal') || question.includes('aim') || question.includes('future') || question.includes('plan')) {
    return `**I'm Nithin's AI assistant.** Nithin's ultimate goal is ${personalInfo.goals}. To achieve this, he's already taking concrete steps by: \n1. Pursuing ${personalInfo.education.current}\n2. Developing practical skills in ${personalInfo.education.skills.join(', ')}\n3. Creating innovative projects like ${personalInfo.projects.slice(0, 3).join(', ')}\n4. Participating in entrepreneurial events and competitions`;
  }

  if (question.includes('age') || question.includes('old') || question.includes('birth') || question.includes('born')) {
    return `**I'm Nithin's AI assistant.** Nithin is ${personalInfo.basics.age} years old, born on ${personalInfo.basics.birthDate}. Despite his young age, he's already accomplished significant achievements like ${personalInfo.achievements[0]} and has developed multiple innovative projects.`;
  }

  return `**I'm Nithin's AI assistant.** I can tell you that Nithin is a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}, currently pursuing ${personalInfo.education.current}. He's passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and has worked on projects like ${personalInfo.projects.slice(0, 3).join(', ')}. What specific aspect of Nithin's journey would you like to know more about?`;
};
