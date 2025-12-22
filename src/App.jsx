import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/head/Navbar";
import Advertising from "./components/temporary/Advertising";
import ShoppingPage from "./components/units/ShoppingPage";
import MainUnit from "./MainUnit";
import Footer from "./components/footer/Footer";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <BrowserRouter>
      <Advertising />
      <Navbar cartCount={totalItems} setCart={setCart} cart={cart} />

      <Routes>
        <Route path="/" element={<MainUnit addToCart={addToCart} />} />
        <Route path="/shoppingcart" element={<ShoppingPage cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;