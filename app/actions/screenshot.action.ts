'use server'
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
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: size.width ?? 1080, height: size.height ?? 1920 })
  await page.goto(input, { waitUntil: 'networkidle0' })
  const base64 = await page.screenshot({ encoding: 'base64' })

  await browser.close()

  return base64
}
