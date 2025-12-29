import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '../others/supabase';
import ShopBtn from '../buttons/ShopBtn';

const slideVariants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 100 : -100 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction < 0 ? 100 : -100 })
};

const ShopHero = ({ addToCart }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language || 'en';
    const [slides, setSlides] = useState([]);
    const [[index, direction], setIndex] = useState([0, 1]);

    const fetchHeroProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('type', 'console');

        if (error) {
            console.error('Serverda xatolik:', error.message);
        } else if (data) {
            const formattedData = data.map((prod, i) => ({
                ...prod,
                bgColor: i % 2 === 0 ? 'bg-[#F2F4F5]' : 'bg-[#E3F2FD]'
            }));
            setSlides(formattedData);
        }
    };

    useEffect(() => { fetchHeroProducts(); }, []);

    useEffect(() => {
        if (slides.length < 2) return;
        const timer = setInterval(() => {
            setIndex(([p]) => [(p + 1) % slides.length, 1]);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleAdd = useCallback((prod) => {
        const titleForCart = prod.title?.[lang] || prod.title;
        addToCart({ ...prod, title: titleForCart, quantity: 1 });
    }, [addToCart, lang]);

    if (slides.length === 0) {
        return <div className="container mx-auto mt-6 h-[500px] bg-gray-100 animate-pulse rounded-xl" />;
    }

    const current = slides[index];

    return (
        <section className="container mx-auto px-4 py-6">
            {/* Grid Tizimi: Mobil 1 ustun, LG ekran 5 ustun */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[500px] lg:h-[560px]">

                {/* ASOSIY SLIDER (LG ekranda 3 ustunni egallaydi) */}
                <div className={`relative lg:col-span-3 rounded-2xl overflow-hidden flex items-center transition-colors duration-700 p-6 md:p-12 lg:px-16 ${current.bgColor}`}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-8"
                        >
                            {/* Matn qismi */}
                            <div className="order-2 md:order-1 text-center md:text-left space-y-4">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <span className="w-10 h-[2px] bg-[#2DA5F3]"></span>
                                    <p className="text-[#2DA5F3] font-bold text-xs uppercase tracking-widest">
                                        {current.subtitle?.[lang] || current.subtitle || "New Arrival"}
                                    </p>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#191C1F] leading-tight">
                                    {current.title?.[lang] || current.title}
                                </h1>
                                <p className="text-gray-600 text-base md:text-lg max-w-sm mx-auto md:mx-0">
                                    {current.extra_title?.[lang] || current.extra_title || "Experience next-gen gaming with the latest technology."}
                                </p>
                                <div className="pt-4">
                                    <ShopBtn
                                        className="bg-[#FA8232] text-white px-10 py-4 font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-200"
                                        onClick={() => handleAdd(current)}
                                    />
                                </div>
                            </div>

                            {/* Rasm qismi */}
                            <div className="order-1 md:order-2 relative flex justify-center">
                                <motion.img
                                    initial={{ scale: 0.8, rotate: -5 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    src={current.image}
                                    alt="console"
                                    className="w-56 h-56 md:w-full md:h-full max-h-[350px] object-contain drop-shadow-2xl"
                                />
                                <div className="absolute -top-4 -right-4 bg-[#2DA5F3] text-white w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-4 border-white font-black shadow-xl">
                                    <span className="text-[10px] md:text-xs">ONLY</span>
                                    <span className="text-lg md:text-2xl">${current.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination - Nuqtalar */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex([i, i > index ? 1 : -1])}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-[#191C1F]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* O'NG TARAFI - KICHIK BANNERLAR (LG ekranda 2 ustunni egallaydi) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-2 gap-6">
                    <BannerCard
                        title="Google Pixel 6"
                        subtitle="Summer Sale"
                        img="/imgs/pixel.png"
                        bgColor="bg-[#191C1F]"
                        textColor="text-white"
                        onAdd={() => handleAdd({ id: 'px6', title: 'Pixel 6', price: 899, image: '/imgs/pixel.png' })}
                    />
                    <BannerCard
                        title="Xiaomi Buds"
                        subtitle="Limited Edition"
                        img="/imgs/buds.png"
                        bgColor="bg-[#F2F4F5]"
                        textColor="text-black"
                        onAdd={() => handleAdd({ id: 'buds', title: 'Xiaomi Buds', price: 299, image: '/imgs/buds.png' })}
                    />
                </div>
            </div>
        </section>
    );
};

const BannerCard = ({ title, subtitle, img, bgColor, textColor, onAdd }) => (
    <div className={`${bgColor} rounded-2xl p-6 md:p-8 flex items-center justify-between group overflow-hidden relative border border-transparent hover:border-orange-400 transition-all duration-300 shadow-sm`}>
        <div className="z-10 flex-[1.5] space-y-2">
            <span className="text-[10px] font-extrabold text-[#EBC80C] uppercase tracking-tighter">{subtitle}</span>
            <h3 className={`text-xl md:text-2xl font-bold leading-tight ${textColor}`}>{title}</h3>
            <div className="pt-2">
                <button
                    onClick={onAdd}
                    className="bg-[#FA8232] text-white py-2.5 px-6 text-xs uppercase font-bold rounded-md hover:brightness-110 transition-all flex items-center gap-2"
                >
                    Shop Now
                </button>
            </div>
        </div>
        <div className="flex-1 flex justify-end">
            <img
                src={img}
                alt={title}
                className="w-24 h-24 md:w-32 md:h-32 object-contain group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
            />
        </div>
    </div>
);

export default ShopHero;