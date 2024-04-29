import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IOrder, ILineItem } from "../models/IOrders";
import ordersImg from "../img/orders.png";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/OrdersPage.css";

function OrdersList() {
  const [orders, setOrders] = useState<IOrder[]>([]);

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
  console.log(orders);
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
                <Card.Text>
                  Order ID: <span className="text-value">#{order._id}</span>
                  {order.customerEmail && (
                    <>
                      Customer:{" "}
                      <span className="text-value">{order.customerEmail}</span>
                    </>
                  )}
                  Address: <span className="text-value">{order.address}</span>
                  Order Date:{" "}
                  <span className="text-value">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                  Total Price:{" "}
                  <span className="text-value">{order.totalPrice} SEK</span>
                  Status: <span className="text-value">{order.status}</span>
                </Card.Text>
                <ListGroup variant="flush">
                  {order.lineItems.map((item: ILineItem) => (
                    <div key={item._id} className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={item.linkedProduct.image}
                            className="card-img-small"
                            alt={item.linkedProduct.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {item.linkedProduct.name}
                            </h5>
                            <p className="card-text">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
