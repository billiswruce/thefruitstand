import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaShoppingCart, FaTimes } from "react-icons/fa";
import { IProduct } from "../models/IProduct";
import "../style/Cart.css";

export const Cart = () => {
  const { cart, increaseCart, decreaseCart, deleteCart } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [email, setEmail] = useState("");

  const toggleCart = () => setOpenCart(!openCart);

  const handleIncrement = (product: IProduct) => increaseCart(product);

  const handleDecrement = (product: IProduct) => {
    const item = cart.find((item) => item.product._id === product._id);
    if (item) {
      if (item.quantity > 1) {
        decreaseCart(product);
      } else {
        deleteCart(product);
      }
    }
  };

  const totalSum = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: email, // Använd e-postadressen som kund-ID
          products: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Order creation failed with status code: ${response.status} and status text: ${response.statusText}`
        );
      }

      // Hantera svaret från servern om det behövs...
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={toggleCart} className="cart-button">
        <FaShoppingCart />
      </button>
      <Modal open={openCart} onClose={toggleCart} className="modal-style">
        <div className="modal-container">
          <button onClick={toggleCart} className="close-button">
            <FaTimes />
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
                <div className="product-details">
                  <h4>{item.product.name}</h4>
                  <p>{`Price: ${item.product.price} SEK`}</p>
                </div>
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
          <h3>Total: {totalSum()} kr</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handlePayment} className="pay-button">
            Go to payment
          </button>
        </div>
      </Modal>
    </>
  );
};
