const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: String,
    cardCount: Number,
    cardClaimed: Number,
    coins:Number,
    inOs: {
        type: Boolean,
        default: false
    },
    range: {
        common: Number,
        uncommon: Number,
        ultra_beast: Number,
        mythical: Number,
        legendary: Number
    },
    inTrade: {
        condition: {
            type: Boolean,
            default: false
        },
        endsIn: {
            type: Number,
            default: null
        },
        pokemons: []
    }
}))
