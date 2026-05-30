export const services = [
  {
    slug: 'low-loader-cargo',
    title: 'Low Loader Cargo',
    short: 'Specialist low-bed transport for out-of-gauge, heavy and oversized cargo across East Africa.',
    image: '/images/low loader cargo.jpeg',
    body: [
      'Our low-loader fleet handles payloads from 20 to 135 tonnes — drilling equipment, transformers, mining machinery, and anything that requires serious axle counts and a properly engineered route plan.',
      'Every abnormal-load movement is planned with a route survey, escort arrangement, and regulatory permits handled in-house.',
    ],
    bullets: [
      'Low loaders 20–135 tonnes',
      'Out-of-gauge and abnormal loads',
      'Drilling rigs, transformers, mining gear',
      'Route surveys and permit handling',
    ],
  },
  {
    slug: 'car-carrier',
    title: 'Car Carrier',
    short: 'Dedicated car-carrier fleet for vehicle transport across the region.',
    image: '/images/car carrier.JPG',
    body: [
      'Roadtainers operates a dedicated car-carrier fleet for safe, efficient vehicle transport throughout East Africa. From single units to full multi-car loads, we handle private vehicles, fleet deliveries, and auction-stock movements.',
      'All vehicles are secured and tracked for the full journey.',
    ],
    bullets: [
      'Multi-car carrier trailers',
      'Private and fleet vehicle transport',
      'Auction stock and dealer deliveries',
      'GPS-tracked, secured loading',
    ],
  },
  {
    slug: 'general-cargo',
    title: 'General Cargo',
    short: 'Full-truck and consolidated transport for everyday freight across the Northern Corridor and beyond.',
    image: '/images/general cargo.JPG',
    body: [
      'For the day-to-day flow of cargo that keeps East African business moving — palletised goods, building materials, packaged products — we provide consolidated and full-truck movements on scheduled corridors.',
      'We handle the documentation, cross-border clearance, and tracking, so your operations team has one number to call.',
    ],
    bullets: [
      'Full-truck and part-load options',
      'Scheduled regional corridors',
      'Documentation handled in-house',
      'GPS tracking with corridor visibility',
    ],
  },
  {
    slug: 'local-shunting',
    title: 'Local Shunting',
    short: 'High-volume port-area shunting, terminal-to-CFS moves and last-mile delivery in Mombasa.',
    image: '/images/local shunting.JPG',
    body: [
      'Roadtainers handles container shunting between Kilindini Port, CFSs and ICDs across the Mombasa metropolitan area — keeping your imports moving and your demurrage under control.',
      'Our local-shunting fleet is on call 24/7 with KPA-cleared drivers and direct gate access.',
    ],
    bullets: [
      'Port to CFS and ICD',
      '24/7 dispatch from Mombasa yard',
      'KPA-cleared drivers',
      'Demurrage and detention management',
    ],
  },
  {
    slug: 'lifting-facilities',
    title: 'Lifting Facilities',
    short: 'In-house cranes and forklifts for heavy lifts, project cargo and yard handling.',
    image: '/images/lifting facilities.JPG',
    body: [
      'Our lifting division supports project sites, port operations and our own transit yards. We carry everything from forklifts for daily container moves to 50-tonne mobile cranes for industrial lifts.',
      'Every lift is planned with a method statement, lift calculation and a competent appointed person.',
    ],
    bullets: [
      'Three 50-tonne cranes',
      'One 30-tonne crane',
      'Forklifts: 13-tonne, 10-tonne and 2-tonne',
      'Fully planned lift operations',
    ],
  },
  {
    slug: 'warehouse-storage',
    title: 'Warehouse & Storage',
    short: 'Secured bonded warehousing and transit storage 3.5 km from the Port of Mombasa.',
    image: '/images/Warehouse.JPG',
    body: [
      'Just 3.5 kilometres from Kilindini Port, our 18-acre transit facility keeps your cargo flowing without exposure to demurrage or weather. A resident Customs officer means clearance queries are answered on the spot.',
      'We back the transit yard with 104,000 sq m of warehousing space and a dedicated weigh-bridge on a 4-acre all-weather surface.',
    ],
    bullets: [
      '3.5 km from the Port of Mombasa',
      '18-acre fully secured transit yard',
      'Resident Customs officer on site',
      '104,000 sq m of warehousing space',
    ],
  },
];

export const findService = (slug) => services.find(s => s.slug === slug);
