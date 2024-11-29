/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-8980b84e85064815a98217020b69d4c0.r2.dev',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",  // Apply to all paths
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Replace '*' with the actual origin if needed
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  }
}

export default nextConfig;
