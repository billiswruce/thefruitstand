import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Modal.css";
import { ICreateProduct, IeditProduct } from "../models/IProduct";

export const EditProduct: React.FC<IeditProduct> = ({
  open,
  onClose,
  openEdit,
  productId,
  product,
}) => {
  const [localProduct, setLocalProduct] = useState<ICreateProduct>(product);

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalProduct({ ...localProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openEdit(productId, localProduct);
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={localProduct.name}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={localProduct.description}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price (SEK)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={localProduct.price}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>In Stock</Form.Label>
            <Form.Control
              type="number"
              name="inStock"
              value={localProduct.inStock}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={localProduct.status}
              onChange={handleUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={localProduct.image}
              onChange={handleUpdate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="light" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
