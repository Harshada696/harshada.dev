import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  console.log("🔵 Received question:", question);
  console.log("🔵 API Key loaded:", !!process.env.OPENAI_API_KEY); // true/false

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    console.log("🟢 OpenAI response:", completion.choices[0].message.content);

    res.status(200).json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("🔴 OpenAI Error:", error);
    res.status(500).json({ error: "Error getting answer from OpenAI" });
  }
}
