import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["res.cloudinary.com", "dummyimage.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.shutterstock.com"
			},
			{
				protocol: "https",
				hostname: "b.zmtcdn.com"
			}
		]
	}
}

export default nextConfig
