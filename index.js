'use-strict';
const start = require('./showoff.js')
require("./src/Database/mongoose.js");
const discord = require("discord.js");
const { PokeKai } = require("./src/structure/client/client");

const client = new PokeKai();

client.build();
client.loader();
start()