import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Header({ onOpenCart, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[1000] bg-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-[8%] py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo text-2xl md:text-3xl font-extrabold tracking-wider"
        >
          WALL <span className="text-primary">VIBES</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCart}
          className="relative bg-primary-container hover:bg-primary text-black font-bold px-6 py-2 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <ShoppingCart size={20} />
          <span className="hidden md:inline">السلة</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black font-bold">
              {cartCount}
            </span>
          )}
        </motion.button>
      </div>
    </header>
  );
}
