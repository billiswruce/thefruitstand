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
  try {
    const { customerId, cart } = req.body;

    // Skapa en ny order baserad på användarens varukorg
    const order = new Orders({
      _id: new mongoose.Types.ObjectId().toString(), // Skapa ett nytt unikt ID för ordern
      customer: customerId || null, // Tillåt ordrar att skapas utan ett kund-ID
      orderDate: new Date(),
      status: "unpaid",
      totalPrice: cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
      paymentId: "", // Du behöver fylla i detta fält med ett lämpligt värde
    });

    // Spara ordern till databasen
    await order.save();

    // Skicka ett svar till klienten
    res.json({ message: "Order created successfully", order: order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});

// app.post("/create-order", async (request, response) => {
//   try {
//     const order = new Orders({
//       _id: "678",
//       customer: "test@testsson.test",
//       orderDate: new Date(),
//       status: "unpaid",
//       totalPrice: 20,
//       paymentId: "unpaid",
//     });
//     order.save().then((result) => {
//       response.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

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

// app.put("/update-customer", async (request, response) => {
//   try {
//     Customers.findByIdAndUpdate("Jessi@jessison.se", {
//       firstName: "Jessi",
//       lastName: "Tell",
//       address: "Tellusgatan 7",
//     }).then((result) => {
//       response.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

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
