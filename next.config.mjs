/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "ecommerce.routemisr.com",
    },
    {
      protocol: "https",
      hostname: "developers.google.com"
    }
  ],
},
  /* config options here */
};

export default nextConfig;
