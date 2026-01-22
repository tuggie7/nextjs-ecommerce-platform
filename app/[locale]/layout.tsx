import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Space_Grotesk } from 'next/font/google';
import "../globals.css";
import { Providers } from '../providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Metadata is generated dynamically below

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "E-Commerce Platform",
    description: "Multi-language SEO-optimized e-commerce platform",
    alternates: {
      languages: {
        en: '/en',
        tr: '/tr',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={display.variable}>
      <head>
        <link rel="preconnect" href="https://fakestoreapi.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
