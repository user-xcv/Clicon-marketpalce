import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [loading, setLoading] = useState(false);

    const showToast = (msg, type) => {
        setToast({ show: true, message: msg, type: type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showToast("Iltimos, email manzilingizni yozing!", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            showToast("Email formati noto'g'ri!", "error");
            return;
        }

        setLoading(true);

        // Simulyatsiya (aslida API ga yuboriladi)
        setTimeout(() => {
            setLoading(false);
            setEmail("");
            showToast("Muvaffaqiyatli obuna bo'ldingiz!", "success");
        }, 1500);
    };

    return (
        <section className="bg-[#1B6392] py-16 md:py-24 relative overflow-hidden">
            {/* Fon uchun dekorativ doiralar */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FA8232]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            {/* --- CUSTOM TOAST MESSAGE --- */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className={`fixed top-6 right-6 z-[1000] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md border ${toast.type === "success"
                            ? "bg-green-500/90 border-green-400 text-white"
                            : "bg-red-500/90 border-red-400 text-white"
                            }`}
                    >
                        {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                        <button onClick={() => setToast({ ...toast, show: false })} className="ml-4 hover:rotate-90 transition-transform">
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-[#FA8232] text-white text-[10px] font-black uppercase tracking-[3px] px-4 py-1.5 rounded-full mb-6 inline-block">
                            Newsletter
                        </span>
                        <h2 className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight">
                            Subscribe to our newsletter
                        </h2>
                        <p className="text-blue-100/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Join our community and get the latest updates on new products,
                            exclusive discounts, and tech news delivered straight to your inbox.
                        </p>
                    </motion.div>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubscribe}
                    className="w-full max-w-2xl mx-auto"
                >
                    <div className="bg-white p-2 md:p-3 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-2xl shadow-blue-900/20">
                        <div className="flex-grow flex items-center px-4 gap-3">
                            <Send size={20} className="text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                className="w-full py-3 outline-none text-[#191C1F] placeholder:text-gray-400 font-medium text-base bg-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-[#FA8232] text-white font-black px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-95 transition-all uppercase text-sm tracking-widest shadow-lg shadow-orange-500/30 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Processing..." : "Subscribe"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </div>
                </motion.form>

                {/* Brands - Chiroyli Slider yoki Grid ko'rinishida */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <p className="text-center text-blue-200/40 text-[10px] font-black uppercase tracking-[4px] mb-10">
                        Trusted by Global Tech Brands
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
                        <img src="/imgs/google.png" alt="Google" className="h-6 md:h-8 object-contain" />
                        <img src="/imgs/amazon.png" alt="Amazon" className="h-6 md:h-8 object-contain" />
                        <img src="/imgs/philips.png" alt="Philips" className="h-6 md:h-8 object-contain" />
                        <img src="/imgs/toshiba-1 1.png" alt="Toshiba" className="h-6 md:h-8 object-contain" />
                        <img src="/imgs/samsung-4 1.png" alt="Samsung" className="h-6 md:h-8 object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;