import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useEffect, useState } from "react";
import ShopBtn from "../buttons/ShopBtn";
import { supabase } from "../others/supabase";
const Featured = ({ addToCart }) => {
    // 2. Mahsulotlar uchun state yarating
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState('all');

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('main_type', 'featured')
            .order('id', { ascending: true });


        if (error) {
            console.log('Error fetching data ', error);
        } else {
            setProducts(data || []);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    // 3. "items" o'rniga "products" dan foydalaning
    const filteredItems = filterType === 'all'
        ? products
        : products.filter(item => item.type === filterType);

    return (
        <div className="mx-auto container py-10">
            <div className="flex justify-between items-center mb-6">
                <span className="text-[#191C1F] text-2xl font-semibold">Featured Products</span>
                <div className="flex items-center gap-4 text-sm">
                    {/* Faol filtrlarni vizual ajratish uchun style qo'shish tavsiya etiladi */}
                    <p
                        className={`cursor-pointer ${filterType === 'all' ? 'border-b-2 border-[#FA8232] text-black font-semibold' : 'text-[#5F6C72]'}`}
                        onClick={() => setFilterType('all')}
                    >
                        All Product
                    </p>
                    <p
                        className={`cursor-pointer hover:text-black ${filterType === 'phone' ? 'border-b-2 border-[#FA8232] text-black font-semibold' : 'text-[#5F6C72]'}`}
                        onClick={() => setFilterType('phone')}
                    >
                        Smart Phone
                    </p>
                    <p className="text-[#5F6C72] hover:text-black hover:border-b-2 border-[#FA8232] cursor-pointer" onClick={() => setFilterType('laptop')}>Laptop</p>
                    <p className="text-[#5F6C72] hover:text-black hover:border-b-2 border-[#FA8232] cursor-pointer" onClick={() => setFilterType('headphone')}>Headphone</p>
                    <p className="text-[#5F6C72] hover:text-black hover:border-b-2 border-[#FA8232] cursor-pointer" onClick={() => setFilterType('tv')}>TV</p>
                </div>
            </div>

            <div className="flex gap-5">
                {/* Banner qismi */}
                <div className="bg-[#F3DE6D] w-1/4 flex items-center flex-col pt-10 text-center">
                    <p className="text-[#BE4646] font-semibold text-xs tracking-wider uppercase">Computer & Accessories</p>
                    <p className="text-[#191C1F] text-3xl font-bold">32% Discount</p>
                    <p className="text-[#475156] text-base">For all electronics products</p>
                    <div className="flex flex-col items-center gap-1 mt-2">
                        <p className="text-sm text-[#191C1F]">Offers ends in:</p>
                        <p className="text-[#191C1F] px-3 py-1 bg-white font-bold text-[10px]">ENDS OF CHRISTMAS</p>
                    </div>
                    <ShopBtn className="bg-[#FA8232] text-white w-2/3 py-3 mt-5 font-bold rounded-sm shadow-lg" />
                    <img src="./imgs/Image.jpg" alt="Featured Promo" className="mt-auto w-full object-contain" />
                </div>

                {/* Mahsulotlar Gridi */}
                <div className="w-3/4 grid grid-cols-4 gap-5">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="relative bg-white border border-gray-300 h-90 px-5 pt-10 hover:shadow-2xl items-center group">
                            {/* Badges */}
                            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                {item.badge && (
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${item.badge.includes('OFF') ? 'bg-yellow-400' : 'bg-[#2DA5F3] text-white'}`}>
                                        {item.badge}
                                    </span>
                                )}
                                {item.hot && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm w-fit">
                                        HOT
                                    </span>
                                )}
                            </div>

                            {/* Rasm va Hover Actions */}
                            <div className="relative h-40 flex items-center justify-center mb-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm">
                                        <Heart size={18} />
                                    </button>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm">
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Mahsulot ma'lumotlari */}
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} stroke={i < item.rating ? "none" : "currentColor"} />
                                ))}
                                <span className="text-[#77878F] text-[12px] ml-1">({item.reviews})</span>
                            </div>

                            <h1 className="text-sm text-[#191C1F] line-clamp-2 mb-2 h-10 leading-tight">
                            </h1>

                            <div className="flex items-center gap-2">
                                <span className="text-[#2DA5F3] font-bold">${item.price}</span>
                                {item.oldPrice && (
                                    <span className="text-[#929FA5] line-through text-sm">
                                        ${item.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;