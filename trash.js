// console.log("index.js");

// let mongodb = require("mongodb");
// let express = require("express");

// let app = express();
// app.post("/create-order", (request, response) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);

//   client
//     .connect()
//     .then(() => {
//       console.log("Connected to database");

//       let db = client.db("shop");
//       let ordersCollection = db.collection("orders");

//       let newOrder = {
//         orderId: "123",
//         customer: "test-customer",
//         items: [
//           { productId: "productId1", quantity: 2, price: 1000 },
//           { productId: "productId2", quantity: 1, price: 2000 },
//         ],
//         totalPrice: 4000,
//       };

//       return ordersCollection.insertOne(newOrder).then(() => {
//         console.log("Order created");
//         response.status(201).send("Order created");
//       });
//     })
//     .catch((err) => {
//       console.error("Failed to create order", err);
//       response.status(500).send("Failed to create order");
//     })
//     .finally(() => {
//       client.close();
//     });
// });
// //
// //
// // app.get("/", (request, response) => {

// //   let url = 'mongodb://localhost:27017';
// //   let client = new mongodb.MongoClient(url);

// //   client.connect().then(() => {
// //       console.log("connected");

// //       let db = client.db('shop');
// //       let collection = db.collection('orders');

// //           return collection.find({}).toArray().then((results) => {
// //               console.log("Found", results);
// //               response.json(results);
// //           });

// //   }).finally(() => {
// //       client.close();
// //   })
// // });
// //
// //

// app.get("/", (request, response) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);

//   client.connect().then(() => {
//     console.log("connected");

//     let db = client.db("shop");
//     let collection = db.collection("orders");

//     let pipeline = [
//       {
//         $lookup: {
//           from: "lineItems",
//           localField: "orderId",
//           foreignField: "id",
//           as: "lineItems",
//           pipeline: [
//             {
//               $lookup: {
//                 from: "products",
//                 localField: "productId",
//                 foreignField: "id",
//                 as: "linkedProduct",
//               },
//             },
//             {
//               $addFields: {
//                 linkedProduct: {
//                   $first: "$linkedProduct",
//                 },
//               },
//             },
//           ],
//         },
//       },
//       {
//         $lookup: {
//           from: "customers",
//           localField: "customerId",
//           foreignField: "_Id",
//           as: "linkedCustomer",
//         },
//       },
//       {
//         $addFields: {
//           linkedCustomer: {
//             $first: "$linkedCustomer",
//           },
//           calculatedTotal: {
//             $sum: "$lineItems.totalPrice",
//           },
//         },
//       },
//     ];

//     let aggregate = collection.aggregate(pipeline);
//     let orders = [];

//     for await(let document of aggregate) {
//       orders.push(document);
//     }
//     return orders;

//   }).then((orders) => {
//     response.json(orders);
//       }
//     ).finally(() => {
//       client.close();
//     });
// });

// app.listen(3000);

// ////////////////////////////////////////////////////////////DREAMTEAM KOD
// // console.log("index.js");

// // let mongodb = require("mongodb");
// // let express = require("express");

// // let app = express();
// // app.post("/create-order", (request, response) => {
// //   let url = "mongodb://localhost:27017";
// //   let client = new mongodb.MongoClient(url);

// //   client
// //     .connect()
// //     .then(() => {
// //       console.log("Connected to database");

// //       let db = client.db("shop");
// //       let ordersCollection = db.collection("orders");

// //       let newOrder = {
// //         orderId: "123",
// //         customer: "test-customer",
// //         items: [
// //           { productId: "productId1", quantity: 2, price: 1000 },
// //           { productId: "productId2", quantity: 1, price: 2000 },
// //         ],
// //         totalPrice: 4000,
// //       };

// //       return ordersCollection.insertOne(newOrder).then(() => {
// //         console.log("Order created");
// //         response.status(201).send("Order created");
// //       });
// //     })
// //     .catch((err) => {
// //       console.error("Failed to create order", err);
// //       response.status(500).send("Failed to create order");
// //     })
// //     .finally(() => {
// //       client.close();
// //     });
// // });
// // //
// // //
// // app.get("/", (request, response) => {
// //   let url = "mongodb://localhost:27017";
// //   let client = new mongodb.MongoClient(url);

// //   client
// //     .connect()
// //     .then(() => {
// //       console.log("connected");

// //       let db = client.db("shop");
// //       let collection = db.collection("products");

// //       return collection
// //         .find({})
// //         .toArray()
// //         .then((results) => {
// //           console.log("Found", results);
// //           response.json(results);
// //         });
// //     })
// //     .finally(() => {
// //       client.close();
// //     });
// // });

// // app.listen(3000);

// /////////////////////////////////////////////////DREAMTEAMKOD
// ///////////////////////////////////////////////////
// //////////////////////////////////////////////////FÖRELÄSNING AGGREGATION
// /////lookup kombinerar två collections till en - join
// // [
// //   {
// //     $lookup: {
// //       from: "lineItems",
// //       localField: "orderId",
// //       foreignField: "id",
// //       as: "lineItems",
// //       pipeline: [
// //         {
// //           $lookup: {
// //             from: "products",
// //             localField: "productId",
// //             foreignField: "id",
// //             as: "linkedProduct",
// //           },
// //         },
// //         {
// //           $addFields: {
// //             linkedProduct: {
// //               $first: "$linkedProduct",
// //             },
// //           },
// //         },
// //       ],
// //     },
// //   },
// //   {
// //     $lookup: {
// //       from: "customers",
// //       localField: "customerId",
// //       foreignField: "_Id",
// //       as: "linkedCustomer",
// //     },
// //   },
// //   {
// //     $addFields: {
// //       linkedCustomer: {
// //         $first: "$linkedCustomer",
// //       },
// //       calculatedTotal: {
// //         $sum: "$lineItems.totalPrice",
// //       },
// //     },
// //   },
// // ]

// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////

// // [
// //   {
// //     $lookup:
// //       {
// //         from: "lineItems",
// //         localField: "_id",
// //         foreignField: "orderId",
// //         as: "lineItems",
// //       },
// //   },
// // ]

// //customers och collection
// //[
// //   {
// //     $lookup:
// //       {
// //         from: "lineItems",
// //         localField: "_id",
// //         foreignField: "orderId",
// //         as: "lineItems",
// // //       },
// // //   },
// // //   {
// // //     $lookup:
// // //       {
// // //         from: "customers",
// // //         localField: "customerId",
// // //         foreignField: "_Id",
// // //         as: "linkedCustomer",
// // //       },
// // //   },
// // // ]
// // ////////////////////////////////////////
// // console.log("index.js");
// // let mongodb = require("mongodb");
// // let express = require("express");
// // let app = express();
// // // let url = "mongodb://localhost:27017"
// // app.use(express.json());

// // //GET PRODUCTS
// // app.get("/products", (request, response) => {
// //   response.json([
// //     { id: 1, name: "produkt 1" },
// //     { id: 2, name: "produkt 2" },
// //   ]);
// // });

// // app.post("/create-order", async (request, response) => {
// //   let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(
// //     request.body.email,
// //     request.body.name,
// //     request.body.address
// //   );
// //   let order = await DatabaseConnection.getInstance().createOrder(
// //     request.lineItems,
// //     customer
// //   );

// //   response.json(order);
// // });
// // // //NYPOST
// // // app.post("/create-order", (request, response) => {
// // //   let url = "mongodb://localhost:27017";
// // //   let client = new mongodb.MongoClient(url);
// // //   client
// // //     .connect()
// // //     .then(() => {
// // //       console.log("Connected to database");
// // //       let db = client.db("shop");
// // //       let ordersCollection = db.collection("orders");
// // //       // Antag att order information kommer från klienten via request body
// // //       // Du behöver body-parser middleware för att detta ska fungera:
// // //       let newOrder = {
// // //         orderId: "123", // bör vara unikt, kanske genererat eller skickat av klienten
// // //         customer: "test-customer",
// // //         items: [
// // //           { productId: "productId1", quantity: 2, price: 1000 },
// // //           { productId: "productId2", quantity: 1, price: 2000 },
// // //         ],
// // //         totalPrice: 4000,
// // //       };
// // //       return ordersCollection.insertOne(newOrder).then(() => {
// // //         console.log("Order created", newOrder);
// // //         response.status(201).send("Order created");
// // //       });
// // //     })
// // //     .catch((err) => {
// // //       console.error("Failed to create order", err);
// // //       response.status(500).send("Failed to create order");
// // //     })
// // //     .finally(() => {
// // //       client.close();
// // //     });

// // //   request.body.name;
// // //   response.json({ test: request.body.name });
// // // });

// // app.get("/", (request, response) => {
// //   let url = "mongodb://localhost:27017";
// //   let client = new mongodb.MongoClient(url);
// //   client
// //     .connect()
// //     .then(() => {
// //       console.log("connected");
// //       let db = client.db("shop");
// //       let collection = db.collection("products");
// //       return collection
// //         .find({})
// //         .toArray()
// //         .then((results) => {
// //           console.log("Found", results);
// //           response.json(results);
// //         });
// //     })
// //     .finally(() => {
// //       client.close();
// //     });
// // });
// // app.listen(3000);

// //LOOKUPS AGGREGATION

// // [
// //   {
// //     $lookup:
// //       /**
// //        * from: The target collection.
// //        * localField: The local join field.
// //        * foreignField: The target join field.
// //        * as: The name for the results.
// //        * pipeline: Optional pipeline to run on the foreign collection.
// //        * let: Optional variables to use in the pipeline field stages.
// //        */
// //       {
// //         from: "lineItems",
// //         localField: "_id",
// //         foreignField: "orderId",
// //         as: "lineItems2",
// //       },
// //   },
// //   {
// //     $lookup:
// //       /**
// //        * from: The target collection.
// //        * localField: The local join field.
// //        * foreignField: The target join field.
// //        * as: The name for the results.
// //        * pipeline: Optional pipeline to run on the foreign collection.
// //        * let: Optional variables to use in the pipeline field stages.
// //        */
// //       {
// //         from: "customers",
// //         localField: "customer",
// //         foreignField: "customerId",
// //         as: "linkedCustomer",
// //       },
// //   },
// // ]
