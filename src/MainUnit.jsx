import React, { useEffect, useState } from "react"

import './components/Lang/i18n';
import ShopHero from "./components/head/ShopHero";
import Products from "./components/sections/Products";
import Category from './components/sections/Category';
import Feutured from './components/sections/Feutured';
import ShopBtn from "./components/buttons/ShopBtn";
import Accessories from "./components/sections/Accessories"
import LatestNews from "./components/sections/LatestNews";
import Newsletter from "./components/sections/Newsletter";
import Footer from "./components/footer/Footer";
const ProductSmallCard = ({ product }) => (
    <div className="flex items-center gap-4 p-4 border border-[#E4E7E9] rounded-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
        <div className="w-20 h-20 ">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
            />
        </div>
        <div className="flex flex-col gap-1">
            <h3 className="text-sm text-[#191C1F] line-clamp-2 leading-snug">
                {product.title}
            </h3>
            <span className="text-[#2DA5F3] font-bold text-sm">
                ${product.price}
            </span>
        </div>
    </div>
);
const MainUnit = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        fetch('../data/product.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data),
                    setLoading(false)
            })
            .catch(err => {
                console.error('error')
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetch('../data/featured.json')
            .then(res => res.json())
            .then(data => setFeatured(data))
    }, [])
    if (loading) return <p>Loading...</p>
    const extraItems = [
        {
            id: 19,
            title: 'New Apple Homepod Mini', // Bir xillik uchun title qildik
            text: "Jam-packed with innovation, HomePod mini delivers unexpectedly.",
            price: 320,
            ind: 'introducing',
            image: './imgs/image 6.png',
            quantity: 1
        },
        {
            id: 20,
            title: 'Xiaomi Mi 11 Ultra 12GB+256GB',
            text: "Data provided by internal laboratories. Industry measurement.",
            price: 590,
            ind: 'introducing new',
            image: './imgs/Image (53).png',
            quantity: 1
        }
    ]

    const mackPro = [
        {
            id: 30,
            title: "Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage",
            price: "$199",
            name: "Macbook Pro",
            image: "./imgs/Image (60).png"
        }
    ]
    const newsData = [
        {
            id: 1,
            author: "Kristin",
            date: "19 Dec, 2013",
            comments: 453,
            title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
            description: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
            image: "/imgs/a.png" // O'zingizdagi rasm yo'lini qo'ying
        },
        {
            id: 2,
            author: "Robert",
            date: "28 Nov, 2015",
            comments: 738,
            title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
            description: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
            image: "/imgs/b.png"
        },
        {
            id: 3,
            author: "Arlene",
            date: "9 May, 2014",
            comments: 826,
            title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
            description: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
            image: "/imgs/c.png"
        }
    ];
    return (
        <>
            <ShopHero addToCart={addToCart} product={products} />
            <Products products={products} addToCart={addToCart} />
            <Category />
            <Feutured products={products} addToCart={addToCart} />
            <div className="mx-auto container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {extraItems.map((item) => (
                        <div key={item.id} className={`relative overflow-hidden rounded-md p-10 flex flex-col justify-center min-h-110 ${item.id === 19 ? 'bg-[#F2F4F5]' : 'bg-[#191C1F] text-white'}`}>
                            <img src={item.image} alt={item.title} className="absolute right-0 top-1/2 -translate-y-1/2 max-h-[85%] w-auto pointer-events-none z-0 object-contain" />

                            <div className="relative z-10">
                                <span className={`uppercase text-[12px] font-bold px-3 py-1.5 w-fit rounded-sm mb-4 block ${item.id === 19 ? 'bg-[#2DA5F3] text-white' : 'bg-[#EFD33D] text-[#191C1F]'}`}>
                                    {item.ind}
                                </span>
                                <h2 className="text-4xl font-bold mb-4 max-w-110 leading-tight">{item.title}</h2>
                                <p className={`text-lg mb-8 max-w-[320px] ${item.id === 19 ? 'text-[#475156]' : 'text-[#ADB7BC]'}`}>{item.text}</p>

                                <ShopBtn
                                    onClick={() => addToCart(item)}
                                    className="w-fit px-8 py-3 bg-[#FA8232] text-white font-bold rounded-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Accessories addToCart={addToCart} />
            <div className="mx-auto container">
                <div className="flex justify-between items-center bg-[#FFE7D6] px-20">
                    <div className="flex flex-col gap-3 w-1/3">
                        <p className="bg-[#2DA5F3] py-1 px-1 text-white font-semibold w-2/5 flex items-center justify-center" >SAVE UP TO $200.00</p>
                        <h1 className="font-semibold text-3xl text-[#191C1F]">{mackPro[0].name}</h1>
                        <p className="text-2xl text-[#191C1F] mt-2">{mackPro[0].title}</p>
                        <ShopBtn className="bg-[#FA8232] text-white w-2/5 py-3" />
                    </div>

                    <div className="relative">
                        <img src={mackPro[0].image} alt="" />
                        <div className="flex items-center justify-center rounded-full bg-[#FFCEAD] border-5 text-xl font-semibold border-white p-5 w-25 h-25 absolute  top-7  " ><p>{mackPro[0].price}</p></div>
                    </div>
                </div>
            </div>
            {/* Product Lists Section */}
            <div className="mx-auto container py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* FLASH SALE TODAY */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[#191C1F] text-lg font-bold uppercase tracking-tight">Flash Sale Today</h2>
                        <div className="flex flex-col gap-4">
                            {products.slice(0, 3).map((product) => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* BEST SELLERS */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[#191C1F] text-lg font-bold uppercase tracking-tight">Best Sellers</h2>
                        <div className="flex flex-col gap-4">
                            {products.slice(3, 6).map((product) => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* TOP RATED */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[#191C1F] text-lg font-bold uppercase tracking-tight">Top Rated</h2>
                        <div className="flex flex-col gap-4">
                            {products.slice(6, 9).map((product) => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* <div className="flex flex-col gap-4">
                        <h2 className="text-[#191C1F] text-lg font-bold uppercase tracking-tight">New Arrival</h2>
                        <div className="flex flex-col gap-4">
                            {products.slice(9, 12).map((product) => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div> */}

                </div>
            </div>
            <LatestNews />
            <Newsletter />
        </>
    )
}

export default MainUnit