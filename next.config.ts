import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
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
			}
		]
	},

	async redirects() {
		return [
			{
				source: "/restaurant/:slug",
				has: [
					{
						type: "query",
						key: "m",
						value: "DINE_IN"
					}
				],
				destination: "/new-url/:slug",
				permanent: true
			}
		]
	}
}

export default nextConfig
