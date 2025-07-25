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
      {
        protocol: 'https',
        hostname: 'xirnisljwfonmigntagf.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
