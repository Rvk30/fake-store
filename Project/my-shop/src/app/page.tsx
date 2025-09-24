// src/app/page.tsx

import ItemList from './components/ItemList';
import { Product, Order } from '../types';

// Function to fetch products from your API
async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Function to fetch orders from your API
async function getOrders(): Promise<Order[]> {
  const res = await fetch('http://localhost:3000/api/orders', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

// Make the Home component async so you can use 'await'
export default async function HomePage() {
  // Fetch both sets of data on the server
  const products = await getProducts();
  const orders = await getOrders();

  return (
    <main className="p-8 space-y-12">
      {/* Pass the fetched data down to your flexible ItemList component.
        First, for the products...
      */}
      <ItemList title="Our Products" products={products} />
      
      {/* ...and then again for the orders.
      */}
      <ItemList title="Recent Orders" orders={orders} />
    </main>
  );
}
