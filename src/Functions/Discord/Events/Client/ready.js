const fs = require('node:fs');
const path = require('node:path');
const { ActivityType, Collection } = require("discord.js");

module.exports = async (client) => {
  client.commands = new Collection();
  
  const commandsPath = 'C:\\Users\\K MANOJ KUMAR\\Desktop\\Codes\\Axey\\src\\Commands\\Interaction'
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }

  client.user.setActivity({
    name: "-battle",
    type: ActivityType.Playing,
  });
  console.log(`Logged in ${client.user.tag}`);
};
