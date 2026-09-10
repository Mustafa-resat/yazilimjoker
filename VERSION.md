# JOKER YAZILIM — V13.2 Vercel Stabilization

- Fixed `NextResponse` imports to use `next/server`.
- Updated `lucide-react` to 0.542.0.
- Pinned Vercel Node runtime to 20.x.
- Split the homepage into a server route wrapper + client UI.
- Homepage route uses `dynamic = 'force-dynamic'` and `revalidate = 0` to prevent the Vercel static prerender crash seen in deployment logs.
- Added a client-side error fallback for runtime resilience.
