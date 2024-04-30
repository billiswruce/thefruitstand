const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/shop";
const Customers = require("./models/customers");
const Product = require("./models/products");
const Orders = require("./models/orders");
const LineItems = require("./models/lineItems");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create-product", async (req, res) => {
  try {
    const { name, description, price, image, inStock, status } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      inStock,
      status,
    });
    const result = await product.save();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding product");
  }
});

app.get("/", async (request, response) => {
  try {
    Product.find().then((result) => {
      response.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/update-product/:id", async (request, response) => {
  try {
    const { name, description, price, image, inStock, status } = request.body;
    const productId = request.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        image,
        inStock,
        status,
      },
      { new: true }
    );
    response.send(updatedProduct);
  } catch (error) {
    response.status(500).send("Error updating product");
  }
});

app.delete("/delete-product/:id", async (request, response) => {
  try {
    const productId = request.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    response.send(deletedProduct);
  } catch (error) {
    response.status(500).send("Error deleting product");
  }
});

app.post("/create-order", async (req, res) => {
  console.log("Received create-order:", req.body);
  const {
    customerEmail,
    customerName,
    customerAddress,
    orderDate,
    status,
    totalPrice,
    paymentId,
    products,
  } = req.body;

  const newOrder = new Orders({
    _id: new mongoose.Types.ObjectId(),
    customer: customerName,
    customerEmail: customerEmail,
    customerAddress: customerAddress,
    orderDate: orderDate,
    status: status,
    totalPrice: totalPrice,
    paymentId: paymentId,
    products: products,
  });

  try {
    const savedOrder = await newOrder.save();
    req.body.items.forEach(async (item) => {
      new LineItems({
        orderId: savedOrder._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }).save();
      console.log(item);
    });
    console.log("New order saved successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "lineitems",
          localField: "_id",
          foreignField: "orderId",
          as: "lineItems",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "linkedProduct",
              },
            },
            {
              $addFields: {
                linkedProduct: {
                  $first: "$linkedProduct",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "linkedCustomer",
        },
      },
      {
        $addFields: {
          linkedCustomer: {
            $first: "$linkedCustomer",
          },
          calculatedTotal: {
            $sum: "$lineItems.totalPrice",
          },
        },
      },
    ];

    const ordersWithDetails = await Orders.aggregate(pipeline);
    res.json(ordersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose.connect(url).then(() => {
  console.log("Connected to db".rainbow.bold);
  app.listen(3000, () => {
    console.log("Server is running".rainbow.bold);
  });
});
