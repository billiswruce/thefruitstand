import { useState, useEffect } from "react";
import { AddProduct } from "./AddProduct";
import { ICreateProduct, IProduct } from "../models/IProduct";
import { EditProduct } from "./EditProduct";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

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

  const handleEditProduct = (product: ICreateProduct) => {
    console.log("Edit product:", product);
  };

  const handleAddProduct = async (product: ICreateProduct) => {
    try {
      const response = await fetch("/api/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added:", data);
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
      <h2>Admin</h2>
      <button onClick={handleToggleAddModal}>Add new Product</button>
      <AddProduct
        open={showAddModal}
        onClose={handleToggleAddModal}
        onAddProduct={handleAddProduct}
      />

      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-wrapper">
              <img
                src={product.image}
                style={{ width: "150px", height: "auto" }}
              />
            </div>
            <div className="product-info">
              {product.name} - {product.price} SEK
              <button onClick={handleToggleAddModal}>Edit Product</button>
              <EditProduct
                open={showAddModal}
                onClose={handleToggleAddModal}
                onEditProduct={handleEditProduct}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
