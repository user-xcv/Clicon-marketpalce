import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Komponentlar
import Navbar from "./components/head/Navbar";
import Footer from "./components/footer/Footer";
import MainUnit from "./MainUnit";

// ADMIN Komponentlari (Yo'llarni o'zingizniki bilan tekshiring)
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./components/Admin/layouts/Dashboard";
import Items from "./components/Admin/layouts/Items";
import AddProduct from "./components/Admin/layouts/AddProduct";
import EditProduct from "./components/Admin/layouts/EditProduct";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Layout boshqaruvchi komponent
const AppLayout = ({ children, cartCount, wishlistCount }) => {
  const location = useLocation();
  // Agar yo'l /admin bilan boshlansa, asosiy Navbar/Footer ko'rsatmaymiz
  const isAdminPath = location.pathname.startsWith("/admin");

  if (isAdminPath) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#191C1F]">
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Savat va Wishlist funksiyalari (sizning kodingiz)
  const addToCart = (product) => { /* ... */ };
  const toggleWishlist = (product) => { /* ... */ };

  return (
    <Router>
      <ScrollToTop />
      <AppLayout cartCount={cart.length} wishlistCount={wishlist.length}>
        <AnimatePresence mode="wait">
          <Routes>
            {/* ASOSIY SAYT */}
            <Route path="/" element={<MainUnit addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />

            {/* ADMIN PANEL (Outlet orqali ichki sahifalarni ko'rsatadi) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Items />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
            </Route>

            {/* Login sahifasi (AdminLayout ichida emas, alohida bo'lishi kerak) */}
            <Route path="/admin-login" element={<div>Login sahifasini shu yerga qo'ying</div>} />

            <Route path="*" element={<div className="py-20 text-center font-bold">404 - Sahifa topilmadi</div>} />
          </Routes>
        </AnimatePresence>
      </AppLayout>
    </Router>
  );
};

export default App;