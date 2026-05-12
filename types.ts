export type ProductSize = "30x40" | "30x20";

export interface Product {
  id: string;
  name: string;
  image: string;
  category: "cars" | "football" | "anime" | "gym" | "custom";
  description?: string;
  isCustom?: boolean;
}

export interface CartItem {
  id: string; // Unique combination of product id and size
  productId: string;
  name: string;
  price: number;
  image: string;
  size: ProductSize;
  quantity: number;
  customImage?: string;
}

export interface ShippingRegion {
  name: string;
  price: number;
}
