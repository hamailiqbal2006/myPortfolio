import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  async redirects() {
    return [
      {
        source: '/apps',
        destination: '/websites',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
