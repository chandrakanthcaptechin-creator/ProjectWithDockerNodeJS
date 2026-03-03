const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://host.docker.internal:27017";
const client = new MongoClient(url);

let db, collection;

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    db = client.db("mydatabase");
    collection = db.collection("users");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

startServer();

app.get("/", async (req, res) => {
  try {
      res.json({message:'NodeJS running through docker successfully'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});