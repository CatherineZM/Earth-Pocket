import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px', // mobile
        sm: '640px',
        md: '768px', // tablet
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px', // desktop
        '3xl': '1920px' // +++ desktop
      },
      colors: {
        'light-blue': '#ADC7E1',
        earth: '#A48F72',
        nobel: '#B4B2AB',
        'white-rock': '#EBE6D1',
        fantasy: '#F9F5EC'
      },
      spacing: {
        mobileX: '16px',
        tabletX: '80px',
        desktopX: '120px',
        plusDesktopX: '240px',
      },
    },
  },
  plugins: [],
};
export default config;
