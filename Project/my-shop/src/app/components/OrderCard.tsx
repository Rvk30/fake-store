// src/app/components/OrderCard.tsx

import { Order } from '../../types';

const OrderCard = ({ order }: { order: Order }) => {
    // Calculate the total number of items in the order
    const totalItems = order.products.reduce((sum, product) => sum + product.quantity, 0);

    // Safely format the date using the correct property name 'date'
    const formattedDate = order.date
        ? new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'N/A';

    return (
        <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white w-full max-w-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl text-gray-800">Order #{order.id}</h3>
                <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-gray-700">
                    <span className="font-semibold">Date:</span> {formattedDate}
                </p>
                <p className="text-gray-700">
                    {/* Use the correct property name 'userId' */}
                    <span className="font-semibold">Customer ID:</span> {order.userId}
                </p>
            </div>
        </div>
    );
};

export default OrderCard;