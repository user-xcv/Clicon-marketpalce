import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { supabase } from "../others/supabase";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Category = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchUniqueCategories();
    }, []);

    const fetchUniqueCategories = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('type, image')
            .order('id', { ascending: true });

        if (error) {
            console.log('Error fetching data ', error);
        } else {
            // Faqat takrorlanmas kategoryalarni olish (Unique categories)
            const unique = Array.from(new Map(data.map(item => [item.type, item])).values());
            setCategories(unique);
        }
    };

    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="mx-auto container px-6">

                {/* Header with Navigation Controls */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        {t('shopWithCategories')}
                    </h2>

                    <div className="flex gap-2">
                        <button className="nav-prev-cat p-2 rounded-full border border-gray-200 hover:bg-[#FA8232] hover:text-white transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="nav-next-cat p-2 rounded-full border border-gray-200 hover:bg-[#FA8232] hover:text-white transition-all shadow-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    speed={800} // Silliq o'tish
                    navigation={{
                        prevEl: '.nav-prev-cat',
                        nextEl: '.nav-next-cat',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 }
                    }}
                    className="!overflow-visible"
                >
                    {categories.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-gray-50 rounded-2xl p-6 border border-transparent group-hover:border-orange-100 group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-center gap-4">
                                    {/* Circle Wrapper for Image */}
                                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-2">
                                        <img
                                            src={item.image}
                                            alt={item.type}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide group-hover:text-[#FA8232] transition-colors">
                                            {item.type}
                                        </p>
                                        <span className="text-[10px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore Items
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Category;