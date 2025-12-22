import React from 'react';


const ShoppingPage = ({ cart, setCart }) => {

    const increment = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
    }

    const decrement = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    }

    // Mahsulotni savatchadan o'chirish funksiyasi (kerak bo'ladi)
    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div className="mx-auto container py-5">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <table className="w-full border border-gray-200 border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-4 border-b">Products</th>
                        <th className="text-left p-4 border-b">Price</th>
                        <th className="text-left p-4 border-b">Quantity</th>
                        <th className="text-left p-4 border-b">Subtotal</th>
                        <th className="text-left p-4 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map(item => (
                        <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <img className="w-16 h-16 object-contain" src={item.image} alt={item.title} />
                                    <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                                </div>
                            </td>
                            <td className="p-4">${item.price.toFixed(2)}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-2 border w-max rounded-md px-1">
                                    <button
                                        onClick={() => decrement(item.id)}
                                        className="px-2 py-1 hover:text-orange-500 transition font-bold"
                                    >-</button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => increment(item.id)}
                                        className="px-2 py-1 hover:text-orange-500 transition font-bold"
                                    >+</button>
                                </div>
                            </td>
                            <td className="p-4 font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="p-4">
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {cart.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    Savatchangiz hozircha bo'sh.
                </div>
            )}
        </div>
    );
}

export default ShoppingPage;