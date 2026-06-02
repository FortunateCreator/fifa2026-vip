// Write all site files via Claude Code in one shot
cd /root/fifa2026-vip

claude --bare \
  --settings ~/.config/mg-deepseek/claude-deepseek-settings.json \
  --model sonnet \
  --allowedTools 'Read,Bash,Write' \
  --max-turns 50 \
  -p 'Build a complete FIFA 2026 VIP ticket sales website at /root/fifa2026-vip. This is a Next.js 16 App Router project with TypeScript, Tailwind CSS, and Supabase.

## Tech stack
- Next.js 16 (app router, src/app directory)
- Tailwind CSS v4
- @supabase/supabase-js
- lucide-react icons

## Supabase config
- URL: http://127.0.0.1:54321
- Anon key: eyJhbG...n_I0
- Schema: fifa (all tables are in fifa schema)
- Tables: fifa.venues, fifa.matches, fifa.packages, fifa.enquiries
- Queries need: from("fifa.venues") etc.

## What to build

### 1. src/lib/supabase.ts (already exists - check it)
### 2. src/lib/seatmap-context.tsx (already exists - check it)

### 3. src/components/Navbar.tsx
Dark luxury navbar with: logo "FIFA 2026 VIP", links: Tickets, Stadiums, How It Works, Contact. Sticky.

### 4. src/components/Hero.tsx  
Full-screen hero with gradient overlay. Headline: "THE ULTIMATE FIFA 2026 VIP EXPERIENCE"
Subheadline: "Private jet charters · Rolls Royce transfers · Presidential suites · Crypto concierge"
CTA buttons: "View Packages" and "Book VIP Consultation"
Add time-until-tournament countdown (tournament starts June 11, 2026).

### 5. src/components/PackageCard.tsx
Card component showing: package name, price (formatted), description, amenities icons (jet, rolls royce, hospitality), "Book Now" button. Dark theme.

### 6. src/components/StadiumSelector.tsx
Interactive 3D-ish stadium SVG seat selector. This is the KEY component:

Show a top-down SVG view of a stadium with sections:
- VIP Suites (front-center, highlighted gold)
- Category 1 (lower bowl sides)
- Category 2 (upper bowl)
- Standard (end zones)

When user hovers a section, show section info tooltip.
When user clicks a section, highlight it and show "Selected: Section X - $Y,ZZZ" at bottom.
Include a stadium selector dropdown at top to switch between venues (AT&T Stadium, MetLife, Estadio Azteca, Mercedes-Benz, SoFi, Hard Rock).
Make it DRAG to rotate slightly, or at least visually impressive.

Use SVG paths for the stadium shape (oval/rectangle with rounded corners), divide into colored sections.

### 7. src/components/PackageGrid.tsx
Grid that fetches packages from Supabase and renders PackageCards.

### 8. src/components/ContactForm.tsx
Form with fields: name, email, phone, country, interest (dropdown), message, preferred crypto (checkboxes: BTC, ETH, USDT). 
Posts to fifa.enquiries table via supabase.from("fifa.enquiries").insert().

### 9. src/app/layout.tsx
Root layout with Navbar, SeatMapProvider, dark theme body, Inter font.

### 10. src/app/page.tsx (COMPLETE HOMEPAGE)
Hero → Countdown → Featured Packages (fetch from DB) → Stadium Preview → VIP Services section (jet, rolls, concierge icons) → Crypto Payment section → Contact form → Footer

### 11. src/app/tickets/page.tsx
All packages in a grid, filterable by match type (Opening, Semi-Final, Final), sort by price. Each card links to booking.

### 12. src/app/stadiums/page.tsx
Show all 8 venues in a grid with capacity info. Each venue has the interactive StadiumSelector component.

### 13. src/app/booking/page.tsx
Booking page: package selection summary, interactive seat selector, client details form, crypto payment info section.

### 14. Tailwind config for dark theme
The site should look like a luxury VIP brand: dark backgrounds (#0a0a0f, #111118), gold accents (#d4a853, #f0d68a), clean typography, subtle animations.

### IMPORTANT
- ALL database queries must use fifa schema: supabase.from("fifa.venues").select("*")
- Use Tailwind v4 syntax (no @apply config needed, just classes)
- Make it production-quality, mobile responsive
- No authentication needed for viewing/browsing
- Enquiries table insert is public

Build ALL files. Do not stop until every file is written and the site builds.
' 2>&1