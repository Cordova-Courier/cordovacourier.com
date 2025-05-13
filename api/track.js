export default async function handler(req, res) {
  const { tn } = req.query;
  if (!tn) return res.status(400).json({ error: 'Missing tracking number' });

  const API_KEY = process.env.ONTIME360_API_KEY;
  const COMPANY_ID = 'CORDOVACOURIERLLC';
  const BASE_URL = `https://secure.ontime360.com/sites/${COMPANY_ID}/api`;

  try {
    // Step 1: Search by tracking number
    const searchRes = await fetch(`${BASE_URL}/orders?trackingNumber=${tn}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = await searchRes.text(); // grab raw body for debug
    console.log("🔍 Step 1: Status", searchRes.status);
    console.log("🔍 Step 1: Body", text);

    const searchResults = JSON.parse(text);

    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      return res.status(404).json({ error: 'Tracking number not found' });
    }

    const orderId = searchResults[0];

    // Step 2: Get order details
    const orderRes = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const orderText = await orderRes.text();
    console.log("🔍 Step 2: Status", orderRes.status);
    console.log("🔍 Step 2: Body", orderText);

    const order = JSON.parse(orderText);

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
    console.error('❌ Track API Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
