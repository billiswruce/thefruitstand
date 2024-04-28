import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Cart } from "./components/CartModal";
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

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${message}`
        );
      }

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
      <div className="cart">
        <Cart />
      </div>
      <button onClick={goToAdminPage} className="btn btn-light admin-button">
        <FaLock />
      </button>
      <div className="d-flex justify-content-center align-items-center">
        <img src={logo2} alt="Frukt" className="fruitbowl" />
      </div>
      <ul className="product-list d-flex flex-wrap justify-content-center shadow rounded">
        {products.map((product) => (
          <li key={product._id} className="m-2">
            <div className="product-wrapper text-center">
              <img
                src={product.image}
                className="product-image"
                alt={product.name}
              />
              <div className="product-info mt-2">
                <p>
                  {product.name} - {product.price} SEK
                </p>
                <button
                  onClick={() => increaseCart(product)}
                  className="btn btn-light">
                  Add to cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
