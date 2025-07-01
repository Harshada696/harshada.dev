module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  return res.status(200).json({
    answer: `✅ API route working! You asked: "${question}"`,
  });
};
