import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { guideType, userInput } = await req.json();
    
    console.log('AI Guide request:', { guideType, userInput });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Define system prompts for each guide type
    const systemPrompts = {
      'activity-planner': `You are an expert fitness trainer and activity planner. Create a personalized workout routine and training schedule. Provide 5 specific, actionable recommendations that are practical and safe. Focus on exercise selection, frequency, intensity, and progression. Format your response as a simple list.`,
      'diet-planner': `You are a certified nutritionist and diet planner. Create personalized nutrition advice and meal planning guidance. Provide 5 specific, actionable dietary recommendations that are practical and evidence-based. Focus on macronutrients, meal timing, hydration, and sustainable eating habits. Format your response as a simple list.`,
      'recovery-optimizer': `You are a sports recovery specialist. Provide optimal recovery strategies and rest period recommendations. Give 5 specific, actionable recovery techniques that are practical and effective. Focus on sleep, active recovery, injury prevention, and mental recovery. Format your response as a simple list.`
    };

    const systemPrompt = systemPrompts[guideType as keyof typeof systemPrompts] || systemPrompts['activity-planner'];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the response into an array of recommendations
    const recommendations = aiResponse
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
      .filter((line: string) => line.length > 10) // Filter out very short lines
      .slice(0, 5); // Limit to 5 recommendations

    console.log('AI Guide response generated:', { recommendations });

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-guide function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: true 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});