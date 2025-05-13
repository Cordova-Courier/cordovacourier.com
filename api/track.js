// === /api/track.js (Vercel Serverless Function using official OnTime360 API) ===
// Securely returns filtered tracking data for Cordova AI & schema use

export default async function handler(req, res) {
  const { tn } = req.query;
  if (!tn) return res.status(400).json({ error: 'Missing tracking number' });

  const apiKey = process.env.ONTIME360_API_KEY;
  const endpoint = `https://api.ontime360.com/v1/orders/${tn}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Tracking number not found or unauthorized' });
    }

    const order = await response.json();

    // Extract and format data safely
    const data = {
      trackingNumber: order.OrderNumber || tn,
      status: order.Status?.Name || 'Unknown',
      origin: `${order.Origin?.City || ''}, ${order.Origin?.State || ''}`.trim(),
      destination: `${order.Destination?.City || ''}, ${order.Destination?.State || ''}`.trim(),
      pickupTime: order.ActualPickupTime || order.ExpectedPickupTime || '',
      dropoffTime: order.ActualDeliveryTime || order.ExpectedDeliveryTime || '',
      vehicle: order.VehicleType || '',
      history: order.History?.map(h => ({
        time: h.Timestamp,
        status: h.StatusName,
        note: h.Note
      })) || []
    };

    res.status(200).json(data);

  } catch (err) {
    console.error('Track API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
