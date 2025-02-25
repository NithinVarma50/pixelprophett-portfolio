
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    const HUGGINGFACE_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY');

    const response = await fetch(
      'https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `You are Nithin Varma's personal AI assistant. Use this context to answer: ${JSON.stringify(personalInfo)}
          
          User question: ${prompt}
          
          Remember to only answer questions about Nithin Varma and be friendly and helpful.`,
          parameters: {
            max_tokens: 500,
            temperature: 0.7,
          },
        }),
      }
    );

    const result = await response.json();
    return new Response(JSON.stringify({ answer: result[0].generated_text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

const personalInfo = {
  basics: {
    name: "Nithin Varma",
    age: "17",
    birthDate: "May 4, 2007",
    email: "nv787265@gmail.com",
    phone: "9381904726",
    location: "India"
  },
  education: {
    current: "BBA in Business Analytics",
    institution: "Tapasya Degree College",
    graduationYear: "2026",
    collegeTime: "9:00 AM to 2:00 PM",
    skills: ["Data Science", "Business Analytics", "MS Excel", "Business Problem-Solving"]
  },
  projects: [
    "Cloudix", "Green Terra", "Feastify", "Waveroo", "Minimate",
    "Brain Candy", "BrainCandy AI Study Assistant", "Matrix-Based Computer",
    "Radianto", "Velox", "Evolvion", "Gravix", "Lumin"
  ],
  achievements: [
    "Organizing Innovators Den event at college",
    "Participated in Shark Tank event with startup pitch",
    "Created multiple startup ideas across industries"
  ],
  interests: [
    "Entrepreneurship",
    "Business Innovation",
    "Technology",
    "Fitness",
    "Badminton",
    "Jump rope exercises"
  ],
  goals: "To become a great entrepreneur and billionaire, building and scaling groundbreaking businesses that disrupt industries"
};
