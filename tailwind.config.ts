import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode has been removed
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
            50: "#E6FAFA",
            100: "#CCF5F5",
            200: "#99EBEB",
            300: "#66E0E0",
            400: "#33D6D6",
            500: "#00A3B4", // Secondary Teal
            600: "#007A88",
            700: "#005C66",
            800: "#003D44",
            900: "#001F22",
          },
          green: {
            50: "#E6FAF2",
            100: "#CCF5E5",
            200: "#99EBCB",
            300: "#66E0B2",
            400: "#33D698",
            500: "#00B67A", // Secondary Green
            600: "#00885B",
            700: "#006644",
            800: "#00442E",
            900: "#002217",
          },
          red: {
            50: "#FDEBEC",
            100: "#FBD7D9",
            200: "#F7AFB4",
            300: "#F3878E",
            400: "#EF5F69",
            500: "#E63946", // Secondary Red
            600: "#C71D2A", // Darker red
            700: "#961621",
            800: "#640E16",
            900: "#32070B",
          },
        },
        gray: {
          50: "#F5F7FA", // Light Gray
          100: "#E2E8F0", // Medium Gray
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B", // Dark Gray
          800: "#0F172A",
          900: "#020617", // Very Dark Gray
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          700: "#047857",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          700: "#B45309",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          700: "#B91C1C",
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
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(0, 85, 184, 0.4)',
        'glow-sm': '0 0 10px rgba(0, 85, 184, 0.25)',
        'strong': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      keyframes: {
        'pulse-wide': {
          '0%, 100%': { 
            transform: 'translateX(-100%)' 
          },
          '50%': { 
            transform: 'translateX(100%)' 
          },
        },
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.7',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pulse-wide': 'pulse-wide 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
        'shimmer': 'shimmer 3s infinite linear',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
} satisfies Config;
