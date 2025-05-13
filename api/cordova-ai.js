import knowledge from '../data/knowledge.json';

async function handleTrackingRequest(question) {
  const match = question.match(/(?:track(?:ing)?\\s*(?:number)?[:#]?)?\\s*(\\d{6,})/i);
  const trackingNumber = match ? match[1] : null;

  if (!trackingNumber) return null;

  try {
    const res = await fetch(`https://ai.cordovacourier.com/api/track?tn=${trackingNumber}`);
    const data = await res.json();

    if (data.error) {
      return `🚫 Sorry, I couldn’t find tracking info for number **${trackingNumber}**.`;
    }

    return `📦 Tracking **${data.trackingNumber}**\n\n` +
      `**Status:** ${data.status}\n` +
      `**From:** ${data.origin}\n` +
      `**To:** ${data.destination}\n` +
      `**Collected from:** ${data.collectedFrom}\n` +
      `**Delivered to:** ${data.proofOfDelivery.deliveredTo}\n` +
      `**Pickup Time:** ${new Date(data.pickupTime).toLocaleString()}\n` +
      `**Drop-off Time:** ${new Date(data.dropoffTime).toLocaleString()}\n\n` +
      `🔗 [View full tracking & signature](https://ai.cordovacourier.com/tracking/?tn=${trackingNumber})`;
  } catch (err) {
    console.error('Track API error:', err);
    return `⚠️ Something went wrong while looking up tracking number **${trackingNumber}**.`;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  // 🧠 Step 1: Try tracking lookup first
  const trackingReply = await handleTrackingRequest(question);
  if (trackingReply) {
    return res.status(200).json({ reply: trackingReply });
  }

  // 🧠 Step 2: Otherwise fall back to ChatGPT
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
            content: `
You are Cordova Courier's AI Assistant.

Your job is to answer customer questions using only the facts provided below. If the requested information is not available, respond with: "Please contact our dispatch team for clarification 24/7 at (209) 880-9624."

Cordova Courier is open 24 hours a day, 7 days a week.

Cordova Courier offers:
- Same-day delivery services (Standard: 5 AM–5 PM, Express: pickup in 2 hours, Rush: urgent priority)
- HIPAA-compliant medical courier services (24/7 for Express and Rush)
- Freight and pallet delivery using Sprinter vans and box trucks
- Airport cargo support from SFO, SMF, OAK, SJC, and SCK
- Service across Modesto, Tracy, Manteca, Lathrop, Sacramento, San Francisco, and 50-mile radius per city
- B2B support for legal, construction, healthcare, government, and warehouse-to-jobsite delivery

If more structured reference is needed, use this knowledge data:\n${JSON.stringify(knowledge)}
            `
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.2,
        max_tokens: 400
      })
    });

    if (!openaiRes.ok) {
      const errorBody = await openaiRes.text();
      console.error('OpenAI API Error:', errorBody);
      return res.status(500).json({ error: 'OpenAI API error' });
    }

    const data = await openaiRes.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No response from AI.' });
    }

    const aiReply = data.choices[0].message.content.trim();
    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error('Unexpected Error Calling OpenAI:', error);
    return res.status(500).json({ error: 'Failed to get response from Cordova AI.' });
  }
}
