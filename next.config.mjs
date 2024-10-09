/** @type {import('next').NextConfig} */
const protocol = process.env.NEXT_PUBLIC_DB_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_DB_HOST;
const port = process.env.NEXT_PUBLIC_DB_PORT;

const nextConfig = {
  reactStrictMode: false,
  images: {remotePatterns: [{
    protocol,
    hostname,
    port,
    pathname: '/public/**'
  }]},
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          `${protocol}://${hostname}:${port}` +
          '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
