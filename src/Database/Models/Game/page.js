const mongoose = require("mongoose");
module.exports = mongoose.model("Page", new mongoose.Schema({
    pageCount: Number,
}))

