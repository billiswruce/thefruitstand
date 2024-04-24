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
      <button onClick={toggleCart}>
        <FaShoppingCart />
      </button>
      <Modal
        open={openCart}
        onClose={toggleCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            width: "80%",
            maxHeight: "80vh",
            overflow: "auto",
          }}>
          <button
            onClick={toggleCart}
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              border: "none",
              background: "none",
              fontSize: "large",
              cursor: "pointer",
            }}>
            X
          </button>
          <h2>Kundvagn</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                <div>
                  <h4>{item.product.name}</h4>
                  <p>Pris: {item.product.price} SEK</p>
                  <div>
                    <button onClick={() => handleDecrement(item.product)}>
                      <FaMinus />
                    </button>
                    <span> {item.quantity} </span>
                    <button onClick={() => handleIncrement(item.product)}>
                      <FaPlus />
                    </button>
                  </div>
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
