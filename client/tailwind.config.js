/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D84040',
        secondary: '#A31D1D',
        accent: '#ECDCBF',
        neutral: '#F8F2DE',
        base: '#09122C',
        info: '#B6CBBD',
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444'
      }
    },
  },
  plugins: [],
}