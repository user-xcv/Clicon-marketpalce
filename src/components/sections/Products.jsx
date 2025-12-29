import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ShopPage from './ShopPage';
import { motion } from 'framer-motion';

const Products = ({ addToCart, toggleWishlist, wishlist }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const deadline = new Date('2026-01-02T00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance <= 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNum = (num) => (num < 10 ? `0${num}` : num);

    // Countdown Unit komponenti (Kod takrorlanishini oldini olish uchun)
    const CountdownUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-[#F3DE6D] text-[#191C1F] font-black text-sm md:text-xl px-2 md:px-3 py-1 rounded-lg min-w-[40px] md:min-w-[55px] text-center shadow-sm">
                {formatNum(value)}
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mt-1 tracking-tighter">
                {label}
            </span>
        </div>
    );

    return (
        <>
            <section className='py-12 md:py-16 bg-white'>
                <div className="mx-auto container px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center pb-8 border-b border-gray-100 gap-8">

                        {/* Header & Timer Section */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full lg:w-auto">
                            <div className="space-y-1">
                                <h2 className='text-[#191C1F] text-2xl md:text-3xl font-black tracking-tight'>
                                    {t('bestDeals')}
                                </h2>
                                <p className='text-gray-400 text-sm font-medium'>
                                    {t('dealsEndsIn')}
                                </p>
                            </div>

                            {/* Modern Countdown */}
                            <div className="flex items-start gap-2 md:gap-3">
                                <CountdownUnit value={timeLeft.days} label="days" />
                                <span className="text-xl font-bold pt-1 text-gray-300">:</span>
                                <CountdownUnit value={timeLeft.hours} label="hours" />
                                <span className="text-xl font-bold pt-1 text-gray-300">:</span>
                                <CountdownUnit value={timeLeft.minutes} label="mins" />
                                <span className="text-xl font-bold pt-1 text-gray-300">:</span>
                                <CountdownUnit value={timeLeft.seconds} label="secs" />
                            </div>
                        </div>

                        {/* Link to Shop */}
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-[#2DA5F3] font-black text-sm md:text-base group cursor-pointer"
                        >
                            <span>{t('browseAllProducts')}</span>
                            <div className="p-1.5 rounded-full bg-blue-50 group-hover:bg-[#2DA5F3] group-hover:text-white transition-all">
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mahsulotlar Ro'yxati */}
            <ShopPage addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
        </>
    );
};

export default Products;