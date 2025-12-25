import React, { useState } from "react";
import {
    X,
    ShoppingCart,
    Heart,
    GitCompare,
    Copy,
    Facebook,
    Twitter,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Star
} from "lucide-react";

const QuickViewModal = ({ product, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState(0);

    // Namuna rasmlar (agar mahsulotda rasm ko'p bo'lsa)
    const images = product.images || [product.image, product.image, product.image, product.image];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative bg-white w-full max-w-[1100px] rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Yopish tugmasi */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 text-gray-400 hover:text-black p-1 border rounded-full"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8">

                    {/* CHAP TOMON - RASMLAR */}
                    <div className="w-full md:w-1/2">
                        <div className="relative border border-gray-100 rounded-lg p-4 mb-4 flex justify-center items-center h-[300px] md:h-[400px]">
                            <img
                                src={images[activeImg]}
                                alt="Product"
                                className="max-h-full object-contain"
                            />
                            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Kichik rasmlar (Thumbnails) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImg(idx)}
                                    className={`w-20 h-20 border-2 p-1 cursor-pointer rounded ${activeImg === idx ? 'border-orange-500' : 'border-gray-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* O'NG TOMON - MA'LUMOTLAR */}
                    <div className="w-full md:w-1/2">
                        {/* Reyting va Sarlavha */}
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                            ))}
                            <span className="text-xs font-bold text-gray-900 ml-1">4.7 Star Rating</span>
                            <span className="text-xs text-gray-400">(21,671 User feedback)</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 leading-tight">
                            {product.title || "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD)"}
                        </h1>

                        {/* Sku va Category */}
                        <div className="grid grid-cols-2 gap-y-2 text-xs mb-6">
                            <p><span className="text-gray-500 uppercase">Sku:</span> <span className="font-bold">A264671</span></p>
                            <p><span className="text-gray-500 uppercase">Availability:</span> <span className="text-green-500 font-bold">In Stock</span></p>
                            <p><span className="text-gray-500 uppercase">Brand:</span> <span className="font-bold">Apple</span></p>
                            <p><span className="text-gray-500 uppercase">Category:</span> <span className="font-bold">Electronics Devices</span></p>
                        </div>

                        {/* Narx */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold text-[#2DA5F3]">${product.price}</span>
                            <span className="text-lg text-gray-400 line-through">$1999.00</span>
                            <span className="bg-yellow-300 text-black text-[10px] font-bold px-2 py-1 rounded">21% OFF</span>
                        </div>

                        <hr className="mb-6" />

                        {/* Tanlovlar (Color, Size) */}
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div>
                                <label className="block mb-2 font-medium">Color</label>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full bg-gray-400 border-2 border-orange-500 ring-1 ring-gray-300"></button>
                                    <button className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></button>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Size</label>
                                <select className="w-full border p-2 rounded outline-none focus:border-orange-500">
                                    <option>14-inch Liquid Retina XDR display</option>
                                </select>
                            </div>
                        </div>

                        {/* Miqdor va Tugmalar */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center border rounded p-1">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100"><Minus size={16} /></button>
                                <span className="px-4 font-bold">{quantity.toString().padStart(2, '0')}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-100"><Plus size={16} /></button>
                            </div>
                            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 uppercase text-sm">
                                ADD TO CARD <ShoppingCart size={20} />
                            </button>
                            <button className="w-full md:w-auto border-2 border-orange-500 text-orange-500 font-bold py-3 px-8 rounded uppercase text-sm">
                                BUY NOW
                            </button>
                        </div>

                        {/* Qo'shimcha amallar */}
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-6">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-1 hover:text-orange-500"><Heart size={16} /> Add to Wishlist</button>
                                <button className="flex items-center gap-1 hover:text-orange-500"><GitCompare size={16} /> Add to Compare</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Share product:</span>
                                <Copy size={16} className="cursor-pointer hover:text-orange-500" />
                                <Facebook size={16} className="cursor-pointer hover:text-orange-500" />
                                <Twitter size={16} className="cursor-pointer hover:text-orange-500" />
                            </div>
                        </div>

                        {/* To'lov kafolati (Rasmda pastda turgan qism) */}
                        <div className="border rounded p-4">
                            <p className="text-[10px] text-gray-500 uppercase mb-2">100% Guarantee Safe Checkout</p>
                            <div className="flex gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                {/* Bu yerda to'lov tizimlari ikonkalari bo'ladi */}
                                <span className="text-[10px] bg-gray-100 px-2 py-1">VISA</span>
                                <span className="text-[10px] bg-gray-100 px-2 py-1">PayPal</span>
                                <span className="text-[10px] bg-gray-100 px-2 py-1">MasterCard</span>
                                <span className="text-[10px] bg-gray-100 px-2 py-1">ApplePay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;