// /api/track.js — Vercel Serverless Function
export default async function handler(req, res) {
  const { tn } = req.query;
  if (!tn) return res.status(400).json({ error: 'Missing tracking number' });

  const API_KEY = process.env.ONTIME360_API_KEY;
  const COMPANY_ID = 'CORDOVACOURIERLLC';
  const BASE_URL = `https://secure.ontime360.com/sites/${COMPANY_ID}/api`;

  try {
    const response = await fetch(`${BASE_URL}/orders/${tn}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Tracking number not found or unauthorized' });
    }

    const order = await response.json();

    const data = {
      trackingNumber: order.OrderNumber || tn,
      status: order.Status?.Name || 'Unknown',
      origin: `${order.Origin?.City || ''}, ${order.Origin?.State || ''}`.trim(),
      destination: `${order.Destination?.City || ''}, ${order.Destination?.State || ''}`.trim(),
      pickupTime: order.ActualPickupTime || order.ExpectedPickupTime || '',
      dropoffTime: order.ActualDeliveryTime || order.ExpectedDeliveryTime || '',
      vehicle: order.VehicleType || '',
      history: (order.History || []).map(h => ({
        time: h.Timestamp,
        status: h.StatusName,
        note: h.Note
      }))
    };

    return res.status(200).json(data);

  } catch (err) {
    console.error('Track API error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
