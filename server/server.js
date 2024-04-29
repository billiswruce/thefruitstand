const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Product = require("./models/products");
const Orders = require("./models/orders");
const url = "mongodb://localhost:27017/shop";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  try {
    Product.find().then((result) => {
      response.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete-product/:id", async (request, response) => {
  try {
    const productId = request.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    response.send(deletedProduct);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error deleting product");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "lineItems",
          localField: "orderId",
          foreignField: "id",
          as: "lineItems",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "id",
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
          localField: "customerId",
          foreignField: "_Id",
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
    console.log(error);
    response.status(500).send("Error updating product");
  }
});

//saker till ordrar
// app.get("/orders", async (request, response) => {
//   try {
//     await mongoose
//       .connect("mongodb://localhost:27017/shop")
//       .then(console.log("connected to database"));

//     Orders.find().then((result) => {
//       response.send(result);
//       mongoose.connection.close();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/create-order", async (req, res) => {
  console.log("Received create-order request with body:", req.body);
  const {
    customerEmail,
    customerName,
    customerAddress,
    orderDate,
    status,
    totalPrice,
    paymentId,
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
  });

  console.log("Attempting to save new order:", newOrder);

  try {
    const savedOrder = await newOrder.save();
    console.log("New order saved successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: err.message });
  }
});

app.put("/update-order/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(id, {
      status: "paid",
    });

    if (updatedOrder) {
      response.json(updatedOrder);
    } else {
      response.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error updating order" });
  }
});

// app.put("/update-order", async (request, response) => {
//   try {
//     Orders.findByIdAndUpdate("678", {
//       status: "paid",
//     }).then((result) => {
//       response.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//saker till användare
// Hämtar användare
// app.get("/customers", async (request, response) => {
//   try {
//     await mongoose
//       .connect("mongodb://localhost:27017/shop")
//       .then(console.log("connected to database"));

//     Customers.find().then((result) => {
//       response.send(result);
//       mongoose.connection.close();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/create-customer", async (request, response) => {
//   try {
//     const customer = new Customers({
//       _id: "jennieg@jennie.se",
//       firstName: "Jennie",
//       lastName: "Jennisson",
//       address: "Kungsgatan 1",
//       password: "1337",
//     });

//     customer.save().then((result) => {
//       response.send(result);
//     });
//     clear;
//   } catch (error) {
//     console.log(error);
//   }
// });

app.put("/update-customer", async (request, response) => {
  try {
    Customers.findByIdAndUpdate("Jessi@jessison.se", {
      firstName: "Jessi",
      lastName: "Tell",
      address: "Tellusgatan 7",
    }).then((result) => {
      response.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

mongoose.connect(url).then(() => {
  console.log("Connected to db".rainbow.bold);
  app.listen(3000, () => {
    console.log("Server is running".rainbow.bold);
  });
});
