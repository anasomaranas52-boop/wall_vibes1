import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1350&q=80')`,
          filter: 'brightness(0.6)' 
        }}
      />
      
      {/* Animated Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center max-w-2xl"
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          WALL <span className="text-primary">VIBES</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          حوّل جدران غرفتك إلى لوحة فنية تعبر عن شخصيتك بأعلى جودة طباعة وإطارات زجاجية فاخرة.
        </motion.p>
        
        <motion.a
          href="#shop"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-container hover:bg-primary text-black font-extrabold px-10 py-5 rounded-full text-lg transition-all shadow-2xl shadow-primary/30"
        >
          ابدأ التسوق الآن
        </motion.a>
      </motion.div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
