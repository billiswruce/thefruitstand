import { useEffect, useState } from "react";
import { Order, LineItem } from "../models/IOrders";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      <Link to="/admin" className="btn btn-light mb-3">
        Admin
      </Link>
      <Row>
        {orders.map((order, index) => (
          <Col md={4} key={order._id} className="mb-3">
            <Card>
              <Card.Header as="h5">Order Number: {index + 1}</Card.Header>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  <p>Order Date: {order.orderDate}</p>
                  <p>Status: {order.status}</p>
                  <p>Total Price: {order.totalPrice} SEK</p>
                  {order.linkedCustomer && (
                    <p>Customer: {order.linkedCustomer._id}</p>
                  )}
                </Card.Text>
                <h3>Line Items:</h3>
                <ListGroup variant="flush">
                  {order.lineItems.map((item: LineItem) => (
                    <ListGroup.Item key={item._id}>
                      <p>Product: {item.linkedProduct.name}</p>
                      <p>Quantity: {item.quantity}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default OrdersList;
