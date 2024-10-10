

/** @type {import('next').NextConfig} */
const protocol = process.env.NEXT_PUBLIC_DB_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_DB_HOST;
const port = process.env.NEXT_PUBLIC_DB_PORT;

const nextConfig = {
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${protocol}://${hostname}:${port}` + '/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol,
        hostname,
        port,
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
