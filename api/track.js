// /api/track.js — Updated with structured proofOfDelivery block
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

  const timelineMap = [
    'Driver is now en route to pick-up',
    'Driver has arrived at Pick-up',
    'In Transit',
    'Driver has arrived at drop-off',
    'Completed'
  ];

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

    const signatureRes = await fetch(`${BASE_URL}/order/signature?orderID=${orderId}`, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    let signature = null;
    try {
      signature = await signatureRes.text(); // image base64
    } catch (e) {
      signature = null;
    }

    const history = Array.isArray(historyData)
      ? historyData.map((h, idx) => {
          const status = h.StatusName || statusMap[h.StatusLevel] || 'Submitted';
          const activity = h.Note || timelineMap[idx] || 'Activity';
          return {
            time: h.Timestamp,
            status,
            activity
          };
        })
      : [];

    const data = {
      trackingNumber: order.TrackingNumber || tn,
      status: order.Status?.Description || order.Status?.Name || statusMap[order.Status?.Level] || 'Unknown',
      origin: `${order.CollectionLocation?.City || ''}, ${order.CollectionLocation?.State || ''}`.trim(),
      destination: `${order.DeliveryLocation?.City || ''}, ${order.DeliveryLocation?.State || ''}`.trim(),
      orderReceived: order.DateSubmitted || '',
      collectedFrom: order.CollectionLocation?.ContactName || '',
      pickupTime: order.CollectionArrivalDate || '',
      dropoffTime: order.DeliveryArrivalDate || '',
      vehicle: order.VehicleRequired?.Name || '',
      proofOfDelivery: {
        deliveredTo: order.DeliveryContactName || '',
        time: order.DeliveryArrivalDate || '',
        signatureImage: signature ? `data:image/png;base64,${signature}` : null
      },
      history
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error('Track API error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
