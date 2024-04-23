let express = require("express");
let app = express();
let colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Product = require("./models/products");
const Orders = require("./models/orders");

// hämtar produkter
app.get("/", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("products yooo!"));

    Product.find().then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

//AGGREGATION FÖR ALLA GET:
app.get("/orders-with-details", async (req, res) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("order with details"));
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

// Lägger till produkter
app.post("/create-product", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("created product"));

    const product = new Product({
      name: "Watermelon",
      description: "Watermelon is a delicious fruit",
      price: 119,
      image:
        "https://cdn.midjourney.com/fab8524e-6e88-4cf5-a838-329c5b6a6c67/0_2.webp",
      inStock: 30,
      status: "active",
    });

    product.save().then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// Uppdaterar existerande produkter
app.put("/update-product", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("connected"));

    Products.findByIdAndUpdate("321", {
      description: "en rolig sak",
    }).then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
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

app.post("/create-order", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("created order"));

    const order = new Orders({
      _id: "678",
      customer: "test@testsson.test",
      orderDate: new Date(),
      status: "unpaid",
      totalPrice: 20,
      paymentId: "unpaid",
    });
    order.save().then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/update-order", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("update order"));

    Orders.findByIdAndUpdate("678", {
      status: "paid",
    }).then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

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

// Lägger till användare
app.post("/create-customer", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("customer created"));

    const customer = new Customers({
      _id: "jennieg@jennie.se",
      firstName: "Jennie",
      lastName: "Jennisson",
      address: "Kungsgatan 1",
      password: "1337",
    });

    customer.save().then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
    clear;
  } catch (error) {
    console.log(error);
  }
});

// Uppdaterar existerande användare
app.put("/update-customer", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("customer updated"));

    Customers.findByIdAndUpdate("nurydberg@najssomfan.se", {
      firstName: "Jessi",
      lastName: "Tell",
      address: "Tellusgatan 7",
    }).then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running".rainbow.bold);
});
