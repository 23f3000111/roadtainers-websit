export const faqCategories = [
  {
    id: 'services',
    label: 'Our Services',
    items: [
      {
        q: 'What kind of cargo do you specialise in?',
        a: 'Heavy commercial cargo, low loader out-of-gauge cargo, containerised cargo and car carriers.',
      },
      {
        q: 'Which countries do you deliver to?',
        a: 'Kenya, Uganda, Tanzania, DRC, Rwanda and South Sudan.',
      },
      {
        q: 'Do you handle door-to-door deliveries?',
        a: 'Yes, we offer full door-to-door service across all our corridors.',
      },
      {
        q: 'Do you assist with customs clearance at border points like Malaba or Busia?',
        a: 'We can facilitate this through a clearing company we regularly partner with.',
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Tracking',
    items: [
      {
        q: 'Is my cargo insured while in transit?',
        a: 'Yes, we carry limited insurance for goods in transit. Contact us for specific coverage details.',
      },
      {
        q: 'Can I track my shipment in real time?',
        a: 'Tracking reports are sent to each client twice a day via our GPS monitoring system.',
      },
      {
        q: 'How do you keep high-value cargo secure?',
        a: 'We operate 24/7 cargo tracking and, if required, can arrange additional police escorts for high-value loads.',
      },
      {
        q: 'What happens if a truck breaks down mid-route?',
        a: 'Our team responds immediately. If the issue requires it, we dispatch a replacement truck to complete delivery without delay.',
      },
    ],
  },
  {
    id: 'capacity',
    label: 'Capacity & Logistics',
    items: [
      {
        q: 'How large is the Roadtainers fleet?',
        a: 'We currently operate a fleet of 142 units — a combination of flatbeds, tippers, car carriers, low loaders and tankers.',
      },
      {
        q: 'Do you have storage or warehousing facilities?',
        a: 'Yes. We offer warehouse storage and secured yard storage at our 18-acre facility 3.5 km from the Port of Mombasa.',
      },
      {
        q: 'Can you move oversized or out-of-gauge loads?',
        a: 'Yes. Our low-loader fleet handles payloads from 20 to 135 tonnes — drilling equipment, transformers, mining gear and more.',
      },
    ],
  },
  {
    id: 'working',
    label: 'Working With Us',
    items: [
      {
        q: 'How long does a typical delivery take — for example, Mombasa to Kampala?',
        a: 'We calculate 4 days for Mombasa to Kampala, including border clearance.',
      },
      {
        q: 'Do I need a long-term contract to work with Roadtainers?',
        a: 'No. We can work on any agreement length — spot loads, regular contracts, or long-term partnerships.',
      },
      {
        q: 'How do I get a quote for my shipment?',
        a: 'Fill in the Get a Quote form on our website, or contact us directly with your cargo details and we will quote accordingly.',
      },
      {
        q: 'Why choose Roadtainers over other transporters?',
        a: 'We are reliable, quick and honest — backed by over 25 years on East Africa\'s most demanding corridors.',
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap(c => c.items);
