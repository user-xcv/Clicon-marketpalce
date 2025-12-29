import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../others/supabase";
import { useTranslation } from "react-i18next";
import QuickViewModal from "../others/QuickViewModal";
import { motion, AnimatePresence } from "framer-motion";

const ShopPage = ({ addToCart, toggleWishlist, wishlist = [] }) => {
    const [products, setProducts] = useState([]);
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleQuickView = (p) => {
        setSelectedProduct(p);
        setIsQuickViewOpen(true);
    };

    const shopProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('main_type', 'action')
            .order('id')
            .limit(9);

        if (error) {
            console.log('Serverda xatolik:', error.message);
        } else {
            setProducts((data || []).map((p) => ({
                ...p,
                oldPrice: p.oldPrice ?? p.old_price
            })));
        }
    };

    useEffect(() => {
        shopProducts();
    }, []);

    return (
        <div className="mx-auto container py-8 md:py-12 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
                {products.map((p, index) => {
                    const isFirst = index === 0;
                    const isInWishlist = wishlist.some((item) => item.id === p.id);

                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={p.id}
                            className={`relative group bg-white p-6 transition-all duration-500 hover:z-20
                                ${isFirst
                                    ? "lg:col-span-2 lg:row-span-2 border-b sm:border-r border-gray-100"
                                    : "border-b border-r border-gray-100 hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]"
                                }`}
                        >
                            {/* Badge Qismi */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                {p.badge && (
                                    <span className="bg-[#EFD33D] text-[#191C1F] text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                                        {p.badge}
                                    </span>
                                )}
                                {p.hot && (
                                    <span className="bg-[#EE5858] text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                                        HOT
                                    </span>
                                )}
                            </div>

                            {/* Mahsulot Rasmi */}
                            <div className={`relative flex items-center justify-center mb-6 overflow-hidden ${isFirst ? "h-64 md:h-80 lg:h-96" : "h-40 md:h-48"}`}>
                                <motion.img
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.5 }}
                                    src={p.image}
                                    alt={p.title[lang]}
                                    className="max-h-full object-contain w-auto drop-shadow-xl"
                                />

                                {/* Kichik kartochkalar uchun Hover Actionlar */}
                                {!isFirst && (
                                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/40 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => toggleWishlist?.(p)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 ${isInWishlist ? 'bg-[#FA8232] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                                        </button>
                                        <button
                                            onClick={() => addToCart(p)}
                                            className="w-10 h-10 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-orange-600 transition-all"
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleQuickView(p)}
                                            className="w-10 h-10 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-gray-50 transition-all"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Ma'lumotlar Qismi */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-1.5 text-[#FA8232]">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={isFirst ? 16 : 12} fill={i < p.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                                    ))}
                                    <span className="text-gray-400 text-xs font-medium">({p.reviews})</span>
                                </div>

                                <h3 className={`font-bold leading-tight group-hover:text-[#2DA5F3] transition-colors line-clamp-2 ${isFirst ? "text-xl md:text-2xl text-[#191C1F]" : "text-sm text-[#475156]"}`}>
                                    {p.title[lang]}
                                </h3>

                                <div className="flex items-center gap-3">
                                    <span className={`font-black text-[#2DA5F3] ${isFirst ? "text-2xl" : "text-base"}`}>
                                        ${p.price}
                                    </span>
                                    {p.oldPrice && (
                                        <span className="text-gray-400 line-through text-sm font-medium italic">
                                            ${p.oldPrice}
                                        </span>
                                    )}
                                </div>

                                {isFirst && (
                                    <div className="pt-4 border-t border-gray-50 mt-4 space-y-4">
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 italic">
                                            {p.description}
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => addToCart(p)}
                                                className="flex-1 bg-[#FA8232] text-white font-black py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                                            >
                                                <ShoppingCart size={20} /> Add to Cart
                                            </button>
                                            <button
                                                onClick={() => toggleWishlist?.(p)}
                                                className={`p-4 rounded-xl border transition-all ${isInWishlist ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => {
                    setIsQuickViewOpen(false);
                    setSelectedProduct(null);
                }}
                addToCart={addToCart}
            />
        </div>
    );
};

export default ShopPage;