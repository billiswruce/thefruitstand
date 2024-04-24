import { useEffect, useState } from "react";
import "./App.css";
import logo from "./img/fruitbowl.png";
import { Admin } from "./components/Admin";
import { IProduct } from "./models/IProduct";
import { Cart } from "./components/Cart";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
    console.log("Product added to cart:", product);
  };

  return (
    <>
      <img src={logo} alt="Frukt" className="fruitbowl" />
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
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Cart cart={cart} />
      <Admin />
    </>
  );
}

export default App;
