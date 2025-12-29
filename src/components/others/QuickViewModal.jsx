import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart, Heart } from "lucide-react";

const QuickViewModal = ({ product, isOpen, onClose, addToCart }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }} // Mobilda pastdan chiqadi
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full md:max-w-4xl bg-white rounded-t-[32px] md:rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] md:max-h-none overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Product Image Section */}
                            <div className="w-full md:w-1/2 bg-[#F5F6F7] p-8 flex items-center justify-center">
                                <motion.img
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    src={product.image}
                                    alt={product.title?.en}
                                    className="max-h-[300px] md:max-h-[400px] object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* Product Info Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-500">(4.8 Rating)</span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                    {product.title?.en || product.name}
                                </h2>

                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                    {product.description || "High-quality electronic product with premium features and long-lasting durability. Perfect for your daily needs."}
                                </p>

                                <div className="flex items-center gap-4 my-4">
                                    <span className="text-3xl font-black text-[#1B6392]">${product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-gray-400 line-through">${product.oldPrice}</span>
                                    )}
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        Save 20%
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                    <button
                                        onClick={() => {
                                            addToCart(product);
                                            onClose();
                                        }}
                                        className="flex-1 bg-[#FA8232] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-100"
                                    >
                                        <ShoppingCart size={20} />
                                        ADD TO CART
                                    </button>
                                    <button className="w-14 h-14 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95">
                                        <Heart size={20} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;