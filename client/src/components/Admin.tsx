import { useState } from "react";
import { AddProduct } from "./AddProduct";
import { ICreateProduct } from "../models/IProduct";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
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

  return (
    <>
      <h1>Admin</h1>
      <button onClick={handleToggleAddModal}>Add new Product</button>
      <AddProduct
        open={showAddModal}
        onClose={handleToggleAddModal}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};
