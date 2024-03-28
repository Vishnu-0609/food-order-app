/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          // {
          //   protocol: 'https',
          //   hostname: 'res.cloudinary.com',    not needed but when error occures then focus on it
          // }
        ],
      },
};

export default nextConfig;
