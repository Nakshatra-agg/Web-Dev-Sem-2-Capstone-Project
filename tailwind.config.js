/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        vault: {
          50: '#f0f0ff', 100: '#e4e2ff', 200: '#cdc8ff',
          300: '#b09fff', 400: '#9175ff', 500: '#7c52ff',
          600: '#6d30ff', 700: '#5e18f5', 800: '#4e13cc',
          900: '#4011a5', 950: '#270972',
        },
        coin: {
          300: '#fde68a', 400: '#fbbf24', 500: '#f59e0b',
          600: '#d97706', 700: '#b45309',
        },
        cyber: {
          300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'pop': 'pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(16px) scale(0.96)' }, to: { opacity: 1, transform: 'translateY(0) scale(1)' } },
        pop:       { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.18)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 10px rgba(124,82,255,0.4)' }, '50%': { boxShadow: '0 0 25px rgba(124,82,255,0.8), 0 0 50px rgba(124,82,255,0.3)' } },
      },
      backgroundImage: {
        'vault-gradient': 'linear-gradient(135deg, #7c52ff, #06b6d4)',
        'coin-gradient': 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        'dark-grid': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237c52ff' fill-opacity='0.04'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'vault': '0 0 30px rgba(124,82,255,0.25)',
        'coin': '0 0 20px rgba(251,191,36,0.3)',
        'cyber': '0 0 20px rgba(6,182,212,0.3)',
        'glow-violet': '0 0 0 1px rgba(124,82,255,0.5), 0 4px 24px rgba(124,82,255,0.25)',
      },
    },
  },
  plugins: [],
}
