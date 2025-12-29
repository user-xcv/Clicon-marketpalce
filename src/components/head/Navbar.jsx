import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
    ChevronDown, Headphones, Heart, MapPin, PhoneCall,
    Search, ShoppingCartIcon, User, X, Menu, LogOut,
    ShoppingBag, Globe, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../others/supabase';

// Cart prop-ni default qiymatini [] qilib belgilaymiz, aks holda .reduce xato beradi
const Navbar = ({ cart = [], wishlist = [] }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user_data')) || null);
    const [activeModal, setActiveModal] = useState(null);

    // Savatdagi mahsulotlar soni
    const cartCount = cart.length;

    useEffect(() => { setActiveModal(null); }, [location]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) localStorage.setItem('user_data', JSON.stringify(session.user));
            else localStorage.removeItem('user_data');
        });
        return () => subscription.unsubscribe();
    }, []);

    // Savatdagi umumiy summani hisoblash
    const totalPrice = cart.reduce((acc, item) => {
        const price = parseFloat(item.price?.toString().replace('$', '') || 0);
        return acc + price * (item.quantity || 1);
    }, 0);

    return (
        <header className="w-full z-[100] relative font-sans bg-[#1B6392]">
            {/* 1. TOP BAR */}
            <div className="hidden lg:block border-b border-white/10 py-2.5">
                <div className="container mx-auto px-6 flex justify-between items-center text-[12px] text-white/70">
                    <p>Welcome to Clicon online eCommerce store.</p>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 border-r border-white/20 pr-6 uppercase font-medium tracking-wider">
                            <button onClick={() => i18n.changeLanguage('uz')} className="hover:text-white transition-colors">UZ</button>
                            <button onClick={() => i18n.changeLanguage('en')} className="hover:text-white transition-colors">EN</button>
                            <button onClick={() => i18n.changeLanguage('ru')} className="hover:text-white transition-colors">RU</button>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-white">
                            <PhoneCall size={14} className="text-orange-400" />
                            <span>+1-202-555-0104</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN NAV */}
            <div className="py-4 lg:py-6">
                <div className="container mx-auto px-6 flex items-center justify-between gap-8">
                    <button className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors" onClick={() => setActiveModal('mobileMenu')}>
                        <Menu size={28} />
                    </button>

                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-white p-2 rounded-xl transition-transform group-hover:scale-105 shadow-lg shadow-black/10">
                            <img src="./icons/Icon (1).png" alt="Logo" className="w-6 h-6" />
                        </div>
                        <span className="font-extrabold text-2xl text-white tracking-tight">CLICON</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-2xl relative group">
                        <input
                            type="text"
                            placeholder="Search for hardware..."
                            className="w-full bg-white/10 text-white placeholder:text-white/50 py-3.5 px-6 pr-12 rounded-xl outline-none border border-transparent focus:border-white/30 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white">
                            <Search size={20} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 lg:gap-7 text-white">
                        <Link to="/wishlist" className="relative hover:scale-110 transition-transform hidden sm:block">
                            <Heart size={26} className={wishlist.length > 0 ? "fill-orange-500 text-orange-500 border-none" : ""} />
                            {wishlist.length > 0 && <Badge count={wishlist.length} />}
                        </Link>

                        <button onClick={() => setActiveModal('cart')} className="relative hover:scale-110 transition-transform">
                            <ShoppingBag size={26} />
                            {cartCount > 0 && <Badge count={cartCount} color="bg-orange-500" />}
                        </button>

                        <button onClick={() => navigate('/profile')} className="hidden lg:flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/5">
                            <User size={20} />
                            <span className="text-sm font-semibold">{user ? 'Profile' : 'Sign In'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}
            <AnimatePresence>
                {activeModal === 'mobileMenu' && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-md" />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[160] p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-10">
                                <span className="font-black text-2xl text-[#1B6392]">CLICON</span>
                                <button onClick={() => setActiveModal(null)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <MobileNavItem to="/" label="Home" icon={<ShoppingBag size={20} />} />
                                <MobileNavItem to="/shop" label="Products" icon={<Menu size={20} />} />
                                <MobileNavItem to="/profile" label={user ? "Profile" : "Account"} icon={<User size={20} />} />
                            </nav>
                        </motion.div>
                    </>
                )}

                {activeModal === 'cart' && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-black/40 z-[150] backdrop-blur-sm" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-[160] shadow-2xl flex flex-col">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">Shopping Cart ({cartCount})</h3>
                                <button onClick={() => setActiveModal(null)}><X size={20} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length > 0 ? cart.map((item, idx) => (
                                    <div key={item.id || idx} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-contain" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold line-clamp-1">{item.title || item.name}</h4>
                                            <p className="text-gray-500 text-xs">{item.quantity} x {item.price}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                        <ShoppingBag size={64} className="mb-4" />
                                        <p className="font-bold">Your cart is empty</p>
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t space-y-4">
                                    <div className="flex justify-between items-center text-xl font-black">
                                        <span className="text-gray-500 text-sm">Subtotal</span>
                                        <span className="text-[#1B6392]">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button onClick={() => navigate('/shoppingcart')} className="w-full bg-[#FA8232] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                                        View Cart <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

const Badge = ({ count, color = "bg-orange-500" }) => (
    <span className={`absolute -top-2 -right-2 ${color} text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1B6392] font-black`}>
        {count}
    </span>
);

const MobileNavItem = ({ to, label, icon }) => (
    <Link to={to} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold">
        <span className="text-gray-400">{icon}</span>
        {label}
    </Link>
);

export default Navbar;