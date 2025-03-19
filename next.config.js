const nextConfig = {
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
			},
			{
				protocol: "https",
				hostname: "ugc.production.linktr.ee"
			},
			{
				protocol: "https",
				hostname: "picsum.photos"
			}
		]
	}
}

module.exports = nextConfig
