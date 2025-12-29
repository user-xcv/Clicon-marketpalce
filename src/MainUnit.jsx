import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Komponentlarni import qilishda yo'llarni tekshiring!
import ShopHero from "./components/head/ShopHero";
import Products from "./components/sections/Products";
import Category from './components/sections/Category';
import Featured from "./components/sections/Feutured";
import Accessories from "./components/sections/Accessories";
import LatestNews from "./components/sections/LatestNews";
import Newsletter from "./components/sections/Newsletter"; // <--- BU IMPORTNI TEKSHIRING

const MainUnit = ({ addToCart, toggleWishlist, wishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // MUHIM: Fayl yo'lini '/data/product.json' qiling (nuqtasiz boshida)
        // Agar data papkasi 'public' ichida bo'lsa
        fetch("./data/product.json")
            .then((res) => {
                if (!res.ok) throw new Error("JSON topilmadi");
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Xatolik:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#FA8232]"></div>
        </div>
    );

    const mackPro = {
        id: "mack-pro-promo", // ID qo'shish kerak
        title: "Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage",
        price: 199,
        name: "Macbook Pro",
        image: "./imgs/Image (60).png",
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ShopHero addToCart={addToCart} product={products} />

            <Products
                products={products}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
            />

            <Category />

            <Featured
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
            />

            <Accessories
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
            />

            {/* PROMO SECTION */}
            <div className="container mx-auto px-6 my-20">
                <div className="flex flex-col lg:flex-row items-center justify-between bg-[#FFE7D6] rounded-[32px] p-10 gap-8 overflow-hidden">
                    <div className="flex flex-col gap-6 w-full lg:w-1/2">
                        <span className="bg-[#2DA5F3] text-white font-bold py-1 px-4 rounded-md w-fit text-sm">
                            SAVE UP TO $200.00
                        </span>
                        <h2 className="font-black text-4xl text-[#191C1F]">{mackPro.name}</h2>
                        <p className="text-xl text-[#191C1F] opacity-80">{mackPro.title}</p>
                        <button
                            onClick={() => addToCart(mackPro)}
                            className="bg-[#FA8232] text-white px-10 py-4 rounded-xl font-bold w-fit hover:scale-105 transition-transform"
                        >
                            SHOP NOW
                        </button>
                    </div>

                    <div className="relative w-full lg:w-1/2 flex justify-center">
                        <img src={mackPro.image} alt={mackPro.name} className="max-w-[400px] w-full object-contain" />
                        <div className="absolute top-0 right-0 bg-[#FFCEAD] border-4 border-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg shadow-xl">
                            ${mackPro.price}
                        </div>
                    </div>
                </div>
            </div>

            <LatestNews />
            <Newsletter />
        </motion.div>
    );
};

export default MainUnit;