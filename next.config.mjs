/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'eu-central-1.xata.sh',
			},
			{
				hostname: 'i.etsystatic.com',
			},
		],
	},
};

export default nextConfig;
