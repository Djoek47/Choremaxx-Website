# ChoreMaxx Marketing Website

Production marketing & legal companion website for ChoreMaxx — an AI Household Operating System.

## Overview

This is a premium, fully-optimized Next.js marketing site built for App Store and Google Play app listings. It features:

- ✅ **Complete SEO infrastructure** (sitemap, robots, structured data, metadata)
- ✅ **Glassmorphism design** with Apple-style premium aesthetic
- ✅ **Full legal compliance** (Privacy, Terms, Copyright, Kids/Parental Controls)
- ✅ **Multiple SEO landing pages** for organic discovery
- ✅ **Responsive mobile-first design**
- ✅ **Warm, accessible color palette** (#D85A30 coral, warm cream background)
- ✅ **Support page with FAQ schema**
- ✅ **Email asset hosting** for marketing campaigns

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel
- **Domain:** mytikas73.com (custom)

## Project Structure

```
app/
├── layout.tsx                 # Root layout with SEO metadata
├── globals.css               # Design tokens & theme
├── page.tsx                  # Homepage
├── how-it-works/page.tsx    # Product flow
├── features/page.tsx         # Feature details & modules
├── download/page.tsx         # App download page
├── support/page.tsx          # Support & FAQ (with schema)
├── privacy/page.tsx          # Privacy Policy (required for App Store)
├── terms/page.tsx            # Terms of Service (required for App Store)
├── copyright/page.tsx        # Copyright & IP
├── cookies/page.tsx          # Cookie notice
├── kids/page.tsx             # Parental controls & child safety
├── family-chore-app/         # SEO landing page
├── household-os/             # SEO landing page
├── ai-family-organizer/      # SEO landing page
├── sitemap.ts               # Dynamic sitemap generation
├── robots.ts                # Robots.txt
└── not-found.tsx            # 404 page

components/
├── Header.tsx               # Sticky navigation
├── Footer.tsx               # Footer with links
└── LegalDocument.tsx        # Reusable legal page layout

public/
├── brand/
│   └── choremaxx-logo-mark.png    # App icon (1024×1024)
├── emails/
│   └── logo-mark.png              # Email logo
└── og.png                         # Open Graph image (1200×630)
```

## Setup & Development

### Prerequisites

- Node.js 18+ (pnpm recommended)
- Git

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
pnpm build
pnpm start
```

## Deployment to Vercel

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"** → select this repository
3. Configure build settings (Next.js preset auto-detected)
4. Click **"Deploy"**

### Step 2: Custom Domain

1. In Vercel project settings → **Domains**
2. Add **mytikas73.com** as custom domain
3. Follow DNS setup for your domain registrar

### Step 3: Environment (if needed)

No environment variables required for v1 (static marketing site).

If adding analytics in the future, add to `.env.local`:

```
NEXT_PUBLIC_ANALYTICS_KEY=your_key_here
```

## Important URLs for App Stores

These are the URLs your mobile app should reference in App Store & Google Play listings:

- **Privacy Policy:** `https://mytikas73.com/privacy`
- **Terms of Service:** `https://mytikas73.com/terms`
- **Support:** `https://mytikas73.com/support`
- **Copyright:** `https://mytikas73.com/copyright`

### App Store Connect & Google Play Console

When submitting ChoreMaxx to stores, use these exact URLs in your app's metadata. They must be publicly accessible without authentication.

## Email Asset Hosting

Brand logo available at:

- `https://mytikas73.com/emails/logo-mark.png`

Use this URL in email templates and marketing campaigns.

## SEO & Technical

### Metadata

Every page includes:
- ✅ Unique `<title>` (50–60 chars)
- ✅ Unique `meta description` (140–160 chars)
- ✅ Canonical URLs (apex domain)
- ✅ Open Graph tags (social share)
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD Organization, FAQPage schema)

### Sitemaps & Robots

- `robots.txt` → Allows all, links to sitemap
- `sitemap.xml` → All public routes + SEO landing pages

### Core Web Vitals Optimization

- Next.js Image component for all images (lazy load, optimization)
- Font system stack (no heavy custom fonts)
- Minimal JS overhead
- Static generation (ISG) for marketing pages

## Brand Guidelines (Hard Constraints)

### Colors

- **Primary Coral:** `#D85A30`
- **Accent:** `#E4552B`
- **Dark Text ("chore"):** `#712B13`
- **Cream Background:** `#F7F4F2`
- **Surface (white):** `#FFFFFF`
- **Divider:** `#ECE6E2`

### Logo

- File: `/public/brand/choremaxx-logo-mark.png`
- Style: Warm coral house mark with cream checkmark/chart
- Never recreate as SVG or emoji
- Wordmark: "chore" (dark) + "maxx" (coral) — lowercase

### Typography

- Font stack: System fonts (SF Pro Display / Helvetica Neue / Segoe UI)
- Headings: Bold, tracking-tight
- Body: 16px–18px, leading-relaxed (1.4–1.6)
- Max 2 font families

## Important Notes

### Child Safety

ChoreMaxx supports kids under parental supervision. The `/kids` page explains:
- How parents control access & approvals
- What data we collect from children
- Privacy commitments

This is required for App Store "Kids" category scrutiny.

### Privacy Compliance

- Privacy & Terms pages are mandatory public URLs
- No authentication/login wall
- Must be reachable from every page footer
- Update `lastUpdated` date when legal terms change

### SEO Landing Pages

Three additional pages drive organic traffic:
- `/family-chore-app` — Target "family chore app" searches
- `/household-os` — Target "household operating system"
- `/ai-family-organizer` — Target "AI family organizer"

These link internally to main features, driving SEO juice.

## Design System (Glassmorphism)

The site uses frosted glass effects throughout:

- `.glass` — Large cards with backdrop blur
- `.glass-sm` — Small cards with backdrop blur
- `.glass-dark` — Dark glass on light backgrounds
- `.btn-primary` — Coral primary button
- `.btn-secondary` — Outlined button
- `.section-container` — Responsive container (max-w-7xl)

## Customization

### Adding Analytics

Create a `components/Analytics.tsx`:

```tsx
// components/Analytics.tsx
export default function Analytics() {
  return (
    <script async src="your-analytics-script"></script>
  );
}
```

Import in `app/layout.tsx`:

```tsx
import Analytics from '@/components/Analytics';
// Then add <Analytics /> before closing </body>
```

Update `/cookies` page to disclose analytics before enabling.

### Changing Colors

Edit `/app/globals.css` in the `@theme` block:

```css
@theme {
  --color-primary: #YOUR_HEX;
  // ... etc
}
```

### Adding Routes

Create new folder in `/app` with `page.tsx`:

```bash
mkdir app/new-page
echo "export default function NewPage() { return <div>Content</div> }" > app/new-page/page.tsx
```

Add to sitemap.ts and footer links.

## Performance Tips

- Images load via `<Image>` (Next.js optimized)
- Pages are SSG (static) by default
- Zero tracking JS by default (privacy-first)
- Minimal CSS (Tailwind v4 is lean)

## Troubleshooting

### Deploy fails

- Check Node.js version matches Vercel (18+)
- Verify no environment variables are hardcoded
- Run `pnpm build` locally to test

### Style issues

- Tailwind cache: `rm -rf .next && pnpm dev`
- Colors not applying: Ensure `@theme` block is in globals.css

### SEO not indexing

- Verify `robots.txt` allows indexing
- Check `canonical` URLs are correct
- Inspect sitemap.xml generation

## Support

For technical issues:
- Check [Vercel docs](https://vercel.com/docs)
- Review [Next.js 16 docs](https://nextjs.org)
- Inspect browser console for errors

For product questions:
- Email: support@choremaxx.app

## License

© 2026 ChoreMaxx. All rights reserved.

---

**Ready to deploy?**

```bash
git push origin main  # Push to GitHub
# Vercel auto-deploys on push
```

Check your deployment at `mytikas73.com`.
