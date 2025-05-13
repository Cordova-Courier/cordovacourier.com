// /api/track.js — now includes proofOfDelivery with signature and recipient
export default async function handler(req, res) {
  const { tn } = req.query;
  if (!tn) return res.status(400).json({ error: 'Missing tracking number' });

  const API_KEY = process.env.ONTIME360_API_KEY;
  const COMPANY_ID = 'CORDOVACOURIERLLC';
  const BASE_URL = `https://secure.ontime360.com/sites/${COMPANY_ID}/api`;

  try {
    // Step 1: Get internal order ID by tracking number
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

    // Step 2: Get full order details
    const orderRes = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const order = await orderRes.json();

    // Step 3: Try to fetch signature image
    let signatureImage = "";
    try {
      const sigRes = await fetch(`${BASE_URL}/order/signature?orderID=${orderId}`, {
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        }
      });
      if (sigRes.ok) {
        const sigBlob = await sigRes.blob();
        const buffer = await sigBlob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        signatureImage = `data:image/png;base64,${base64}`;
      }
    } catch (sigErr) {
      console.warn("No signature available.");
    }

    const data = {
      trackingNumber: order.TrackingNumber || tn,
      status: order.Status?.Description || 'Unknown',
      origin: `${order.CollectionLocation?.City || ''}, ${order.CollectionLocation?.State || ''}`.trim(),
      destination: `${order.DeliveryLocation?.City || ''}, ${order.DeliveryLocation?.State || ''}`.trim(),
      pickupTime: order.CollectionArrivalDate || order.CollectionArrivalWindow?.EarliestTime || '',
      dropoffTime: order.DeliveryArrivalDate || order.DeliveryArrivalWindow?.EarliestTime || '',
      vehicle: order.VehicleRequired?.Name || '',
      history: order.Status?.Timestamp ? [
        {
          time: order.Status.Timestamp,
          status: order.Status.Description || 'Unknown',
          note: ''
        }
      ] : [],
      proofOfDelivery: {
        deliveredTo: order.DeliveryContactName || '',
        signatureImage
      }
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error('Track API error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
