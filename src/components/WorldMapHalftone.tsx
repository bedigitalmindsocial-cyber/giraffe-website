/**
 * Halftone-pattern world map for the hero. Each land grid cell is rendered as
 * a small dot, matching the rest of the site's halftone visual language.
 * Three highlighted cities (London → Dubai → Mumbai) pulse in sequence,
 * representing the firm's client geography. Abohar is marked as the home base.
 *
 * Continents are approximated with hand-authored polygons in [lon, lat] degree
 * coordinates. The map is intentionally stylised, not cartographically exact.
 */

const CONTINENTS: Array<Array<[number, number]>> = [
  // North America (incl southern Greenland edge)
  [
    [-168, 70], [-140, 73], [-100, 75], [-65, 73], [-50, 60],
    [-55, 50], [-65, 45], [-75, 36], [-83, 30], [-95, 22],
    [-100, 17], [-110, 22], [-117, 32], [-125, 40], [-130, 55],
    [-145, 60], [-165, 65],
  ],
  // South America
  [
    [-80, 10], [-65, 10], [-50, 2], [-35, -7], [-40, -25],
    [-55, -38], [-70, -55], [-75, -50], [-80, -30],
    [-78, -10], [-80, 0],
  ],
  // Europe
  [
    [-10, 58], [-5, 65], [10, 70], [30, 70], [40, 65],
    [50, 55], [42, 50], [30, 47], [22, 40], [12, 38],
    [4, 36], [-5, 36], [-10, 45],
  ],
  // Africa
  [
    [-17, 35], [0, 38], [15, 33], [33, 32], [42, 17],
    [50, 12], [50, 0], [45, -10], [40, -20], [30, -33],
    [20, -35], [12, -28], [8, -10], [-5, 5], [-15, 12],
    [-17, 25],
  ],
  // Middle East
  [
    [28, 42], [42, 42], [56, 40], [62, 28], [56, 20],
    [44, 16], [38, 22], [32, 28], [28, 36],
  ],
  // Asia main mass
  [
    [40, 75], [70, 78], [120, 75], [180, 72], [180, 55],
    [170, 50], [150, 45], [140, 38], [128, 38], [125, 32],
    [115, 28], [108, 22], [100, 20], [95, 22], [88, 26],
    [82, 28], [75, 32], [68, 36], [62, 40], [55, 45],
    [42, 55], [38, 65], [40, 75],
  ],
  // Indian subcontinent
  [
    [68, 32], [72, 35], [78, 32], [85, 28], [90, 24],
    [90, 18], [85, 12], [80, 8], [76, 10], [72, 18], [68, 25],
  ],
  // SE Asia / Indonesia / Australia (combined)
  [
    [95, 6], [110, 4], [125, 0], [140, -3], [150, -8],
    [155, -25], [140, -38], [125, -35], [115, -35],
    [110, -22], [105, -10], [100, -5], [98, 2],
  ],
];

const COLS = 70;
const ROWS = 28;
const LON_MIN = -170;
const LON_MAX = 180;
const LAT_MIN = -50;
const LAT_MAX = 75;

const CITIES = [
  { name: 'London', lon: -0.13, lat: 51.5, delay: 0 },
  { name: 'Dubai', lon: 55.3, lat: 25.3, delay: 1.2 },
  { name: 'Mumbai', lon: 72.87, lat: 19.07, delay: 2.4 },
];

const HOME = { name: 'Abohar', lon: 74.2, lat: 30.14 };

function pointInPolygon(
  point: [number, number],
  polygon: Array<[number, number]>,
): boolean {
  let inside = false;
  const [x, y] = point;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isLand(lon: number, lat: number): boolean {
  return CONTINENTS.some((polygon) => pointInPolygon([lon, lat], polygon));
}

function project(lon: number, lat: number): { x: number; y: number } {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * COLS;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * ROWS;
  return { x, y };
}

// Pre-compute the land dots once at module load — pure function of constants.
const LAND_DOTS: Array<{ x: number; y: number }> = (() => {
  const result: Array<{ x: number; y: number }> = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const lon = LON_MIN + ((col + 0.5) / COLS) * (LON_MAX - LON_MIN);
      const lat = LAT_MAX - ((row + 0.5) / ROWS) * (LAT_MAX - LAT_MIN);
      if (isLand(lon, lat)) {
        result.push({ x: col + 0.5, y: row + 0.5 });
      }
    }
  }
  return result;
})();

export function WorldMapHalftone() {
  const home = project(HOME.lon, HOME.lat);

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="img"
        aria-label="World map highlighting Mumbai, Dubai and London — the cities Giraffe Partners works with from Abohar."
      >
        {/* Continent dots */}
        <g fill="#9382AE" opacity="0.55">
          {LAND_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={0.26} />
          ))}
        </g>

        {/* Home base — Abohar */}
        <g>
          <circle cx={home.x} cy={home.y} r={0.55} fill="#FAF9FC" />
          <text
            x={home.x}
            y={home.y + 2.4}
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '1.5px',
              fill: '#9382AE',
              letterSpacing: '0.12em',
            }}
          >
            ABOHAR
          </text>
        </g>

        {/* Highlighted cities with pulsing halo */}
        <g>
          {CITIES.map((city) => {
            const p = project(city.lon, city.lat);
            return (
              <g key={city.name}>
                <circle
                  className="city-halo"
                  cx={p.x}
                  cy={p.y}
                  r={0.55}
                  fill="#FAF9FC"
                  style={{ animationDelay: `${city.delay}s` }}
                />
                <circle
                  className="city-core"
                  cx={p.x}
                  cy={p.y}
                  r={0.55}
                  fill="#FAF9FC"
                  style={{ animationDelay: `${city.delay}s` }}
                />
                <text
                  x={p.x}
                  y={p.y - 1.5}
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '1.7px',
                    fill: '#FAF9FC',
                    letterSpacing: '0.12em',
                  }}
                >
                  {city.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <figcaption className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-mid-purple-2 text-center">
        From Abohar. To Mumbai, Dubai, London.
      </figcaption>
    </figure>
  );
}
