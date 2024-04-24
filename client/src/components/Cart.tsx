import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { IProduct } from "../models/IProduct";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => setOpenCart(!openCart);

  const handleIncrement = (product: IProduct) => {
    addToCart(product);
  };

  const handleDecrement = (product: IProduct) => {
    const item = cart.find((item) => item.product._id === product._id);
    if (item && item.quantity > 1) {
      decreaseQuantity(product);
    } else if (item && item.quantity === 1) {
      removeFromCart(product);
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <>
      <button
        onClick={toggleCart}
        style={{ position: "fixed", top: "10px", right: "10px" }}>
        <FaShoppingCart />
      </button>
      <Modal
        open={openCart}
        onClose={toggleCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "flex-start", // Changed from center to flex-start
          justifyContent: "flex-end", // Changed from center to flex-end
          height: "100vh", // Added to make modal full height
          overflowY: "auto", // Added to handle scrolling
        }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            width: "25%",
            maxWidth: "400px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <button
            onClick={toggleCart}
            style={{
              alignSelf: "flex-end",
              border: "none",
              background: "none",
              fontSize: "large",
              cursor: "pointer",
            }}>
            X
          </button>
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  width: "100%",
                }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                <h4 style={{ flex: 1 }}>{item.product.name}</h4>
                <p>Pris: {item.product.price} SEK</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => handleIncrement(item.product)}
                    style={{ marginLeft: "5px" }}>
                    <FaPlus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleDecrement(item.product)}
                    style={{ marginRight: "5px" }}>
                    <FaMinus />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
          <h3>Total: {calculateTotal()} kr</h3>
          <button style={{ marginTop: "10px" }}>Go to payment</button>
        </div>
      </Modal>
    </>
  );
};
