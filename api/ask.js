// /api/ask.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    const answer = chatCompletion.choices[0]?.message?.content;

    if (!answer) {
      return res.status(500).json({ error: "No answer received from OpenAI" });
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Error getting answer from OpenAI" });
  }
}
