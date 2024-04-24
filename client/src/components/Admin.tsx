import { useState } from "react";
import { AddProduct } from "./AddProduct";
import { IProduct } from "../models/IProduct";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddProduct = async (product: IProduct) => {
    //Lägg till logiken för att lägga till produkter här.
    console.log(product);
  };

  return (
    <>
      <h3>Admin</h3>
      <button onClick={handleToggleAddModal}>Add new Product</button>
      <AddProduct
        open={showAddModal}
        onClose={handleToggleAddModal}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};
