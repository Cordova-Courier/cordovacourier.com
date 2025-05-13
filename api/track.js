// /api/track.js — Final fallback using StatusName, Note, or mapped StatusLevel
export default async function handler(req, res) {
  const { tn } = req.query;
  if (!tn) return res.status(400).json({ error: 'Missing tracking number' });

  const API_KEY = process.env.ONTIME360_API_KEY;
  const COMPANY_ID = 'CORDOVACOURIERLLC';
  const BASE_URL = `https://secure.ontime360.com/sites/${COMPANY_ID}/api`;

  const statusMap = {
    0: 'None',
    1: 'Dispatched',
    2: 'Assigned / In Route',
    3: 'Delivered',
    4: 'Cancelled',
    5: 'Cancelled - Billable',
    6: 'Assigned',
    7: 'Stored',
    8: 'Unassigned Stored',
    9: 'Quoted'
  };

  try {
    const searchRes = await fetch(`${BASE_URL}/orders?trackingNumber=${tn}`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const searchResults = await searchRes.json();
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      return res.status(404).json({ error: 'Tracking number not found' });
    }

    const orderId = searchResults[0];

    const orderRes = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const order = await orderRes.json();

    const historyRes = await fetch(`${BASE_URL}/orderStatusChanges/${orderId}`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const historyData = await historyRes.json();

    const data = {
      trackingNumber: order.TrackingNumber || tn,
      status: order.Status?.Description || order.Status?.Name || statusMap[order.Status?.Level] || 'Unknown',
      origin: `${order.CollectionLocation?.City || ''}, ${order.CollectionLocation?.State || ''}`.trim(),
      destination: `${order.DeliveryLocation?.City || ''}, ${order.DeliveryLocation?.State || ''}`.trim(),
      pickupTime: order.CollectionArrivalDate || order.CollectionArrivalWindow?.EarliestTime || '',
      dropoffTime: order.DeliveryArrivalDate || order.DeliveryArrivalWindow?.EarliestTime || '',
      vehicle: order.VehicleRequired?.Name || '',
      history: Array.isArray(historyData) ? historyData.map(h => ({
        time: h.Timestamp,
        status: h.StatusName || h.Note || statusMap[h.StatusLevel] || 'Unknown',
        note: h.Note || ''
      })) : []
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error('Track API error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
