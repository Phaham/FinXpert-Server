import express, { Router } from "express";
import serverless from "serverless-http";
import fs from "fs";
import path from "path";

const api = express();
const router = Router();

// Load the JSON data
const dataPath = path.join(__dirname, "data", "data.json");
let data: any;

// Read data.json file
fs.readFile(dataPath, "utf-8", (err, fileData) => {
  if (err) {
    console.error("Error reading data.json:", err);
  } else {
    try {
      data = JSON.parse(fileData);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
    }
  }
});

// Endpoint for /kpi
router.get("/kpi/kpis", (req, res) => {
  if (data && data.kpis) {
    res.json(data.kpis); // Send KPIs data
  } else {
    res.status(500).json({ message: "Error fetching KPIs data" });
  }
});

// Endpoint for /product
router.get("/product/products", (req, res) => {
  if (data && data.products) {
    res.json(data.products); // Send products data
  } else {
    res.status(500).json({ message: "Error fetching products data" });
  }
});

// Endpoint for /transaction
router.get("/transaction/transactions", (req, res) => {
  if (data && data.transactions) {
    res.json(data.transactions); // Send transactions data
  } else {
    res.status(500).json({ message: "Error fetching transactions data" });
  }
});

api.use("/api", router);

export const handler = serverless(api);
