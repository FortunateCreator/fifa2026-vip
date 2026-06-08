#!/usr/bin/env python3
"""Generate luxury branded SVGs for Vantage 26 FIFA 2026 VIP packages."""

import os, math

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'packages')
os.makedirs(OUT, exist_ok=True)

# ── Brand palette ──────────────────────────────────────────────
GOLD = '#B8860B'
GOLD_LIGHT = '#D4A843'
GOLD_GRADIENT = 'url(#goldGrad)'
DARK = '#0A0A0A'
DARK_CARD = '#1A1A1A'
WHITE = '#FFFFFF'
SILVER = '#C0C0C0'
PLATINUM = '#E5E4E2'

# Dimensions
W, H = 600, 400
CX, CY = W // 2, H // 2  # center

def svg_header(title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{GOLD_LIGHT}" />
      <stop offset="50%" stop-color="{GOLD}" />
      <stop offset="100%" stop-color="#8B6914" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{DARK}" />
      <stop offset="50%" stop-color="#111" />
      <stop offset="100%" stop-color="{DARK}" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#222" />
      <stop offset="100%" stop-color="#111" />
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{SILVER}" />
      <stop offset="50%" stop-color="#A9A9A9" />
      <stop offset="100%" stop-color="#808080" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#bgGrad)" rx="12"/>
  <rect x="4" y="4" width="{W-8}" height="{H-8}" fill="none" stroke="{GOLD}" stroke-width="0.5" rx="10" opacity="0.3"/>
  <!-- Subtle radial glow -->
  <circle cx="{CX}" cy="{CY}" r="180" fill="{GOLD}" opacity="0.04"/>
'''

def svg_footer():
    return '</svg>'

def badge(text, y=60, fill=GOLD_GRADIENT):
    return f'''  <rect x="{CX-100}" y="{y-18}" width="200" height="36" rx="18" fill="{GOLD}" opacity="0.15"/>
  <text x="{CX}" y="{y+4}" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{fill}" letter-spacing="3">{text}</text>'''

def title(text, y=180, size=28):
    return f'''  <text x="{CX}" y="{y}" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" font-size="{size}" fill="{WHITE}" font-weight="700" letter-spacing="2">{text}</text>'''

def subtitle(text, y=215, size=13):
    return f'''  <text x="{CX}" y="{y}" text-anchor="middle" font-family="Georgia,serif" font-size="{size}" fill="{GOLD_LIGHT}" letter-spacing="4" opacity="0.8">{text}</text>'''

def price_line(text, y=340):
    return f'''  <text x="{CX}" y="{y}" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="{GOLD_GRADIENT}" letter-spacing="2" font-weight="700">{text}</text>'''

def divider(y):
    return f'''  <line x1="{CX-80}" y1="{y}" x2="{CX+80}" y2="{y}" stroke="{GOLD}" stroke-width="0.5" opacity="0.4"/>'''

def bottom_stripe():
    return f'''  <rect x="0" y="{H-4}" width="{W}" height="4" fill="url(#goldGrad)" rx="2"/>'''

# ── Icon generators ──────────────────────────────────────────

def stadium_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-60,40 L-60,-20 Q-60,-40 0,-60 Q60,-40 60,-20 L60,40 Z" fill="{stroke}" opacity="0.1"/>
    <line x1="-60" y1="40" x2="-60" y2="50"/>
    <line x1="60" y1="40" x2="60" y2="50"/>
    <line x1="-75" y1="50" x2="75" y2="50" stroke-width="3"/>
    <!-- field lines -->
    <line x1="-30" y1="-10" x2="-30" y2="20" stroke-width="1" opacity="0.5"/>
    <line x1="30" y1="-10" x2="30" y2="20" stroke-width="1" opacity="0.5"/>
    <line x1="0" y1="-20" x2="0" y2="20" stroke-width="1" opacity="0.5"/>
    <ellipse cx="0" cy="20" rx="12" ry="6" stroke-width="1" opacity="0.5"/>
  </g>'''

def diamond_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2">
    <path d="M0,-40 L30,0 L0,40 L-30,0 Z" fill="{stroke}" opacity="0.15"/>
    <line x1="0" y1="-40" x2="20" y2="0" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="-40" x2="-20" y2="0" stroke-width="1" opacity="0.4"/>
    <line x1="30" y1="0" x2="0" y2="40" stroke-width="1" opacity="0.4"/>
    <line x1="-30" y1="0" x2="0" y2="40" stroke-width="1" opacity="0.4"/>
  </g>'''

def crown_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2" stroke-linejoin="round">
    <path d="M-40,30 L-40,0 L-20,15 L0,-15 L20,15 L40,0 L40,30 Z" fill="{stroke}" opacity="0.12"/>
    <circle cx="0" cy="-15" r="3" fill="{stroke}"/>
    <circle cx="-20" cy="15" r="3" fill="{stroke}"/>
    <circle cx="20" cy="15" r="3" fill="{stroke}"/>
  </g>'''

def shield_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2" stroke-linejoin="round">
    <path d="M-30,-45 L30,-45 L30,10 Q30,35 0,50 Q-30,35 -30,10 Z" fill="{stroke}" opacity="0.1"/>
    <line x1="-15" y1="-25" x2="15" y2="-25" stroke-width="1.5"/>
    <line x1="-10" y1="-15" x2="10" y2="-15" stroke-width="1.5"/>
  </g>'''

def champagne_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2">
    <path d="M-10,30 L-10,-15 Q-10,-25 0,-30 Q10,-25 10,-15 L10,30 Z" fill="{stroke}" opacity="0.1"/>
    <line x1="-15" y1="30" x2="15" y2="30" stroke-width="3"/>
    <!-- bubbles -->
    <circle cx="-3" cy="-5" r="1.5" fill="{stroke}" opacity="0.4"/>
    <circle cx="4" cy="-10" r="1" fill="{stroke}" opacity="0.3"/>
    <circle cx="-1" cy="-18" r="1.2" fill="{stroke}" opacity="0.5"/>
  </g>'''

def jet_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2" stroke-linejoin="round">
    <path d="M-50,0 L-30,-5 L-10,-8 L10,-5 L40,-10 L50,0 L40,10 L10,5 L-10,8 L-30,5 Z" fill="{stroke}" opacity="0.12"/>
    <!-- window row -->
    <circle cx="-20" cy="0" r="2" fill="{stroke}"/>
    <circle cx="-8" cy="0" r="2" fill="{stroke}"/>
    <circle cx="4" cy="0" r="2" fill="{stroke}"/>
  </g>'''

def car_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2" stroke-linejoin="round">
    <path d="M-50,-5 L-40,-20 L40,-20 L50,-5 L50,10 L-50,10 Z" fill="{stroke}" opacity="0.1"/>
    <path d="M-35,-20 L-25,-35 L25,-35 L35,-20" stroke-linecap="round"/>
    <line x1="-35" y1="-20" x2="-20" y2="-20" stroke-width="1"/>
    <line x1="20" y1="-20" x2="35" y2="-20" stroke-width="1"/>
    <circle cx="-25" cy="10" r="8" fill="{DARK}" stroke="{stroke}"/>
    <circle cx="-25" cy="10" r="3" fill="{stroke}"/>
    <circle cx="25" cy="10" r="8" fill="{DARK}" stroke="{stroke}"/>
    <circle cx="25" cy="10" r="3" fill="{stroke}"/>
    <!-- Spirit of Ecstasy hint -->
    <path d="M-5,-35 L-3,-42 L0,-45 L3,-42 L5,-35" stroke-width="1"/>
  </g>'''

def btc_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2">
    <circle cx="0" cy="0" r="35" fill="{stroke}" opacity="0.12"/>
    <path d="M-5,-20 L-5,22" stroke-width="3"/>
    <path d="M5,-18 L5,20" stroke-width="3"/>
    <path d="M-5,-12 Q5,-12 8,-8 Q12,-2 5,2 Q-2,5 -5,8" stroke-width="2"/>
    <path d="M-5,8 Q5,8 8,12 Q12,18 5,22 Q-2,25 -5,22" stroke-width="2"/>
    <text x="0" y="4" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="{stroke}" opacity="0.3">฿</text>
  </g>'''

def ticket_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2">
    <rect x="-40" y="-25" width="80" height="50" rx="4" fill="{stroke}" opacity="0.08"/>
    <circle cx="0" cy="-25" r="6" fill="{DARK}"/>
    <circle cx="0" cy="25" r="6" fill="{DARK}"/>
    <!-- perforation -->
    <line x1="-15" y1="-25" x2="-15" y2="25" stroke-width="1" stroke-dasharray="2,3" opacity="0.5"/>
    <line x1="15" y1="-25" x2="15" y2="25" stroke-width="1" stroke-dasharray="2,3" opacity="0.5"/>
    <text x="0" y="5" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{stroke}" opacity="0.6">V26</text>
  </g>'''

def skybox_icon(cx, cy, scale=1, stroke=GOLD):
    s = scale
    return f'''  <g transform="translate({cx},{cy}) scale({s})" fill="none" stroke="{stroke}" stroke-width="2">
    <rect x="-45" y="-30" width="90" height="60" rx="3" fill="{stroke}" opacity="0.08"/>
    <rect x="-40" y="-25" width="50" height="50" fill="{stroke}" opacity="0.06"/>
    <!-- window with view -->
    <rect x="10" y="-20" width="30" height="30" rx="2" fill="{stroke}" opacity="0.08"/>
    <line x1="15" y1="-5" x2="35" y2="-5" stroke-width="1" opacity="0.4"/>
    <line x1="15" y1="2" x2="35" y2="2" stroke-width="1" opacity="0.4"/>
    <!-- table -->
    <line x1="-30" y1="20" x2="0" y2="20" stroke-width="1.5"/>
    <rect x="-28" y="11" width="24" height="9" rx="1" fill="none" stroke-width="1"/>
    <circle cx="-16" cy="14" r="2" fill="{stroke}" opacity="0.3"/>
  </g>'''

# ── Package definitions ──────────────────────────────────────

TIERS = [
    {
        'name': 'Silver Seat',
        'slug': 'silver',
        'prices': '$3,500–$14,000',
        'tagline': 'ESSENTIAL ACCESS',
        'icon': ticket_icon,
        'desc': 'Standard seating — pure football. Best value for the world\'s biggest stage.',
    },
    {
        'name': 'Gold Experience',
        'slug': 'gold',
        'prices': '$12,000–$50,000',
        'tagline': 'PREMIUM ELEVATION',
        'icon': champagne_icon,
        'desc': 'Category 1 seats with lounge access, champagne service, and match program.',
    },
    {
        'name': 'Platinum',
        'slug': 'platinum',
        'prices': '$18,000–$35,000',
        'tagline': 'ELITE COURTSIDE',
        'icon': diamond_icon,
        'desc': 'Premium seating, VIP hospitality lounge, dedicated service.',
    },
    {
        'name': 'Premium Lounge',
        'slug': 'premium-lounge',
        'prices': '$12,000',
        'tagline': 'REFINED COMFORT',
        'icon': skybox_icon,
        'desc': 'Premium seating with hospitality lounge access and complimentary refreshments.',
    },
    {
        'name': 'VIP Skybox',
        'slug': 'vip-skybox',
        'prices': '$25,000',
        'tagline': 'PRIVATE LUXURY',
        'icon': skybox_icon,
        'desc': 'Private skybox suite with dedicated catering, private bar, and personal host.',
    },
    {
        'name': 'Chairman\'s Suite',
        'slug': 'chairman',
        'prices': '$35,000',
        'tagline': 'EXECUTIVE COMMAND',
        'icon': crown_icon,
        'desc': 'Chairman\'s suite with premium catering, private bar, and personal concierge.',
    },
    {
        'name': 'Diamond Suite',
        'slug': 'diamond',
        'prices': '$50,000',
        'tagline': 'FACETED PERFECTION',
        'icon': diamond_icon,
        'desc': 'Diamond suite with private butler, champagne bar, and VIP parking.',
    },
    {
        'name': 'Presidential Suite',
        'slug': 'presidential',
        'prices': '$45,000–$250,000',
        'tagline': 'HEAD OF STATE',
        'icon': shield_icon,
        'desc': 'Rolls-Royce pickup, Category 1 seats, private concierge, gourmet catering.',
    },
    {
        'name': 'Private Jet Transfer',
        'slug': 'private-jet',
        'prices': 'ADD-ON',
        'tagline': 'ABOVE THE CLOUDS',
        'icon': jet_icon,
        'desc': 'Gulfstream G650 private jet transfer. Included in Presidential & Crypto tiers.',
    },
    {
        'name': 'Rolls-Royce Arrival',
        'slug': 'rolls-royce',
        'prices': 'ADD-ON',
        'tagline': 'THE GRAND ENTRANCE',
        'icon': car_icon,
        'desc': 'Phantom or Cullinan pickup. Red carpet to stadium suite.',
    },
    {
        'name': 'Crypto Whale Concierge',
        'slug': 'crypto-whale',
        'prices': '$500,000',
        'tagline': 'THE ABSOLUTE PINNACLE',
        'icon': btc_icon,
        'desc': 'G650 jet, Rolls fleet, penthouse suite, personal chef. BTC/ETH only. No KYC.',
    },
    {
        'name': 'Standard Entry',
        'slug': 'standard',
        'prices': '$3,500',
        'tagline': 'WORLD CUP FOR ALL',
        'icon': stadium_icon,
        'desc': 'Standard seat. Enjoy world-class football at an accessible price.',
    },
]

# ── SVG generation ───────────────────────────────────────────

def make_svg(tier):
    name = tier['name']
    slug = tier['slug']
    prices = tier['prices']
    tagline = tier['tagline']
    desc = tier['desc']
    icon_fn = tier['icon']

    lines = [svg_header(name)]

    # Tagline badge at top
    lines.append(badge(tagline, y=55))

    # Icon
    lines.append(icon_fn(CX, 140, scale=1.0, stroke=GOLD_GRADIENT))

    # Package name
    lines.append(divider(y=210))
    lines.append(title(name, y=255, size=26 if len(name) > 20 else 30))
    lines.append(subtitle(desc, y=290, size=11))

    # Price
    lines.append(divider(y=320))
    lines.append(price_line(prices, y=350))

    # Bottom stripe
    lines.append(bottom_stripe())

    # Subtle watermark
    lines.append(f'''  <text x="{W-15}" y="{H-15}" text-anchor="end" font-family="Georgia,serif" font-size="11" fill="{GOLD}" opacity="0.15" letter-spacing="2">VANTAGE 26</text>''')

    lines.append(svg_footer())

    path = os.path.join(OUT, f'{slug}.svg')
    with open(path, 'w') as f:
        f.write('\n'.join(lines))
    print(f'  ✓ {slug}.svg')

# ── Homepage hero background ─────────────────────────────────

def make_hero_bg():
    lines = [f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" width="1440" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050505" />
      <stop offset="40%" stop-color="#0A0A0A" />
      <stop offset="100%" stop-color="#111" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{GOLD_LIGHT}" />
      <stop offset="50%" stop-color="{GOLD}" />
      <stop offset="100%" stop-color="#8B6914" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="40%" r="40%">
      <stop offset="0%" stop-color="{GOLD}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="{GOLD}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1440" height="800" fill="url(#bgGrad)"/>
  <rect width="1440" height="800" fill="url(#glowGrad)"/>
  <!-- Stadium silhouette -->
  <g fill="none" stroke="{GOLD}" stroke-width="0.5" opacity="0.12" transform="translate(720,420)">
    <path d="M-300,200 L-300,-60 Q-300,-120 0,-180 Q300,-120 300,-60 L300,200" stroke-width="2"/>
    <line x1="-300" y1="200" x2="300" y2="200" stroke-width="3"/>
    <line x1="-240" y1="-40" x2="-240" y2="100" opacity="0.3"/>
    <line x1="-160" y1="-60" x2="-160" y2="100" opacity="0.3"/>
    <line x1="-80" y1="-100" x2="-80" y2="100" opacity="0.3"/>
    <line x1="0" y1="-120" x2="0" y2="100" opacity="0.3"/>
    <line x1="80" y1="-100" x2="80" y2="100" opacity="0.3"/>
    <line x1="160" y1="-60" x2="160" y2="100" opacity="0.3"/>
    <line x1="240" y1="-40" x2="240" y2="100" opacity="0.3"/>
    <!-- field -->
    <rect x="-100" y="30" width="200" height="90" rx="2" opacity="0.08" stroke-width="1"/>
    <line x1="0" y1="30" x2="0" y2="120" opacity="0.08"/>
    <circle cx="0" cy="75" r="25" opacity="0.08" stroke-width="1"/>
  </g>
  <!-- Gold line art decoration -->
  <g stroke="{GOLD}" stroke-width="0.5" opacity="0.06">
    <line x1="0" y1="780" x2="1440" y2="780"/>
    <line x1="0" y1="783" x2="1440" y2="783"/>
  </g>
  <!-- Corner ornaments -->
  <rect x="30" y="30" width="60" height="2" fill="{GOLD}" opacity="0.15"/>
  <rect x="30" y="30" width="2" height="60" fill="{GOLD}" opacity="0.15"/>
  <rect x="1350" y="30" width="60" height="2" fill="{GOLD}" opacity="0.15"/>
  <rect x="1438" y="30" width="2" height="60" fill="{GOLD}" opacity="0.15"/>
  <rect x="30" y="768" width="60" height="2" fill="{GOLD}" opacity="0.15"/>
  <rect x="30" y="738" width="2" height="60" fill="{GOLD}" opacity="0.15"/>
  <rect x="1350" y="768" width="60" height="2" fill="{GOLD}" opacity="0.15"/>
  <rect x="1438" y="738" width="2" height="60" fill="{GOLD}" opacity="0.15"/>
</svg>''']
    path = os.path.join(OUT, '..', 'hero-bg.svg')
    path = os.path.normpath(path)
    with open(path, 'w') as f:
        f.write('\n'.join(lines))
    print(f'  ✓ hero-bg.svg')

# ── Run ─────────────────────────────────────────────────────

if __name__ == '__main__':
    print('Generating Vantage 26 package SVGs...')
    for t in TIERS:
        make_svg(t)
    make_hero_bg()
    print(f'\nDone! {len(TIERS) + 1} SVGs saved to {OUT}/')
