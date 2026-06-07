import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const ENQUIRIES_FILE = join(DATA_DIR, 'enquiries.jsonl')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch {
    // silent fail — don't block the enquiry
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const entry = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    }

    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(ENQUIRIES_FILE, JSON.stringify(entry) + '\n', { flag: 'a' })

    // Send Telegram notification
    const cryptoModes = []
    if (body.btc) cryptoModes.push('BTC')
    if (body.eth) cryptoModes.push('ETH')
    if (body.usdt) cryptoModes.push('USDT')

    // ── Device info (client-side profile + server-side IP) ──
    let deviceBlock = ''
    const device = body.device as Record<string, any> | null
    if (device) {
      // Server-side IP capture
      const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers.get('cf-connecting-ip') ||
        req.headers.get('x-real-ip') ||
        'unknown'

      const ua: string = device.userAgent || ''
      const uaShort = ua.length > 100 ? ua.slice(0, 100) + '…' : ua

      // Simple UA parsing for OS
      let os = 'Unknown'
      if (/windows/i.test(ua)) os = 'Windows'
      else if (/mac os|macintosh/i.test(ua)) os = 'macOS'
      else if (/linux|ubuntu|debian|fedora|arch/i.test(ua)) os = 'Linux'
      else if (/android/i.test(ua)) os = 'Android'
      else if (/ios|iphone|ipad|ipod/i.test(ua)) os = 'iOS'
      else if (/cros/i.test(ua)) os = 'ChromeOS'

      // Simple UA parsing for browser
      let browser = 'Unknown'
      if (/edg/i.test(ua) && !/edge?\//i.test(ua)) browser = 'Edge'
      else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome'
      else if (/firefox/i.test(ua)) browser = 'Firefox'
      else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
      else if (/opr|opera/i.test(ua)) browser = 'Opera'

      // Device type detection
      const isMobile = /mobile/i.test(ua)
      const isTablet = /tablet|ipad/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))
      let deviceType = 'Desktop'
      if (isTablet) deviceType = 'Tablet'
      else if (isMobile) deviceType = 'Mobile'

      const cores: string = device.hardwareConcurrency ?? '?'
      const ram: string = device.deviceMemory ? `${device.deviceMemory}GB` : '?'
      const fpId: string = device.fingerprintId || ''

      deviceBlock = [
        `<b>📱 Device Info:</b>`,
        `🖥️ <b>IP:</b> ${ip}`,
        `📱 <b>Device:</b> ${deviceType} (${os})`,
        `🌐 <b>Browser:</b> ${browser}`,
        `📺 <b>Screen:</b> ${device.screenWidth || '?'}×${device.screenHeight || '?'}`,
        `🗣️ <b>Language:</b> ${device.language || '?'}`,
        `🕐 <b>Timezone:</b> ${device.timezone || '?'}`,
        `⚡ <b>Cores:</b> ${cores} | <b>RAM:</b> ${ram}`,
        `🔑 <b>FP:</b> <code>${fpId}</code>`,
        ``,
        `<pre>${uaShort}</pre>`,
      ].join('\n')
    } else if (body.fingerprint) {
      deviceBlock = `🖥️ <b>Device:</b> <code>${body.fingerprint}</code>`
    }

    const msg = [
      '<b>📩 New VIP Enquiry</b>',
      '',
      `<b>Name:</b> ${body.name || 'N/A'}`,
      `<b>Email:</b> ${body.email || 'N/A'}`,
      `<b>Phone:</b> ${body.phone || 'N/A'}`,
      `<b>Country:</b> ${body.country || 'N/A'}`,
      `<b>Interest:</b> ${body.interest || 'N/A'}`,
      cryptoModes.length ? `<b>Crypto:</b> ${cryptoModes.join(', ')}` : '',
      '',
      `<b>Message:</b>`,
      body.message || 'N/A',
      '',
      deviceBlock,
      '',
      `<i>${entry.created_at}</i>`,
    ].filter(Boolean).join('\n')

    await sendTelegram(msg)

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
