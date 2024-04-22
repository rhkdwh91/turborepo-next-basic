/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui", "@nextui-org/react", "@nextui-org/theme"],
  experimental: {
    appDir: true,
  },
};
