/** @type {import('next').NextConfig} */
import withTwin from './withTwin.mjs'

export default withTwin({
  transpilePackages: ["@repo/ui", "@repo/tailwind-config"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  }
});
