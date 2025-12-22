import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ShopBtn from '../buttons/ShopBtn';

const slideVariants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction < 0 ? 50 : -50 })
};

const ShopHero = ({ addToCart }) => {
    const { t } = useTranslation();
    const [slides, setSlides] = useState([]);
    const [[index, direction], setIndex] = useState([0, 1]);

    useEffect(() => {
        fetch('../data/hero.json')
            .then(res => res.json())
            .then(setSlides)
            .catch(err => console.error("JSON Error:", err));
    }, []);

    useEffect(() => {
        if (slides.length < 2) return;
        const timer = setInterval(() => setIndex(([p]) => [(p + 1) % slides.length, 1]), 4500);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleAdd = useCallback((prod) => {
        addToCart({ ...prod, quantity: 1 });
    }, [addToCart]);

    if (!slides.length) return <div className="h-[550px] bg-gray-100 animate-pulse rounded-lg container mx-auto mt-6" />;

    const current = slides[index];

    return (
        <header className="container mx-auto py-6 px-4">
            <div className="flex flex-col lg:flex-row gap-5 h-full">

                {/* 1. KATTA ASOSIY BANNER (LEFT) */}
                <div className={`relative flex-1 lg:flex-[3] rounded-lg overflow-hidden min-h-[500px] flex items-center px-8 md:px-16 transition-colors duration-700 ${current.bgColor}`}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="flex flex-col md:flex-row items-center justify-between w-full"
                        >
                            <div className="z-10 text-center md:text-left space-y-4 max-w-md">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <span className="w-10 h-[2px] bg-[#2DA5F3]"></span>
                                    <p className="text-[#2DA5F3] font-semibold text-sm uppercase tracking-wider">
                                        {t(`${current.key}.subtitle`)}
                                    </p>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#191C1F] leading-[1.1]">
                                    {t(`${current.key}.title`)}
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    {t(`${current.key}.desc`)}
                                </p>
                                <div className="pt-4">
                                    <ShopBtn
                                        className="bg-[#FA8232] text-white w-2/4 py-4  font-bold rounded-md hover:brightness-110 transition-all flex items-center gap-3"
                                        onClick={() => handleAdd({ id: current.id, title: t(`${current.key}.title`), price: current.price, image: current.image })}
                                    />
                                </div>
                            </div>

                            <div className="relative mt-8 md:mt-0">
                                <img src={current.image} alt="Hero" className="w-72 h-72 md:w-[400px] md:h-[400px] object-contain" />
                                <div className="absolute top-0 right-0 bg-[#2DA5F3] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 border-white font-bold shadow-lg">
                                    <span className="text-[12px] opacity-90">SALE</span>
                                    <span className="text-2xl">${current.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots */}
                    <div className="absolute bottom-8 left-8 md:left-16 flex gap-2">
                        {slides.map((_, i) => (
                            <button key={i} onClick={() => setIndex([i, i > index ? 1 : -1])}
                                className={`h-2 rounded-full transition-all ${i === index ? 'w-10 bg-[#191C1F]' : 'w-2 bg-gray-400 opacity-50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* 2. O'NG TARAFI (RIGHT CARDS) */}
                <div className="flex flex-col gap-5 lg:flex-[2]">

                    {/* Google Pixel Banner */}
                    <div className=" bg-[#191C1F] rounded-lg p-8 flex flex-row items-center justify-between group overflow-hidden h-full relative border border-transparent hover:border-orange-400 transition-all">
                        <div className="z-10">
                            <span className="text-xs font-bold text-[#EBC80C] uppercase">{t('pixel.firstP')}</span>
                            <h3 className="text-2xl font-bold mt-2 mb-4 leading-tight text-white">{t('pixel.firsth3')}</h3>
                            <ShopBtn
                                className="bg-[#FA8232] text-white py-3 px-2 text-xs uppercase font-bold rounded w-2/3"
                                onClick={() => handleAdd({ id: 'pix-6', title: t('pixel.firsth3'), price: 899, image: "/imgs/pixel.png" })}
                            />
                        </div>
                        <img src="/imgs/pixel.png" alt="Pixel" className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Buds/Other Banner */}
                    <div className="bg-[#F2F4F5] rounded-lg p-8 flex flex-row items-center justify-between group overflow-hidden h-full relative border border-transparent hover:border-blue-400 transition-all">
                        <div className="z-10 text-white">
                            <h3 className="text-2xl font-bold mb-1 leading-tight text-black">{t('buds.firsth3')}</h3>
                            <p className="text-[#2DA5F3] font-bold text-xl mb-4">$299.00 USD</p>
                            <ShopBtn
                                className="bg-[#FA8232] text-white py-3 px-2 w-2/3 text-xs uppercase font-bold rounded"
                                onClick={() => handleAdd({ id: 'buds-pr', title: t('buds.firsth3'), price: 299, image: "/imgs/buds.png" })}
                            />
                        </div>
                        <img src="/imgs/buds.png" alt="Buds" className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>

                </div>
            </div>
        </header>
    );
};

export default ShopHero;