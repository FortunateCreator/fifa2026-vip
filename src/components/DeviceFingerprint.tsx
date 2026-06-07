'use client'

import { useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const FP_KEY = 'v26_fp'
const DEVICE_KEY = 'v26_device'

export default function DeviceFingerprint() {
  useEffect(() => {
    const existing = sessionStorage.getItem(FP_KEY)
    if (existing) return // already captured this session

    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        const fpId = result.visitorId
        sessionStorage.setItem(FP_KEY, fpId)

        // Collect rich device profile from browser APIs
        const device = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          languages: navigator.languages?.join(', ') || '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          colorDepth: window.screen.colorDepth,
          deviceMemory: (navigator as any).deviceMemory ?? null,
          hardwareConcurrency: navigator.hardwareConcurrency ?? null,
          touchSupport: 'ontouchstart' in window ? 'Yes' : 'No',
          fingerprintId: fpId,
        }
        sessionStorage.setItem(DEVICE_KEY, JSON.stringify(device))
      })
      .catch(() => {
        // silent — fingerprint is non-critical
      })
  }, [])

  return null
}
