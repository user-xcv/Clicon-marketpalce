import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    Users,
    ShoppingCart,
    TrendingUp,
    DollarSign,
    ArrowUp,
    ArrowDown,
    AlertCircle
} from 'lucide-react';
import { supabase } from '../../others/supabase';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // 1. Mahsulotlar soni
            const { count: productsCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            // 2. Foydalanuvchilar soni
            const { count: usersCount } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true });

            // 3. Buyurtmalar va umumiy daromad
            const { data: allOrders, count: ordersCount } = await supabase
                .from('orders')
                .select('total, created_at, id, customer, status');

            const totalRevenue = allOrders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0;

            // 4. So'nggi 5 ta mahsulot
            const { data: products } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            setStats({
                totalProducts: productsCount || 0,
                totalUsers: usersCount || 0,
                totalOrders: ordersCount || 0,
                totalRevenue: totalRevenue
            });

            // Eng so'nggi 5 ta buyurtmani dashboard uchun ajratish
            setRecentOrders(allOrders?.slice(0, 5) || []);
            setRecentProducts(products || []);

        } catch (err) {
            console.error('Dashboard xatosi:', err);
            setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Jami Mahsulotlar',
            value: stats.totalProducts,
            icon: Package,
            change: '+12%',
            color: 'bg-blue-500'
        },
        {
            title: 'Foydalanuvchilar',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            change: '+8%',
            color: 'bg-green-500'
        },
        {
            title: 'Buyurtmalar',
            value: stats.totalOrders,
            icon: ShoppingCart,
            change: '+5%',
            color: 'bg-orange-500'
        },
        {
            title: 'Daromad',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            change: '+15%',
            color: 'bg-purple-500'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA8232]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Tizimning umumiy holati</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} /> {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-lg text-white`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm text-green-500">
                            <ArrowUp size={16} className="mr-1" />
                            <span>{card.change}</span>
                            <span className="text-gray-500 ml-1">o'sish</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">So'nggi buyurtmalar</h2>
                        <button onClick={() => navigate('/admin/orders')} className="text-sm text-orange-600 hover:underline">Hammasi</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Mijoz</th>
                                    <th className="px-6 py-3">Summa</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="text-sm hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">#{order.id.toString().slice(0, 5)}</td>
                                        <td className="px-6 py-4">{order.customer || 'Guest'}</td>
                                        <td className="px-6 py-4">${order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 uppercase">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Yangi mahsulotlar</h2>
                        <button onClick={() => navigate('/admin/products')} className="text-sm text-orange-600 hover:underline">Hammasi</button>
                    </div>
                    <div className="p-6 space-y-4">
                        {recentProducts.map((product) => (
                            <div key={product.id} className="flex items-center gap-4">
                                <img
                                    src={product.image || '/imgs/placeholder.png'}
                                    className="w-12 h-12 object-cover rounded-lg border"
                                    alt="product"
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                                        {/* JSON format yoki oddiy string bo'lsa ham ishlaydi */}
                                        {typeof product.title === 'object' ? product.title.uz : product.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tezkor amallar</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate('/admin/products/add')}
                        className="flex items-center justify-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors font-medium"
                    >
                        <Package size={20} /> Yangi mahsulot
                    </button>
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                        <Users size={20} /> Foydalanuvchilar
                    </button>
                    <button
                        onClick={() => navigate('/admin/settings')}
                        className="flex items-center justify-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        <TrendingUp size={20} /> Hisobotlar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;