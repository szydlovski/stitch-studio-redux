import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	swSrc: 'app/sw.ts',
	swDest: 'public/sw.js',
});

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

export default withSerwist(nextConfig);
