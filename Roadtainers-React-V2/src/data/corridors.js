// ISO 3166-1 numeric codes used by world-atlas topojson (geo.id)
export const COUNTRIES = ['404', '800', '646', '834', '728', '180'];
// Human-readable names for display (KE, UG, RW, TZ, SS, DRC)
export const COUNTRY_NAMES = ['Kenya', 'Uganda', 'Rwanda', 'Tanzania', 'South Sudan', 'DRC'];

// Cities kept for legacy imports. Markers were dropped from the map in favour
// of country labels — leaving the array here in case we want them back.
export const cities = [
  { name: 'Mombasa',       coords: [39.6682,  -4.0435], type: 'hub' },
  { name: 'Nairobi',       coords: [36.8219,  -1.2921], type: 'hub' },
  { name: 'Kampala',       coords: [32.5825,   0.3476], type: 'hub' },
  { name: 'Kigali',        coords: [30.0619,  -1.9441], type: 'hub' },
  { name: 'Juba',          coords: [31.5825,   4.8517], type: 'hub' },
  { name: 'Dar es Salaam', coords: [39.2083,  -6.7924], type: 'hub' },
  { name: 'Lubumbashi',    coords: [27.4793, -11.6610], type: 'hub' },
];

// Each corridor traces approximate real-road geometry via many intermediate
// waypoints, so the rendered piecewise polyline reads as a snaking corridor
// rather than a straight aviation arc.
export const corridors = [
  {
    id: 'mombasa-kigali',
    label: 'Mombasa → Nairobi → Kampala → Kigali',
    points: [
      [39.6682, -4.0435], // Mombasa
      [38.5650, -3.3956], // Voi
      [37.6500, -2.0500], // Sultan Hamud
      [36.8219, -1.2921], // Nairobi
      [36.4319, -0.7172], // Naivasha
      [36.0667, -0.2833], // Nakuru
      [35.7283,  0.0500], // Molo / Mau
      [35.2698,  0.5143], // Eldoret
      [34.7700,  0.6100], // Webuye
      [34.2756,  0.6376], // Malaba (border)
      [34.1750,  1.0822], // Mbale
      [33.2042,  0.4244], // Jinja
      [32.5825,  0.3476], // Kampala
      [31.7333, -0.3422], // Masaka
      [30.6500, -0.6033], // Mbarara
      [29.9856, -1.2492], // Kabale
      [29.9319, -1.4400], // Katuna (border)
      [30.0619, -1.9441], // Kigali
    ],
  },
  {
    id: 'dar-lubumbashi',
    label: 'Dar es Salaam → Mbeya → Lubumbashi',
    points: [
      [39.2083, -6.7924], // Dar es Salaam
      [37.6500, -6.8278], // Morogoro
      [35.6917, -7.7700], // Iringa
      [34.3500, -8.2500], // Makambako
      [33.4500, -8.9000], // Mbeya
      [32.7667, -9.3000], // Tunduma
      [31.1500, -8.8000], // Sumbawanga
      [29.6300, -9.9300], // Lake Tanganyika south
      [28.4500, -10.4200], // approach Lubumbashi
      [27.4793, -11.6610], // Lubumbashi
    ],
  },
  {
    id: 'mombasa-goma',
    label: 'Mombasa → Kampala → Goma (DRC East)',
    points: [
      [39.6682, -4.0435], // Mombasa
      [38.5650, -3.3956], // Voi
      [36.8219, -1.2921], // Nairobi
      [36.0667, -0.2833], // Nakuru
      [35.2698,  0.5143], // Eldoret
      [34.2756,  0.6376], // Malaba
      [33.2042,  0.4244], // Jinja
      [32.5825,  0.3476], // Kampala
      [31.0500, -0.4500], // Bushenyi
      [30.6500, -0.6033], // Mbarara
      [29.9856, -1.2492], // Kabale
      [29.6850, -1.2856], // Kisoro
      [29.2356, -1.6792], // Goma
    ],
  },

  // ── Connector corridors so every hub has at least two exits ──────────────
  {
    id: 'kampala-juba',
    label: 'Kampala → Gulu → Juba',
    points: [
      [32.5825,  0.3476], // Kampala
      [32.2547,  2.2503], // Karuma
      [32.2880,  2.7747], // Gulu
      [32.1370,  3.2856], // Atiak
      [32.0464,  3.6045], // Nimule (border)
      [31.5825,  4.8517], // Juba
    ],
  },
  {
    id: 'kigali-goma',
    label: 'Kigali → Rubavu → Goma',
    points: [
      [30.0619, -1.9441], // Kigali
      [29.7378, -1.4992], // Musanze (Ruhengeri)
      [29.2575, -1.7019], // Rubavu / Gisenyi border
      [29.2356, -1.6792], // Goma
    ],
  },
  {
    id: 'mombasa-dar',
    label: 'Mombasa → Tanga → Dar es Salaam (coastal)',
    points: [
      [39.6682, -4.0435], // Mombasa
      [39.1300, -4.5500], // Lunga Lunga (border)
      [39.1900, -4.7000], // Horohoro
      [39.0997, -5.0700], // Tanga
      [38.9667, -5.4222], // Pangani
      [38.9000, -6.4400], // Bagamoyo
      [39.2083, -6.7924], // Dar es Salaam
    ],
  },
  {
    id: 'goma-lubumbashi',
    label: 'Goma → Bukavu → Lake Tanganyika → Lubumbashi',
    points: [
      [29.2356, -1.6792], // Goma
      [28.8472, -2.5083], // Bukavu
      [29.1942, -5.9469], // Kalemie
      [28.9500, -8.7500], // Moba / lake south
      [28.6500, -10.4500], // Kasenga
      [27.4793, -11.6610], // Lubumbashi
    ],
  },
  {
    id: 'juba-goma',
    label: 'Juba → Bunia → Beni → Goma (DRC northeast)',
    points: [
      [31.5825,  4.8517], // Juba
      [30.6818,  4.0900], // Yei
      [30.2231,  3.8531], // Aba (DRC border)
      [30.2426,  1.5644], // Bunia
      [29.4733,  0.4914], // Beni
      [29.2858,  0.1391], // Butembo
      [29.2356, -1.6792], // Goma
    ],
  },
];
