import React, { useState } from 'react';
import { User, Calendar, MessageCircle, ArrowRight, X } from 'lucide-react';

const LatestNews = () => {
    // Tanlangan yangilikni saqlash uchun state
    const [selectedNews, setSelectedNews] = useState(null);

    const newsData = [
        {
            id: 1,
            author: "Kristin",
            date: "19 Dec, 2013",
            comments: 453,
            title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
            description: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
            image: "/imgs/a.png"
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
        <section className="bg-[#F2F4F5] py-20">
            <div className="container mx-auto px-4 md:px-0">
                <h2 className="text-3xl font-bold text-[#191C1F] text-center mb-12">Latest News</h2>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsData.map((news) => (
                        <div key={news.id} className="bg-white border border-[#E4E7E9] rounded-sm flex flex-col h-full shadow-sm hover:shadow-md transition-all">
                            {/* Rasm */}


                            {/* Kontent */}
                            <div className="p-6 flex flex-col gap-3">
                                <div className="w-full h-62 overflow-hidden">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#475156]">
                                    <div className="flex items-center gap-1.5"><User size={18} className="text-[#FA8232]" /><span>{news.author}</span></div>
                                    <div className="flex items-center gap-1.5"><Calendar size={18} className="text-[#FA8232]" /><span>{news.date}</span></div>
                                    <div className="flex items-center gap-1.5"><MessageCircle size={18} className="text-[#FA8232]" /><span>{news.comments}</span></div>
                                </div>

                                <h3 className="text-lg font-bold text-[#191C1F] leading-6 mt-1 line-clamp-2">
                                    {news.title}
                                </h3>
                                <p className="text-[#77878F] text-sm leading-5 line-clamp-3">
                                    {news.description}
                                </p>

                                <button
                                    onClick={() => setSelectedNews(news)}
                                    className="mt-4 flex items-center gap-2 text-[#FA8232] font-bold text-sm uppercase group w-fit border-2 border-[#FFE7D6] hover:border-[#FA8232] px-5 py-2.5 transition-all rounded-sm"
                                >
                                    Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODAL QISMI (Shu faylning o'zida) --- */}
            {selectedNews && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">

                        {/* Yopish tugmasi */}
                        <button
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <X size={24} className="text-[#191C1F]" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Modal Rasmi */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto">
                                <img src={selectedNews.image} alt="" className="w-full h-full object-cover" />
                            </div>

                            {/* Modal Matni */}
                            <div className="p-8 md:w-1/2 flex flex-col gap-5">
                                <div className="flex items-center gap-4 text-xs font-bold text-[#475156] uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><User size={14} className="text-[#FA8232]" /> {selectedNews.author}</span>
                                    <span className="flex items-center gap-1"><Calendar size={14} className="text-[#FA8232]" /> {selectedNews.date}</span>
                                </div>

                                <h2 className="text-2xl font-bold text-[#191C1F] leading-tight">
                                    {selectedNews.title}
                                </h2>

                                <div className="w-12 h-1 bg-[#FA8232]"></div>

                                <p className="text-[#475156] leading-relaxed">
                                    {selectedNews.description}
                                </p>

                                <p className="text-[#77878F] text-sm italic">
                                    "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus."
                                </p>

                                <button
                                    onClick={() => setSelectedNews(null)}
                                    className="mt-4 bg-[#191C1F] text-white py-3 px-8 rounded-sm font-bold uppercase text-sm hover:bg-[#2DA5F3] transition-colors w-fit"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LatestNews;