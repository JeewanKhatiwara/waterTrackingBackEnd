const express = require("express");
const router = express.Router();
const Naam = require("./schema");

router.get("/getconsumption", (req, res) => {
  //db.collection.find();
  Naam.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
