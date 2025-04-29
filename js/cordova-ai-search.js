// Cordova AI Search + Voice Script
const pages = [
  {
    name: "SFO - San Francisco Courier Delivery Freight Cargo Services",
    url: "/service-areas/north-america/usa/california/sfo-san-francisco-courier-delivery-freight-cargo-services"
  },
  {
    name: "Fremont Courier Delivery Freight Cargo Services",
    url: "/service-areas/north-america/usa/california/fremont-courier-delivery-freight-cargo-services"
  },
  {
    name: "Mather Courier Delivery Freight Cargo Services",
    url: "/service-areas/north-america/usa/california/mhr-mather-courier-delivery-freight-cargo-services"
  },
  {
    name: "MHR - Mather Airport Cargo Delivery Services",
    url: "/airports/mhr-mather-cargo-delivery-services"
  },
  {
    name: "SMF - Sacramento International Airport Cargo Delivery Services",
    url: "/airports/smf-sacramento-cargo-delivery-services"
  }
];

function searchPages() {
  const input = document.getElementById('aiSearchInput').value.toLowerCase();
  const resultDiv = document.getElementById('searchResults');

  if (!input) {
    resultDiv.innerHTML = "";
    return;
  }

  const results = pages.filter(page => page.name.toLowerCase().includes(input));

  if (results.length > 0) {
    resultDiv.innerHTML = results
      .map(page => `<div><a href="${page.url}">${page.name}</a></div>`)
      .join('');
  } else {
    resultDiv.innerHTML = `<div>No direct match found. Try a nearby city or visit our <a href='/service-areas/north-america/usa/'>Service Areas</a>.</div>`;
  }
}

function startVoiceSearch() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('aiSearchInput').value = transcript;
    searchPages();
  };

  recognition.onerror = function(event) {
    alert('Voice search failed: ' + event.error);
  };

  recognition.start();
}
