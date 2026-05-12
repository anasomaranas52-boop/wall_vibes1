import { motion, AnimatePresence } from "motion/react";
import { X, Upload, ShoppingCart, Check } from "lucide-react";
import { Product, ProductSize } from "./types";
import { PRICES } from "./constants";
import { useState, useRef } from "react";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, customImage?: string) => void;
  onBuyNow: (product: Product, size: ProductSize, customImage?: string) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart, onBuyNow }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>("30x40");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#161616] z-[1101] shadow-2xl rounded-3xl border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black rounded-full z-10 text-white/70"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Visual */}
              <div className="art-container relative aspect-[3/4] bg-gradient-to-b from-[#2a2a2a] to-[#161616] rounded-2xl flex items-center justify-center p-6 shadow-inner">
                 <div className="luxury-frame relative w-full h-full bg-black p-3 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
                  <div className="frame-content w-full h-full bg-black overflow-hidden relative">
                    <img
                      src={customImage || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {product.isCustom && !customImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white/50 gap-4">
                        <Upload size={48} strokeWidth={1} />
                        <p className="font-bold">ارفع صورتك هنا</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-primary">{product.name}</h2>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {product.description || "لوحة جدارية فاخرة مطبوعة بأحدث التقنيات لضمان ألوان زاهية وتفاصيل دقيقة، مع إطار زجاجي متين لمظهر عصري وأنيق."}
                  </p>
                </div>

                {product.isCustom && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-white/80">صورتك المخصصة:</h3>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      ref={fileInputRef}
                      className="hidden" 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all text-white/60"
                    >
                      {customImage ? <Check className="text-green-400" /> : <Upload />}
                      {customImage ? "تغيير الصورة" : "اختر صورة من جهازك"}
                    </button>
                  </div>
                )}

                <div className="space-y-6">
                  <h3 className="font-bold text-white/80">اختر المقاس:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(Object.keys(PRICES) as ProductSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                          selectedSize === size 
                            ? "border-primary bg-primary/10" 
                            : "border-white/5 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-black text-lg">{size} سم</span>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold">{PRICES[size].current} ج.م</span>
                          <span className="text-white/30 line-through text-xs">{PRICES[size].original} ج.م</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <button 
                    onClick={() => {
                        if (product.isCustom && !customImage) {
                            fileInputRef.current?.click();
                            return;
                        }
                        onBuyNow(product, selectedSize, customImage || undefined);
                    }}
                    className="w-full bg-primary-container hover:bg-primary text-black font-black py-5 rounded-2xl text-xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                  >
                    شراء الآن
                  </button>
                  <button 
                    onClick={() => {
                        if (product.isCustom && !customImage) {
                            fileInputRef.current?.click();
                            return;
                        }
                        onAddToCart(product, selectedSize, customImage || undefined);
                    }}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    إضافة لعربة التسوق
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
