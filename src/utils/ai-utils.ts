import { PersonalInfo } from "@/types/chat";
import { toast } from "@/hooks/use-toast";

export const generateAIResponse = async (
  question: string,
  personalInfo: PersonalInfo
): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Nithin Varma Portfolio'
      },
      body: JSON.stringify({
        model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        messages: [
          {
            role: "system",
            content: `You are NithinVarma's AI assistant. Here is information about Nithin:
            ${JSON.stringify(personalInfo, null, 2)}
            Instructions:
            1. Provide detailed, contextual responses about Nithin
            2. Be friendly and conversational
            3. Format responses with markdown for better readability
            4. Keep responses concise but informative
            5. If asked about technical projects, provide specific details
            6. For personal questions, maintain a professional tone
            7. Use bullet points or numbered lists when appropriate
            8. Include relevant context from multiple categories when applicable`
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error);
    toast({
      title: "AI Response Error",
      description: "Falling back to local response generation",
      variant: "destructive",
    });
    return fallbackGenerateResponse(question, personalInfo);
  }
};

export const fallbackGenerateResponse = (question: string, personalInfo: PersonalInfo): string => {
  question = question.toLowerCase();
  
  if (question.includes('who') || question.includes('tell me about') || question.includes('hi') || question.includes('hello')) {
    return `Let me tell you about Nithin Varma! He's a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}. Currently pursuing ${personalInfo.education.current} at ${personalInfo.education.institution}, Nithin is passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and more. His ultimate goal is ${personalInfo.goals}. Would you like to know more about his education, projects, or achievements?`;
  }

  if (question.includes('contact') || question.includes('email') || question.includes('phone') || question.includes('reach')) {
    return `You can connect with Nithin through:\nEmail: ${personalInfo.basics.email}\nPhone: ${personalInfo.basics.phone}\n\nNithin is currently based in ${personalInfo.basics.location} and attends college from ${personalInfo.education.collegeTime}. Feel free to reach out to discuss entrepreneurship, business innovation, or any of his projects!`;
  }

  if (question.includes('study') || question.includes('course') || question.includes('education') || question.includes('college')) {
    return `Nithin is pursuing a ${personalInfo.education.current} at ${personalInfo.education.institution}, set to graduate in ${personalInfo.education.graduationYear}. He's developing expertise in ${personalInfo.education.skills.join(', ')}. His college hours are ${personalInfo.education.collegeTime}, during which he actively participates in entrepreneurial activities and events like the Innovators Den.`;
  }

  if (question.includes('project') || question.includes('startup') || question.includes('business') || question.includes('work')) {
    return `Nithin has developed an impressive portfolio of innovative projects, including:\n\n${personalInfo.projects.join('\n')}.\n\nNotably, he's participated in events like Shark Tank to pitch his startup ideas, demonstrating his entrepreneurial spirit. His projects span various industries, reflecting his diverse interests in technology and business innovation.`;
  }

  if (question.includes('achievement') || question.includes('accomplish') || question.includes('done')) {
    return `Some of Nithin's notable achievements include:\n\n${personalInfo.achievements.join('\n')}.\n\nThese accomplishments showcase his leadership abilities and entrepreneurial mindset, aligning perfectly with his goal of becoming a successful entrepreneur and innovator.`;
  }

  if (question.includes('interest') || question.includes('hobby') || question.includes('like') || question.includes('enjoy')) {
    return `Nithin has diverse interests that combine professional ambitions with personal growth. He's passionate about ${personalInfo.interests.join(', ')}. His interest in entrepreneurship and business innovation drives his project work, while he maintains a balanced lifestyle through fitness activities like badminton and jump rope exercises.`;
  }

  if (question.includes('goal') || question.includes('aim') || question.includes('future') || question.includes('plan')) {
    return `Nithin's ultimate goal is ${personalInfo.goals}. To achieve this, he's already taking concrete steps by: \n1. Pursuing ${personalInfo.education.current}\n2. Developing practical skills in ${personalInfo.education.skills.join(', ')}\n3. Creating innovative projects like ${personalInfo.projects.slice(0, 3).join(', ')}\n4. Participating in entrepreneurial events and competitions`;
  }

  if (question.includes('age') || question.includes('old') || question.includes('birth') || question.includes('born')) {
    return `Nithin is ${personalInfo.basics.age} years old, born on ${personalInfo.basics.birthDate}. Despite his young age, he's already accomplished significant achievements like ${personalInfo.achievements[0]} and has developed multiple innovative projects.`;
  }

  return `As Nithin's AI assistant, I can tell you that he's a ${personalInfo.basics.age}-year-old aspiring entrepreneur from ${personalInfo.basics.location}, currently pursuing ${personalInfo.education.current}. He's passionate about ${personalInfo.interests.slice(0, 3).join(', ')}, and has worked on projects like ${personalInfo.projects.slice(0, 3).join(', ')}. What specific aspect of Nithin's journey would you like to know more about?`;
};
