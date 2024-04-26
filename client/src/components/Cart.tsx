import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { IProduct } from "../models/IProduct";
import "../style/Cart.css";

export const Cart = () => {
  const { cart, increaseCart, decreaseCart, deleteCart } = useCart();
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => setOpenCart(!openCart);

  const handleIncrement = (product: IProduct) => {
    increaseCart(product);
  };

  const handleDecrement = (product: IProduct) => {
    const item = cart.find((item) => item.product._id === product._id);
    if (item && item.quantity > 1) {
      decreaseCart(product);
    } else if (item && item.quantity === 1) {
      deleteCart(product);
    }
  };

  const total = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <>
      <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart />
      </button>
      <Modal open={openCart} onClose={toggleCart} className="modal-style">
        <div className="modal-container">
          <button onClick={toggleCart} className="close-button">
            X
          </button>
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="product-image"
                />
                <h4>{item.product.name}</h4>
                <p>{`Pris: ${item.product.price} SEK`}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleIncrement(item.product)}
                    className="increment-button">
                    <FaPlus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleDecrement(item.product)}
                    className="decrement-button">
                    <FaMinus />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Cart is empty</p>
          )}
          <h3>Total: {total()} kr</h3>
          <button className="pay-button">Go to payment</button>
        </div>
      </Modal>
    </>
  );
};
