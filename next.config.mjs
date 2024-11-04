/** @type {import('next').NextConfig} */


const AWS_BUCKET_HOST = process.env.NEXT_PUBLIC_BUCKET_HOST;
const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME;
const AWS_DB_HOST = process.env.NEXT_PUBLIC_DB_HOST;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol,
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
        source: '/api/post/:path*',
        destination: `${protocol}://${AWS_DB_HOST}/api/post/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${protocol}://${AWS_DB_HOST}/api/auth/:path*`,
      },
      {
        source: '/api/user/:path*',
        destination: `${protocol}://${AWS_DB_HOST}/api/user/:path*`,
      },
      {
        source: '/api/team/:path*',
        destination: `${protocol}://${AWS_DB_HOST}/api/team/:path*`,
      },
      {
        source: '/api/image/:path*',
        destination: `https://${AWS_BUCKET_HOST}/${AWS_BUCKET_NAME}/:path*`,
      },
    ];
  },
};

export default nextConfig;
