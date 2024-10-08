/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {domains: ['localhost']},
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
