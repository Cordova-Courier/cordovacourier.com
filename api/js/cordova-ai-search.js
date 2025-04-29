async function askCordovaAI() {
  const input = document.getElementById('aiSearchInput').value.trim();
  const resultDiv = document.getElementById('searchResults');

  if (!input) {
    resultDiv.innerHTML = "<div>Please enter a question.</div>";
    return;
  }

  resultDiv.innerHTML = "<div>Thinking... 🤔</div>";

  try {
    const res = await fetch('/api/cordova-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });

    const data = await res.json();
    resultDiv.innerHTML = `<div>${data.reply}</div>`;

  } catch (err) {
    resultDiv.innerHTML = "<div>Error reaching Cordova AI. Try again later.</div>";
  }
}
