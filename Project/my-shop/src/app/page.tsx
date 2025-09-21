import Image from "next/image";
import ProductList from './components/ProductList';
export default function Home() {
  return (
      <main className="container mx-auto py-8">
          <h1 className="text-4xl font-extrabold text-center mb-10">Our Products 🛍</h1>
          <ProductList />
      </main>
  );
}
