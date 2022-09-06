const fs = require('node:fs');
const path = require('node:path');
const { ActivityType, Collection, EmbedBuilder } = require("discord.js");

module.exports = async (client) => {

  process.on('unhandledRejection', (reason, p) => {
    if (reason?.message === 'The request is missing a valid API key.') return;
    let channel = client.channels.cache.get('1016621443712290826');
    console.log(reason, p);
    channel?.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Unhandled Rejection')
          .setDescription(`${reason}`)
          .setColor('#FF0000')
          .addFields([
            { name: `Stack`, value: '```js\n' + reason.stack + '```' }
          ])
      ],
    });
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    let channel = client.channels.cache.get('1016621443712290826');
    console.log(err, origin);
    channel?.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Uncaught Exception')
          .setDescription(`${err}`)
          .setColor('#FF0000')
          .addFields([
            { name: `Stack`, value: '```js\n' + err.stack + '```' }
          ])
      ],
    });
  });
  process.on('multipleResolves', (type, promise, reason) => {
    if(!reason) return;
    let channel = client.channels.cache.get('1016621443712290826');
    console.log(type, promise, reason);
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Multiple Resolves')
          .setDescription(`${type}`)
          .setColor('#FF0000')
          .addField('Stack', '```js\n' + reason.stack + '```'),
      ],
    });
  });

  client.commands = new Collection();
  
  const commandsPath = require('../../../../../config.js').directory;
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }

  client.user.setActivity({
    name: "/battle",
    type: ActivityType.Playing,
  });
  console.log(`Logged in ${client.user.tag}`);
};
