/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            deep:   '#0B3D2E',
            bright: '#1FA34A',
            soft:   '#14532D',
          },
          yellow:   '#F5B800',
          ink:      '#0A0A0A',
          charcoal: '#10171A',
          slate:    '#161E22',
          cream:    '#F7F4EC',
        },
      },
      backgroundImage: {
        'grid-fade':    'radial-gradient(ellipse at top, rgba(31,163,74,0.08), transparent 60%)',
        'cinema-fade':  'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0) 100%)',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
