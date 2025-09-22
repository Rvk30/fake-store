import Image from 'next/image';

// Define a type for a single product based on the API response
type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

// This async function now returns a Promise that resolves to an array of Products
async function getProducts(): Promise<Product[]> {
    // Replace this URL with your actual API endpoint
    const res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {/* TypeScript knows that 'product' is of type Product */}
            {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center shadow-lg">
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-md"
                        />
                    </div>
                    <h2 className="text-lg font-bold text-center mb-2">{product.title}</h2>
                    <p className="text-xl font-semibold text-gray-800">${product.price}</p>
                </div>
            ))}
        </div>
    );
}