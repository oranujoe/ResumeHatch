import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./browser-extension/src/**/*.{ts,tsx,html}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			spacing: {
				'16': '4rem', // 64px for collapsed sidebar (reduced from 72px)
			},
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
				status: {
					applied: 'hsl(var(--status-applied))',
					interview: 'hsl(var(--status-interview))',
					offer: 'hsl(var(--status-offer))',
					rejected: 'hsl(var(--status-rejected))',
					pending: 'hsl(var(--status-pending))',
					draft: 'hsl(var(--muted-foreground))'
				},
				success: {
					primary: 'hsl(var(--success-primary))',
					secondary: 'hsl(var(--success-secondary))',
					light: 'hsl(var(--success-light))'
				},
				warning: {
					primary: 'hsl(var(--warning-primary))',
					secondary: 'hsl(var(--warning-secondary))',
					light: 'hsl(var(--warning-light))'
				},
				error: {
					primary: 'hsl(var(--error-primary))',
					secondary: 'hsl(var(--error-secondary))',
					light: 'hsl(var(--error-light))'
				},
				info: {
					primary: 'hsl(var(--info-primary))',
					secondary: 'hsl(var(--info-secondary))',
					light: 'hsl(var(--info-light))'
				},
				brand: {
					blue: '#3B82F6',
					yellow: '#FCD34D',
					teal: '#10B981',
					light: '#FFFFFF',
					dark: '#0F172A'
				}
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
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-left': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'fade-in-right': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(30px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(1deg)' },
					'50%': { transform: 'translateY(-10px) rotate(1deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' 
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' 
					}
				},
				'gradient-x': {
					'0%, 100%': { 
						backgroundSize: '200% 200%',
						backgroundPosition: 'left center'
					},
					'50%': { 
						backgroundSize: '200% 200%',
						backgroundPosition: 'right center'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			fontSize: {
				'display-large': ['clamp(2rem, 4vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-medium': ['clamp(1.6rem, 3.2vw, 2.4rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
				'display-small': ['clamp(1.2rem, 2.4vw, 2rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
				'headline-large': ['clamp(1rem, 2vw, 1.6rem)', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
				'headline-medium': ['clamp(0.9rem, 1.6vw, 1.2rem)', { lineHeight: '1.4' }],
				'headline-small': ['clamp(0.8rem, 1.2vw, 1rem)', { lineHeight: '1.4' }],
				'title-large': ['clamp(0.75rem, 1vw, 0.9rem)', { lineHeight: '1.5' }],
				'title-medium': ['clamp(0.75rem, 0.8vw, 0.8rem)', { lineHeight: '1.5' }],
				'title-small': ['clamp(0.625rem, 0.7vw, 0.75rem)', { lineHeight: '1.5' }],
				'body-large': ['clamp(0.75rem, 0.8vw, 0.8rem)', { lineHeight: '1.6' }],
				'body-medium': ['0.75rem', { lineHeight: '1.5' }],
				'body-small': ['0.625rem', { lineHeight: '1.4' }],
				'label-large': ['0.75rem', { lineHeight: '1', letterSpacing: '0.01em' }],
				'label-medium': ['0.625rem', { lineHeight: '1', letterSpacing: '0.015em' }],
				'label-small': ['0.625rem', { lineHeight: '1', letterSpacing: '0.02em' }],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
			},
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			}
		}
	},
	plugins: [animate],
} satisfies Config;
