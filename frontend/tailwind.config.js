/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FFFFFF',
          dark: '#0B0F19',
        },
        card: {
          light: '#F8FAFC',
          dark: '#111827',
        },
        border: {
          light: '#E2E8F0',
          dark: '#1F2937',
        },
        primary: {
          DEFAULT: '#6366F1', // Indigo
          dark: '#818CF8',
        },
        success: {
          DEFAULT: '#10B981', // Emerald
          dark: '#34D399',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          dark: '#FBBF24',
        },
        error: {
          DEFAULT: '#EF4444', // Rose
          dark: '#F87171',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
