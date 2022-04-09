const port = 4000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/add-item", (req, res) => {
   mongoDB_Add(req.body);
   res.send(req.body);
});

app.get("/", (req, res) => {
   res.send("Todo App Server: Hello!");
});

app.listen(port, () => {
   console.log(`Todo App server: Listening on port ${port}`);
});

const mongoDB_Add = async (data) => {
   MongoClient.connect(url, (err, db) => {
      if (err) throw err;

      const data_base = db.db("todo-app");
      const inputData = data;

      data_base.collection("items").insertOne(inputData, (err, res) => {
        if (err) throw err;

        console.log("MongoDB - One object added to collection: items");
        db.close();
      });
   });
};