import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const logoSvg = readFileSync(join(publicDir, 'logo.svg'))
const faviconSvg = readFileSync(join(publicDir, 'favicon.svg'))

await sharp(logoSvg)
  .png()
  .resize(240, 240)
  .toFile(join(publicDir, 'logo.png'))

await sharp(faviconSvg)
  .png()
  .resize(32, 32)
  .toFile(join(publicDir, 'favicon.png'))

console.log('Created logo.png and favicon.png')
