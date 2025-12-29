import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Package,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Bell,
    Search
} from 'lucide-react';
import { supabase } from '../others/supabase';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true); // Yuklanish holati qo'shildi
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. Dastlabki sessiyani tekshirish
        const checkUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session) {
                navigate('/admin-login', { replace: true });
            } else {
                setAdminUser(session.user);
            }
            setLoading(false);
        };

        checkUser();

        // 2. Auth holati o'zgarishini kuzatish
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setAdminUser(null);
                navigate('/admin-login', { replace: true });
            } else if (session) {
                setAdminUser(session.user);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [navigate]);

    const handleLogout = async () => {
        setProfileDropdown(false);
        await supabase.auth.signOut();
        // onAuthStateChange SIGNED_OUT hodisasi navigatsiyani amalga oshiradi
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: Home },
        { name: 'Mahsulotlar', path: '/admin/products', icon: Package },
        { name: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
        { name: 'Sozlamalar', path: '/admin/settings', icon: Settings }
    ];

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    // Foydalanuvchi tekshirilayotgan vaqtda oq ekran yoki loader ko'rsatish
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA8232]"></div>
            </div>
        );
    }

    // Agar user bo'lmasa, layoutni render qilmaslik (Redirect bo'lguncha)
    if (!adminUser) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#191C1F] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FA8232] rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">Clicon</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${active
                                        ? 'bg-[#FA8232] text-white shadow-lg shadow-orange-500/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                                <span className="font-medium">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0">
                    <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex-1 max-w-xl hidden sm:block">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA8232] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Qidirish..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent border focus:bg-white focus:border-[#FA8232] rounded-xl outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setProfileDropdown(!profileDropdown)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-tr from-[#FA8232] to-orange-400 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                                        {adminUser?.email?.[0].toUpperCase()}
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {profileDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setProfileDropdown(false)} />
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                                            <div className="px-4 py-3 border-b border-gray-50">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
                                                <p className="text-sm font-medium text-gray-900 truncate">{adminUser?.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Tizimdan chiqish
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;