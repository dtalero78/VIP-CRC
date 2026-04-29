import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200;
const H = 630;
const PHOTO_W = 540;
const TEXT_W = W - PHOTO_W;

const conductor = await sharp('src/assets/conductor.png')
  .resize({ width: PHOTO_W, height: H, fit: 'cover', position: sharp.gravity.east })
  .toBuffer();

const logo = readFileSync('public/logo.png');
const logoSized = await sharp(logo).resize({ width: 96, height: 96, fit: 'contain' }).toBuffer();

const bg = await sharp({
  create: {
    width: W,
    height: H,
    channels: 3,
    background: { r: 13, g: 88, b: 161 },
  },
})
  .composite([
    {
      input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0d58a1"/>
            <stop offset="100%" stop-color="#0d2748"/>
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#g)"/>
      </svg>`),
    },
  ])
  .png()
  .toBuffer();

const fadeSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="${H}">
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0d2748" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0d2748" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="120" height="${H}" fill="url(#f)"/>
</svg>`);

const textSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${TEXT_W}" height="${H}">
  <style>
    .kicker { font: 600 26px Inter, Arial, sans-serif; fill: #82c8fb; letter-spacing: 0.5px; }
    .h1 { font: 800 56px Inter, Arial, sans-serif; fill: #ffffff; }
    .sub { font: 500 24px Inter, Arial, sans-serif; fill: #dbeefe; }
    .cta { font: 800 22px Inter, Arial, sans-serif; fill: #ffffff; }
  </style>
  <text x="60" y="220" class="kicker">CRC EN BOGOTÁ · CERTIFICADO ONAC</text>
  <text x="60" y="295" class="h1">Examen médico</text>
  <text x="60" y="360" class="h1">para licencia</text>
  <text x="60" y="425" class="h1">de conducción</text>
  <text x="60" y="475" class="sub">Reporte inmediato al RUNT</text>
  <rect x="60" y="510" width="320" height="60" rx="30" fill="#14b8a6"/>
  <text x="220" y="550" class="cta" text-anchor="middle">examenesparapase.com</text>
</svg>`);

await sharp(bg)
  .composite([
    { input: conductor, top: 0, left: W - PHOTO_W },
    { input: fadeSvg, top: 0, left: W - PHOTO_W - 60 },
    { input: textSvg, top: 0, left: 0 },
    { input: logoSized, top: 60, left: 60 },
  ])
  .jpeg({ quality: 85, progressive: true, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('✓ public/og-image.jpg generated (1200x630)');
