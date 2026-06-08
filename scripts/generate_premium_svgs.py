#!/usr/bin/env python3
"""
Vantage 26 — Premium SVG Package Generator V2
Generates detailed vector illustrations with rich gradients, architectural elements,
luxury motifs, and sophisticated geometric patterns.
"""
import os, math

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images', 'packages')
os.makedirs(OUT, exist_ok=True)

def polar_star(cx, cy, r, points=8, rot=0):
    """Generate a star polygon path."""
    pts = []
    for i in range(points * 2):
        angle = rot + math.pi * i / points
        radius = r if i % 2 == 0 else r * 0.4
        pts.append(f"{cx + radius * math.cos(angle):.1f},{cy + radius * math.sin(angle):.1f}")
    return " ".join(pts)

def ornate_pattern(w, h, color, opacity=0.06):
    """Generate decorative geometric pattern."""
    pat = f'<pattern id="ornate" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">\n'
    pat += f'  <path d="M0,40 L40,0 L80,40 L40,80 Z" fill="none" stroke="{color}" stroke-width="0.3" opacity="{opacity}"/>\n'
    pat += f'  <circle cx="40" cy="40" r="8" fill="none" stroke="{color}" stroke-width="0.3" opacity="{opacity}"/>\n'
    pat += f'  <circle cx="0" cy="0" r="4" fill="none" stroke="{color}" stroke-width="0.2" opacity="{opacity}"/>\n'
    pat += f'  <circle cx="80" cy="0" r="4" fill="none" stroke="{color}" stroke-width="0.2" opacity="{opacity}"/>\n'
    pat += f'  <circle cx="0" cy="80" r="4" fill="none" stroke="{color}" stroke-width="0.2" opacity="{opacity}"/>\n'
    pat += f'  <circle cx="80" cy="80" r="4" fill="none" stroke="{color}" stroke-width="0.2" opacity="{opacity}"/>\n'
    pat += '</pattern>'
    return pat

def golden_ratio_spiral(cx, cy, r, color, opacity=0.15):
    """Generate golden ratio spiral path."""
    pts = []
    for t in range(0, 628, 5):  # 0 to 2pi * 100
        angle = t / 100
        radius = r * (1 - t / 628) * 0.5
        pts.append(f"{cx + radius * math.cos(angle):.1f},{cy + radius * math.sin(angle):.1f}")
    return f'<path d="M{pts[0]} {" ".join("L"+p for p in pts[1:])}" fill="none" stroke="{color}" stroke-width="0.5" opacity="{opacity}"/>'


def generate_svg(tier, name, price, desc, color1, color2, accent, price_range):
    """Generate a detailed premium SVG for a package tier."""
    W, H = 800, 500
    
    lines = []
    a = lines.append
    
    a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
    a('<defs>')
    
    # Rich background gradients
    a(f'<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">')
    a(f'  <stop offset="0%" stop-color="#{color1}30"/>')
    a(f'  <stop offset="50%" stop-color="#050508"/>')
    a(f'  <stop offset="100%" stop-color="#{color2}25"/>')
    a('</linearGradient>')
    
    # Primary accent gradient
    a(f'<linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="100%">')
    a(f'  <stop offset="0%" stop-color="#{accent}"/>')
    a(f'  <stop offset="40%" stop-color="#{color1}"/>')
    a(f'  <stop offset="100%" stop-color="#{accent}"/>')
    a('</linearGradient>')
    
    # Soft glow
    a('<filter id="glow">')
    a('  <feGaussianBlur stdDeviation="4" result="b"/>')
    a('  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>')
    a('</filter>')
    
    # Deep shadow
    a('<filter id="sh">')
    a('  <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>')
    a('</filter>')
    
    # Metallic sheen
    a(f'<linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">')
    a(f'  <stop offset="0%" stop-color="#{accent}" stop-opacity="0"/>')
    a(f'  <stop offset="30%" stop-color="#{accent}" stop-opacity="0.08"/>')
    a(f'  <stop offset="70%" stop-color="#{accent}" stop-opacity="0.08"/>')
    a(f'  <stop offset="100%" stop-color="#{accent}" stop-opacity="0"/>')
    a('</linearGradient>')
    
    # Diagonal accent lines gradient
    a(f'<linearGradient id="diag" x1="0%" y1="0%" x2="100%" y2="100%">')
    a(f'  <stop offset="0%" stop-color="#{accent}" stop-opacity="0.08"/>')
    a(f'  <stop offset="50%" stop-color="#{accent}" stop-opacity="0.15"/>')
    a(f'  <stop offset="100%" stop-color="#{accent}" stop-opacity="0.08"/>')
    a('</linearGradient>')
    
    # Card foreground
    a(f'<linearGradient id="fGrad" x1="0%" y1="0%" x2="0%" y2="100%">')
    a(f'  <stop offset="0%" stop-color="#181822"/>')
    a(f'  <stop offset="100%" stop-color="#0E0E14"/>')
    a('</linearGradient>')
    
    # Ornate pattern
    a(ornate_pattern(W, H, accent))
    a('</defs>')
    
    # Background
    a(f'<rect width="{W}" height="{H}" fill="url(#bg)"/>')
    
    # Ornate pattern overlay
    a(f'<rect width="{W}" height="{H}" fill="url(#ornate)"/>')
    
    # Diagonal accent lines
    for i in range(-5, 20):
        x = i * 60
        a(f'<line x1="{x}" y1="0" x2="{x + 300}" y2="{H}" stroke="url(#diag)" stroke-width="0.5"/>')
    
    # Outer border glow
    a(f'<rect x="6" y="6" width="{W-12}" height="{H-12}" rx="12" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.4"/>')
    
    # Inner border
    a(f'<rect x="12" y="12" width="{W-24}" height="{H-24}" rx="8" fill="none" stroke="#{accent}" stroke-width="0.3" opacity="0.15"/>')
    
    # Bottom accent bar
    a(f'<rect x="0" y="{H-6}" width="{W}" height="6" fill="url(#acc)" rx="3"/>')
    
    # Top accent bar (thinner)
    a(f'<rect x="200" y="0" width="{W-400}" height="2" fill="url(#acc)" opacity="0.3"/>')
    
    # Gold / tier-specific circular element at top-left
    a(f'<circle cx="45" cy="45" r="18" fill="none" stroke="url(#acc)" stroke-width="1.5" opacity="0.4"/>')
    a(f'<circle cx="45" cy="45" r="12" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.3"/>')
    a(f'<circle cx="45" cy="45" r="4" fill="url(#acc)" opacity="0.5"/>')
    
    # Tier badge
    a(f'<rect x="35" y="72" width="20" height="2" fill="url(#acc)" opacity="0.5" rx="1"/>')
    a(f'<text x="45" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="#{accent}" letter-spacing="2" opacity="0.6">{tier.upper()}</text>')
    
    # Main title
    a(f'<text x="400" y="110" text-anchor="middle" font-family="\'Playfair Display\',Georgia,serif" font-size="36" fill="#FFFFFF" font-weight="700" letter-spacing="3" filter="url(#sh)">{name}</text>')
    a(f'<text x="400" y="132" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#{accent}" letter-spacing="5" opacity="0.6">— CURATED FOR DISCERNING TASTE —</text>')
    
    # Central luxury illustration area
    cx, cy = 400, 280
    
    # Concentric decorative rings
    a(f'<circle cx="{cx}" cy="{cy}" r="130" fill="none" stroke="url(#acc)" stroke-width="0.3" opacity="0.08"/>')
    a(f'<circle cx="{cx}" cy="{cy}" r="105" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.12"/>')
    a(f'<circle cx="{cx}" cy="{cy}" r="85" fill="none" stroke="url(#acc)" stroke-width="0.8" opacity="0.15"/>')
    
    # Golden ratio spiral
    a(golden_ratio_spiral(cx, cy, 180, f"#{accent}", 0.06))
    
    # Tier-specific central icon/illustration
    if tier == 'gold':
        # Champagne bottle + glass set
        a(f'<g transform="translate({cx},{cy})" filter="url(#sh)">')
        # Bottle body
        a(f'  <rect x="-8" y="-50" width="16" height="55" rx="4" fill="url(#acc)" opacity="0.9"/>')
        a(f'  <rect x="-12" y="-52" width="24" height="6" rx="2" fill="#{accent}" opacity="0.7"/>')
        # Bottle neck
        a(f'  <rect x="-4" y="-70" width="8" height="20" rx="2" fill="#{accent}" opacity="0.6"/>')
        a(f'  <circle cx="0" cy="-72" r="4" fill="#{accent}" opacity="0.5"/>')
        # Sparkles
        for dx, dy, r in [(-15,-30,2), (15,-25,1.5), (-20,-40,1), (20,-35,1.5)]:
            a(f'  <circle cx="{dx}" cy="{dy}" r="{r}" fill="#FFFFFF" opacity="0.6"/>')
        # Flowing champagne arc
        a(f'  <path d="M0,-50 Q20,-45 25,-35 Q30,-25 20,-20" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4"/>')
        a(f'  <circle cx="20" cy="-20" r="5" fill="#FFFFFF" opacity="0.2"/>')
        # Glass 
        a(f'  <path d="M10,-15 L6,-5 L18,-5 L14,-15 Z" fill="url(#acc)" opacity="0.6"/>')
        a(f'  <rect x="8" y="-5" width="8" height="2" rx="1" fill="#{accent}" opacity="0.5"/>')
        a(f'  <line x1="12" y1="-3" x2="12" y2="5" stroke="#{accent}" stroke-width="0.5" opacity="0.4"/>')
        a(f'</g>')
        
    elif tier == 'diamond':
        # Diamond geometric shape
        a(f'<g transform="translate({cx},{cy - 15})" filter="url(#sh)">')
        pts = [(0,-70), (35,-10), (0,55), (-35,-10)]
        p_str = " ".join(f"{x},{y}" for x,y in pts)
        a(f'  <polygon points="{p_str}" fill="url(#acc)" opacity="0.2" stroke="url(#acc)" stroke-width="1"/>')
        # Facet lines
        a(f'  <line x1="0" y1="-70" x2="0" y2="55" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
        a(f'  <line x1="-35" y1="-10" x2="35" y2="-10" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
        a(f'  <line x1="-35" y1="-10" x2="0" y2="-70" stroke="#{accent}" stroke-width="0.3" opacity="0.2"/>')
        a(f'  <line x1="35" y1="-10" x2="0" y2="-70" stroke="#{accent}" stroke-width="0.3" opacity="0.2"/>')
        # Sparkle
        a(f'  <circle cx="0" cy="-15" r="3" fill="#FFFFFF" opacity="0.5"/>')
        a(f'  <circle cx="-10" cy="5" r="1.5" fill="#FFFFFF" opacity="0.3"/>')
        a(f'  <circle cx="8" cy="-5" r="1" fill="#FFFFFF" opacity="0.4"/>')
        a(f'</g>')
        
    elif tier == 'platinum' or tier == 'premium-lounge' or tier == 'vip-skybox':
        # Stadium/skybox architecture
        a(f'<g transform="translate({cx},{cy + 10})" filter="url(#sh)">')
        # Stadium arch
        a(f'  <path d="M-80,40 Q-80,-60 0,-65 Q80,-60 80,40" fill="none" stroke="url(#acc)" stroke-width="1.5" opacity="0.3"/>')
        a(f'  <path d="M-60,40 Q-60,-40 0,-45 Q60,-40 60,40" fill="none" stroke="url(#acc)" stroke-width="1" opacity="0.2"/>')
        # Pitch lines
        a(f'  <rect x="-70" y="30" width="140" height="15" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.15" rx="2"/>')
        a(f'  <line x1="0" y1="30" x2="0" y2="45" stroke="url(#acc)" stroke-width="0.5" opacity="0.15"/>')
        a(f'  <circle cx="0" cy="37.5" r="5" fill="none" stroke="url(#acc)" stroke-width="0.3" opacity="0.15"/>')
        # Light rays
        for a_deg in [220, 240, 260, 280, 300, 320]:
            rad = math.radians(a_deg)
            x1 = cx + 70 * math.cos(rad)
            y1 = cy + 10 + 70 * math.sin(rad)
            x2 = cx + 110 * math.cos(rad)
            y2 = cy + 10 + 110 * math.sin(rad)
            a(f'  <line x1="{x1-cx:.0f}" y1="{y1-cy-10:.0f}" x2="{x2-cx:.0f}" y2="{y2-cy-10:.0f}" stroke="#{accent}" stroke-width="0.5" opacity="0.08"/>')
        a(f'</g>')
        
    elif tier == 'presidential' or tier == 'chairman':
        # Building/estate architecture
        a(f'<g transform="translate({cx},{cy})" filter="url(#sh)">')
        # Building facade
        a(f'  <rect x="-50" y="-45" width="100" height="90" rx="2" fill="none" stroke="url(#acc)" stroke-width="1" opacity="0.3"/>')
        # Columns
        for col_x in [-30, -10, 10, 30]:
            a(f'  <rect x="{col_x-3}" y="-40" width="6" height="80" rx="1" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.2"/>')
        # Pediment
        a(f'  <path d="M-55,-45 L0,-65 L55,-45" fill="none" stroke="url(#acc)" stroke-width="1" opacity="0.3"/>')
        # Entrance
        a(f'  <path d="M-10,45 L-10,10 Q0,0 10,10 L10,45" fill="url(#acc)" opacity="0.1" stroke="url(#acc)" stroke-width="0.5" opacity="0.2"/>')
        # Star above entrance
        a(f'  <polygon points="{polar_star(0,-20,8,5)}" fill="url(#acc)" opacity="0.4"/>')
        a(f'</g>')
    
    elif tier == 'private-jet' or tier == 'crypto-whale':
        # Jet silhouette
        a(f'<g transform="translate({cx},{cy})" filter="url(#sh)">')
        a(f'  <path d="M-70,0 L-30,-8 L10,-15 L40,-8 L50,0 L40,8 L10,15 L-30,8 Z" fill="url(#acc)" opacity="0.3" stroke="url(#acc)" stroke-width="1.5"/>')
        a(f'  <path d="M-70,0 Q-90,-5 -100,0 Q-90,5 -70,0 Z" fill="url(#acc)" opacity="0.2"/>')
        a(f'  <line x1="20" y1="-12" x2="35" y2="-5" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
        a(f'  <line x1="20" y1="12" x2="35" y2="5" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
        # Contrails
        a(f'  <path d="M-70,0 Q-100,-3 -130,-1 Q-150,0 -160,-2" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.08"/>')
        a(f'  <path d="M-70,0 Q-100,3 -130,1 Q-150,0 -160,2" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.08"/>')
        a(f'</g>')
    
    elif tier == 'rolls-royce':
        # Car silhouette
        a(f'<g transform="translate({cx},{cy})" filter="url(#sh)">')
        a(f'  <path d="M-60,-10 L-50,-20 L-10,-20 L10,-12 L40,-12 L55,-5 L60,-5 L60,10 L-65,10 Z" fill="url(#acc)" opacity="0.3" stroke="url(#acc)" stroke-width="1"/>')
        # Wheels
        a(f'  <circle cx="-35" cy="10" r="10" fill="none" stroke="url(#acc)" stroke-width="1.5" opacity="0.4"/>')
        a(f'  <circle cx="-35" cy="10" r="4" fill="url(#acc)" opacity="0.2"/>')
        a(f'  <circle cx="35" cy="10" r="10" fill="none" stroke="url(#acc)" stroke-width="1.5" opacity="0.4"/>')
        a(f'  <circle cx="35" cy="10" r="4" fill="url(#acc)" opacity="0.2"/>')
        # Window
        a(f'  <path d="M-8,-18 L-8,-10 L20,-10 L15,-16 Z" fill="url(#acc)" opacity="0.15"/>')
        a(f'</g>')
    
    else:
        # Generic luxury star/burst
        a(f'<g transform="translate({cx},{cy})" filter="url(#sh)">')
        a(f'  <polygon points="{polar_star(0,0,55,8,0)}" fill="none" stroke="url(#acc)" stroke-width="1" opacity="0.25"/>')
        a(f'  <polygon points="{polar_star(0,0,35,8,math.pi/8)}" fill="none" stroke="url(#acc)" stroke-width="0.5" opacity="0.15"/>')
        a(f'  <circle cx="0" cy="0" r="10" fill="url(#acc)" opacity="0.1"/>')
        a(f'  <circle cx="0" cy="0" r="4" fill="url(#acc)" opacity="0.3"/>')
        a(f'</g>')
    
    # Sheen overlay
    a(f'<rect x="12" y="12" width="{W-24}" height="{H-24}" rx="8" fill="url(#sheen)"/>')
    
    # Description
    a(f'<text x="400" y="390" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#aaaaaa" letter-spacing="1" textLength="580">{desc}</text>')
    
    # Price
    a(f'<text x="400" y="460" text-anchor="middle" font-family="\'Playfair Display\',Georgia,serif" font-size="28" fill="url(#acc)" font-weight="700" letter-spacing="2" filter="url(#sh)">{price_range}</text>')
    
    # Corner markers
    a(f'<path d="M20,25 L20,20 L25,20" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
    a(f'<path d="M{W-20},25 L{W-20},20 L{W-25},20" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
    a(f'<path d="M20,{H-25} L20,{H-20} L25,{H-20}" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
    a(f'<path d="M{W-20},{H-25} L{W-20},{H-20} L{W-25},{H-20}" fill="none" stroke="#{accent}" stroke-width="0.5" opacity="0.3"/>')
    
    # Watermark
    a(f'<text x="{W-20}" y="{H-20}" text-anchor="end" font-family="Georgia,serif" font-size="10" fill="#{accent}" opacity="0.08" letter-spacing="3">VANTAGE 26</text>')
    
    a('</svg>')
    return "\n".join(lines)


SVGS = {
    'gold': ('Gold Experience', 'Category 1 seats with lounge access, champagne service, and match program — the definitive premium matchday experience.',
             'D4A843', '8B6914', 'B8860B', '$12,000–$50,000'),
    'diamond': ('Diamond Hospitality', 'Premium hospitality suite with gourmet catering, premium seating, dedicated concierge, and reserved parking.',
                'B8C5D6', '5A6B8C', '8FA3C0', '$25,000–$85,000'),
    'platinum': ('Platinum Skybox', 'Elite skybox suite with private bar, Michelin-star catering, personal butler, and champagne greeting.',
                 'E8E8E8', '888888', 'C0C0C0', '$55,000–$100,000'),
    'premium-lounge': ('Premium Lounge', 'Access to exclusive pre-match lounge with open bar, gourmet canapés, and VIP gift package.',
                       'C9A84C', '7A6B2E', 'D4AF37', '$8,000–$35,000'),
    'vip-skybox': ('VIP Skybox Suite', 'Private skybox with dedicated catering, personal host, premium bar, and stadium-view seating.',
                   'A0A0A0', '505050', 'C8C8C8', '$35,000–$85,000'),
    'chairman': ("Chairman's Suite", "VIP airport transfer, dedicated butler, private suite, Michelin-star dining, and field-level access.",
                 'D4A843', '6B4914', 'C49A3F', '$60,000–$120,000'),
    'presidential': ('Presidential Suite', 'Rolls Royce Phantom pickup, Category 1 seats, pre-match hospitality suite with champagne, private driver.',
                     'C0A060', '6B4C2E', 'D4A843', '$35,000–$65,000'),
    'private-jet': ('Private Jet Charter', 'Private jet to match city, Rolls Royce ground transfer, suite tickets, personal concierge.',
                    'B0B0B0', '606060', 'D4A843', '$55,000–$150,000'),
    'rolls-royce': ('Rolls Royce Experience', 'Rolls Royce Phantom chauffeur, Category 1 seating, hospitality lounge, gift package.',
                    'B8965C', '5A4020', 'D4A843', '$15,000–$45,000'),
    'crypto-whale': ('Crypto Whale', 'Ultimate package: private jet, Rolls Royce, presidential suite, personal chef, VIP seats, lounge access.',
                     'D4A843', '8B6914', 'FFD700', '$100,000–$250,000'),
    'silver': ('Silver Seat', 'Standard seat with fan zone access. Best value for experiencing the historic World Cup.',
               'A0A0A0', '606060', 'C0C0C0', '$3,500–$8,000'),
    'standard': ('Standard Experience', 'Quality seating with match program and welcome gift. Access to fan activations.',
                 '888888', '444444', 'AAAAAA', '$5,000–$12,000'),
}

print(f"Generating {len(SVGS)} premium SVGs...")
for tier, (name, desc, c1, c2, accent, price) in SVGS.items():
    svg = generate_svg(tier, name, price, desc, c1, c2, accent, price)
    path = os.path.join(OUT, f"{tier}.svg")
    with open(path, 'w') as f:
        f.write(svg)
    size = os.path.getsize(path)
    print(f"  ✅ {tier}.svg — {size:,} bytes")

print(f"\nDone — {len(SVGS)} SVGs generated at {OUT}")
