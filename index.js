const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("data is coming soon");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@user1.istzhai.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const imageCollections = client.db("dobby-ads").collection("images");

    app.post("/upload", async (req, res) => {
      const image = req.body;
      const result = await imageCollections.insertOne(image);
      res.send(result);
    });

    app.get("/images/:email", async (req, res) => {
      const email = req.params.email;
      const query = { author: email };
      const result = await imageCollections.find(query).toArray();
      res.send(result);
    });
  } catch {}
};
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server running on port", port);
});
