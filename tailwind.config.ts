import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Changed from default 'media' to 'class'
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#E6F0FA",
          100: "#CCE0F5",
          200: "#99C2EB",
          300: "#66A3E0",
          400: "#3385D6",
          500: "#0055B8", // Primary Blue
          600: "#003A7E", // Primary Dark Blue
          700: "#002C5F",
          800: "#001D3F",
          900: "#000F20",
        },
        secondary: {
          teal: {
            500: "#00A3B4", // Secondary Teal
          },
          green: {
            500: "#00B67A", // Secondary Green
          },
          red: {
            500: "#E63946", // Secondary Red
          },
        },
        gray: {
          50: "#F5F7FA", // Light Gray
          100: "#E2E8F0", // Medium Gray
          700: "#4A5568", // Dark Gray
          900: "#2D3748", // Very Dark Gray
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
