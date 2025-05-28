function loadFooter() {
  fetch('/components/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load footer');
      }
      return response.text();
    })
    .then(data => {
      const footerContainer = document.getElementById('footer-placeholder');
      if (footerContainer) {
        footerContainer.innerHTML = data;
      } else {
        console.warn("No footer-placeholder found on this page.");
      }
    })
    .catch(error => console.error('❌ Footer load error:', error));
}

window.addEventListener('DOMContentLoaded', loadFooter);
