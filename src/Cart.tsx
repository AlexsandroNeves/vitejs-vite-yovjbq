import React from 'react';
import { CartItem } from './types.ts';

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  handleConfirmOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
  handleConfirmOrder,
}) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart ({cartItems.length})</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <div>
              <button
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity + 1)
                }
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Cart;
