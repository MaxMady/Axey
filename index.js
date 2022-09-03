'use-strict';
const start = require('./showoff.js')
require("./src/Database/mongoose.js");
const discord = require("discord.js");
const { Axey } = require("./src/structure/client/client");

const client = new Axey();

client.build();
client.loader();
