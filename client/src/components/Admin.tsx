import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddProduct } from "./AddProductModal";
import { ICreateProduct, IProduct } from "../models/IProduct";
import { EditProduct } from "./EditProductModal";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import "../style/Admin.css";
import admin from "../img/admin.png";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

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

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleOpenEditModal = (productId: string) => {
    setSelectedProductId(productId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProductId(null);
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
        fetchProducts();
        setShowAddModal(false);
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (
    productId: string,
    product: ICreateProduct
  ) => {
    try {
      const response = await fetch(`/api/update-product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product updated:", data);
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error with updating product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/delete-product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted:", productId);
        fetchProducts();
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <img src={admin} alt="Admin-logo" className="admin-img" />
      <div className="container">
        <button className="add-button" onClick={handleToggleAddModal}>
          +
        </button>
        <button className="orders-button">Orders</button>
        <AddProduct
          open={showAddModal}
          onClose={handleToggleAddModal}
          onAddProduct={handleAddProduct}
        />
        <Link to="/" className="back-button">
          Home
        </Link>
      </div>

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
                <div>
                  <p>{product.name}</p>
                  <p>{product.price} SEK</p>
                </div>
                <div className="button-group">
                  <button onClick={() => handleOpenEditModal(product._id)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => deleteProduct(product._id)}>
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedProductId && (
        <EditProduct
          open={showEditModal}
          onClose={handleCloseEditModal}
          onEditProduct={handleEditProduct}
          productId={selectedProductId}
          product={
            products.find(
              (p) => p._id === selectedProductId
            ) as unknown as ICreateProduct
          }
        />
      )}
      {showAddModal && (
        <AddProduct
          onAddProduct={handleAddProduct}
          onClose={() => setShowAddModal(false)}
          open={false}
        />
      )}
    </>
  );
};

export default Admin;
