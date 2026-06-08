#!/usr/bin/env python3
"""
V3: Download properly matched landscape photos for each package category.
Every photo must be landscape (w > h) and relevant to the category.
"""
import os, time, json, urllib.request, ssl

OUT = os.path.expanduser("~/fifa2026-vip/public/images/packages")

# Category → what the package actually offers → candidate landscape photo IDs
PHOTOS = {
    # Presidential Suite — luxury box at stadium, champagne, premium seats
    # Need: landscape luxury suite interior
    "presidential": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=90",
        "https://images.unsplash.com/photo-1577415124269-fc1142cd0a22?w=3840&q=90",
    ],
    # Diamond — fine dining, crystal, premium hospitality  
    "diamond": [
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=3840&q=90",
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=3840&q=90",
    ],
    # Gold — golden hour stadium, sunset football atmosphere
    "gold": [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=3840&q=90",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=3840&q=90",
    ],
    # Silver — stadium architecture, cool modern tones
    "silver": [
        "https://images.unsplash.com/photo-1569517282132-25d22e2fc20f?w=3840&q=90",
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=3840&q=90",
    ],
    # VIP Skybox — glass-walled box overlooking stadium pitch
    "vip-skybox": [
        "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=3840&q=90",
        "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=3840&q=90",
    ],
    # Premium Lounge — hospitality area, bar, premium furnishings
    "premium-lounge": [
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=3840&q=90",
        "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=3840&q=90",
    ],
    # Standard entry — view from the stands, pitch
    "standard": [
        "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=3840&q=90",
        "https://images.unsplash.com/photo-1574629810360-3ef028a6a9ce?w=3840&q=90",
    ],
    # Chairman's Suite — executive conference room, boardroom luxury
    "chairman": [
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=3840&q=90",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=90",
    ],
    # Platinum — red carpet, stage, spotlights, elite event
    "platinum": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3840&q=90",
        "https://images.unsplash.com/photo-1492684223066-81342ee5db30?w=3840&q=90",
    ],
    # Crypto Whale — bitcoin, blockchain, modern abstract
    # Using a different approach — download a landscape finance/abstract photo
    "crypto-whale": [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3840&q=90",
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=3840&q=90",
    ],
    # Private Jet — jet cabin interior, leather seats, luxury travel
    "private-jet": [
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=3840&q=90",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=3840&q=90",
    ],
    # Rolls Royce — luxury car, elegance
    "rolls-royce": [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=3840&q=90",
        "https://images.unsplash.com/photo-1544636336-e26879cd24bb?w=3840&q=90",
    ],
}

def try_dl(url, path):
    ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
    for a in range(2):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
                'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
            })
            with urllib.request.urlopen(req, context=ctx, timeout=20) as r:
                data = r.read()
            if len(data) < 5000:
                print(f"  too small: {len(data)}B")
                time.sleep(0.5)
                continue
            with open(path, 'wb') as f:
                f.write(data)
            return True
        except Exception as e:
            print(f"  attempt {a+1}: {e}")
            time.sleep(0.5)
    return False

def main():
    os.makedirs(OUT, exist_ok=True)
    results = {}
    
    for cat in sorted(PHOTOS.keys()):
        webp = os.path.join(OUT, f"{cat}.webp")
        print(f"\n--- {cat} ---")
        
        ok = False
        for i, url in enumerate(PHOTOS[cat]):
            print(f"  trying URL {i+1}...")
            tmp = os.path.join(OUT, f".tmp_{cat}.jpg")
            if try_dl(url, tmp):
                sz = os.path.getsize(tmp) // 1024
                print(f"  downloaded {sz}KB")
                # Identify dimensions
                dim = os.popen(f'identify "{tmp}" 2>/dev/null').read().strip()
                print(f"  {dim}")
                
                # Convert to WebP - force landscape, crop if needed
                rc = os.system(f'convert "{tmp}" -resize 3840x2160^ -gravity center -extent 3840x2160 -quality 88 "{webp}" 2>/dev/null')
                os.remove(tmp)
                if rc == 0 and os.path.exists(webp):
                    final = os.path.getsize(webp) // 1024
                    print(f"  ✓ {cat}.webp ({final}KB)")
                    results[cat] = {"status": "ok", "kb": final}
                    ok = True
                    break
                else:
                    print(f"  convert failed")
            else:
                print(f"  failed")
        
        if not ok:
            print(f"  ✗ FAILED")
            results[cat] = {"status": "failed"}
    
    print(f"\n{'='*40}")
    ok_count = sum(1 for v in results.values() if v.get("status") == "ok")
    print(f"{ok_count}/12 OK")
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
