// let mongodb = require("mongodb");
// let instance = null;

// class DatabaseConnection {
//   constructor() {
//     console.log("DatabaseConnection::constructor");

//     this.client = null;
//     this.url = null;

//     this.debugId = Math.floor(Math.random() * 1000000000);
//   }

//   setUrl(url) {
//     this.url = url;
//   }

//   async connect() {
//     if (!this.client) {
//       this.client = new mongodb.MongoClient(this.url);

//       await this.client.connect();
//       this.db = this.client.db("shop");
//     }
//   }

//   async getAllOrders() {
//     await this.connect();

//     let db = this.client.db("shop");
//     let collection = db.collection("orders");

//     let pipeline = [
//       {
//         $lookup: {
//           from: "lineItems",
//           localField: "order",
//           foreignField: "id",
//           as: "lineItems",
//           pipeline: [
//             {
//               $lookup: {
//                 from: "products",
//                 localField: "id",
//                 foreignField: "product",
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
//           localField: "id",
//           foreignField: "customer",
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

//     for await (let document of aggregate) {
//       orders.push(document);
//     }

//     return orders;
//   }

//   async getOrCreateCustomer(email, name, address) {
//     //METODO

//     return { id: 12345657 };
//   }

//   //KOLLA PÅ FRE EM-GENOMGÅNG OCH LÄGG TILL:
//   //   async createOrder(lineItems, customer) {

//   //     return { id: "order12345667" };
//   //   }

//   //   async createOrder(lineItems, customer) {
//   //     try {
//   //       // Skapa en ny order i databasen
//   //       let order = {
//   //         orderDate: new Date(),
//   //         customer: "email@test.com", // antar att kunden har en email
//   //         paymentId: "id från stripe", // här kan du ersätta med det verkliga stripe ID:t
//   //         status: "paid",
//   //         totalPrice: 300, // ny funktion för totalprice SEN
//   //       };

//   //       // Spara den nya ordern i databasen och returnera det genererade order-ID:t
//   //       let result = await this.db.collection("orders").insertOne(order);
//   //       return result.insertedId;
//   //     } catch (error) {
//   //       throw new Error(error.message);
//   //     }
//   //   }

//   async createOrder(lineItems, customer) {
//     try {
//       // Anslut till databasen om anslutningen inte redan är etablerad
//       if (!this.db) {
//         await this.connect();
//       }

//       // Skapa en ny order i databasen
//       let order = {
//         orderDate: new Date(),
//         customer: "email@test.com", // antar att kunden har en email
//         paymentId: "id från stripe", // här kan du ersätta med det verkliga stripe ID:t
//         status: "paid",
//         totalPrice: 300, // ny funktion för totalprice SEN
//       };

//       // Spara den nya ordern i databasen och returnera det genererade order-ID:t
//       let result = await this.db.collection("orders").insertOne(order);
//       return result.insertedId;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static getInstance() {
//     if (instance === null) {
//       instance = new DatabaseConnection();
//     }
//     return instance;
//   }
// }

// module.exports = DatabaseConnection;
