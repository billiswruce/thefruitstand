console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");
let app = express();

app.get("/", (request, response) => {
  let url = "mongodb://localhost:27017";
  let client = new mongodb.MongoClient(url);

  client
    .connect()
    .then(() => {
      console.log("Connected");
      let db = client.db("test");
      let collection = db.collection("test");

      return collection
        .insertMany([
          { a: 1 },
          { a: 2 },
          { a: 3, name: "Test product", price: 1000 },
        ])
        .then(() => {
          return collection
            .find({}) //om vi villl hitta allt från listan lämnar vi detta tomt
            .toArray()
            .then((results) => {
              console.log("Found", results);
              response.send(results);
            });
        });
    })
    .finally(() => {
      client.close();
    });
});

app.listen(3000);
