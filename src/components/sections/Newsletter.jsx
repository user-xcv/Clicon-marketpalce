import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, X } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [loading, setLoading] = useState(false);


    const showToast = (msg, type) => {
        setToast({ show: true, message: msg, type: type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
    };

    const handleSubscribe = (e) => {
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

        setTimeout(() => {
            setLoading(false);
            setEmail("");
            showToast("Muvaffaqiyatli obuna bo'ldingiz! ", "success");
        }, 1500);
    };

    return (
        <section className="bg-[#1B6392] py-20 px-4 relative overflow-hidden">

            {/* --- CUSTOM TOAST MESSAGE --- */}
            {toast.show && (
                <div className={`fixed top-10 right-10 z-[1000] flex items-center gap-3 px-6 py-4 rounded-md shadow-2xl animate-in slide-in-from-right duration-300 ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}>
                    {toast.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-medium">{toast.message}</span>
                    <button onClick={() => setToast({ ...toast, show: false })} className="ml-4 hover:opacity-70">
                        <X size={18} />
                    </button>
                </div>
            )}

            <div className="container mx-auto flex flex-col items-center text-center">
                <div className="max-w-[620px] mb-8">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 ">
                        Subscribe to our newsletter
                    </h2>
                    <p className="text-white/70 text-base leading-relaxed">
                        Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et
                        cursus. Donec non quam urna.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubscribe} className="w-full max-w-[620px]">
                    <div className="bg-white p-2 rounded-sm flex flex-col sm:flex-row gap-2 shadow-lg">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="flex-grow px-4 py-3 outline-none text-[#191C1F] placeholder:text-[#ADB7BC]"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-[#FA8232] text-white font-bold px-8 py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#e6762a] transition-all uppercase text-sm tracking-wide ${loading ? "opacity-70" : ""}`}
                        >
                            {loading ? "Sending..." : "Subscribe"} <ArrowRight size={20} />
                        </button>
                    </div>
                </form>

                {/* Brands (Oldingi koddek) */}
                <div className="w-full border-t border-white/10  mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                    <img src="/imgs/google.png" alt="Google" />
                    <img src="/imgs/amazon.png" alt="Amazon" />
                    <img src="/imgs/philips.png" alt="Philips" />
                    <img src="/imgs/toshiba-1 1.png" alt="Toshiba" />
                    <img src="/imgs/samsung-4 1.png" alt="Samsung" />
                </div>
            </div>
        </section>
    );
};

export default Newsletter;