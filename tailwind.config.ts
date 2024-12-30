import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},

		screens: {
			xs: "450px",
			// => @media (min-width: 450px) { ... }

			sm: "575px",
			// => @media (min-width: 576px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "992px",
			// => @media (min-width: 992px) { ... }

			xl: "1200px",
			// => @media (min-width: 1200px) { ... }

			"2xl": "1400px",
			// => @media (min-width: 1400px) { ... }
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				},
				current: "currentColor",
				transparent: "transparent",
				white: "#FFFFFF",
				black: "#000000",
				dark: "#1D2430",
				yellow: "#FBB040",
				"bg-color-dark": "#171C28",
				"body-color": {
					DEFAULT: "#788293",
					dark: "#959CB1",
				},
				stroke: {
					stroke: "#E3E8EF",
					dark: "#353943",
				},
				gray: {
					...colors.gray,
					dark: "#1E232E",
					light: "#F0F2F9",
				},
				primary: "#3a5e7f",
				sandwisp: "#f4e1a4",
				"pigeon-post": "#b0c1d8",
				"blue-bayoux": "#4e5b83",
				"gun-powder": "#3c3c4e",
				"steel-gray": "#1d1d30",
			},
			boxShadow: {
				signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
				one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
				two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
				three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
				sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
				"sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
				"feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
				submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
				"submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
				btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
				"btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
				"btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
			},
			dropShadow: {
				three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
