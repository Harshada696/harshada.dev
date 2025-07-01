export default async function handler(req, res) {
  try {
    const { question } = req.body;
    console.log("Received question:", question);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    console.log("OpenAI response:", response);

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Error getting answer from OpenAI" });
  }
}
