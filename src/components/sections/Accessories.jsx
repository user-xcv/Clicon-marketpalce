import { Heart, ShoppingCart, Eye, Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import ShopBtn from "../buttons/ShopBtn";
import QuickViewModal from "../others/QuickViewModal";
import { supabase } from "../others/supabase";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Accessories = ({ addToCart, toggleWishlist, wishlist = [] }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const [filterType, setFilterType] = useState("all");
    const [items, setItems] = useState([]);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq('accessiors', 'accessior')
            .order("id", { ascending: true });

        if (error) console.error("Xatolik:", error);
        else setItems(data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredItems = filterType === "all"
        ? items
        : items.filter((item) => item.type === filterType);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* ASOSIY QISM */}
                    <div className="flex-1">
                        {/* HEADER & FILTER */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                                {t("computerAccessories")}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 md:gap-6 overflow-x-auto no-scrollbar py-2">
                                {["all", "keyboard", "headphone", "webcam", "printer"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all
                                            ${filterType === type
                                                ? "bg-[#1B6392] text-white shadow-lg shadow-blue-100"
                                                : "text-gray-400 hover:text-gray-900"}`}
                                    >
                                        {type === "all" ? t("allProductFilter") : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* PRODUCT GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredItems.map((item) => {
                                const isInWishlist = wishlist?.some((w) => w.id === item.id);

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={item.id}
                                        className="group bg-white rounded-2xl border border-gray-100 p-4 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500"
                                    >
                                        {/* Image Box */}
                                        <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 p-6 flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.title?.[lang]}
                                                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />

                                            {/* Badge */}
                                            {item.badge && (
                                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider
                                                        ${item.badge.includes("OFF") ? "bg-[#FA8232] text-white" : "bg-[#2DA5F3] text-white"}`}>
                                                        {item.badge}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Floating Actions */}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                                <button onClick={() => toggleWishlist(item)}
                                                    className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-all ${isInWishlist ? "text-red-500" : "text-gray-900"}`}>
                                                    <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                                                </button>
                                                <button onClick={() => addToCart(item)}
                                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-all text-gray-900 hover:bg-[#FA8232] hover:text-white">
                                                    <ShoppingCart size={18} />
                                                </button>
                                                <button onClick={() => handleQuickView(item)}
                                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-all text-gray-900">
                                                    <Eye size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-1 px-1">
                                            <div className="flex items-center gap-1 text-orange-400">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-[12px] font-bold text-gray-700">{item.rating || "4.5"}</span>
                                            </div>

                                            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-[#1B6392] transition-colors">
                                                {item.title?.[lang] || item.title}
                                            </h3>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[#1B6392] font-black text-lg">${item.price}</span>
                                                    {item.oldPrice && (
                                                        <span className="text-gray-400 text-xs line-through">${item.oldPrice}</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="bg-gray-100 p-2 rounded-lg group-hover:bg-[#FA8232] group-hover:text-white transition-all active:scale-90"
                                                >
                                                    <ShoppingCart size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SIDEBAR AD BANNER */}
                    <div className="lg:w-[320px] shrink-0">
                        <div className="sticky top-24 bg-[#F2F4F5] rounded-[32px] p-10 overflow-hidden relative group">
                            {/* Orqa fon dekoratsiyasi */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10 text-center flex flex-col items-center">
                                <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[2px] mb-6 shadow-lg shadow-orange-200">
                                    Flash Deal
                                </span>
                                <img src="./imgs/Image (59).png" alt="Earbuds" className="w-52 h-52 object-contain mb-8 group-hover:rotate-12 transition-transform duration-500" />
                                <h4 className="text-2xl font-black text-gray-900 leading-tight mb-4">
                                    Xiaomi True Wireless Earbuds
                                </h4>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed px-4">
                                    Experience pure sound with noise cancelling magic.
                                </p>

                                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm mb-8">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Only for</p>
                                    <p className="text-3xl font-black text-[#1B6392]">$299.00</p>
                                </div>

                                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#FA8232] transition-all group/btn">
                                    Shop Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
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
        </section>
    );
};

export default Accessories;