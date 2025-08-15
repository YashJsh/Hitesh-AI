import { HiteshPersona } from '@/constants/hitesh';
import { NextRequest, NextResponse } from 'next/server';
import {OpenAI} from 'openai'


const client=new OpenAI({
  apiKey:process.env.GEMINI_API_KEY,
  baseURL:'https://generativelanguage.googleapis.com/v1beta/openai'
})

const initialGreeting = "Haanji, kaise hain aap? Swagat hai aapka yahan pe.";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
       const messagesWithPersona = [
      { role: 'system', content: HiteshPersona },
      { role: 'assistant', content: initialGreeting },
      ...messages
    ];

    const aiResponse = await client.chat.completions.create({
      model:'gemini-2.5-flash',
      messages : messagesWithPersona
    });
    return NextResponse.json({ message: aiResponse.choices[0].message || { content: '' }});
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'AI response failed' }, { status: 500 });
  }
}