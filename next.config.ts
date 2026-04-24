import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Keep kaomoji.json out of the JS bundle — it's read server-side via fs
  serverExternalPackages: [],
}

export default nextConfig
