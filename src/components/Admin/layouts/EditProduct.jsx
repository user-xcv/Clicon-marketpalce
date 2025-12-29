import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Upload,
    X,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import { supabase } from '../../others/supabase';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
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

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id) // UUID yoki Integer ekanligiga qarab
                .single();

            if (error) throw error;

            if (data) {
                // Agar title JSON formatda bo'lsa (uz/en), uni stringga o'tkazamiz
                const titleValue = typeof data.title === 'object' && data.title !== null
                    ? (data.title.uz || data.title.en || '')
                    : (data.title || '');

                setFormData({
                    title: titleValue,
                    main_type: data.main_type || 'action',
                    category: data.category || '',
                    type: data.type || '',
                    price: data.price?.toString() || '',
                    oldPrice: data.old_price?.toString() || '',
                    stock: data.stock?.toString() || '',
                    description: data.description || '',
                    specifications: data.specifications || '',
                    status: data.status || 'active',
                    imagePreview: data.image || ''
                });
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
            alert("Ma'lumotni yuklashda xato yuz berdi");
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: "Rasm 5MB dan kichik bo'lishi kerak" }));
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Nom kiritish shart';
        if (!formData.category) newErrors.category = 'Kategoriya tanlang';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Narx xato';
        if (!formData.stock || formData.stock < 0) newErrors.stock = 'Qoldiq xato';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            let finalImageUrl = formData.imagePreview;

            // 1. Agar yangi rasm tanlangan bo'lsa, uni Storage'ga yuklash
            if (formData.image) {
                const fileExt = formData.image.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `product-images/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products') // Bucket nomi 'products' ekanligini tekshiring
                    .upload(filePath, formData.image);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                finalImageUrl = urlData.publicUrl;
            }

            // 2. Ma'lumotlarni yangilash
            const updateData = {
                title: formData.title, // Agar bazada JSON bo'lsa: { uz: formData.title } qiling
                main_type: formData.main_type,
                category: formData.category,
                type: formData.type,
                price: parseFloat(formData.price),
                old_price: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
                stock: parseInt(formData.stock),
                description: formData.description,
                specifications: formData.specifications,
                status: formData.status,
                image: finalImageUrl,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('products')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;

            alert('Muvaffaqiyatli yangilandi!');
            navigate('/admin/products');
        } catch (error) {
            alert(`Xatolik: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) return (
        <div className="flex items-center justify-center h-64 gap-3">
            <Loader2 className="animate-spin" /> Yuklanmoqda...
        </div>
    );

    return (
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 text-gray-600">
                    <ArrowLeft size={20} /> Orqaga
                </button>
                <h1 className="text-2xl font-bold">Mahsulotni tahrirlash</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Mahsulot nomi *</label>
                            <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Main Type</label>
                            <select name="main_type" value={formData.main_type} onChange={handleChange} className="w-full p-2 border rounded-lg">
                                {mainTypes.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Kategoriya</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
                                <option value="">Tanlang</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Narx</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tavsif</label>
                        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        {formData.imagePreview ? (
                            <div className="relative">
                                <img src={formData.imagePreview} className="w-full h-48 object-cover rounded-lg" alt="preview" />
                                <button type="button" onClick={() => setFormData(p => ({ ...p, image: null, imagePreview: '' }))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={14} /></button>
                            </div>
                        ) : (
                            <label className="cursor-pointer">
                                <ImageIcon size={40} className="mx-auto text-gray-400" />
                                <p className="text-sm">Rasm yuklash</p>
                                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                            </label>
                        )}
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-[#FA8232] text-white py-2 rounded-lg flex justify-center items-center gap-2">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {loading ? 'Saqlanmoqda...' : 'Yangilash'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;