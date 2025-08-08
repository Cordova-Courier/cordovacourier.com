(function(){
  if(window.__accordionInit) return;
  window.__accordionInit = true;

  async function init(){
    const factsEl = document.querySelector('#fast-facts');
    const faqEl = document.querySelector('#faq');
    if(!factsEl || !faqEl) return;

    const city = factsEl.dataset.city && factsEl.dataset.city.trim();
    const state = factsEl.dataset.state && factsEl.dataset.state.trim();
    if(!city || !state) return;

    // Wrap the fast facts and FAQ sections so they can sit side by side
    const wrapper = document.createElement('div');
    wrapper.className = 'facts-faq-wrapper';
    factsEl.parentNode.insertBefore(wrapper, factsEl);
    wrapper.appendChild(factsEl);
    wrapper.appendChild(faqEl);

    const slug = s => s.toLowerCase().replace(/\s+/g,'-');

    try {
      const res = await fetch(`/data/locations/${state.toLowerCase()}/${slug(city)}.json`);
      if(!res.ok) throw new Error('Data not found');
      const data = await res.json();

      factsEl.innerHTML = `\n      <h2>Quick Facts – ${data.location.city}, ${data.location.state} Courier Services</h2>\n      ${data.facts.map((group,i)=>`\n        <div class="acc-item">\n          <button class="acc-trigger" aria-expanded="false" aria-controls="fact-${i}" id="fact-label-${i}">\n            ${group.title}\n          </button>\n          <div class="acc-panel" id="fact-${i}" role="region" aria-labelledby="fact-label-${i}">\n            <ul>${group.items.map(li=>`<li>${li}</li>`).join('')}</ul>\n          </div>\n        </div>\n      `).join('')}\n    `;

      faqEl.innerHTML = `\n      <h2>${data.location.city} Courier – FAQs</h2>\n      ${data.faq.map((qa,i)=>`\n        <div class="acc-item">\n          <button class="acc-trigger" aria-expanded="false" aria-controls="faq-${i}" id="faq-label-${i}">\n            ${qa.q}\n          </button>\n          <div class="acc-panel" id="faq-${i}" role="region" aria-labelledby="faq-label-${i}">\n            <p>${qa.a}</p>\n          </div>\n        </div>\n      `).join('')}\n    `;

      const triggers = Array.from(document.querySelectorAll('.acc-trigger'));
      triggers.forEach((btn,idx)=>{
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        panel.hidden = true;
        const toggle = ()=>{
          const expanded = btn.getAttribute('aria-expanded')==='true';
          btn.setAttribute('aria-expanded', String(!expanded));
          panel.hidden = expanded;
          if(!expanded && window.gtag) {
            window.gtag('event','accordion_open',{section: btn.textContent.trim(), page_type:'local_landing'});
          }
        };
        btn.addEventListener('click', toggle);
        btn.addEventListener('keydown', e=>{
          if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}
          else if(e.key==='ArrowDown'){e.preventDefault();triggers[(idx+1)%triggers.length].focus();}
          else if(e.key==='ArrowUp'){e.preventDefault();triggers[(idx-1+triggers.length)%triggers.length].focus();}
        });
      });

      if(!document.getElementById('faq-schema')){
        const faqSchema={
          "@context":"https://schema.org",
          "@type":"FAQPage",
          "mainEntity":data.faq.map(qa=>({"@type":"Question","name":qa.q,"acceptedAnswer":{"@type":"Answer","text":qa.a}}))
        };
        const s=document.createElement('script');
        s.type='application/ld+json';
        s.id='faq-schema';
        s.textContent=JSON.stringify(faqSchema);
        document.head.appendChild(s);
      }
    } catch(e) {
      console.warn('Accordion init failed', e);
    }
  }

  init();
})();
