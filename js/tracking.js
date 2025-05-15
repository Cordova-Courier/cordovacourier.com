async function processAIInput(input) {
  const tnPattern = /^\d{6,}$/;
  if (tnPattern.test(input)) {
    fetchTracking(input);
    return;
  }

  const responseDiv = document.getElementById('ai-response');
  responseDiv.innerHTML = "<p><em>Processing your question...</em></p>";

  try {
    const aiRes = await fetch("https://ai.cordovacourier.com/api/cordova-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input, source: "tracking-page" })
    });
    const data = await aiRes.json();
    responseDiv.innerHTML = "<p><strong>AI Response:</strong> " + data.reply + "</p>";
  } catch (err) {
    responseDiv.innerHTML = "<p><strong>Error:</strong> Could not process request.</p>";
  }
}

async function fetchTracking(tn) {
  const res = await fetch(`/api/track?tn=${tn}`);
  const data = await res.json();
  const responseDiv = document.getElementById("ai-response");

  const pickup = new Date(data.pickupTime).toLocaleString();
  const dropoff = new Date(data.dropoffTime).toLocaleString();

  responseDiv.innerHTML = `
    <div class="summary">
      <p>📦 Delivered to <strong>${data.proofOfDelivery.deliveredTo}</strong> on <strong>${dropoff}</strong>.</p>
      <p>From <strong>${data.origin}</strong> to <strong>${data.destination}</strong> via <strong>${data.vehicle}</strong>.</p>
      <button id="toggle-details">🔎 Show More</button>
    </div>
    <div id="more-details" class="details-hidden">
      <p><strong>Tracking #:</strong> ${data.trackingNumber}</p>
      <p><strong>Pickup:</strong> ${pickup}</p>
      <p><strong>Drop-off:</strong> ${dropoff}</p>
      ${data.proofOfDelivery.signatureImage && !data.proofOfDelivery.signatureImage.includes("bnVsbA==") ?
        `<img src="${data.proofOfDelivery.signatureImage}" alt="Signature" class="signature-img" />` : ""}
    </div>
  `;

  document.getElementById("toggle-details").onclick = () => {
    const panel = document.getElementById("more-details");
    panel.classList.toggle("details-hidden");
  };
}

document.getElementById("ai-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const val = this.value.trim();
    if (val) {
      processAIInput(val);
    }
  }
});
