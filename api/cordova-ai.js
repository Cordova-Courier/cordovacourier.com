export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided.' });
  }

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
            content: "You are Cordova Courier's AI Assistant. Only answer questions about Cordova Courier's delivery services, airport cargo, freight, same-day courier, and operations. If you are not sure, reply: 'Please contact our dispatch team for clarification.'"
          },
          { role: "user", content: question }
        ],
        temperature: 0.2,
        max_tokens: 400
      })
    });

    const data = await openaiRes.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from AI.' });
    }

    const aiReply = data.choices[0].message.content.trim();

    return res.status(200).json({ reply: aiReply });

    } catch (error) {
    console.error('Error calling OpenAI:', error);

    try {
      const responseText = await error?.response?.text?.();
      console.error('OpenAI Error Response:', responseText);
    } catch (readError) {
      console.error('Could not read OpenAI error response:', readError);
    }

    return res.status(500).json({ error: 'Failed to get response from Cordova AI.' });
  }
}
