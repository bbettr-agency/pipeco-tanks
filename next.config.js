/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Canonical domain is the apex (pipecoza.com). Any request arriving on the
  // www host is permanently redirected to the apex. This only matches the
  // www.pipecoza.com host, so it has no effect on the *.vercel.app preview.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pipecoza.com" }],
        destination: "https://pipecoza.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
