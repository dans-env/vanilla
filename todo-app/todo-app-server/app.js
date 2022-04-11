const port = 4000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.delete("/remove-item", (req, res) => {
   mongodb_remove(req.body);
});

app.post("/add-item", (req, res) => {
   mongodb_Add(req.body);
});

app.get("/get-items", async (req, res) => {
   mongodb_GetAll(res);
});

app.get("/", (req, res) => {
   res.send("Todo App Server: Hello!");
});

app.listen(port, () => {
   console.log(`Todo App server: Listening on port ${port}`);
});

const mongodb_GetAll = async (res) => {
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      const data_base = db.db("todo-app");

      data_base.collection("items").find().toArray(function(err, result) {
         if (err) throw err;
         res.send(result);
         db.close();
      });
   });
};

const mongodb_Add = async (data) => {
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

const mongodb_remove = async (data) => {
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      const data_base = db.db("todo-app");
      const dataForDeletion = data;

      data_base.collection("items").deleteOne(dataForDeletion, function(err, obj) {
        if (err) throw err;

        console.log("MongoDB - One object removed from collection: items");
        db.close();
      });
    });
};