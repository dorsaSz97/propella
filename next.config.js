/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { domains: ['images.unsplash.com', 'res.cloudinary.com'] },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/getting-started?type=login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
