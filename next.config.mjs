/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_DB_HOST}:3000/:path*`,
      },
    ];
  },
};

export default nextConfig;
