/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Self-hosted media from the original site; serve unoptimized to match the static mirror.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      { source: "/submit", destination: "/submit-ai-tool", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/tos", permanent: true },
    ];
  },
};

export default nextConfig;
