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
      `<i>${entry.created_at}</i>`,
    ].filter(Boolean).join('\n')

    await sendTelegram(msg)

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
