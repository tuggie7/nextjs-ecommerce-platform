import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Common');
  
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0b1021]/70 backdrop-blur">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">ShopHub</h3>
            <p className="text-gray-400">
              Multi-language, SEO-optimized e-commerce platform
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">{t('home')}</a></li>
              <li><a href="#" className="hover:text-white">{t('products')}</a></li>
              <li><a href="#" className="hover:text-white">{t('cart')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <p className="text-gray-300">info@shophub.com</p>
            <p className="text-gray-300">+90 555 123 4567</p>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© 2026 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
