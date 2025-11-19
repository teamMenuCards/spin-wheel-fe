// Get API base URL from environment variable
const apiBaseUrl =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010"

// Parse the URL to extract protocol and host
let apiUrl, wsUrl
try {
	const url = new URL(apiBaseUrl)
	apiUrl = `${url.protocol}//${url.host}`
	// Generate WebSocket URL (ws:// for http, wss:// for https)
	wsUrl = url.protocol === "https:" ? `wss://${url.host}` : `ws://${url.host}`
} catch {
	// Fallback if URL parsing fails
	apiUrl = apiBaseUrl
	wsUrl = apiBaseUrl.replace(/^https?:\/\//, "ws://")
}

const nextConfig = {
	/* config options here */
	images: {
		minimumCacheTTL: 2678400, // 31 days in seconds
		domains: ["res.cloudinary.com", "dummyimage.com", "ik.imagekit.io"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.shutterstock.com"
			},
			{
				protocol: "https",
				hostname: "b.zmtcdn.com"
			},
			{
				protocol: "https",
				hostname: "media-assets.swiggy.com"
			},
			{
				protocol: "https",
				hostname: "ugc.production.linktr.ee"
			},
			{
				protocol: "https",
				hostname: "picsum.photos"
			}
		],
		formats: ["image/webp"],
		qualities: [75, 85],
		deviceSizes: [640, 768, 1024, 1280], // Responsive breakpoints
		imageSizes: [16, 32, 48, 64, 96] // Non-responsive images (e.g., avatars, icons)
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `default-src 'self' ${apiUrl}; connect-src 'self' ${apiUrl} ${wsUrl};`
					}
				]
			}
		]
	}
}

module.exports = nextConfig
