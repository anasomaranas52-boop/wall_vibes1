import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import WhatsappButton from './components/WhatsappButton';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product } from './types';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <main>
        <Hero />
        
        <div id="shop" className="max-w-7xl mx-auto px-4 md:px-[8%] py-20">
          {CATEGORIES.map((cat) => (
            <section key={cat.id} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tight">{cat.name}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {PRODUCTS.filter(p => p.category === cat.id).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                    onAddToCart={() => setCartCount(prev => prev + 1)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-black/40 border-t border-white/5 py-12 px-6 text-center">
        <p className="text-white/40 text-sm">© 2024 Wall Vibes. All rights reserved.</p>
      </footer>

      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsappButton />
    </div>
  );
};

export default App;
