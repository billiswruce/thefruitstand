import { useEffect, useState } from "react";
import { Order, LineItem } from "../models/IOrders";
import { Link } from "react-router-dom";
import "../style/OrdersPage.css";

function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <Link to="/admin" className="back-button">
        Admin
      </Link>
      <ul className="orders-list">
        {orders.map((order, index) => (
          <li key={order._id} className="order">
            <h2>Order Number: {index + 1}</h2>
            <p>Order ID: {order._id}</p>
            <p>Order Date: {order.orderDate}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: {order.totalPrice} SEK</p>
            {order.linkedCustomer && (
              <p>Customer: {order.linkedCustomer._id}</p>
            )}
            <h3>Line Items:</h3>
            <ul className="line-items">
              {order.lineItems.map((item: LineItem) => (
                <li key={item._id} className="line-item">
                  <p>Product: {item.linkedProduct.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
