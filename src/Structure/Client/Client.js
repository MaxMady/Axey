const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("../../Functions/Discord/Handler/loadCommands");
const { loadEvents } = require("../../Functions/Discord/Handler/loadEvents");
const { loadSlashCommands } = require("../../Functions/Discord/Handler/loadSlashCommands");
const TOKEN = require('../../../config.js').token
let client;
class Axey extends Client {
    constructor() {
        super({
            autoReconnect: true,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.Reaction
            ],
            allowedMentions: {
                parse: ['users', 'roles'],
                repliedUser: true
            },
            failIfNotExists: false,
        });
        this.commandsz = new Collection();
        this.aliases = new Collection();
        this.slash = new Collection();
        this.token = TOKEN;
    }
    build() {
        try {
            this.login(TOKEN);
        }
        catch (err) {
            console.error(err);
        }
    }
    restart() {
        try {
            this.destroy()
                .then(() => {
                    this.login(TOKEN);
                })
        } catch (err) {
            switch (err) {
                case !this:
                    this.login(TOKEN);
                    this.log(err);
                    break;
                default:
                    this.login(TOKEN);
                    break;
            }
        }
    }
    loader() {
        try {
            loadEvents(this);
            loadCommands(this);
            loadSlashCommands(this);
            client = this
        } catch (err) {
            console.error(err);
        }
    }
}
module.exports = { Axey, client };