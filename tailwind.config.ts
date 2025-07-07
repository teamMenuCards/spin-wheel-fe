import svgToDataUri from "mini-svg-data-uri"
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette"
import { PluginAPI } from "tailwindcss/types/config"

import type { Config } from "tailwindcss"
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	darkMode: "class",
	theme: {
		extend: {
			keyframes: {
				slideUp: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" }
				}
			},
			animation: {
				slideUp: "slideUp 0.3s ease-out forwards"
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			},
			fontFamily: {
				metropolis: ["Metropolis", "sans-serif"]
			},
			strokeWidth: {
				1: "1px",
				2: "2px",
				3: "3px",
				4: "4px"
			}
		}
	},
	plugins: [
		addVariablesForColors,
		function ({
			matchUtilities,
			theme
		}: {
			matchUtilities: PluginAPI["matchUtilities"]
			theme: PluginAPI["theme"]
		}) {
			matchUtilities(
				{
					"bg-dot-thick": (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
						)}")`
					})
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			)
		}
	]
} satisfies Config

function addVariablesForColors({
	addBase,
	theme
}: {
	addBase: PluginAPI["addBase"]
	theme: PluginAPI["theme"]
}) {
	const allColors = flattenColorPalette(theme("colors"))
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		":root": newVars
	})
}
