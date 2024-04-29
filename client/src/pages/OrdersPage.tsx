import { useEffect, useState } from "react";
import { IOrder, ILineItem } from "../models/IOrders";
import ordersImg from "../img/orders.png";
import "../style/OrdersPage.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
                  Order ID: <h5>{order._id}</h5>
                  {order.linkedCustomer && (
                    <>
                      Customer: <h4>{order.linkedCustomer._id}</h4>
                    </>
                  )}
                  Address: <h5>{order.address}</h5>
                  Order Date: <h5>{order.orderDate}</h5>
                  Total Price: <h5>{order.totalPrice} SEK</h5>
                  Status: <h5>{order.status}</h5>
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
                            <p className="card-text">Quantity: {item.amount}</p>
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
