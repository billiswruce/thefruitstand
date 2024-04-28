import { useEffect, useState } from "react";
import { Order, LineItem } from "../models/IOrders";
import ordersImg from "../img/orders.png";
import "../style/OrdersPage.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <div className="header">
        <img src={ordersImg} alt="orders-logo" className="orders-img" />
        <Link to="/admin" className="btn btn-light mb-3">
          Back to Admin
        </Link>
      </div>
      <Row>
        {orders.map((order, index) => (
          <Col md={4} key={order._id} className="mb-3">
            <Card>
              <Card.Header as="h5">Order Number: {index + 1}</Card.Header>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  Order Date: {order.orderDate}
                  <br />
                  Status: {order.status}
                  <br />
                  Total Price: {order.totalPrice} SEK
                  <br />
                  {order.linkedCustomer && (
                    <>
                      Customer: {order.linkedCustomer._id}
                      <br />
                    </>
                  )}
                </Card.Text>
                <h3>Line Items:</h3>
                <ListGroup variant="flush">
                  {order.lineItems.map((item: LineItem) => (
                    <ListGroup.Item key={item._id}>
                      Product: {item.linkedProduct.name}
                      <br />
                      Quantity: {item.amount}
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
