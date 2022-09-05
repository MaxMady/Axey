const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Commands", "Load Status");
async function loadCommands(client) {
    const commandFolders = readdirSync(`${process.cwd()}/src/Commands/Message`);
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`${process.cwd()}/src/Commands/Message/${folder}`)
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/src/Commands/Message/${folder}/${file}`);
            if (command.name) {
                client.commandsz.set(command.name, command);
                table.addRow(file, "✔️");
            }
            else {
                table.addRow(file, 'Missing "command.name"');
                continue;
            }
            if (command.aliases && Array.isArray(command)) {
                command.aliases.forEach((alias) =>
                    client.aliases.set(alias, command.name));
            }
        }
    }
    console.log(table.toString());
}
module.exports = { loadCommands };