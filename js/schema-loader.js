async function injectSchema(path) {
  try {
    const res = await fetch(path);
    const data = await res.json();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  } catch (err) {
    console.error(`Failed to load schema from ${path}`, err);
  }
}

// Inject multiple schemas
injectSchema('/schema/organization.json');
injectSchema('/schema/service-areas.json');
injectSchema('/schema/medical-courier.json');
