let express = require("express");
let app = express();
let colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Product = require("./models/products");
const Orders = require("./models/orders");

// Etablera en permanent anslutning till MongoDB
mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(() => {
    console.log("Successfully connected to database".green);
  })
  .catch((err) => {
    console.error("Failed to connect to database".red, err.message);
  });

////////////////////////////////////////PRODUCTS//////////////////////////////////
app.get("/", async (request, response) => {
  try {
    const result = await Product.find();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to retrieve products");
  }
});

// Lägger till produkter
app.post("/create-product", async (request, response) => {
  try {
    const product = new Product({
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
  }
});

// Uppdaterar existerande produkt
app.put("/update-product", async (request, response) => {
  try {
    const result = await Product.findByIdAndUpdate(
      "321",
      { description: "en rolig sak" },
      { new: true }
    );
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to update product");
  }
});

//////////////////////////////////////////////////////USERS////////////////////////////////////////////////////

app.get("/customers", async (request, response) => {
  try {
    const result = await Customers.find();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to retrieve customers");
  }
});

// Lägger till användare
app.post("/create-customer", async (request, response) => {
  try {
    const customer = new Customers({
      _id: "glass@glassbilen.se",
      firstName: "Jennie",
      lastName: "Gla",
      address: "Glassgatan 23",
      password: "1234",
    });

    const result = await customer.save();
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to create customer");
  }
});

// Uppdaterar existerande användare
app.put("/update-customer", async (request, response) => {
  try {
    const result = await Customers.findByIdAndUpdate(
      "glass@glassbilen.se",
      { firstName: "Jennie" },
      { new: true }
    );
    response.send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send("Failed to update customer");
  }
});

app.listen(3000, () => {
  console.log("Server is running".rainbow.bold);
});
