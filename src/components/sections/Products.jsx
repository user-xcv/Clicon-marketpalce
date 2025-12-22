import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ShopPage from './ShopPage';

const Products = ({ addToCart, products }) => {
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

    return (
        <>
            <section className='py-10'>
                <div className="mx-auto container">
                    <div className="flex justify-between items-center pb-4">
                        <div className="flex items-center gap-4">
                            <p className='text-[#191C1F] text-xl font-semibold'>Best Deals</p>
                            <p className='text-[#475156]'>Deals ends in:</p>

                            <div className="flex gap-2 text-lg font-mono bg-[#F3DE6D] px-3 py-1 rounded">
                                <span>{formatNum(timeLeft.days)}d</span> :
                                <span>{formatNum(timeLeft.hours)}h</span> :
                                <span>{formatNum(timeLeft.minutes)}m</span> :
                                <span>{formatNum(timeLeft.seconds)}s</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#2DA5F3] font-semibold group hover:bg-blue-50 p-2 px-4 rounded-lg cursor-pointer transition-all" >
                            Browse All Product
                            <ArrowRight size={20} className='transition-transform duration-150 group-hover:translate-x-1' />
                        </div>
                    </div>
                </div>
            </section>

            <ShopPage addToCart={addToCart} products={products} />
        </>
    );
};

export default Products;