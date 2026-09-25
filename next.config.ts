import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: '/myPortfolio',
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
