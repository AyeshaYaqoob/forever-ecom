import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MiniCart from '../components/MiniCart';
import { useState } from 'react';

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default MainLayout;
