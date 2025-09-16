import fs from 'fs'
import path from 'path'
import Jimp from 'jimp'

const srcDir = path.resolve('assets/img')
const outDir = path.resolve('assets/img/compressed')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

async function processFile(relPath) {
  const full = path.join(srcDir, relPath)
  const ext = path.extname(full).toLowerCase()
  const name = path.basename(full, ext)
  try {
    const image = await Jimp.read(full)
    const maxW = 1200
    if (image.getWidth() > maxW) image.resize(maxW, Jimp.AUTO)

    // JPEG output
    const jpgOut = path.join(outDir, `${name}.jpg`)
    await image.quality(80).writeAsync(jpgOut)

    // WebP output (Jimp supports WEBP in modern versions)
    try {
      const webpOut = path.join(outDir, `${name}.webp`)
      await image.quality(80).writeAsync(webpOut)
    } catch (e) {
      // if webp fails, ignore
    }

    console.log('Processed', relPath)
  } catch (err) {
    console.error('Failed', relPath, err)
  }
}

async function run() {
  const entries = fs.readdirSync(srcDir)
  const files = []
  for (const e of entries) {
    const full = path.join(srcDir, e)
    if (fs.statSync(full).isDirectory()) {
      const sub = fs.readdirSync(full).map(f => path.join(e, f))
      files.push(...sub)
    } else {
      files.push(e)
    }
  }

  for (const f of files) {
    if (/\.(png|jpe?g|webp)$/i.test(f)) await processFile(f)
  }
}

run().catch(console.error)
