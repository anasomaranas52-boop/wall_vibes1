i motion } from "motion/react";
import { Plus } from "lucide-react";
import { Product } from "./types";
import { PRICES } from "./constants";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onClick(product)}
      className="product-card cursor-pointer group relative flex flex-col gap-4 p-4 rounded-3xl bg-[#161616] border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-2xl"
    >
      <div className="art-container relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a2a2a] to-[#161616] flex items-center justify-center p-4">
        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none z-10" />
        
        {/* Luxury Frame */}
        <div className="luxury-frame relative w-full h-full bg-black p-2 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,255,255,0.05)] z-0">
          <div className="frame-content w-full h-full bg-black overflow-hidden border border-white/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <div className="product-info flex flex-col gap-4">
        <h3 className="product-name font-bold text-base text-white/90 text-center line-clamp-1">
          {product.name}
        </h3>
        
  <div className="flex flex-col gap-1.5">
  {Object.entries(PRICES).map(([size, price]) => (
    <div key={size} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
      <span className="text-white/60 text-[10px]">مقاس {size.replace('x', '×')}:</span>
      <div className="flex items-center gap-1.5">
        <span className="text-primary font-bold text-xs">{price.current} ج.م</span>
        <span className="text-white/20 line-through text-[9px]">{price.original} ج.م</span>
      </div>
    </div>
  ))}
</div>

        </div>

        <div className="actions w-full flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          <button 
            className="btn-order flex-[3] bg-primary-container hover:bg-primary text-black font-black py-2 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-95 text-base"
            onClick={() => onClick(product)}
          >
            تفاصيل المنتج
          </button>
          <button 
            className="btn-cart flex-1 bg-white/5 hover:bg-white/10 text-white p-2 rounded-xl transition-colors flex items-center justify-center border border-white/5 shadow-inner"
            onClick={() => onClick(product)}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
