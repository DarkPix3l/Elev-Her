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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // The `externals` array is where Node.js modules that shouldn't be bundled go.
      // We must check if it exists before pushing to it.
      if (!config.externals) {
        config.externals = [];
      }

      // Ensure the 'next-auth/react' package is never bundled with the server code.
      config.externals.push('next-auth/react');
    }

    return config;
  },
};

export default nextConfig;
