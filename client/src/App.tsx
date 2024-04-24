import { useEffect, useState } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { Admin } from "./components/Admin";
import { IProduct } from "./models/IProduct";
import { useCart } from "./context/CartContext";
// import logo1 from "./img/logo1.png";
import logo2 from "./img/logo2.png";
// import logo3 from "./img/logo3.png";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useCart();

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

  return (
    <>
      <img src={logo2} alt="Frukt" className="fruitbowl" />
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-wrapper">
              <img
                src={product.image}
                style={{ width: "200px" }}
                alt={product.name}
              />
              <div className="product-info">
                <p>
                  {product.name} - {product.price} SEK
                </p>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Cart />
      <Admin />
    </>
  );
}

export default App;
