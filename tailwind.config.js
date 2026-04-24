/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#111111',
        neon: '#CCFF00',
        card: '#4F385C',
        muted: '#C8BD2E',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4F385C 0%, #2D1F3D 100%)',
        'gradient-neon': 'linear-gradient(135deg, #CCFF00 0%, #A3D900 100%)',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(204, 255, 0, 0.5)',
        'neon-sm': '0 0 10px rgba(204, 255, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

