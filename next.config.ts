import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Default deviceSizes top out at 3840, which a 1440@2x screen asks for on
       the hero plate: 8.6MP, 33MB of texture and ~33ms to decode, against
       2.4MP / 9MB / 7ms at 2048 — and the two are indistinguishable, because
       the plate is a soft-focus photograph behind a veil and a mask. Nothing
       on the page needs more than 2048. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
