const clientEvents = (file) => require(`../Events/Client/${file}`);
const guildEvents = (file) => require(`../Events/Guild/${file}`);
const InterActionEvents = (file) => require(`../Events/Interaction/${file}`);

async function loadEvents(client) {
    client.on("ready", () => clientEvents("ready")(client));
    client.on("messageCreate", (m) => guildEvents("command")(m));

    //InterAction
    client.on("interactionCreate", (i) => InterActionEvents("verificationChecker")(i));
}

module.exports = { loadEvents };