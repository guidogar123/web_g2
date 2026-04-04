import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.g2intelligence.co" }],
        destination: "https://g2intelligence.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
