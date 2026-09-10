import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep tracing rooted at the actual application directory. This prevents
  // Next.js from treating an unrelated parent package-lock.json as the app root.
  outputFileTracingRoot: path.resolve(__dirname),
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      ],
    }];
  },
};

export default nextConfig;
