/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com", "b.zmtcdn.com"]
	},
	eslint: {
		ignoreDuringBuilds: true
	}
}

export default nextConfig
