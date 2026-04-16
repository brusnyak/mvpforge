import { createRouter } from "next-connect";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

export default async function handler(request, response) {
  try {
    const { prompt } = await request.json();
    
    const completion = await openai.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        { role: "system", content: "You are an expert at building beautiful, self-contained single-file indie hacker MVPs. Output ONLY a complete, ready-to-copy HTML file (with Tailwind CDN, Alpine.js if needed, OpenRouter integration placeholder, dark mode, responsive). No explanations outside the code." },
        { role: "user", content: prompt }
      ],
    });
    
    return response.json({ result: completion.choices[0].message.content });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
