import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Upload,
    X,
    Loader2
} from 'lucide-react';
import { supabase } from '../../others/supabase';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        main_type: 'action',
        category: '',
        type: '',
        price: '',
        oldPrice: '',
        stock: '',
        description: '',
        specifications: '',
        status: 'active',
        image: null,
        imagePreview: ''
    });
    const [errors, setErrors] = useState({});

    const categories = ['Smartphone', 'Laptop', 'Tablet', 'Headphone', 'TV', 'Camera', 'Audio', 'Accessories'];
    const types = ['phone', 'laptop', 'tablet', 'headphone', 'tv', 'camera', 'audio', 'accessories'];
    const mainTypes = [
        { value: 'action', label: 'Action (ShopPage)' },
        { value: 'featured', label: 'Featured' },
        { value: 'accessories', label: 'Accessories' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Rasm hajmi 5MB dan kichik bo\'lishi kerak' }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file) // Yaxshiroq usul
            }));
        }
    };

    const uploadProductImage = async (file) => {
        try {
            // Fayl nomini tozalash (bo'sh joylarsiz)
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`; // Papkasiz yoki 'products' papkasi ichiga

            const { data, error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Yuklashda xato:', error.message);
            return null;
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Nom shart';
        if (!formData.category) newErrors.category = 'Kategoriya shart';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Narx xato';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setSubmitError('');

        try {
            let finalImageUrl = '/imgs/placeholder.png';

            if (formData.image) {
                const uploadedUrl = await uploadProductImage(formData.image);
                if (!uploadedUrl) throw new Error("Rasmni serverga yuklab bo'lmadi. Storage'ni tekshiring.");
                finalImageUrl = uploadedUrl;
            }

            const { error: dbError } = await supabase
                .from('products')
                .insert([{
                    title: { en: formData.title, uz: formData.title },
                    main_type: formData.main_type,
                    category: formData.category,
                    type: formData.type,
                    price: parseFloat(formData.price),
                    old_price: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
                    image: finalImageUrl,
                }]);

            if (dbError) throw dbError;

            alert('Muvaffaqiyatli qo\'shildi!');
            navigate('/admin/products');
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Yangi mahsulot</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border space-y-4">
                    {submitError && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{submitError}</div>}

                    <div>
                        <label className="block text-sm font-medium mb-1">Mahsulot nomi *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Kategoriya</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
                                <option value="">Tanlang</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Narx</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tavsif</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded-lg" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-4 h-64 flex flex-col items-center justify-center relative">
                        {formData.imagePreview ? (
                            <>
                                <img src={formData.imagePreview} className="w-full h-full object-contain" alt="Preview" />
                                <button type="button" onClick={() => setFormData(p => ({ ...p, image: null, imagePreview: '' }))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={16} /></button>
                            </>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center">
                                <Upload size={40} className="text-gray-400 mb-2" />
                                <span className="text-blue-600 font-medium">Rasm yuklash</span>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#FA8232] text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-[#e6762d] transition-colors disabled:opacity-50">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {loading ? 'Saqlanmoqda...' : 'Mahsulotni saqlash'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;