import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddProduct } from "../components/AddModal";
import { ICreateProduct, IProduct } from "../models/IProduct";
import { EditProduct } from "../components/EditModal";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import "../style/Admin.css";
import admin from "../img/admin.png";
import Button from "react-bootstrap/Button";

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

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const openEditModal = (productId: string) => {
    setSelectedProductId(productId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProductId(null);
  };

  const addProduct = async (product: ICreateProduct) => {
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

  const editProduct = async (productId: string, product: ICreateProduct) => {
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
      <div className="d-flex justify-content-center align-items-center">
        <img src={admin} alt="Admin-logo" className="admin-img" />
      </div>
      <div className="container">
        <Button variant="light" className="add-button" onClick={toggleAddModal}>
          Add
        </Button>
        <Button variant="light" className="orders-button">
          <Link to="/orders" className="orders-link">
            Orders
          </Link>{" "}
        </Button>

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
                  <button
                    className="edit-delete-button"
                    onClick={() => openEditModal(product._id)}>
                    <FiEdit />
                  </button>
                  <button
                    className="edit-delete-button"
                    onClick={() => deleteProduct(product._id)}>
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
          onClose={closeEditModal}
          openEdit={editProduct}
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
          onAddProduct={addProduct}
          onClose={() => setShowAddModal(false)}
          open={showAddModal}
        />
      )}
    </>
  );
};
