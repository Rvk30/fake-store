// src/types.ts

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: number;
  rating_count: number;
};

// This new type defines the structure of a product within an order
type ProductInOrder = {
  product_id: number | null; // product_id can be null
  quantity: number;
};

// UPDATED Order type to match your API response
export type Order = {
  id: number;
  userId: number;       // Changed from user_id
  date: string;         // Changed from order_date
  products: ProductInOrder[]; // Added the products array
};