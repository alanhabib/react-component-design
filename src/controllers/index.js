// const express = require("express");
// const instanceOfRouter = express.Router();
// const ObjectId = require("mongodb").ObjectId;
// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;

// let db;

// MongoClient.connect(
//   Db,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   function (err, client) {
//     if (err) throw err;
//     db = client.db("phone-contacts");
//   }
// );

// instanceOfRouter.route("/").get((req, res) => {
//   db.collection("contacts")
//     .find({})
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// instanceOfRouter.route("/add").post((request, response) => {
//   let myObj = {
//     name: request.body.name,
//     position: request.body.position,
//     level: request.body.level,
//   };
//   db.collection("activeUsers").insertOne(myObj, (err, res) => {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// instanceOfRouter.route("/update").put((req, res) => {
//   let myQuery = { _id: ObjectId(req.params.id) };
//   let newValues = {
//     $set: {
//       name: request.body.name,
//       position: request.body.position,
//       level: request.body.level,
//     },
//   };
//   db.collection("contacts").updateOne(myQuery, newValues, (err, response) => {
//     if (err) throw err;
//     console.log("1 Document updated");
//     res.json(response);
//   });
// });

// instanceOfRouter.route("/:id").delete((req, res) => {
//   let myQuery = { _id: ObjectId(req.params.id) };
//   db.collection("contacts").deleteOne(myQuery, (err, obj) => {
//     if (err) throw err;
//     res.status(obj);
//   });
// });

// module.exports = instanceOfRouter;
