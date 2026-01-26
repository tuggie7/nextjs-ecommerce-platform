# E-Commerce Platform

Next.js 14 with App Router e-commerce application. Multi-language support in Turkish and English with modern dark glass UI and complete shopping experience.

## Quick Start

```bash
git clone https://github.com/tuggie7/nextjs-ecommerce-platform.git
cd nextjs-ecommerce-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Multi-Language Support** - Fully localized in Turkish and English with next-intl
- **Shopping Cart** - Add, update, and remove products with persistent Redux state
- **Wishlist** - Save favorite products for later
- **Product Catalog** - Browse, filter by category and price, sort products
- **Search** - Real-time product search and filtering
- **Product Details** - Dynamic pages with image zoom, ratings, and specifications
- **Checkout Flow** - Complete order simulation with payment UI
- **Dark Glass UI** - Modern design with atmospheric gradients and glassmorphism
- **Responsive Design** - Mobile-optimized with hamburger menu and adaptive layouts
- **Toast Notifications** - User feedback for cart and wishlist actions
- **Optimized Images** - Next.js image optimization with lazy loading
- **SEO Ready** - Sitemap, robots.txt, and dynamic meta tags

## Technology Stack

- **Framework** - Next.js 14 (App Router)
- **Language** - TypeScript
- **Styling** - TailwindCSS
- **State Management** - Redux Toolkit
- **Internationalization** - next-intl
- **API** - Fake Store API
- **Fonts** - Space Grotesk (via next/font)

## Project Structure

```
case-2/
├── app/
│   ├── [locale]/           # Localized routes (TR/EN)
│   │   ├── page.tsx        # Home page with hero section
│   │   ├── products/       # Product catalog
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout flow
│   │   ├── error.tsx       # Error boundary
│   │   └── not-found.tsx   # Custom 404 page
│   ├── globals.css         # Global styles and animations
│   └── providers.tsx       # Redux provider
├── components/
│   ├── Header.tsx          # Navigation with mobile menu
│   ├── ProductCard.tsx     # Product card with wishlist
│   ├── ProductsClient.tsx  # Product grid with filters
│   ├── CartClient.tsx      # Shopping cart with image zoom
│   ├── SpotlightPreview.tsx # Rotating hero showcase
│   └── ToastProvider.tsx   # Toast notifications
├── lib/
│   ├── api.ts              # Fake Store API integration
│   └── redux/
│       ├── store.ts        # Redux store configuration
│       ├── cartSlice.ts    # Cart state management
│       └── wishlistSlice.ts # Wishlist state management
├── messages/
│   ├── en.json             # English translations
│   └── tr.json             # Turkish translations
├── types/
│   └── index.ts            # TypeScript type definitions
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Locale routing middleware
└── next.config.mjs         # Next.js configuration
```

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linting checks
```

## Deployment

The application works on Vercel, Netlify, Cloudflare Pages, or any Node.js hosting.

**Deploy on Vercel (Recommended):**
1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically with each push

**Other Platforms:**
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted Node.js

## Localization

Fully localized experience in Turkish (TR) and English (EN):
- All pages and components
- Product categories and metadata
- Currency formatting (Turkish Lira and USD)
- Error messages and notifications
- SEO metadata per language

## License

MIT License - Free for personal and commercial use
