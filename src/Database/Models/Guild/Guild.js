const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({
    id: String,
    settings: {
        prefix: String,
        redeems: [],
        redirect: [],
        spawns: [],
        hints: [],
        spawnAfter: [],
        blacklisted: false
    }
}))