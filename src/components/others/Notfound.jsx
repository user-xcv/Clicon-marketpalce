import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 font-sans bg-gray-50/50">
            <div className="max-w-2xl w-full text-center">
                {/* Vizual qism - 404 raqami animatsiya bilan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none text-[#1B6392] opacity-10 select-none">
                        404
                    </h1>

                    <div className="relative -mt-16 md:-mt-24">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                            Oops! Page not found
                        </h2>
                        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                            Qidirayotgan sahifangiz o'chirilgan, nomi o'zgartirilgan yoki vaqtincha mavjud bo'lmasligi mumkin.
                        </p>
                    </div>
                </motion.div>

                {/* Tugmalar paneli */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FA8232] hover:bg-[#e0752b] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-orange-200 transition-all active:scale-95"
                    >
                        <Home size={20} />
                        Go to Homepage
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </motion.div>

                {/* Yordamchi havolalar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                >
                    <div className="flex gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-[#1B6392] h-fit">
                            <Search size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Search Products</h4>
                            <p className="text-sm text-gray-500 mt-1">Sizga kerakli qurilmani qidirib ko'ring.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-3 bg-orange-50 rounded-xl text-[#FA8232] h-fit">
                            <HelpCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">FAQ Center</h4>
                            <p className="text-sm text-gray-500 mt-1">Savollaringizga javob toping.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-3 bg-green-50 rounded-xl text-green-600 h-fit">
                            <Home size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Track Order</h4>
                            <p className="text-sm text-gray-500 mt-1">Buyurtmangiz holatini kuzatib boring.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Notfound;