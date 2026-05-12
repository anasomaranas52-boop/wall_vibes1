import { motion } from "motion/react";
import { ArrowRight, Send, Truck, CreditCard, ShieldCheck, MapPin } from "lucide-react";
import { CartItem } from "../types";
import { SHIPPING_REGIONS } from "../constants";
import { useState } from "react";

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (details: OrderDetails) => void;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  governorate: string;
  shippingPrice: number;
}

export default function CheckoutPage({ items, onBack, onComplete }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    governorate: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedRegion = SHIPPING_REGIONS.find(r => r.name === formData.governorate);
  const shipping = selectedRegion?.price || 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.governorate) {
        alert("يرجى اختيار المحافظة");
        return;
    }
    onComplete({
      ...formData,
      shippingPrice: shipping
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="min-h-screen bg-background pt-24 pb-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-primary mb-8 transition-colors"
        >
          <ArrowRight size={20} />
          العودة للمتجر
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-8">
            <h1 className="text-4xl font-black">إتمام <span className="text-primary">الطلب</span></h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 mr-2">الاسم بالكامل</label>
                <input
                  required
                  type="text"
                  placeholder="أدخل اسمك بالكامل"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 mr-2">رقم الهاتف</label>
                <input
                  required
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 mr-2">المحافظة</label>
                <div className="relative">
                    <select
                    required
                    className="w-full bg-[#161616] border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all appearance-none text-white/80"
                    value={formData.governorate}
                    onChange={e => setFormData({ ...formData, governorate: e.target.value })}
                    >
                    <option value="" disabled>اختر المحافظة</option>
                    {SHIPPING_REGIONS.map(r => (
                        <option key={r.name} value={r.name}>{r.name} - {r.price} ج.م</option>
                    ))}
                    </select>
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 mr-2">العنوان بالتفصيل</label>
                <textarea
                  required
                  rows={3}
                  placeholder="الشارع، رقم العمارة، الدور..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all resize-none"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary font-bold">
                    <CreditCard size={20} />
                    <span>طريقة الدفع: الدفع عند الاستلام</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                    سيتم التواصل معك هاتفياً لتأكيد الطلب قبل الشحن.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-container hover:bg-primary text-black font-black py-5 rounded-2xl text-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
              >
                تأكيد الطلب عبر واتساب
                <Send size={24} />
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
            <div className="bg-[#161616] rounded-3xl border border-white/10 p-8 space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/5 pb-4">ملخص الطلب</h2>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-white/90 leading-tight">{item.name}</h3>
                      <p className="text-white/40 text-sm">{item.size}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-primary font-bold">{item.price} ج.م</span>
                        <span className="text-white/30 text-sm">عدد: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-white/60">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>الشحن ({formData.governorate || "لم يتم الاختيار"})</span>
                  <span>{shipping} ج.م</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-white pt-3">
                  <span>الإجمالي الكلي</span>
                  <span className="text-primary">{total} ج.م</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-white/5">
                    <Truck size={20} className="text-primary" />
                    <span className="text-[10px] text-white/50">شحن سريع</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-white/5">
                    <ShieldCheck size={20} className="text-primary" />
                    <span className="text-[10px] text-white/50">ضمان عودة</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-white/5">
                    <MapPin size={20} className="text-primary" />
                    <span className="text-[10px] text-white/50">دفع عند الاستلام</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
