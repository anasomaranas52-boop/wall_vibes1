import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1001]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#121212] z-[1002] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-bottom border-white/10 flex justify-between items-center bg-black/20">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-primary" />
                سلة التسوق
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-white/40">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="text-lg">السلة فارغة حالياً</p>
                  <button 
                    onClick={onClose}
                    className="text-primary hover:underline"
                  >
                    ابدأ التسوق الآن
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group">
                    <div className="w-24 h-24 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white/90 leading-tight">{item.name}</h3>
                        <p className="text-primary font-bold mt-1">{item.price} ج.م</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-primary transition-colors text-white/60"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center font-mono text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-primary transition-colors text-white/60"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-2 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-black/40 border-top border-white/10 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-primary">{total} ج.م</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-primary-container hover:bg-primary text-black font-extrabold py-4 rounded-2xl text-lg shadow-xl shadow-primary/10 transition-all active:scale-[0.98]"
                >
                  إتمام الطلب
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
