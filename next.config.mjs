/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {remotePatterns: [{
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/public/**'
  }]},
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_DB_HOST + '/api/:path*'
      },
    ];
  },
};

export default nextConfig;
