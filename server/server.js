let express = require("express");
let app = express();
let colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Products = require("./models/products");
const Orders = require("./models/orders");

////////////////////////////////////////PRODUCTS////////////////////////////////////////////

app.get("/", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected my friiiieeeand, get all the Product");

    const result = await Products.find();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to retrieve customers");
  } finally {
    mongoose.connection.close();
  }
});

// Lägger till products
app.post("/create-product", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected my friiiieeeand, new Product");

    const product = new Products({
      _id: "321",
      name: "test produkt 50",
      description: "...",
      price: 300,
      image: "imgurl",
      inStock: 50,
      status: "active",
    });

    const result = await product.save();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to create product");
  } finally {
    mongoose.connection.close();
  }
});

// Uppdaterar existerande produkt
app.put("/update-product", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected");

    const result = await Products.findByIdAndUpdate(
      "321",
      { description: "en rolig sak" },
      { new: true }
    );
    response.send(result);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
});

//////////////////////////////////////////////////////USERS////////////////////////////////////////////////////

app.get("/customers", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected my friiiieeeand, get all the customers");

    const result = await Customers.find();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to retrieve customers");
  } finally {
    mongoose.connection.close();
  }
});

// Lägger till användare
app.post("/create-customer", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected my friiiieeeand, new customer");

    const customer = new Customers({
      _id: "glass@glassbilen.se",
      firstName: "Jennie",
      lastName: "Gla",
      address: "Glassgatan 23",
      password: "1234",
    });
    ss;
    const result = await customer.save();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to create customer");
  } finally {
    mongoose.connection.close();
  }
});

// Uppdaterar existerande användare
app.put("/update-customer", async (request, response) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shop");
    console.log("connected my friiiieeeand, update customer!");

    const result = await Customers.findByIdAndUpdate(
      "glass@glassbilen.se",
      { firstName: "Jennie" },
      { new: true }
    );
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to update customer");
  } finally {
    mongoose.connection.close();
  }
});

app.get("/orders", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("connected"));

    Orders.find().then((result) => {
      response.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-order", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("connected to database"));

    const order = new Orders({
      _id: "678",
      customer: "glass@glassbilen.se",
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
    r;
  }
});

app.put("/update-customer", async (request, response) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("connected to database"));

    Customers.findByIdAndUpdate("glass@glassbilen.se", {
      firstName: "Jennie",
      lastName: "Jenn",
      address: "Kungsgatan 1",
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
