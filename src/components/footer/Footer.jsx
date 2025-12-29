import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
    const popularTags = [
        "Game", "iPhone", "TV", "Asus Laptops", "Macbook",
        "SSD", "Graphics Card", "Power Bank", "Smart TV",
        "Speaker", "Tablet", "Microwave", "Samsung"
    ];

    return (
        <footer className="bg-[#191C1F] text-[#929FA5] pt-12 md:pt-20 pb-8 md:pb-10 font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 border-b border-[#2F3337] pb-12 md:pb-16">

                    {/* 1. Logo va Kontakt */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FA8232] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg md:text-xl">C</span>
                            </div>
                            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight uppercase">Clicon</h2>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs md:text-sm text-[#77878F]">Customer Supports:</p>
                            <p className="text-white text-base md:text-lg font-medium">(629) 555-0129</p>
                        </div>
                        <p className="mt-3 md:mt-4 text-xs md:text-sm leading-relaxed max-w-62">
                            4517 Washington Ave. Manchester, Kentucky 39495
                        </p>
                        <p className="mt-2 text-white font-medium hover:underline cursor-pointer transition-all text-xs md:text-base">info@kinbo.com</p>
                    </div>

                    {/* 2. Top Category (Sariq hover chiziq bilan) */}
                    <div>
                        <h3 className="text-white font-bold uppercase text-xs md:text-sm mb-4 md:mb-6">Top Category</h3>
                        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                            {["Computer & Laptop", "SmartPhone", "Headphone", "Accessories", "Camera & Photo", "TV & Homes"].map((cat) => (
                                <li key={cat} className="relative flex items-center group cursor-pointer">
                                    {/* Sariq chiziq - Hover bo'lganda paydo bo'ladi */}
                                    <span className="absolute left-0 w-0 h-0.5 bg-[#EEBB2C] transition-all duration-300 group-hover:w-4 md:group-hover:w-6"></span>
                                    {/* Matn - Hover bo'lganda o'ngga suriladi va rangi oq bo'ladi */}
                                    <span className="transition-all duration-300 group-hover:pl-4 md:group-hover:pl-8 group-hover:text-white">
                                        {cat}
                                    </span>
                                </li>
                            ))}
                            <li className="mt-2 md:mt-4">
                                <button className="text-[#EEBB2C] font-bold flex items-center gap-2 hover:gap-3 transition-all group text-xs md:text-sm">
                                    Browse All Product
                                    <ArrowRight size={14} md:size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Quick Links */}
                    <div>
                        <h3 className="text-white font-bold uppercase text-xs md:text-sm mb-4 md:mb-6">Quick Links</h3>
                        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                            {["Shop Product", "Shoping Cart", "Wishlist", "Compare", "Track Order", "Customer Help", "About Us"].map((link) => (
                                <li key={link} className="hover:text-white cursor-pointer transition-colors w-fit">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Download App */}
                    <div>
                        <h3 className="text-white font-bold uppercase text-xs md:text-sm mb-4 md:mb-6">Download App</h3>
                        <div className="space-y-2 md:space-y-3">
                            <div className="bg-[#2F3337] w-40 md:w-50 p-2 rounded-sm flex items-center gap-3 md:gap-4 cursor-pointer hover:bg-[#3d4247] transition-all border border-transparent hover:border-[#4b5157]">
                                <img src="/imgs/googleplay.png" alt="" className="w-6 h-6 md:w-8 md:h-8 opacity-90" />
                                <div>
                                    <p className="text-[8px] md:text-[10px] text-[#929FA5] uppercase">Get it now</p>
                                    <p className="text-white font-bold text-xs md:text-sm">Google Play</p>
                                </div>
                            </div>
                            <div className="bg-[#2F3337] w-40 md:w-50 p-2 rounded-sm flex items-center gap-3 md:gap-4 cursor-pointer hover:bg-[#3d4247] transition-all border border-transparent hover:border-[#4b5157]">
                                <img src="/imgs/iphone.png" alt="" className="w-6 h-6 md:w-8 md:h-8 opacity-90" />
                                <div>
                                    <p className="text-[8px] md:text-[10px] text-[#929FA5] uppercase">Get it now</p>
                                    <p className="text-white font-bold text-xs md:text-sm">App Store</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Popular Tag (Hoverda oq chegara bilan) */}
                    <div className="lg:col-span-1">
                        <h3 className="text-white font-bold uppercase text-xs md:text-sm mb-4 md:mb-6">Popular Tag</h3>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                            {popularTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 md:px-3 md:py-2 border border-[#2F3337] text-[10px] md:text-xs font-medium text-[#929FA5] cursor-pointer rounded-sm transition-all duration-200 hover:border-white hover:text-white hover:bg-[#2F3337]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 md:mt-10 text-center text-xs md:text-sm text-[#77878F]">
                    <p>Kinbo - eCommerce Template © 2025. Design by Mubashshir</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;