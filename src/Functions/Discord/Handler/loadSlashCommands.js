const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Commands", "Load Status");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord.js");
async function loadSlashCommands(client) {
}
module.exports = { loadSlashCommands };