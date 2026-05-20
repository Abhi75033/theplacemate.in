import { readFileSync } from 'fs'
import { join } from 'path'

let logoBase64: string | null = null

export function getLogoBase64(): string {
  if (logoBase64) return logoBase64
  try {
    const logoPath = join(process.cwd(), 'public', 'logo.png')
    const logoBuffer = readFileSync(logoPath)
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`
    return logoBase64
  } catch {
    return ''
  }
}
