#!/usr/bin/env python3
"""
Download curated high-res photos for Vantage 26 package images.
Each category gets the best available photo from candidate URLs.
"""
import os, sys, time, json

OUT = os.path.expanduser("~/fifa2026-vip/public/images/packages")

# Category → list of candidate Unsplash photo URLs (tried in order)
PHOTO_CANDIDATES = {
    # Luxury presidential suite / VIP box with premium seats
    "presidential": [
        "https://images.unsplash.com/photo-1573879541250-58ae8b322b40?w=3840&q=90",
        "https://images.unsplash.com/photo-1464698546062-af70f04254e8?w=3840&q=90",
    ],
    # Diamond luxury hospitality / premium event — fine dining / crystal
    "diamond": [
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=3840&q=90",
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=3840&q=90",
    ],
    # Gold experience / stadium premium view
    "gold": [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=3840&q=90",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=3840&q=90",
    ],
    # Silver / standard seating view
    "silver": [
        "https://images.unsplash.com/photo-1569517282132-25d22e2fc20f?w=3840&q=90",
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=3840&q=90",
    ],
    # VIP skybox / luxury box interior with stadium view
    "vip-skybox": [
        "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=3840&q=90",
        "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=3840&q=90",
    ],
    # Premium lounge / hospitality area
    "premium-lounge": [
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=3840&q=90",
        "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=3840&q=90",
    ],
    # Standard entry / stadium seats from the stands
    "standard": [
        "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=3840&q=90",
        "https://images.unsplash.com/photo-1574629810360-3ef028a6a9ce?w=3840&q=90",
    ],
    # Chairman's executive suite
    "chairman": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=90",
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=3840&q=90",
    ],
    # Platinum / elite premium experience
    "platinum": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3840&q=90",
        "https://images.unsplash.com/photo-1492684223066-81342ee5db30?w=3840&q=90",
    ],
    # Crypto whale / ultra luxury + digital wealth
    "crypto-whale": [
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=3840&q=90",
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3840&q=90",
    ],
    # Private jet cabin (Gulfstream interior)
    "private-jet": [
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=3840&q=90",
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=3840&q=90",
    ],
    # Rolls Royce / luxury car
    "rolls-royce": [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=3840&q=90",
        "https://images.unsplash.com/photo-1544636336-e26879cd24bb?w=3840&q=90",
    ],
}

def try_download(url, outpath):
    """Try to download one URL. Returns True on success."""
    import urllib.request, ssl
    ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
    for attempt in range(2):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
                'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
            })
            with urllib.request.urlopen(req, context=ctx, timeout=20) as r:
                data = r.read()
            if len(data) < 5000:
                print(f"  too small ({len(data)}B)")
                return False
            with open(outpath, 'wb') as f:
                f.write(data)
            return True
        except Exception as e:
            print(f"  attempt {attempt+1}: {e}")
            time.sleep(0.5)
    return False

def main():
    os.makedirs(OUT, exist_ok=True)
    results = {}

    for cat in sorted(PHOTO_CANDIDATES.keys()):
        webp_path = os.path.join(OUT, f"{cat}.webp")
        
        print(f"\n{'='*50}")
        print(f"{cat}:")
        
        success = False
        for i, url in enumerate(PHOTO_CANDIDATES[cat]):
            print(f"  trying photo {i+1}...")
            tmp = os.path.join(OUT, f".tmp_{cat}.jpg")
            if try_download(url, tmp):
                sz = os.path.getsize(tmp) // 1024
                print(f"  downloaded {sz}KB")
                # Convert to WebP
                rc = os.system(f'convert "{tmp}" -resize 3840x2160\\> -quality 88 "{webp_path}" 2>/dev/null')
                os.remove(tmp)
                if rc == 0 and os.path.exists(webp_path):
                    final = os.path.getsize(webp_path) // 1024
                    print(f"  ✓ {cat}.webp ({final}KB)")
                    results[cat] = {"status": "ok", "size_kb": final}
                    success = True
                    break
                else:
                    print(f"  convert failed")
            else:
                print(f"  failed")

        if not success:
            print(f"  ✗ NO IMAGE for {cat}")
            results[cat] = {"status": "failed"}

    print(f"\n{'='*50}")
    print("SUMMARY:")
    ok = sum(1 for v in results.values() if v.get("status") == "ok")
    fail = sum(1 for v in results.values() if v.get("status") == "failed")
    print(f"  {ok} OK, {fail} failed")
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
