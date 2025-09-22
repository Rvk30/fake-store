import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com', // <-- Change this
                port: '',
                pathname: '/img/**',
            },
        ],
    },
};

export default nextConfig;
