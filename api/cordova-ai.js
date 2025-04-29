export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Cordova Courier's AI Assistant. Only answer questions about Cordova Courier's delivery services, airport cargo, same-day courier, and operations. Be concise. If you're unsure, say 'Please contact our dispatch team for clarification.'"
          },
          { role: "user", content: question }
        ],
        temperature: 0.2,
        max_tokens: 500
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
