const mongoose = require("mongoose");

const naamSchema = new mongoose.Schema({ name:String,liter_amt:String,date:String});

const naamModel = mongoose.model("Water_consumption", naamSchema);

module.exports = naamModel;
