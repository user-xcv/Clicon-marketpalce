import {
    FaTwitter,
    FaFacebookF,
    FaPinterestP,
    FaRedditAlien,
    FaYoutube,
    FaInstagram,
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check, EyeIcon, Headphones, Heart, ArrowRight, MapPin, PhoneCall, Search, ShoppingCartIcon, User, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ cartCount, cart, setCart }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // --- States ---
    const [langOpen, setLangOpen] = useState(false);
    const [currOpen, setCurrOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false); // Kategoriyalar uchun
    const [isOpen, setIsOpen] = useState(false); // Login uchun
    const [open, setOpen] = useState(false); // Savatcha uchun

    // --- Data ---
    const languages = [
        { img: './icons/eng.png', label: 'English', code: 'en' },
        { img: './icons/rus.png', label: 'Russian', code: 'ru' },
        { img: './icons/uzb.png', label: 'Uzbek', code: 'uz' },
    ];

    const currencies = [
        { code: 'USD', label: 'Dollar (USD)' },
        { code: 'EUR', label: 'Euro (EUR)' },
    ];

    const categories = [
        "All Category",
        "Electronics",
        "Computer & Accessories",
        "Smartphones",
        "Laptops",
    ];
    const [selectedCat, setSelectedCat] = useState("All Category");

    const checkOutNow = () => {
        navigate('/shoppingcart');
        setOpen(false);
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    return (
        <>
            <nav className='bg-[#1B6392] border-b border-white/50'>
                <div className="mx-auto container">
                    <div className="flex items-center justify-between py-3 ">
                        <p className='text-white text-sm'> {t('welcome')} </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 text-white text-sm">
                                <span>{t('followUse')}</span>
                                <FaTwitter className="hover:text-gray-300 cursor-pointer" />
                                <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
                                <FaPinterestP className="hover:text-gray-300 cursor-pointer" />
                                <FaRedditAlien className="hover:text-gray-300 cursor-pointer" />
                                <FaYoutube className="hover:text-gray-300 cursor-pointer" />
                                <FaInstagram className="hover:text-gray-300 cursor-pointer" />
                            </div>
                            <span className='text-white/50'>|</span>
                            <div className="flex items-center gap-6 relative">
                                <div className="relative">
                                    <button
                                        onClick={() => { setLangOpen(!langOpen); setCurrOpen(false); }}
                                        className="flex items-center gap-1 text-white text-sm hover:text-gray-200 transition"
                                    >
                                        {i18n.language.toUpperCase()}
                                        <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {langOpen && (
                                        <div className="absolute top-8 left-0 z-[60] bg-white rounded shadow-xl py-2 min-w-[150px]">
                                            {languages.map((lang) => (
                                                <div
                                                    key={lang.code}
                                                    onClick={() => {
                                                        i18n.changeLanguage(lang.code);
                                                        setLangOpen(false);
                                                    }}
                                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {/* Faqat rasm (bayroq) va label (nom) */}
                                                        <img src={lang.img} alt={lang.label} className="w-5 h-4 object-cover" />
                                                        <span className={`text-sm ${i18n.language === lang.code ? 'text-black font-medium' : 'text-gray-500'}`}>
                                                            {lang.label}
                                                        </span>
                                                    </div>
                                                    {/* Tanlanganini bildiruvchi belgi */}
                                                    {i18n.language === lang.code && <Check size={14} className="text-orange-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); }}
                                        className="flex items-center gap-1 text-white text-sm hover:text-gray-200 transition"
                                    >
                                        USD <ChevronDown size={14} className={`transition-transform ${currOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {currOpen && (
                                        <div className="absolute top-8 left-0 z-[60] bg-white rounded shadow-xl py-2 min-w-[150px]">
                                            {currencies.map((curr) => (
                                                <div
                                                    key={curr.code}
                                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => setCurrOpen(false)}
                                                >
                                                    <span className={`text-sm ${curr.code === 'USD' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                                                        {curr.label}
                                                    </span>
                                                    {curr.code === 'USD' && <Check size={14} className="text-orange-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MIDDLE NAVBAR (Logo, Search, User) --- */}
            <nav className='bg-[#1B6392] py-5'>
                <div className="mx-auto container relative">
                    {/* Login Modal */}
                    {isOpen && (
                        <div className="absolute z-[70] top-16 right-0">
                            <div className="w-80 p-6 bg-white rounded-lg shadow-2xl border border-gray-100 relative">
                                <X className='cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-black' onClick={() => setIsOpen(false)} />
                                <div className="flex flex-col gap-5 items-center">
                                    <p className='text-center font-bold text-xl text-[#191C1F]'>Sign in to your account</p>
                                    <div className="flex flex-col gap-1 w-full text-left">
                                        <label className='text-xs font-medium text-[#191C1F]'>Email Address</label>
                                        <input type="email" className='outline-none border border-[#E4E7E9] w-full px-3 py-2 rounded-md focus:border-[#2DA5F3]' />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full text-left">
                                        <div className="flex items-center justify-between">
                                            <label className='text-xs font-medium text-[#191C1F]'>Password</label>
                                            <span className='text-[#2DA5F3] text-xs cursor-pointer'>Forget Password</span>
                                        </div>
                                        <div className="flex items-center border border-[#E4E7E9] w-full rounded-md focus-within:border-[#2DA5F3]">
                                            <input type="password" placeholder='Password' className='outline-none flex-1 px-3 py-2 rounded-md' />
                                            <EyeIcon className="w-4 h-4 mx-2 text-gray-400" />
                                        </div>
                                    </div>
                                    <button className="flex justify-center items-center w-full bg-[#FA8232] text-white font-bold py-3 rounded-md hover:bg-orange-600 transition uppercase text-sm tracking-wider">
                                        Login <ArrowRight size={18} className="ml-2" />
                                    </button>
                                    <div className="relative w-full text-center">
                                        <span className="bg-white px-2 text-[#77878F] text-sm relative z-10">Don't have account?</span>
                                        <div className="absolute top-1/2 w-full h-[1px] bg-gray-100"></div>
                                    </div>
                                    <button className="w-full py-3 border-2 border-[#FFE7D6] text-[#FA8232] font-bold rounded-md hover:bg-[#FA8232] hover:text-white transition uppercase text-sm tracking-wider">
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <img src="./icons/Icon (1).png" alt="Logo" className="w-10 h-10" />
                            <p className='font-bold text-white text-3xl tracking-tight'>CLICON</p>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center w-1/2 bg-white px-4 py-3 rounded-sm shadow-sm">
                            <input
                                type="text"
                                className='outline-none flex-1 text-sm'
                                placeholder={t('search_placeholder')}
                            />
                            <Search size={20} className='text-gray-500 cursor-pointer hover:text-black' />
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-5">
                            <div className="relative cursor-pointer">
                                <ShoppingCartIcon className="text-white w-7 h-7 hover:text-orange-400 transition" onClick={() => setOpen(!open)} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-[#1B6392] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1B6392]">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <Heart className="text-white w-7 h-7 hover:text-red-400 cursor-pointer transition" />
                            <User onClick={() => setIsOpen(!isOpen)} className="text-white w-7 h-7 hover:text-orange-400 cursor-pointer transition" />
                        </div>

                        {/* Shopping Cart Modal */}
                        {open && (
                            <div className="absolute z-[70] top-16 right-0">
                                <div className="w-96 p-6 bg-white rounded-lg shadow-2xl border border-gray-100 relative">
                                    <X className='cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-black' onClick={() => setOpen(false)} />
                                    <div className="flex flex-col gap-5">
                                        <p className='font-bold text-xl text-[#191C1F]'>Shopping Cart ({cartCount})</p>
                                        <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-2">
                                            {cart.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain border border-gray-100 rounded-md" />
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                                                            <p className="text-sm">{item.quantity}x <span className='text-blue-500 font-semibold'>${(item.quantity * item.price).toFixed(2)}</span></p>
                                                        </div>
                                                    </div>
                                                    <X className='text-gray-400 w-4 h-4 cursor-pointer hover:text-red-500' onClick={() => removeItem(item.id)} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between border-t pt-4">
                                            <p className='text-gray-500'>Sub-Total:</p>
                                            <p className='font-bold'>${totalPrice.toFixed(2)}</p>
                                        </div>
                                        <button onClick={checkOutNow} className="flex justify-center items-center w-full bg-[#FA8232] text-white font-bold py-3 rounded-md hover:bg-orange-600 transition uppercase text-sm tracking-wider">
                                            Check Out now <ArrowRight size={18} className="ml-2" />
                                        </button>
                                        <button className="w-full py-3 border-2 border-[#FFE7D6] text-[#FA8232] font-bold rounded-md hover:bg-[#FA8232] hover:text-white transition uppercase text-sm tracking-wider">
                                            View Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- BOTTOM NAVBAR (Categories & Links) --- */}
            <nav className='border-b border-gray-100 py-4 bg-white'>
                <div className="mx-auto container">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            {/* CUSTOM CATEGORY SELECT */}
                            <div className="relative">
                                <button
                                    onClick={() => setCatOpen(!catOpen)}
                                    className='flex items-center justify-between gap-2 font-medium text-[#191C1F] outline-none cursor-pointer bg-[#F2F4F5] px-4 py-2 rounded-sm min-w-[180px]'
                                >
                                    <span>{selectedCat}</span>
                                    <ChevronDown size={16} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {catOpen && (
                                    <div className="absolute top-11 left-0 z-50 bg-white border border-gray-100 rounded shadow-xl py-2 min-w-full">
                                        {categories.map((cat, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => { setSelectedCat(cat); setCatOpen(false); }}
                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-[#191C1F]"
                                            >
                                                <span>{cat}</span>
                                                {selectedCat === cat && <Check size={14} className="text-orange-500" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-[#5F6C72] hover:text-[#FA8232] cursor-pointer transition text-sm font-medium">
                                <MapPin size={20} />
                                <span>{t("trackOrder")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5F6C72] hover:text-[#FA8232] cursor-pointer transition text-sm font-medium">
                                <img src="./icons/ArrowsCounterClockwise.png" alt="" className="w-5 h-5" />
                                <span>{t("compare")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5F6C72] hover:text-[#FA8232] cursor-pointer transition text-sm font-medium">
                                <Headphones size={20} />
                                <span>{t("support")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5F6C72] hover:text-[#FA8232] cursor-pointer transition text-sm font-medium">
                                <img src="./icons/Info.png" alt="" className="w-5 h-5" />
                                <span>{t("needHelp")}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#191C1F]">
                            <PhoneCall className="text-[#FA8232]" />
                            <span>+1-202-555-0104</span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;