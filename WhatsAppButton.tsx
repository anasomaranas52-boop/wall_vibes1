import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201281117029"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 left-8 z-[2000] w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/50 border border-white/10 hover:border-white/30 transition-all"
    >
      <MessageCircle size={32} fill="currentColor" />
    </motion.a>
  );
}
