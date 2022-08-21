const mongoose = require("mongoose");

module.exports = mongoose.model("Verification", new mongoose.Schema({
    id: String,
    verified: Boolean
}))