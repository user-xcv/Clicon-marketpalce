import { Heart, ShoppingCart, Eye, Star, ShoppingCartIcon } from "lucide-react";

const ShopPage = ({ addToCart, products }) => {


    return (
        <div className="mx-auto container">
            <div className="grid grid-cols-5 grid-rows-2 border border-[#E4E7E9]">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className={`relative bg-white border-r border-b border-[#E4E7E9] p-5 overflow-hidden ${p.featured ? "row-span-2" : ""}`} >
                        {p.badge && (
                            <span className="absolute top-2 left-2 bg-yellow-400 text-[10px] font-bold px-2 py-1 z-10 rounded-sm">
                                {p.badge}
                            </span>
                        )}
                        {p.hot && (
                            <span className={`absolute ${p.badge ? 'top-8' : 'top-2'} left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 z-10 rounded-sm`}>
                                HOT
                            </span>
                        )}
                        {p.soldOut && (
                            <span className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 z-10 rounded-sm">
                                SOLD OUT
                            </span>
                        )}
                        <div className={`relative flex items-center justify-center mb-3 ${p.featured ? "h-80" : "h-40"} group`}>
                            <img
                                src={p.image}
                                alt={p.title}
                                className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                            />

                            {!p.featured && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm">
                                        <Heart size={18} />
                                    </button>
                                    <button
                                        onClick={() => addToCart(p)}
                                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#FA8232] hover:text-white transition shadow-sm">
                                        <Eye size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {p.featured && (
                            <div className="flex items-center gap-1 text-yellow-400 text-xs mb-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill={i < p.rating ? "currentColor" : "none"} />
                                ))}
                                <span className="text-gray-500 ml-1">({p.reviews})</span>
                            </div>
                        )}

                        <h3 className={`text-sm leading-tight line-clamp-2 mb-2 ${p.featured ? "font-semibold text-base" : "text-gray-700"}`}>
                            {p.title}
                        </h3>

                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-[#2DA5F3] font-bold">
                                ${p.price}
                            </span>
                            {p.oldPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                    ${p.oldPrice}
                                </span>
                            )}
                        </div>

                        {/* DESCRIPTION + CTA (ONLY FOR FEATURED) */}
                        {p.featured && (
                            <>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                                    {p.description}
                                </p>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-[#FFE7D6] text-[#FA8232] rounded-sm hover:bg-[#FA8232] hover:text-white transition">
                                        <Heart size={20} />
                                    </button>
                                    <button
                                        onClick={() => addToCart(p)}
                                        className="flex-1 bg-[#FA8232] text-white font-bold text-xs py-3 rounded-sm hover:bg-orange-600 transition flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={18} /> ADD TO CART
                                    </button>
                                    <button className="p-3 bg-[#FFE7D6] text-[#FA8232] rounded-sm hover:bg-[#FA8232] hover:text-white transition">
                                        <Eye size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopPage;