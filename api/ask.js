// api/ask.js
export default async function handler(req, res) {
  const { OpenAI } = await import("openai");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { question } = await req.json();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    return res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "API Error" });
  }
}
