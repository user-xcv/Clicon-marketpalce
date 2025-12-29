import React, { useState } from 'react';
import { User, Calendar, MessageCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LatestNews = () => {
    const [selectedNews, setSelectedNews] = useState(null);

    const newsData = [
        {
            id: 1,
            author: "Kristin",
            date: "19 Dec, 2024",
            comments: 453,
            title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
            description: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
            image: "/imgs/a.png"
        },
        {
            id: 1,
            author: "Kristin",
            date: "19 Dec, 2024",
            comments: 453,
            title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
            description: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
            image: "/imgs/a.png"
        },
        {
            id: 1,
            author: "Kristin",
            date: "19 Dec, 2024",
            comments: 453,
            title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
            description: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
            image: "/imgs/a.png"
        },
    ];

    return (
        <section className="bg-[#F2F4F5] py-12 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-[#191C1F] mb-4">Latest News</h2>
                    <div className="w-20 h-1.5 bg-[#FA8232] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData.map((news) => (
                        <motion.div
                            key={news.id}
                            // MOBILDA BOSILGANDA (TAP) EFFEKT
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
                        >
                            {/* Rasm qismi - Hoverda kattalashadi */}
                            <div className="relative h-60 md:h-64 overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <span className="text-white text-sm font-bold flex items-center gap-2">
                                        View Full Story <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>

                            {/* Kontent qismi */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
                                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-[#77878F] uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5 group-hover:text-[#FA8232] transition-colors">
                                        <User size={14} /> <span>{news.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} /> <span>{news.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageCircle size={14} /> <span>{news.comments}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[#191C1F] leading-snug group-hover:text-[#FA8232] transition-colors line-clamp-2">
                                    {news.title}
                                </h3>

                                <p className="text-sm text-[#475156] leading-relaxed line-clamp-3">
                                    {news.description}
                                </p>

                                <div className="mt-auto pt-4">
                                    <button
                                        onClick={() => setSelectedNews(news)}
                                        className="inline-flex items-center gap-3 text-[#191C1F] font-black text-xs uppercase tracking-tighter group/btn"
                                    >
                                        <span className="relative">
                                            Read More
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FA8232] transition-all duration-300 group-hover/btn:w-full"></span>
                                        </span>
                                        <div className="p-2 rounded-full bg-gray-100 group-hover/btn:bg-[#FA8232] group-hover/btn:text-white transition-all">
                                            <ArrowRight size={16} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL - Silliq chiqishi uchun AnimatePresence bilan */}
            <AnimatePresence>
                {selectedNews && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setSelectedNews(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="absolute top-5 right-5 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#FA8232] hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <img src={selectedNews.image} alt="" className="w-full h-full object-cover" />
                            </div>

                            <div className="p-8 md:p-12 md:w-1/2 overflow-y-auto">
                                <div className="flex gap-4 text-[10px] font-black text-[#FA8232] uppercase tracking-[2px] mb-6">
                                    <span>{selectedNews.author}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{selectedNews.date}</span>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-black text-[#191C1F] mb-6 leading-tight">
                                    {selectedNews.title}
                                </h2>

                                <div className="prose prose-sm text-[#475156] space-y-4 mb-8">
                                    <p className="text-lg leading-relaxed">{selectedNews.description}</p>
                                    <blockquote className="border-l-4 border-[#FA8232] pl-4 italic text-gray-500 py-2 bg-gray-50 rounded-r-lg">
                                        "Quality is not an act, it is a habit. We ensure every detail is perfect for our readers."
                                    </blockquote>
                                </div>

                                <button
                                    onClick={() => setSelectedNews(null)}
                                    className="w-full md:w-fit bg-[#191C1F] text-white py-4 px-10 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#FA8232] transition-all shadow-lg shadow-gray-200"
                                >
                                    Finish Reading
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LatestNews;