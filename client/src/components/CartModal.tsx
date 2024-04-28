import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { IProduct } from "../models/IProduct";
import "../style/Cart.css";

export const Cart = () => {
  const { cart, increaseCart, decreaseCart, deleteCart } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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
          customer: email,
          name: name,
          address: address,
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="light" onClick={toggleCart} className="cart-button">
        <FaShoppingCart />
      </Button>
      <Modal show={openCart} onHide={toggleCart} className="modal-style">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-container">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h5>{item.product.name}</h5>
                  <p>{`Price: ${item.product.price} SEK`}</p>
                </div>
                <div className="quantity-controls">
                  <Button
                    variant="success"
                    onClick={() => handleIncrement(item.product)}
                    className="increment-button">
                    <FaPlus />
                  </Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button
                    variant="danger"
                    onClick={() => handleDecrement(item.product)}
                    className="decrement-button">
                    <FaMinus />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Cart is empty</p>
          )}
          <h5>Total: {totalSum()} SEK</h5>
          <Form>
            <Form.Group className="form-spacing">
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={handlePayment}
            className="pay-button">
            Go to payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
