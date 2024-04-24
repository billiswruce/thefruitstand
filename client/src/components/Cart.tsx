import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.product._id}>
            <div onClick={() => removeFromCart(product.product)}></div>
            <img
              src={product.product.image}
              style={{ width: "40px", marginBottom: "-1px" }}
              alt={product.product.name}
            />
            {product.quantity} qty - {product.product.name} -{" "}
            {product.product.price} SEK
            <button onClick={() => removeFromCart(product.product)}>
              <FaMinus />
            </button>
            <button onClick={() => addToCart(product.product)}>
              <FaPlus />
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && <button>Pay</button>}
    </>
  );
};
