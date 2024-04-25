let express = require("express");
let app = express();
let colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Product = require("./models/products");
const Orders = require("./models/orders");
const url = "mongodb://localhost:27017/shop";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// hämtar produkter
app.get("/", async (request, response) => {
  try {
    await mongoose.connect(url).then(console.log("products yooo!"));

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
    await mongoose.connect(url).then(console.log("order with details"));
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
app.post("/create-product", async (req, res) => {
  try {
    await mongoose.connect(url);

    // Extract product data from the request body
    const { name, description, price, image, inStock, status } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      inStock,
      status,
    });

    // Save the product to the database
    const result = await product.save();

    res.send(result);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding product");
  }
});

// Uppdaterar existerande produkter
app.put("/update-product/:id", async (request, response) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(url);

    // Extract product data from the request body
    const { name, description, price, image, inStock, status } = request.body;

    // Extract product ID from the request parameters
    const productId = request.params.id;

    // Find the product by ID and update it with the new data
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
    ); // { new: true } option returns the updated document

    // Send the updated product as a response
    response.send(updatedProduct);

    // Close the MongoDB connection
    mongoose.connection.close();
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

app.post("/create-order", async (request, response) => {
  try {
    await mongoose.connect(url).then(console.log("created order"));

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
    await mongoose.connect(url).then(console.log("update order"));

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
    await mongoose.connect(url).then(console.log("customer created"));

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
    await mongoose.connect(url).then(console.log("customer updated"));

    Customers.findByIdAndUpdate("Jessi@jessison.se", {
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
