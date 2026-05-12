import { Product, ShippingRegion } from "./types";

export const PRICES = {
  "30x40": { current: 215, original: 270 },
  "30x20": { current: 150, original: 185 }
};

export const SHIPPING_REGIONS: ShippingRegion[] = [
  // Zone 1
  { name: "القاهرة", price: 70 },
  { name: "الجيزة", price: 70 },
  { name: "التجمعات", price: 70 },
  { name: "أكتوبر-زايد-ح أكتوبر", price: 70 },
  // Zone 2
  { name: "أطراف الجيزة 1", price: 80 },
  { name: "أطراف الجيزة 2", price: 90 },
  { name: "مدينتي-عبور", price: 80 },
  { name: "شروق-مستقبل", price: 80 },
  // Zone 3
  { name: "الإسكندرية - البحيرة", price: 90 },
  { name: "السويس - بورسعيد", price: 90 },
  { name: "الإسماعيلية - كفر الشيخ", price: 90 },
  { name: "الغربية - المنوفية - دمياط", price: 90 },
  { name: "الدقهلية - القليوبية - الشرقية", price: 90 },
  // Zone 4
  { name: "الفيوم - بني سويف", price: 95 },
  { name: "سوهاج - أسيوط - المنيا", price: 95 },
  { name: "قنا - أسوان - الأقصر", price: 95 },
  { name: "العاشر من رمضان - م/بدر", price: 95 },
  // Zone 5
  { name: "مطروح - الساحل - العالمين", price: 125 },
  { name: "الغردقة - البحر الأحمر", price: 130 },
  { name: "الوادي الجديد", price: 130 },
  { name: "سيناء - شرم الشيخ", price: 155 },
];

export const PRODUCTS: Product[] = [
  // Custom
  {
    id: "custom-frame",
    name: "بروازك المخصص",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    category: "custom",
    description: "ارفع صورتك الخاصة وسنقوم بتحويلها إلى برواز جداري فاخر بجودة طباعة استثنائية.",
    isCustom: true
  },
  // Cars
  {
    id: "car-1",
    name: "BMW E30 M3",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhVt1bWo524aeYGdm0JWdU_3pRwbn6A2DNpsnLnB52r8R2z0v3250SNoak0MHRwwnCXwAfg0gkEoub8inlcP32Ly9C9dEk-umBpMIbd5TipNnWc_-GVQnch9YmiCv8_CfyJPrrNoywJlRZOcsqLFG_KVpcIs-Pge2NAzsYhMNf5Xil-C00pgQUMdeJDCKEuCHEs5xA47oavT73Dh27UgzMOojNKy2SxGwqifgPY4Jumb7YkAWFMGJ0PgrzF8aZk5NJ9AWWL9bRG",
    category: "cars"
  },
  // ... (keeping some existing ones but removing duplicates for brevity in the sample, 
  // I will add them back if needed, but let's keep the main IDs)
  {
    id: "car-2",
    name: "BMW M4 Competition",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uiUMuw7pZp_mKVAdvgIOlL3_49K-Tpk1ChScS7bfNJU8NoGOHzVDrlAphj7dUuwKVIaJ-seEFnXG2IrBpDBXpZ1xaF607cEIdilOMtVUNu_PiCSPxmebhMdfFxapsUnn6RyuIWjafnM86wj40AFpdrmg0-C1rB8WFlAvma5IFmOTnvimHsWuQySg1OW8n4wY70e93Yau9qpmTrEyCR-EYJJEiFCR-6YazYaHP5xNarnH-RM7sa3WvS_7nDfNIFMggGJJaZs06k",
    category: "cars"
  },
  {
    id: "car-3",
    name: "Bugatti Chiron",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugfdAaGj-UoKaYjocVN4y8cyjERsVTygSHC4TYm7pW5om9Bu1gbvA9_19ew2wuPQz3PBeliSxLuCTjt8cNKL2vN1JNREz9CHX_RWb4Tx-zMw8HtkIVspn4d3EQ2UlRFElgk6f9zDoSt1uClUAkbcj0_UpI2zm6dxlmNYyhrw_1ALndAU1PIdbJvg6a28O4EPnwkc0MaagE25D8yU6RJEFEiFXLcjeMmfER2ZfexitoPmQ8jYv2RXxOvCmqGvrjzYHO5Ollw5DZJ",
    category: "cars"
  },
  // Football
  {
    id: "foot-1",
    name: "لوحة ميسي - الرقم 10",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhY1eZuDmY5cDyggIS61Ynw6KsWLTEkmHtQ3BkdbNlfiCZRWndpP5IW46pfRIP53Voi1WJjftBPBAUmr0Y-7W9w-YUukh5LmP8Jc2rZdCva5CIHKARwjwfxGyuJySFDJ8MIiVQpL48JSpqGvEPvmmpD_LznCzuY9ahYd17OG4QGcyYrtQUV7W6bw9CZBKQP5cR8XYq-Re3_NQHzXH8JgzETCEw5EhPFknN3nveOTHVzoJs9-AOiPol9pEpxs9Pctdvp8L_Bg-7S",
    category: "football"
  },
  {
    id: "foot-2",
    name: "لوحة ميسي - الأفضل عبر التاريخ",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ujR-5BraVCTsRh5JZ19Pp2_bhpPSItrrXLKoGi5n1oKAeaXgIc9kkd3HB-4qgB7-YgLgsq5Xlza7L2-mqCkzom6VYD1lcEN-w49xA1qKLgiO8gexAtMKOlvnmhMmuxc9A0FheE9rc3VNKU1AE_lixdsYIQkNu-rqBXKeeVFm2e2DTo5kU4fxln1RtHTEY1rfKruxx8K2YkoPNKbJb5lqrlPf3bx2oaND9LPD0aq4e5K3Xvm2gC5oZn_fHN1bK358fXRsJKvWZOV",
    category: "football"
  },
  // Anime
  {
    id: "anime-1",
    name: "لوحة الأقوى - جوجو وسوكونا",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uj8u-ss3Wz_auWBSH9CbnzNb19s8cgHk1iCKPXJ6ofqD0K3QmEhqpjAWu06gZammS0CpyPPFBMliPUgCmHqssy3dT0_dcD0SnhPhIvU0MiiBrqA_q3cqQrqF7xLP9Nf38hNTeVHmUMyrqSC5R0jWIX7JqQqtBMrOIVhZukFOmEUbhurDfw7SdNp2C_QPIU4Ooap9XCiUDI7Obh_buOpk-dorZXiZTtFATpXk74D7zDu8PQWWiTveWaOgDM1MKu9_nYvcn7Wa66F",
    category: "anime"
  },
  // Gym
  {
    id: "gym-1",
    name: "إرادة حديدية - لوحة فنية",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhVt1bWo524aeYGdm0JWdU_3pRwbn6A2DNpsnLnB52r8R2z0v3250SNoak0MHRwwnCXwAfg0gkEoub8inlcP32Ly9C9dEk-umBpMIbd5TipNnWc_-GVQnch9YmiCv8_CfyJPrrNoywJlRZOcsqLFG_KVpcIs-Pge2NAzsYhMNf5Xil-C00pgQUMdeJDCKEuCHEs5xA47oavT73Dh27UgzMOojNKy2SxGwqifgPY4Jumb7YkAWFMGJ0PgrzF8aZk5NJ9AWWL9bRG",
    category: "gym"
  }
];
