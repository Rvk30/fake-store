// src/app/components/ProductCard.tsx

import Image from 'next/image';
import { Product } from '../../types'; // Import the type

const ProductCard = ({ product }: { product: Product }) => (
    <div className="border rounded-lg p-4 flex flex-col shadow-lg h-full">
        <div className="relative w-full h-48 mb-4">
            {product.image && (
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                />
            )}
        </div>
        <div className="flex flex-col flex-grow">
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <h3 className="font-bold text-lg flex-grow">{product.title}</h3>
            <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1 text-gray-700">{product.rating_rate}</span>
                <span className="ml-2 text-gray-400">({product.rating_count} reviews)</span>
            </div>
            <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
        </div>
    </div>
);

export default ProductCard;