/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'recreators-camp.akinorisahoda.com',
            },
            {
                protocol: 'https',
                hostname: 'back.recreators-camp.com',
            }
        ]
    },
};

export default nextConfig;
