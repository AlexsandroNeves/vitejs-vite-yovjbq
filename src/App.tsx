import React, { useState } from 'react';
import ProductList from './ProductList.tsx';
import Cart from './Cart.tsx';
import './App.css';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Waffle with Berries', price: 6.5, image: 'waffle.jpg' },
    {
      id: 2,
      name: 'Vanilla Bean Crème Brûlée',
      price: 7.0,
      image: 'creme_brulee.jpg',
    },
    // Adicione os outros produtos aqui...
  ];

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const handleConfirmOrder = () => {
    setModalOpen(true);
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setModalOpen(false);
  };

  return (
    <div className="app">
      <ProductList products={products} addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
        handleConfirmOrder={handleConfirmOrder}
      />
      {isModalOpen && (
        <OrderConfirmationModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
