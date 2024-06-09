/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				hostname: 'eu-central-1.xata.sh',
			},
		],
	},
};

export default nextConfig;
