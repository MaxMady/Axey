'use-strict';
const start = require('./Showdown/showoff.js')
require("./src/Database/mongoose.js");
const discord = require("discord.js");
const { Axey } = require("./src/structure/client/client");
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const client = new Axey();

(async () => {
    await db.set(`page`, 0)
})()

client.build();
client.loader();
