// src/app/components/ItemList.tsx

import { Product, Order } from '../../types';
import ProductCard from './ProductCard';
import OrderCard from './OrderCard';

type ListProps =
  | { title: string; products: Product[]; orders?: never; }
  | { title: string; orders: Order[]; products?: never; };

const ItemList = (props: ListProps) => {
  if (props.products) {
    return (
      <section className="mb-12"> {/* Add bottom margin to separate sections */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{props.title} 📦</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {props.products.map((product) => (
            <ProductCard key={`product-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    );
  }

  if (props.orders) {
    return (
      <section className="mb-12"> {/* Add bottom margin to separate sections */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{props.title} 🛒</h2>
        {/* Changed layout for orders: centered, responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {props.orders.map((order) => (
            <OrderCard key={`order-${order.id}`} order={order} />
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default ItemList;