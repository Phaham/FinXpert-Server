import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";
const { MongoClient, ServerApiVersion } = require('mongodb');

/* CONFIGURATIONS */
dotenv.config();
const app = express();

// const allowedOrigins = [
//   "https://fin-xpert.vercel.app",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors);

// app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 9000;
const port = process.env.PORT || 4000;

////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!');
  // res.redirect("/");
})

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("database connected!");
//   })
//   .catch((err) => {
//     console.log("error connecting to database", err);
//   });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
///////////////////


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));


    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);

  // })
  // .catch((error) => console.log(`${error} did not connect`));
