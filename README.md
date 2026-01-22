# Next.js E-Commerce Platform

Multi-language (TR/EN), SEO-optimized, performance-focused e-commerce frontend built with Next.js 14, TypeScript, TailwindCSS, Redux Toolkit, and next-intl. Data is fetched from Fake Store API.

## Özellikler
- TR/EN çok dilli destek (next-intl)
- Ürün listeleme, kategori filtresi, fiyat aralığı, sıralama
- Ürün detay sayfası (dinamik meta, ISR)
- Sepet (adet güncelleme, silme, toplam)
- ISR/SSG ile SEO ve performans iyileştirmeleri
- Responsive UI (TailwindCSS), lazy-loaded images (next/image)

## Kurulum
```bash
npm install
npm run dev
```

Geliştirme sunucusu: http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Dizini
- app/[locale]/: TR/EN rotaları
- components/: UI bileşenleri
- lib/: API ve redux
- messages/: çeviri mesajları
- types/: TypeScript tipleri

## Çevre
- Node 18+
- Next.js 14+

## Deploy
Vercel önerilir. `next.config.mjs` ve ISR ile uyumlu.
