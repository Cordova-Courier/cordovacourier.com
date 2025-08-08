import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'data/locations/ca');
const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(baseDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { city, state, serviceRadiusMiles } = data.location;

  data.hero = {
    h1: `${city}, ${state} Courier & Delivery Services`,
    intro: `Fast same-day, freight, and medical deliveries across ${city}.`
  };

  data.fastFacts = [
    {
      type: "short",
      title: "Service Radius",
      content: `${serviceRadiusMiles}-mile coverage`,
      seo: `${city} courier delivery radius ${serviceRadiusMiles} miles`
    },
    {
      type: "short",
      title: "Availability",
      content: "24/7 dispatch",
      seo: `${city} 24/7 courier service`
    },
    {
      type: "long",
      title: "Local Expertise",
      content: `${city} couriers know the area, using optimal routes for fast <strong>same-day delivery</strong>.`,
      seo: `${city} same-day delivery courier`
    },
    {
      type: "long",
      title: "Business District",
      content: `Central ${city} districts enable quick pickups and drop-offs for offices and retail.`,
      seo: `${city} business courier services`
    },
    {
      type: "long",
      title: "Medical Logistics",
      content: `Hospitals and labs in ${city} rely on our <strong>medical courier</strong> team for urgent transport.`,
      seo: `${city} medical courier services`
    },
    {
      type: "long",
      title: "Freight Capacity",
      content: `From cargo vans to box trucks, we handle heavy freight in ${city} and beyond.`,
      seo: `${city} freight delivery`
    }
  ];

  data.pois = [
    {
      name: `${city} City Hall`,
      category: "Government",
      description: `Regular route stop for document filings and legal <strong>courier service in ${city}</strong>.`
    },
    {
      name: `${city} Business District`,
      category: "Business District",
      description: `Dense cluster of offices—ideal for bulk <strong>same-day deliveries</strong> in ${city}.`
    },
    {
      name: `${city} Medical Center`,
      category: "Hospital",
      description: `Key destination for <strong>medical courier</strong> runs serving ${city} healthcare providers.`
    }
  ];

  data.coverage = {
    county: `${city} County`,
    description: `Serving all neighborhoods in and around ${city} with <strong>same-day</strong> and <strong>freight courier</strong> options.`
  };

  data.testimonials = [
    {
      quote: `“Cordova Courier keeps our ${city} operations moving.”`,
      author: 'Local Business Owner'
    },
    {
      quote: `“Fast delivery across ${city} every time.”`,
      author: 'Operations Manager'
    },
    {
      quote: `“Reliable ${city} courier service we trust for urgent shipments.”`,
      author: 'Logistics Coordinator'
    }
  ];

  data.faq = data.faq || [];
  const localQuestion = `How fast can you deliver from ${city} to nearby cities?`;
  data.faq = data.faq.filter(qa => qa.q !== localQuestion);
  data.faq.push({
    q: localQuestion,
    a: `Most deliveries from ${city} to neighboring areas arrive the same day thanks to our dedicated courier network.`
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

console.log(`Updated ${files.length} city files with SEO sections.`);
