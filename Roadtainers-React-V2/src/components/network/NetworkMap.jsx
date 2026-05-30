import { useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoPath, geoMercator } from 'd3-geo';
import gsap from 'gsap';
import { COUNTRIES, corridors } from '../../data/corridors';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const PROJECTION_CONFIG = { scale: 950, center: [33, 0] };

// Approximate centroids for country labels (lon, lat).
const COUNTRY_LABELS = [
  { id: '404', name: 'Kenya',       coords: [37.9,  0.4] },
  { id: '800', name: 'Uganda',      coords: [32.3,  1.4] },
  { id: '646', name: 'Rwanda',      coords: [29.9, -1.9] },
  { id: '834', name: 'Tanzania',    coords: [34.9, -6.4] },
  { id: '728', name: 'South Sudan', coords: [30.7,  7.9] },
  { id: '180', name: 'DRC',         coords: [23.6, -2.9] },
];

export default function NetworkMap() {
  const routesRef = useRef(null);

  useEffect(() => {
    if (!routesRef.current) return;
    const root = routesRef.current;

    const paths = root.querySelectorAll('path[data-route-id]');
    const tweens = [];

    paths.forEach((p, idx) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      tweens.push(
        gsap.fromTo(p,
          { strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            delay: 0.3 + (idx * 0.25) % 2,
            repeat: -1,
            repeatDelay: 6,
          }
        )
      );
    });

    const trucks = root.querySelectorAll('g[data-corridor-id]');
    trucks.forEach((truck, idx) => {
      const corridorId = truck.getAttribute('data-corridor-id');
      const path = root.querySelector(`path[data-route-id="${corridorId}"]`);
      if (!path) return;
      const len = path.getTotalLength();
      const state = { d: 0 };
      const duration = 10 + (idx % 6) * 1.6;

      tweens.push(
        gsap.to(state, {
          d: len,
          duration,
          ease: 'none',
          repeat: -1,
          delay: 3.4 + (idx * 0.22) % 2.5,
          onStart: () => { truck.style.visibility = 'visible'; },
          onUpdate: () => {
            const pt = path.getPointAtLength(state.d);
            truck.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
          },
        })
      );
    });

    return () => tweens.forEach(t => t.kill());
  }, []);

  const projection = geoMercator()
    .scale(PROJECTION_CONFIG.scale)
    .center(PROJECTION_CONFIG.center)
    .translate([400, 300]);

  const pathGen = geoPath(projection);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-brand-charcoal rounded-2xl overflow-hidden border border-brand-green-bright/20 shadow-2xl shadow-brand-green-deep/30">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={800}
        height={600}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isActive = COUNTRIES.includes(geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isActive ? '#1FA34A' : '#1A2226'}
                  stroke={isActive ? '#F7F4EC' : '#10171A'}
                  strokeWidth={isActive ? 1.4 : 0.4}
                  style={{
                    default: { outline: 'none', strokeOpacity: isActive ? 0.7 : 1 },
                    hover:   { fill: isActive ? '#28BD58' : '#1A2226', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

        <defs>
          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={routesRef}>
          {corridors.map(c => {
            const lineString = { type: 'LineString', coordinates: c.points };
            const d = pathGen(lineString);
            return (
              <g key={c.id}>
                <path
                  d={d}
                  fill="none"
                  stroke="#F5B800"
                  strokeWidth={5}
                  strokeOpacity={0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  data-route-id={c.id}
                  d={d}
                  fill="none"
                  stroke="#F5B800"
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#route-glow)"
                />
              </g>
            );
          })}

          {corridors.map(c => (
            <g
              key={`truck-${c.id}`}
              data-corridor-id={c.id}
              style={{ visibility: 'hidden' }}
            >
              <circle r={7} fill="#F5B800" fillOpacity={0.22} />
              <circle r={4.2} fill="#F5B800" fillOpacity={0.55} />
              <g transform="translate(-4 -3)">
                <rect x={0} y={0.5} width={8} height={5} rx={1.1} fill="#F5B800" stroke="#0B3D2E" strokeWidth={0.7} />
                <rect x={5}   y={1.2} width={2.4} height={2} rx={0.3} fill="#0B3D2E" />
                <circle cx={2}   cy={5.6} r={0.85} fill="#0B3D2E" />
                <circle cx={6}   cy={5.6} r={0.85} fill="#0B3D2E" />
              </g>
            </g>
          ))}
        </g>

        {COUNTRY_LABELS.map(c => (
          <Marker key={c.id} coordinates={c.coords}>
            <text
              textAnchor="middle"
              style={{
                fontFamily: 'Sora, Inter, sans-serif',
                fill: '#F7F4EC',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                paintOrder: 'stroke',
                stroke: '#0A0A0A',
                strokeWidth: 3,
                strokeOpacity: 0.75,
                pointerEvents: 'none',
              }}
            >
              {c.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 text-xs text-white/80 bg-brand-ink/60 backdrop-blur px-3 py-2 rounded-lg">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-green-bright" />
          Active countries
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-brand-yellow" />
          Road corridors
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-2 rounded-sm bg-brand-yellow border border-brand-green-deep" />
          Active transport
        </span>
      </div>
    </div>
  );
}
