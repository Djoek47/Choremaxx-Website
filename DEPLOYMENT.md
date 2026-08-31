# ChoreMaxx Website Deployment Guide

## What You've Got

A **premium, production-ready marketing website** for ChoreMaxx built with Apple iOS 27 glassmorphism design, complete with:

✅ **SEO infrastructure** — sitemap, robots.txt, structured data, metadata on every page
✅ **Legal compliance** — Privacy, Terms, Copyright, Cookie notice, Kids/Parental Controls
✅ **Complete brand implementation** — Warm coral palette (#D85A30), glassmorphic design, responsive mobile-first
✅ **Multiple landing pages** — Homepage, How it Works, Features, Download, Support, + 3 SEO pages
✅ **Email assets** — Logo hosting at `/emails/logo-mark.png`
✅ **Support infrastructure** — FAQ with schema markup, contact pages
✅ **Custom domain ready** — www.choremaxx.app

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Add ChoreMaxx marketing website"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Auto-deploy (recommended)**
- Any push to `main` auto-deploys
- Visit [vercel.com](https://vercel.com) and select this repo
- Vercel auto-detects Next.js and builds

**Option B: Manual deploy**
```bash
npm install -g vercel
vercel --prod
```

### 3. Connect Custom Domain

In Vercel dashboard:
1. **Project Settings** → **Domains**
2. Add `www.choremaxx.app`
3. Follow DNS instructions for your registrar
4. Point to Vercel nameservers (or add CNAME)

### 4. Set App Store URLs

When submitting to App Store & Google Play, use:

**Privacy Policy:**
```
https://www.choremaxx.app/privacy
```

**Terms of Service:**
```
https://www.choremaxx.app/terms
```

**Support URL:**
```
https://www.choremaxx.app/support
```

**App Privacy Policy URL (if separate):**
```
https://www.choremaxx.app/privacy
```

These URLs must be publicly accessible without login.

## Key Pages & Routes

### Main Pages
- `/` — Homepage with hero, modules, trust section
- `/how-it-works` — Plain English explanation
- `/features` — All 6 modules + roles + permissions
- `/download` — App Store / Play Store download page (placeholders)
- `/support` — FAQ with schema markup

### Legal Pages (Required for App Stores)
- `/privacy` — Privacy Policy (MUST be crawlable)
- `/terms` — Terms of Service (MUST be crawlable)
- `/copyright` — Copyright & IP info
- `/cookies` — Cookie notice
- `/kids` — Parental controls & child safety info

### SEO Landing Pages (Drive Organic Traffic)
- `/family-chore-app` — Target "family chore app" searches
- `/household-os` — Target "household operating system"
- `/ai-family-organizer` — Target "AI family organizer"

### System Pages
- `/404` — Custom 404 page
- `/sitemap.xml` — Dynamic sitemap
- `/robots.txt` — Search engine directives

## Brand Assets

Logos are pre-generated at:

```
/public/brand/choremaxx-logo-mark.png     # App icon (1024×1024)
/public/emails/logo-mark.png               # Email logo
/public/og.png                             # Open Graph (1200×630)
```

Use these in:
- Email templates
- Social media
- Press kits
- Marketing materials

## Design System

### Colors (Hard Constraints)
```css
--color-primary: #D85A30         /* Coral */
--color-accent: #E4552B          /* Dark coral */
--color-dark-text: #712B13       /* Dark brown for "chore" text */
--color-light-text: #3d3d3d      /* Body text */
--color-background: #F7F4F2      /* Warm cream page background */
--color-surface: #FFFFFF         /* White cards */
--color-divider: #ECE6E2         /* Light borders */
```

### Glassmorphism Components
```html
.glass           - Large frosted glass card
.glass-sm        - Small frosted glass card
.glass-dark      - Dark glass on light background
```

### Buttons
```html
.btn-primary     - Solid coral button
.btn-secondary   - Outlined button
.btn-text        - Text link button
```

## SEO Optimization

✅ **Metadata:** Unique title & description per page
✅ **Canonical URLs:** All point to apex domain (www.choremaxx.app)
✅ **Structured Data:** Organization, FAQPage schema
✅ **Open Graph:** Social sharing images ready
✅ **Twitter Cards:** summary_large_image
✅ **Images:** Next.js `<Image>` for optimization
✅ **Mobile-first:** Responsive design, Core Web Vitals optimized
✅ **Accessibility:** Semantic HTML, alt text, focus states

## Environment Setup (None Required for v1)

This is a **static marketing site**—no backend, no env vars needed for launch.

Future additions:
- Add `NEXT_PUBLIC_ANALYTICS_KEY` if adding analytics
- Update `/cookies` page before enabling tracking

## What NOT to Do

❌ Don't hardcode app store links (keep as placeholders until ready)
❌ Don't change the URLs of `/privacy` or `/terms` (app stores expect these)
❌ Don't add user authentication to this marketing site
❌ Don't use `localStorage` (this is a static site, not an app)
❌ Don't recreate the ChoreMaxx logo as SVG/emoji

## How to Update Content

### Edit a page
```bash
# Edit existing page
edit app/page-name/page.tsx

# Changes auto-hot-reload
```

### Add a new page
```bash
mkdir app/new-page
cat > app/new-page/page.tsx << 'EOF'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Title",
  description: "Meta description",
  canonical: "https://www.choremaxx.app/new-page",
};

export default function NewPage() {
  return <div>Page content</div>;
}
EOF
```

### Update legal text
Edit the content in:
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/copyright/page.tsx`
- `app/cookies/page.tsx`
- `app/kids/page.tsx`

### Change colors
Edit `/app/globals.css` in the `@theme` block.

## Testing Before Deploy

```bash
# Build locally (catches errors early)
pnpm build

# Test on Vercel preview
git push origin feature-branch
# Vercel creates preview URL automatically

# Final production check
pnpm start  # Runs production build locally
```

## Monitoring

### Check Build Status
- Vercel dashboard → **Deployments**
- All pages should say "✓ Ready"

### Monitor Performance
- Vercel Analytics (free tier included)
- Google Search Console (connect via Vercel)
- PageSpeed Insights (test home page)

### Check Rankings
- Google Search Console → **Performance**
- Should see impressions for target keywords within weeks

## Troubleshooting

### Deploy fails
- Check `pnpm build` works locally
- Verify no TypeScript errors: `pnpm exec tsc --noEmit`
- Check Vercel logs for exact error

### SEO not indexing
- Verify `/robots.txt` allows indexing
- Check sitemap at `/sitemap.xml`
- Request indexing in Google Search Console

### Design looks broken
- Clear browser cache: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check Tailwind CSS compiled: should see `css` files in `.next/`

### Links not working
- Verify routes exist in `/app` folder
- Check no typos in `href` attributes
- Test in incognito window (cache issues)

## Next Steps

### After Deployment
1. ✅ Verify www.choremaxx.app loads correctly
2. ✅ Test all pages on mobile
3. ✅ Submit `/sitemap.xml` to Google Search Console
4. ✅ Add app store links to `/download` page
5. ✅ Test privacy & terms URLs (required for App Store)
6. ✅ Share marketing link on social media

### App Store Submission
Before submitting ChoreMaxx to stores:
- [ ] Privacy Policy URL: https://www.choremaxx.app/privacy ✓
- [ ] Terms URL: https://www.choremaxx.app/terms ✓
- [ ] Support email: support@choremaxx.app ✓
- [ ] Support page: https://www.choremaxx.app/support ✓
- [ ] Screenshots/preview ready

### Marketing
- Share `/family-chore-app` landing page on Reddit, HN, ProductHunt
- Email `/` homepage to press
- Link `/household-os` in household management content
- Pin `/features` on social media

## Support

**Technical help:**
- [Next.js 16 Docs](https://nextjs.org)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)

**ChoreMaxx questions:**
- support@choremaxx.app
- privacy@choremaxx.app (privacy/legal)

---

**Ready to go live?**

```bash
git push origin main
# Check Vercel dashboard for deployment status
# View live at https://www.choremaxx.app in ~60 seconds
```

Congratulations! Your ChoreMaxx marketing website is ready for the world. 🚀
