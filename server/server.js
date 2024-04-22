let express = require("express");
let app = express();
let colors = require("colors");
const mongoose = require("mongoose");
const Customers = require("./models/customers");

////////////////////////////////////////PRODUCTS////////////////////////////////////////////

app.get("/", (request, response) => {});

// Lägger till products
app.post("/create-product", (request, response) => {});

// Uppdaterar existerande produkt
app.put("/update-product", (request, response) => {});

//////////////////////////////////////////////////////USERS/////
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
      firstName: "JEssi",
      lastName: "Tell",
      address: "Kungsgatan 1",
      password: "1234",
    });

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
      { firstName: "Jenny" },
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

app.listen(3000, () => {
  console.log("Server is running".rainbow.bold);
});
