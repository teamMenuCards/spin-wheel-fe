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
	}
}

module.exports = nextConfig
