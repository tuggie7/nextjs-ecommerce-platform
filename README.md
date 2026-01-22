# 🛍️ Next.js E-Commerce Platform

Modern, multi-language (🇹🇷 TR / 🇬🇧 EN), SEO-optimized e-commerce platform with stunning dark glass UI, built with Next.js 14 App Router, TypeScript, TailwindCSS, Redux Toolkit, and next-intl.

**Live Demo:** [GitHub Repository](https://github.com/tuggie7/nextjs-ecommerce-platform)

## ✨ Features

### Core Functionality
- 🌐 **Multi-Language Support** - Fully localized TR/EN with next-intl
- 🛒 **Shopping Cart** - Add, update, remove items with persistent state (Redux)
- ❤️ **Wishlist/Favorites** - Save products for later
- 🔍 **Product Search** - Real-time search with filtering
- 📦 **Product Catalog** - Browse, filter by category, price range, and sort
- 🏷️ **Product Details** - Dynamic pages with image zoom, reviews, and specs
- 💳 **Checkout Flow** - Complete order simulation with payment UI
- 🔔 **Toast Notifications** - User feedback for cart/wishlist actions

### UI/UX Design
- 🎨 **Dark Glass Theme** - Atmospheric gradients with glassmorphism
- 🎭 **Responsive Design** - Mobile hamburger menu, adaptive layouts
- 🖼️ **Image Zoom** - Click-to-zoom modals on product images
- ⚡ **Staggered Animations** - Smooth fade-in effects on product grid
- 🎯 **Custom Typography** - Space Grotesk font via next/font
- 🎪 **Hero Section** - Split layout with floating promotional cards

### Performance & SEO
- ⚡ **ISR (Incremental Static Regeneration)** - Product pages revalidate every hour
- 🚀 **Optimized Images** - next/image with lazy loading
- 🗺️ **Sitemap & Robots.txt** - Full SEO setup
- 📊 **Dynamic Metadata** - Localized meta tags per page
- 🎯 **First Load JS: 87.3 kB** - Optimized bundle size

### Developer Experience
- 📝 **TypeScript** - Full type safety
- 🔧 **Redux Toolkit** - Predictable state management
- 🎨 **TailwindCSS** - Utility-first styling
- 🌍 **next-intl** - i18n routing and translations
- 🧩 **Component Architecture** - Modular, reusable components
- ⚠️ **Error Boundaries** - Custom 404 and error pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tuggie7/nextjs-ecommerce-platform.git
cd nextjs-ecommerce-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
case-2/
├── app/
│   ├── [locale]/           # Localized routes (TR/EN)
│   │   ├── page.tsx        # Home page with hero
│   │   ├── products/       # Product catalog
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout flow
│   │   ├── error.tsx       # Error boundary
│   │   └── not-found.tsx   # Custom 404
│   ├── globals.css         # Global styles & animations
│   └── providers.tsx       # Redux provider
├── components/
│   ├── Header.tsx          # Navigation with mobile menu
│   ├── ProductCard.tsx     # Product card with wishlist
│   ├── ProductsClient.tsx  # Product grid with filters
│   ├── CartClient.tsx      # Cart with image zoom
│   └── ToastProvider.tsx   # Toast notifications
├── lib/
│   ├── api.ts              # Fake Store API integration
│   └── redux/
│       ├── store.ts        # Redux store config
│       ├── cartSlice.ts    # Cart state management
│       └── wishlistSlice.ts # Wishlist state
├── messages/
│   ├── en.json             # English translations
│   └── tr.json             # Turkish translations
├── types/
│   └── index.ts            # TypeScript interfaces
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Locale routing
└── next.config.mjs         # Next.js configuration
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **State Management** | Redux Toolkit |
| **Internationalization** | next-intl |
| **API** | Fake Store API |
| **Fonts** | Space Grotesk (next/font) |
| **Icons** | Lucide React |

## 🌐 Localization

Fully localized in Turkish and English:
- All UI components and pages
- Product categories and metadata
- Price formatting (₺ / $)
- Toast notifications
- Error messages
- SEO metadata

## 📊 Routes

| Route | Type | Revalidation |
|-------|------|-------------|
| `/[locale]` | Dynamic | - |
| `/[locale]/products` | Dynamic | - |
| `/[locale]/products/[id]` | ISR | 3600s |
| `/[locale]/cart` | Dynamic | - |
| `/[locale]/checkout` | Dynamic | - |

## 🎨 Design Features

- **Dark Glass UI** with multi-layer atmospheric gradients
- **Grid Overlay** with subtle pattern
- **Floating Cards** with backdrop blur
- **Hover Effects** with scale and shine animations
- **Responsive Mobile Menu** with overlay
- **Image Zoom Modals** on click
- **Staggered Grid Animations** for product catalog

## 🧪 Development

```bash
# Run in development mode
npm run dev

# Type checking
npm run build

# Lint check
npm run lint
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Deploy automatically

### Other Platforms
Compatible with any platform supporting Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted (Node.js)

## 📄 License

MIT License - free to use for personal and commercial projects.

## 👤 Author

**Tugay Ekinci**
- GitHub: [@tuggie7](https://github.com/tuggie7)

---

Built with ❤️ using Next.js 14
