import { Heart, ShoppingCart, Eye, Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../others/supabase";
import { useTranslation } from "react-i18next";
import QuickViewModal from "../others/QuickViewModal";
import { motion, AnimatePresence } from "framer-motion";

const Featured = ({ addToCart, toggleWishlist, wishlist = [] }) => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('*').eq('main_type', 'featured');
            setProducts((data || []).map(p => ({ ...p, oldPrice: p.oldPrice ?? p.old_price })));
        };
        fetchProducts();
    }, []);

    const filterOptions = [
        { id: 'all', label: t('allProductFilter') },
        { id: 'phone', label: 'Phones' },
        { id: 'laptop', label: 'Laptops' },
        { id: 'headphone', label: 'Audio' }
    ];

    const filteredItems = filterType === 'all' ? products : products.filter(item => item.type === filterType);

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* --- HEADER: Juda toza va havodor --- */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <h2 className="text-4xl font-black text-[#191C1F] tracking-tight">
                        {t('featuredProducts')}
                    </h2>

                    {/* Filtrlarni markazga olish va skrolbarni yashirish */}
                    <div className="flex overflow-x-auto no-scrollbar gap-3 p-1 max-w-full">
                        {filterOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setFilterType(opt.id)}
                                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-500 whitespace-nowrap
                                    ${filterType === opt.id
                                        ? "bg-[#1B6392] text-white shadow-2xl shadow-blue-200 scale-105"
                                        : "bg-[#F5F6F7] text-[#5F6C72] hover:bg-gray-200"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">

                    {/* --- PROMO BANNER: Apple reklamasi kabi --- */}
                    <div className="xl:col-span-1">
                        <div className="bg-[#121212] rounded-[40px] p-10 h-full min-h-[500px] flex flex-col justify-between relative group overflow-hidden">
                            <div className="z-10 space-y-4">
                                <p className="text-[#FA8232] font-black tracking-[4px] text-xs uppercase">Special offer</p>
                                <h3 className="text-white text-4xl font-black leading-tight">32% OFF</h3>
                                <p className="text-gray-400 text-lg">Premium Sound Experience</p>
                            </div>

                            <button className="z-10 w-fit bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#FA8232] hover:text-white transition-all duration-500 active:scale-95">
                                SHOP NOW <ArrowRight size={20} />
                            </button>

                            {/* Fon uchun rasm animatsiyasi */}
                            <img
                                src="./imgs/Image.jpg"
                                alt="promo"
                                className="absolute bottom-[-10%] right-[-10%] w-[120%] opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 object-contain"
                            />
                        </div>
                    </div>

                    {/* --- PRODUCT GRID --- */}
                    <div className="xl:col-span-3">
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item) => {
                                    const isInWishlist = wishlist.some(w => w.id === item.id);
                                    return (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="group relative flex flex-col"
                                            key={item.id}
                                        >
                                            {/* Rasm maydoni: Glassmorphism effekti bilan */}
                                            <div className="relative aspect-square bg-[#F5F6F7] rounded-[40px] p-10 mb-6 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:bg-white border border-transparent group-hover:border-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.title?.[lang]}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                                />

                                                {/* Hoverda chiqadigan tugmalar (Glass effect) */}
                                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-[2px]">
                                                    <button onClick={() => toggleWishlist?.(item)} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-50 transition-all active:scale-90">
                                                        <Heart size={22} className={isInWishlist ? "text-red-500 fill-current" : "text-gray-900"} />
                                                    </button>
                                                    <button onClick={() => setSelectedProduct(item) || setIsQuickViewOpen(true)} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-50 transition-all active:scale-90 text-gray-900">
                                                        <Eye size={22} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Ma'lumotlar maydoni */}
                                            <div className="px-2 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex text-[#FFAD33]"><Star size={14} fill="currentColor" /></div>
                                                    <span className="text-xs font-bold text-gray-400">({item.reviews} reviews)</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-[#191C1F] group-hover:text-[#1B6392] transition-colors line-clamp-1">
                                                    {item.title?.[lang] || item.title?.en}
                                                </h3>
                                                <div className="flex items-center justify-between pt-2">
                                                    <span className="text-2xl font-black text-[#1B6392]">${item.price}</span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="bg-[#FA8232] text-white p-4 rounded-2xl hover:bg-black transition-all duration-500 shadow-lg shadow-orange-100 active:scale-90"
                                                    >
                                                        <ShoppingCart size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
                addToCart={addToCart}
            />
        </section>
    );
};

export default Featured;