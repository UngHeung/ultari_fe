/** @type {import('next').NextConfig} */

const AWS_BUCKET_HOST = process.env.NEXT_PUBLIC_BUCKET_HOST;
const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME;
const AWS_DB_HOST = process.env.NEXT_PUBLIC_DB_HOST;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${AWS_BUCKET_HOST}`,
        port: '',
        pathname: `/${AWS_BUCKET_NAME}/public/**`,
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: `https://${AWS_DB_HOST}`,
          },
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
        destination: `https://${AWS_DB_HOST}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
