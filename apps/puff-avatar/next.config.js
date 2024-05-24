const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/tailwind-config"],
  experimental: {
    reactCompiler: true,
    compilationMode: "annotation",
    staleTimes: {
      dynamic: 30,
    },
  },
};

module.exports = nextConfig;
