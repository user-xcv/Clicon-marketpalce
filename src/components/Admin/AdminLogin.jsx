import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../others/supabase';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        const checkExistingSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (mounted && data?.session) {
                navigate('/admin', { replace: true });
            }
        };
        checkExistingSession();
        return () => { mounted = false; };
    }, [navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('Iltimos, barcha maydonlarni to\'ldiring');
            setLoading(false);
            return;
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (signInError) {
            // Supabase xatoliklarini o'zbekchaga o'girish (ixtiyoriy)
            const message = signInError.message === 'Invalid login credentials'
                ? 'Email yoki parol noto\'g\'ri'
                : signInError.message;
            setError(message);
            setLoading(false);
            return;
        }

        if (data?.session) {
            navigate('/admin', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#191C1F] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Orqa fon uchun dekorativ elementlar */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FA8232] opacity-10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2DA5F3] opacity-10 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-md z-10">
                {/* Logo va Sarlavha */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-20 h-20 bg-gradient-to-tr from-[#FA8232] to-[#ff9d5c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
                        <span className="text-white font-black text-4xl">C</span>
                    </div>
                    <h1 className="text-white text-4xl font-black tracking-tight">CLICON</h1>
                    <p className="text-gray-400 text-sm mt-2 font-medium tracking-widest uppercase">Management Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-10 border border-white/10 animate-in fade-in zoom-in duration-500">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#191C1F]">Xush kelibsiz!</h2>
                        <p className="text-gray-500 text-sm mt-1">Davom etish uchun hisobingizga kiring</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-6 text-sm flex items-center gap-3 animate-shake">
                            <span className="shrink-0">⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                                Email Manzili
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FA8232]">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA8232]/20 focus:border-[#FA8232] transition-all text-[#191C1F] font-medium"
                                    placeholder="admin@clicon.uz"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                                Maxfiy Parol
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FA8232]">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA8232]/20 focus:border-[#FA8232] transition-all text-[#191C1F] font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#FA8232] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FA8232] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#e6762a] active:scale-[0.98] transition-all shadow-lg shadow-orange-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Tekshirilmoqda...
                                </>
                            ) : (
                                <>
                                    Kirish <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-gray-500 text-xs tracking-wide">
                    &copy; 2025 CLICON E-COMMERCE. BARCHA HUQUQLAR HIMOYaLANGAN.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;