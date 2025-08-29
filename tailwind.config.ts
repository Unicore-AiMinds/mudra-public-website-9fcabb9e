
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				mudra: {
					primary: '#0a7490', // deep teal blue
					'primary-light': '#0f8db8', // lighter teal
					'primary-lighter': '#3ba5c7', // even lighter teal
					'primary-lightest': '#b3e5f0', // very light teal
					'primary-dark': '#085b6f', // darker teal
					'primary-darker': '#064954', // very dark teal
					secondary: '#134e4a', // darker teal
					'secondary-light': '#1a625d', // lighter secondary
					'secondary-lighter': '#4f9491', // much lighter secondary
					'secondary-lightest': '#d1f2f0', // very light secondary
					accent: '#d4a21b', // gold accent
					'accent-light': '#e6b84a', // lighter gold
					'accent-lighter': '#f5d682', // much lighter gold
					'accent-lightest': '#fdf4e1', // very light gold
					'accent-dark': '#b8911a', // darker gold
					light: '#f1f5f9', // light background
					'light-blue': '#f0f9ff', // very light blue
					'light-teal': '#f0fdfa', // very light teal
					dark: '#1e293b', // dark text
					'gray-50': '#f8fafc',
					'gray-100': '#f1f5f9',
					'gray-200': '#e2e8f0',
					'gray-300': '#cbd5e1',
				},
				meditouch: {
					primary: '#6B2C91', // deep purple from logo
					'primary-light': '#8B44AC', // lighter purple
					'primary-lighter': '#B366C7', // much lighter purple
					'primary-lightest': '#E8D5F2', // very light purple
					'primary-dark': '#4A1E65', // darker purple
					'primary-darker': '#331545', // very dark purple
					secondary: '#E67E22', // vibrant orange from logo
					'secondary-light': '#F39C12', // lighter orange
					'secondary-lighter': '#F8B644', // much lighter orange
					'secondary-lightest': '#FEF3E2', // very light orange
					'secondary-dark': '#C7631B', // darker orange
					accent: '#8B44AC', // lighter purple for accents
					'accent-light': '#B366C7', // lighter accent
					'accent-lighter': '#D8A2E0', // much lighter accent
					'accent-lightest': '#F3E8F7', // very light accent
					gradient: {
						from: '#6B2C91', // purple start
						via: '#8B44AC', // mid purple
						to: '#E67E22', // orange end
					},
					gray: '#6C757D', // neutral gray from tagline
					'gray-50': '#faf9fb',
					'gray-100': '#f4f3f6',
					'gray-200': '#e9e7ed',
					'gray-300': '#d4d1da',
					'warm-50': '#fefcf9',
					'warm-100': '#fdf8f1',
				}
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
				'display': ['Playfair Display', 'Georgia', 'serif'], // For large headings
				'body': ['Inter', 'system-ui', 'sans-serif'], // For body text
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.5' }],
				'sm': ['0.875rem', { lineHeight: '1.6' }],
				'base': ['1rem', { lineHeight: '1.7' }],
				'lg': ['1.125rem', { lineHeight: '1.7' }],
				'xl': ['1.25rem', { lineHeight: '1.6' }],
				'2xl': ['1.5rem', { lineHeight: '1.5' }],
				'3xl': ['1.875rem', { lineHeight: '1.4' }],
				'4xl': ['2.25rem', { lineHeight: '1.3' }],
				'5xl': ['3rem', { lineHeight: '1.2' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
			},
			fontWeight: {
				'light': '300',
				'normal': '400',
				'medium': '500',
				'semibold': '600',
				'bold': '700',
				'extrabold': '800',
			},
			letterSpacing: {
				'tighter': '-0.05em',
				'tight': '-0.025em',
				'normal': '0em',
				'wide': '0.025em',
				'wider': '0.05em',
				'widest': '0.1em',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
