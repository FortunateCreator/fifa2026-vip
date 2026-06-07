#!/usr/bin/env bash
set -e
cd ~/fifa2026-vip

# Kill anything on :3000 first
PID=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PID" ]; then kill "$PID" 2>/dev/null; sleep 1; fi
if lsof -ti:3000 >/dev/null 2>&1; then kill -9 "$PID" 2>/dev/null; sleep 1; fi

echo "🚀 Starting Vantage 26 dev server..."
exec npx next dev -p 3000
