'use server'

import { exec } from 'child_process'

const puppeteer = require('puppeteer')

export async function takeScreenshot({
  input,
  type,
  size,
}: {
  input: string
  type: string
  size: { width: number; height: number }
}) {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    executablePath: '/opt/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: size.width ?? 1080, height: size.height ?? 1920 })
  await page.goto(input, { waitUntil: 'networkidle2' })
  const base64 = await page.screenshot({ encoding: 'base64' })

  await browser.close()

  return base64
}
