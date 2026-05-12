/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductCard from "./ProductCard";
import CartDrawer from "./CartDrawer";
import ProductDetailsModal from "./ProductDetailsModal";
import CheckoutPage, { OrderDetails } from "./CheckoutPage";
import WhatsAppButton from "./WhatsAppButton";
import { PRODUCTS, PRICES } from "./constants";
import { Product, CartItem, ProductSize } from "./types";
import { AnimatePresence } from "motion/react";

const CATEGORIES = [
  { id: "custom", name: "بروازك المخصص", icon: "✨" },
  { id: "cars", name: "قسم السيارات", icon: "🚗" },
  { id: "football", name: "قسم كرة القدم", icon: "⚽" },
  { id: "anime", name: "قسم الأنمي", icon: "🎌" },
  { id: "gym", name: "قسم الجيم والرياضة", icon: "💪" },
] as const;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "checkout">("home");

  const handleAddToCart = useCallback((product: Product, size: ProductSize = "30x40", customImage?: string) => {
    const price = PRICES[size].current;
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: price,
          image: customImage || product.image,
          size: size,
          quantity: 1,
          customImage
        },
      ];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  }, []);

  const handleBuyNow = useCallback((product: Product, size: ProductSize, customImage?: string) => {
    handleAddToCart(product, size, customImage);
    setCurrentPage("checkout");
  }, [handleAddToCart]);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCompleteOrder = useCallback((details: OrderDetails) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + details.shippingPrice;

    let itemsText = cart.map(item => {
      let text = `- ${item.name} (${item.size})\n  الكمية: ${item.quantity}\n  السعر: ${item.price} ج.م`;
      if (item.customImage) {
        text += `\n  🖼️ (برجاء إرسال الصورة المخصصة في الشات)`;
      }
      return text;
    }).join("\n\n");

    const message = `طلب جديد من Wall Vibes 🎨\n\n` +
      `👤 الاسم: ${details.name}\n` +
      `📞 الهاتف: ${details.phone}\n` +
      `📍 المحافظة: ${details.governorate}\n` +
      `🏠 العنوان: ${details.address}\n\n` +
      `📦 الطلبات:\n${itemsText}\n\n` +
      `💰 المجموع: ${subtotal} ج.م\n` +
      `🚚 الشحن: ${details.shippingPrice} ج.م\n` +
      `💵 الإجمالي الكلي: ${total} ج.م\n\n` +
      `طريقة الدفع: الدفع عند الاستلام`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201281117029?text=${encodedMessage}`, "_blank");
    
    // Clear cart and go home
    setCart([]);
    setCurrentPage("home");
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  if (currentPage === "checkout") {
    return (
      <CheckoutPage 
        items={cart} 
        onBack={() => setCurrentPage("home")} 
        onComplete={handleCompleteOrder} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <main>
        <Hero />
        
        <div id="shop" className="max-w-7xl mx-auto px-6 md:px-[8%] py-12">
          {/* Category Navigation */}
          <div className="sticky top-[73px] z-[900] bg-background/95 backdrop-blur-sm border-b border-white/5 mb-20 -mx-6 px-6 py-4 overflow-x-auto no-scrollbar">
            <div className="flex justify-center md:justify-center items-center gap-3 min-w-max">
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('shop')?.offsetTop! - 100, behavior: 'smooth' })}
                className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold"
              >
                الكل
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name.replace("قسم ", "").split(" (")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="mb-24 last:mb-0 scroll-mt-32">
              <div className="flex items-center gap-4 mb-12 border-r-4 border-primary pr-6">
                <h2 className="text-2xl md:text-3xl font-black">
                  {cat.icon} {cat.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {PRODUCTS.filter(p => p.category === cat.id).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct}
                    onAddToCart={(p) => setSelectedProduct(p)} 
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-black/40 border-t border-white/5 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-2xl font-black mb-4 uppercase tracking-tighter">
            WALL <span className="text-primary">VIBES</span>
          </div>
          <p className="text-white/40 max-w-md mx-auto mb-8 font-medium">
            نحن نهتم بكل تفاصيل لوحتك الفنية لتصلك بأفضل جودة وتصميم يضيف لمسة من الفخامة لمنزلك.
          </p>
          <div className="flex justify-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-primary transition-colors">شروط الخدمة</a>
            <a href="#" className="hover:text-primary transition-colors">تواصل معنا</a>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-xs text-white/20">
            © {new Date().getFullYear()} Wall Vibes. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      <ProductDetailsModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            setCurrentPage("checkout");
        }}
      />

      <WhatsAppButton />
    </div>
  );
}
