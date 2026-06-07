#!/usr/bin/env bash
# Ping search engines about updated sitemap
# IndexNow (Bing, Yandex, Seznam) + Google ping
# Run this after publishing new content

SITEMAP_URL="https://www.vantage26.com/sitemap.xml"
INDEXNOW_KEY="a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"

echo "📡 Notifying search engines..."
echo ""

# IndexNow (Bing, Yandex, Seznam)
echo "   IndexNow (Bing/Yandex)..."
curl -s -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"www.vantage26.com\",\"key\":\"$INDEXNOW_KEY\",\"urlList\":[\"$SITEMAP_URL\"]}" 2>&1
echo ""

# Also try alternate IndexNow endpoints
echo "   Seznam IndexNow..."
curl -s -X POST "https://search.seznam.cz/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"www.vantage26.com\",\"key\":\"$INDEXNOW_KEY\",\"urlList\":[\"$SITEMAP_URL\"]}" 2>&1
echo ""

echo ""
echo "✅ Done — sitemap pinged"
