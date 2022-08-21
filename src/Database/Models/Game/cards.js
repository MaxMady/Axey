const mongoose = require("mongoose");

module.exports = mongoose.model("Cards", new mongoose.Schema({
    id: String,
    cards: Array,
    
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
