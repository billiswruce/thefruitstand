// let express = require("express");
// let app = express();
// // let url = "mongodb://localhost:27017";
// // let client = new mongodb.MongoClient(url);
// let colors = require("colors");
// const mongoose = require("mongoose");
// const Customers = require("./models/customers");

// ////////////////////////////////////////PRODUCTS////////////////////////////////////////////

// app.get("/", (request, response) => {
//   // let db = client.db("shop");
//   // let collection = db.collection("products");
//   // client
//   //   .connect()
//   //   .then(() => {
//   //     console.log("Connected");
//   //     return collection
//   //       .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//   //       .toArray()
//   //       .then((results) => {
//   //         console.log("Found", results);
//   //         response.send(results);
//   //       });
//   //   })
//   //   .finally(() => {
//   //     client.close();
//   //   });
// });

// // Lägger till products
// app.post("/create-product", (request, response) => {
//   // client
//   //   .connect()
//   //   .then(async () => {
//   //     console.log("Connected");
//   //     let db = client.db("shop");
//   //     let collection = db.collection("products");
//   //     await collection.insertOne({
//   //       id: "fake_Id",
//   //       name: "Test product 9",
//   //       price: 200,
//   //       description: "...",
//   //       image: null,
//   //       inStock: 5,
//   //       status: "draft",
//   //       category: null,
//   //     });
//   //     return collection
//   //       .find({})
//   //       .toArray()
//   //       .then((results) => {
//   //         console.log("Found", results);
//   //         response.send(results);
//   //       });
//   //   })
//   //   .finally(() => {
//   //     client.close();
//   //   });
// });

// // Uppdaterar existerande användare
// app.put("/update-product", (request, response) => {
//   // client
//   //   .connect()
//   //   .then(async () => {
//   //     console.log("Connected");
//   //     let db = client.db("shop");
//   //     let collection = db.collection("customers");
//   //     const filter = { email: "test@test.com" };
//   //     const options = { upsert: true };
//   //     const updateDoc = {
//   //       $set: {
//   //         plot: `A harvest of random numbers, such as: ${Math.random()}`,
//   //       },
//   //     };
//   //     await collection.updateOne(filter, updateDoc, options);
//   //     return collection
//   //       .find({})
//   //       .toArray()
//   //       .then((results) => {
//   //         console.log("Found", results);
//   //         response.send(results);
//   //       });
//   //   })
//   //   .finally(() => {
//   //     client.close();
//   //   });
// });

// ////////////////////////////////////////////////////////////////////
// // Hämtar användare
// app.get("/users", async (request, response) => {
//   await mongoose
//     .connect("mongodb://localhost:27017/shop", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(console.log("connected my friiiieeeand"));

//   Customers.find().then((result) => {
//     response.send(result);
//     mongoose.connection.close();
//   });
// });

// // Lägger till användare
// app.post("/create-user", (request, response) => {
//   // client
//   //   .connect()
//   //   .then(async () => {
//   //     console.log("Connected");
//   //     let db = client.db("shop");
//   //     let collection = db.collection("customers");
//   //     await collection.insertOne({
//   //       email: "test@test.com",
//   //       firstName: "Test",
//   //       lastName: "Testsson",
//   //       adress: "Testgatan",
//   //       houseNumber: "1",
//   //       password: "p4$$w0rd",
//   //     });
//   //     return collection
//   //       .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//   //       .toArray()
//   //       .then((results) => {
//   //         console.log("Found", results);
//   //         response.send(results);
//   //       });
//   //   })
//   //   .finally(() => {
//   //     client.close();
//   //   });
// });

// // Uppdaterar existerande användare
// app.put("/update-user", (request, response) => {
//   // client
//   //   .connect()
//   //   .then(async () => {
//   //     console.log("Connected");
//   //     let db = client.db("shop");
//   //     let collection = db.collection("customers");
//   //     const filter = { email: "test@test.com" };
//   //     const options = { upsert: true };
//   //     const updateDoc = {
//   //       $set: {
//   //         plot: `A harvest of random numbers, such as: ${Math.random()}`,
//   //       },
//   //     };
//   //     await collection.updateOne(filter, updateDoc, options);
//   //     return collection
//   //       .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//   //       .toArray()
//   //       .then((results) => {
//   //         console.log("Found", results);
//   //         response.send(results);
//   //       });
//   //   })
//   //   .finally(() => {
//   //     client.close();
//   //   });
// });

// app.listen(3000, () => {
//   console.log("Server is running".rainbow.bold);
// });
