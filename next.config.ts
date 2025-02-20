import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.iconscout.com',
        port: '',
        pathname: '/*',
        search: '',
      },
    ],
  },
};

export default nextConfig;
