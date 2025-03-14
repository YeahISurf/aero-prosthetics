import type { Config } from "tailwindcss";

export default {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': 'var(--color-primary-50)',
  				'100': 'var(--color-primary-100)',
  				'200': 'var(--color-primary-200)',
  				'300': 'var(--color-primary-300)',
  				'400': 'var(--color-primary-400)',
  				'500': 'var(--color-primary-500)',
  				'600': 'var(--color-primary-600)',
  				'700': 'var(--color-primary-700)',
  				'800': 'var(--color-primary-800)',
  				'900': 'var(--color-primary-900)',
  				DEFAULT: 'var(--color-primary-600)',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				teal: {
  					'50': '#E6FAFA',
  					'100': '#CCF5F5',
  					'200': '#99EBEB',
  					'300': '#66E0E0',
  					'400': '#33D6D6',
  					'500': '#00A3B4',
  					'600': '#007A88',
  					'700': '#005C66',
  					'800': '#003D44',
  					'900': '#001F22'
  				},
  				green: {
  					'50': '#E6FAF2',
  					'100': '#CCF5E5',
  					'200': '#99EBCB',
  					'300': '#66E0B2',
  					'400': '#33D698',
  					'500': '#00B67A',
  					'600': '#00885B',
  					'700': '#006644',
  					'800': '#00442E',
  					'900': '#002217'
  				},
  				red: {
  					'50': '#FDEBEC',
  					'100': '#FBD7D9',
  					'200': '#F7AFB4',
  					'300': '#F3878E',
  					'400': '#EF5F69',
  					'500': '#E63946',
  					'600': '#C71D2A',
  					'700': '#961621',
  					'800': '#640E16',
  					'900': '#32070B'
  				},
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			gray: {
  				'50': '#F5F7FA',
  				'100': '#E2E8F0',
  				'200': '#CBD5E1',
  				'300': '#94A3B8',
  				'400': '#64748B',
  				'500': '#475569',
  				'600': '#334155',
  				'700': '#1E293B',
  				'800': '#0F172A',
  				'900': '#020617'
  			},
  			success: {
  				'50': '#ECFDF5',
  				'100': '#D1FAE5',
  				'500': '#10B981',
  				'700': '#047857'
  			},
  			warning: {
  				'50': '#FFFBEB',
  				'100': '#FEF3C7',
  				'500': '#F59E0B',
  				'700': '#B45309'
  			},
  			error: {
  				'50': '#FEF2F2',
  				'100': '#FEE2E2',
  				'500': '#EF4444',
  				'700': '#B91C1C'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			]
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem',
            'screen-header': 'calc(100vh - var(--header-height))',
            'content-area': 'min(100%, calc(100vw - 2rem))',
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			soft: '0 2px 15px rgba(0, 0, 0, 0.05)',
  			glow: '0 0 15px rgba(0, 85, 184, 0.4)',
  			'glow-sm': '0 0 10px rgba(0, 85, 184, 0.25)',
  			strong: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  		},
  		keyframes: {
  			'pulse-wide': {
  				'0%, 100%': {
  					transform: 'translateX(-100%)'
  				},
  				'50%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			ripple: {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: '0.7'
  				},
  				'100%': {
  					transform: 'scale(4)',
  					opacity: '0'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
            'bounce-subtle': {
              '0%, 100%': { transform: 'translateY(-2%)' },
              '50%': { transform: 'translateY(0)' },
            },
            'fade-in-up': {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            'slide-in-from-right': {
              '0%': { transform: 'translateX(100%)' },
              '100%': { transform: 'translateX(0)' },
            },
            'float-slow': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            'float-medium': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-15px)' },
            },
            'float-fast': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
            'subtle-pulse': {
              '0%, 100%': { opacity: '0.85' },
              '50%': { opacity: '1' },
            },
            'scale-pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
            },
            'pulse-slow': {
              '0%, 100%': { opacity: '0.6', transform: 'scale(0.95)' },
              '50%': { opacity: '1', transform: 'scale(1.05)' },
            },
  		},
  		animation: {
  			'pulse-wide': 'pulse-wide 2s ease-in-out infinite',
  			ripple: 'ripple 0.6s linear',
  			shimmer: 'shimmer 3s infinite linear',
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
            'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
            'fade-in-up': 'fade-in-up 0.5s ease-out',
            'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
            'float-slow': 'float-slow 7s ease-in-out infinite',
            'float-medium': 'float-medium 5s ease-in-out infinite',
            'float-fast': 'float-fast 3s ease-in-out infinite',
            'subtle-pulse': 'subtle-pulse 4s ease-in-out infinite',
            'scale-pulse': 'scale-pulse 3s ease-in-out infinite',
            'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			grain: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		},
      aria: {
        current: 'current="true"',
        selected: 'selected="true"', 
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
      },
      containers: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      },
  	}
  },
  plugins: [
    // Tailwind v4 doesn't need animate plugin as it's built-in
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
