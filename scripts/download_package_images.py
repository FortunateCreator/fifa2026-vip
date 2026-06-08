#!/usr/bin/env python3
"""Download high-res 4K photos for each package theme and save as WebP."""

import urllib.request
import urllib.error
import ssl
import os
import sys
import time

OUTPUT_DIR = os.path.expanduser("~/fifa2026-vip/public/images/packages")

# Theme → description mapping for what to search/source
THEMES = {
    "presidential": {
        # Luxury stadium presidential suite
        "urls": [
            "https://images.unsplash.com/photo-1573879541250-58ae8b322b40?w=3840&q=90",
            "https://images.unsplash.com/photo-1464698546062-af70f04254e8?w=3840&q=90",
        ]
    },
    "diamond": {
        # Diamond luxury / premium stadium experience
        "urls": [
            "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=3840&q=90",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=3840&q=90",
        ]
    },
    "gold": {
        # Gold / sunset stadium
        "urls": [
            "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=3840&q=90",
            "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=3840&q=90",
        ]
    },
    "silver": {
        # Stadium aerial / wide view
        "urls": [
            "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=3840&q=90",
            "https://images.unsplash.com/photo-1569517282132-25d22e2fc20f?w=3840&q=90",
        ]
    },
    "vip-skybox": {
        # Skybox / luxury box interior
        "urls": [
            "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=3840&q=90",
            "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=3840&q=90",
        ]
    },
    "premium-lounge": {
        # Premium lounge / hospitality
        "urls": [
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=3840&q=90",
            "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=3840&q=90",
        ]
    },
    "standard": {
        # Standard stadium seat view
        "urls": [
            "https://images.unsplash.com/photo-1574629810360-3ef028a6a9ce?w=3840&q=90",
            "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=3840&q=90",
        ]
    },
    "chairman": {
        # Chairman's suite / executive luxury
        "urls": [
            "https://images.unsplash.com/photo-1573879541250-58ae8b322b40?w=3840&q=90",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=90",
        ]
    },
    "platinum": {
        # Platinum / elite event
        "urls": [
            "https://images.unsplash.com/photo-1492684223066-81342ee5db30?w=3840&q=90",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3840&q=90",
        ]
    },
    "crypto-whale": {
        # Crypto / ultra luxury lifestyle
        "urls": [
            "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=3840&q=90",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3840&q=90",
        ]
    },
    "private-jet": {
        # Private jet
        "urls": [
            "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=3840&q=90",
            "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=3840&q=90",
        ]
    },
    "rolls-royce": {
        # Rolls Royce / luxury car
        "urls": [
            "https://images.unsplash.com/photo-1631295868223-63265b40d498?w=3840&q=90",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=3840&q=90",
        ]
    },
}

def download_image(url, output_path, max_retries=2):
    """Download an image from URL, returns True on success."""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://unsplash.com/',
                }
            )
            with urllib.request.urlopen(req, context=ctx, timeout=30) as response:
                data = response.read()
                if len(data) < 1000:
                    print(f"  Too small ({len(data)} bytes), retrying...")
                    time.sleep(1)
                    continue
                with open(output_path, 'wb') as f:
                    f.write(data)
                return True
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            time.sleep(1)
    return False

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for theme, info in sorted(THEMES.items()):
        webp_path = os.path.join(OUTPUT_DIR, f"{theme}.webp")
        jpg_path = os.path.join(OUTPUT_DIR, f"{theme}.jpg")
        
        # Skip if already exists
        if os.path.exists(webp_path) and os.path.getsize(webp_path) > 5000:
            print(f"✓ {theme}.webp already exists ({os.path.getsize(webp_path)//1024}KB)")
            continue
        
        print(f"\nDownloading {theme}...")
        success = False
        
        for i, url in enumerate(info["urls"]):
            tmp_jpg = os.path.join(OUTPUT_DIR, f".tmp_{theme}_{i}.jpg")
            print(f"  Trying URL {i+1}: {url.split('?')[0][:60]}...")
            
            if download_image(url, tmp_jpg):
                size_kb = os.path.getsize(tmp_jpg) // 1024
                print(f"  Downloaded {size_kb}KB")
                
                # Convert to WebP using ImageMagick
                result = os.system(f'convert "{tmp_jpg}" -resize 3840x2160\\> -quality 85 "{webp_path}" 2>&1')
                os.remove(tmp_jpg)
                
                if result == 0 and os.path.exists(webp_path):
                    final_kb = os.path.getsize(webp_path) // 1024
                    print(f"  ✓ {theme}.webp ({final_kb}KB)")
                    success = True
                    break
                else:
                    print(f"  convert failed")
            else:
                print(f"  Failed")
        
        if not success:
            print(f"  ✗ Failed to get image for {theme}")
    
    print("\nDone!")

if __name__ == "__main__":
    main()
