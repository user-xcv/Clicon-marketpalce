import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

const Category = () => {
    const items = [
        { id: 1, image: './imgs/Image (39).png', title: 'Computer & Laptop' },
        { id: 2, image: './imgs/Image (40).png', title: 'SmartPhone' },
        { id: 3, image: './imgs/Image (41).png', title: 'Headphones' },
        { id: 4, image: './imgs/Image (42).png', title: 'Accessories' },
        { id: 5, image: './imgs/Image (43).png', title: 'Camera' },
        { id: 6, image: './imgs/Image (44).png', title: 'TV & Homes' },
    ]

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
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                >
                    {items.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="border border-gray-400 shadow-xl rounded-xl  p-5 flex flex-col items-center gap-3">
                                <img src={item.image} alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Category
