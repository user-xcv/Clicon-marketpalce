import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye,
    Filter,
    ChevronDown,
    Package,
    Loader2
} from 'lucide-react';
import { supabase } from '../../others/supabase';

const Items = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
                // Fallback to mock data if Supabase fails
                setProducts([
                    {
                        id: 1,
                        title: 'iPhone 15 Pro',
                        type: 'phone',
                        price: 999,
                        stock: 45,
                        status: 'active',
                        image: '/imgs/iphone.png',
                        category: 'Smartphone',
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 2,
                        title: 'MacBook Pro M3',
                        type: 'laptop',
                        price: 1999,
                        stock: 12,
                        status: 'active',
                        image: '/imgs/macbook.png',
                        category: 'Laptop',
                        created_at: new Date().toISOString()
                    }
                ]);
            } else {
                const normalized = (data || []).map((p) => ({
                    ...p,
                    oldPrice: p.oldPrice ?? p.old_price
                }));
                setProducts(normalized);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || product.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Rostan ham ushbu mahsulotni o\'chirmoqchimisiz?')) {
            setDeleteLoading(id);
            try {
                const { error } = await supabase
                    .from('products')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting product:', error);
                    alert('Mahsulotni o\'chirishda xatolik yuz berdi');
                } else {
                    setProducts(products.filter(product => product.id !== id));
                    alert('Mahsulot muvaffaqiyatli o\'chirildi');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Mahsulotni o\'chirishda xatolik yuz berdi');
            } finally {
                setDeleteLoading(null);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/products/edit/${id}`);
    };

    // View route is not implemented in App.jsx, keep only Edit for now

    const handleStatusToggle = async (product) => {
        const newStatus = product.status === 'active' ? 'inactive' : 'active';
        
        try {
            const { error } = await supabase
                .from('products')
                .update({ status: newStatus })
                .eq('id', product.id);

            if (error) {
                console.error('Error updating status:', error);
                alert('Statusni yangilashda xatolik yuz berdi');
            } else {
                setProducts(products.map(p => 
                    p.id === product.id ? { ...p, status: newStatus } : p
                ));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Statusni yangilashda xatolik yuz berdi');
        }
    };

    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Aktiv' : 'Nofaol';
    };

    const types = ['all', 'phone', 'laptop', 'tablet', 'headphone'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    <span className="text-gray-600">Mahsulotlar yuklanmoqda...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mahsulotlar</h1>
                    <p className="text-gray-600">Barcha mahsulotlarni boshqarish</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/add')}
                    className="bg-[#FA8232] text-white px-4 py-2 rounded-lg hover:bg-[#e6762a] transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Yangi mahsulot
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Mahsulotlar orqali qidirish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Filter size={20} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                        filterType === type
                                            ? 'bg-[#FA8232] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {type === 'all' ? 'Barchasi' : type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mahsulot
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategoriya
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Narx
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Qoldiq
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amallar
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                    src={product.image}
                                                    alt={product.title || 'product'}
                                                    onError={(e) => {
                                                        e.target.src = '/imgs/placeholder.png';
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {product.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${
                                            product.stock > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {product.stock} dona
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                                            {getStatusText(product.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                disabled
                                                className="text-blue-300 cursor-not-allowed"
                                                title="Ko'rish (hozircha yo'q)"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(product.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Tahrirlash"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="O'chirish"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <Package size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">Mahsulotlar topilmadi</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Jami {filteredProducts.length} ta mahsulot
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                        Oldingi
                    </button>
                    <button className="px-3 py-1 bg-[#FA8232] text-white rounded-lg">
                        1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                        2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Keyingi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Items;
