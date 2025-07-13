/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        //port: '',
        //pathname: '/images/**', 
      },
      //Add more objects here for other allowed external domains if necessary
  /*     {
        protocol: 'https',
        hostname: 'another-cdn.com',
      }, */
    ],
  },
};

export default nextConfig;
