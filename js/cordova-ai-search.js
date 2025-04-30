async function askCordovaAI(inputValue = null) {
  const input = inputValue || document.getElementById('aiSearchInput').value.trim();
  const resultDiv = document.getElementById('searchResults');

  if (!input) {
    resultDiv.innerHTML = "<div>Please enter a question.</div>";
    return;
  }

  // Show typing animation
  resultDiv.innerHTML = "<div class='typing-indicator'>Cordova AI is typing<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span></div>";

  try {
    // Log the question to your backend (optional for SEO tracking)
    await fetch('/api/log-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });

    const res = await fetch('/api/cordova-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });

    const data = await res.json();

    if (data.reply) {
      resultDiv.innerHTML = `<div class='ai-response'>${data.reply}</div>`;
    } else {
      resultDiv.innerHTML = "<div>Sorry, I couldn't find an answer. Please try again.</div>";
    }

  } catch (err) {
    console.error('Error:', err);
    resultDiv.innerHTML = "<div>Error reaching Cordova AI. Please try again later.</div>";
  }
}
