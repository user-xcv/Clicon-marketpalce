import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { useState, useEffect } from "react";

import { supabase } from "../others/supabase"
import { useTranslation } from 'react-i18next';



const Category = () => {
    const { t, i18n } = useTranslation();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true })

        if (error) {
            console.log('Error fetching data ', error)
        } else {
            setProducts(data)
        }
    }



    return (
        <section className="py-10">
            <div className="mx-auto container">
                <h1 className="font-semibold text-3xl mb-10 text-center">
                    Shop with Categories
                </h1>

                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={5}
                    spaceBetween={10}
                    loop={true}
                    speed={4500}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                >
                    {products.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="border border-gray-400 shadow-xl rounded-xl p-5 flex flex-col items-center gap-3">
                                <img
                                    src={item.image}
                                    alt={item.title?.en}
                                    className="w-24 h-24 object-contain"
                                />
                                <p className="text-center text-sm font-medium" >{item.type}</p>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>
        </section>
    )
}

export default Category
