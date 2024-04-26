import { useEffect, useState } from "react";
import { Cart } from "./components/Cart";
import { IProduct } from "./models/IProduct";
import { useCart } from "./context/CartContext";
import logo2 from "./img/logo2.png";
import { FaLock } from "react-icons/fa";
import "./App.css";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { increaseCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const goToAdminPage = () => {
    window.location.href = "/admin";
  };

  return (
    <>
      <button onClick={goToAdminPage} className="admin-button">
        <FaLock />
      </button>
      <img src={logo2} alt="Frukt" className="fruitbowl" />
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-wrapper">
              <img
                src={product.image}
                className="product-image"
                alt={product.name}
              />
              <div className="product-info">
                <p>
                  {product.name} - {product.price} SEK
                </p>
                <button onClick={() => increaseCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Cart />
    </>
  );
}

export default App;
