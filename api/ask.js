const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0].message.content.trim();
    res.status(200).json({ answer });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error.message);
    res.status(500).json({ error: "Error getting response from OpenAI." });
  }
};
