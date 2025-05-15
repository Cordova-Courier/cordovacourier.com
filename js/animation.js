
// Typing effect for future use
function typeResponse(text, targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 20);
    }
  }
  type();
}
