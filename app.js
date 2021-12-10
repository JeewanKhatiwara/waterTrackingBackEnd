const express = require("express");
const mongoose = require("mongoose");
const Naam = require("./schema");
const url =
  "mongodb+srv://JeewanKhatiwara:jeewan@cluster0.8btld.mongodb.net/Jeewan";
const naamrouter = require("./naam-router");
mongoose.connect(url);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected");
});

db.on("error", () => {
  console.log("error");
});

// create a server
const app = express();
const port = 3000;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//this is thorw a get request
app.get("/", (req, res) => {
  res.send("server running at port: " + port);
});

app.post("/consumption", async (req, res) => {
  const name = req.body.name;
  const liter_amt = req.body.liter_amt;
  const date = req.body.date;

  //save to database
  const naam = new Naam({ name:name,liter_amt:liter_amt,date:date});

  naam
    .save()
    .then((heading) => {
      console.log("data posted");
      res.json({ msg: "namm saved", data: heading });
    })
    .catch((err) => {
      console.log(err);
    });


});

//routing the api
app.use("/api", naamrouter);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
