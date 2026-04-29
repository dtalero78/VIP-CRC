# VIP-CRC

Sitio web de **VIP SALUD OCUPACIONAL S.A.S.** — Centro de Reconocimiento de Conductores en Bogotá.

Dominio: [examenesparapase.com](https://examenesparapase.com)

## Stack

- [Astro](https://astro.build) (SSG, HTML estático para SEO máximo)
- [Tailwind CSS v4](https://tailwindcss.com)
- `@astrojs/sitemap` (sitemap automático)
- Deploy: GitHub Pages + dominio personalizado

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # previsualiza el build
```

## SEO incluido

- Meta tags completos (description, keywords, Open Graph, Twitter Card)
- Datos geográficos (`geo.region`, `geo.position`, ICBM)
- JSON-LD: `MedicalBusiness` + `LocalBusiness` + `FAQPage`
- `sitemap-index.xml` auto-generado
- `robots.txt` con sitemap declarado
- URLs canónicas, `hreflang`, idioma `es-CO`
- HTML semántico y headings jerarquizados

## Despliegue

El workflow `.github/workflows/deploy.yml` construye y publica en GitHub Pages en cada push a `main`. El archivo `public/CNAME` configura el dominio personalizado `examenesparapase.com`.

### Pasos manuales en GitHub (una sola vez)

1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. Repo → **Settings → Pages → Custom domain**: `examenesparapase.com`.
3. En el DNS del dominio, crear cuatro registros `A` apuntando a:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. (Opcional) `CNAME` para `www` → `<usuario>.github.io`.
