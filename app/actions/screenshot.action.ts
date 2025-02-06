'use server'
import captureWebsite from 'capture-website'

export async function takeScreenshot({
  input,
  type,
  size,
}: {
  input: string
  type: string
  size: { width: number; height: number }
}) {
  let data = await captureWebsite.buffer(input, {
    inputType: 'html',
    fullPage: true,
    width: size.width,
  })
  return data
}
