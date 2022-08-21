const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { readFileSync } = require("fs");
const path = require("path");
const PokemonSchema = require("../../Database/Models/Game/Pokemon");
const { json_length } = require("./json_length");

async function getStarterPokemon(message, pokemon) {
    const data = await PokemonSchema.findOne({
        id: message.author.id
    })
    if (!data) {
        const pokemonsInJson = JSON.parse(readFileSync(path.join(__dirname, `../../Game/JSON/pokemon.js`)));
        const pokemonToAdd = json_length(pokemonsInJson.filter(el => el.name.english.toLowerCase() == pokemon.toLowerCase()))
        if (!pokemonToAdd) return message.channel.send({
            content: "There was a problem while creating your data. Please re-use the command."
        })
        const { name, id, profile } = pokemonToAdd;
        let gender;
        let counter = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        if (counter > 80) {
            if (profile.gender == "Genderless" || profile.gender == "genderless") {
                gender = "Genderless"
            } else {
                if (profile.gender == "0:100") {
                    gender = "Female"
                } else if (profile.gender == "100:0") {
                    gender = "Male"
                } else {
                    gender = "Female"
                }
            }
        } else {
            if (profile.gender == "Genderless" || profile.gender == "genderless") {
                gender = "Genderless"
            } else {
                if (profile.gender == "0:100") {
                    gender = "Female"
                } else if (profile.gender == "100:0") {
                    gender = "Male"
                } else {
                    gender = "Male"
                }
            }
        }
        const natures = [
            "Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty", "Impish",
            "Jolly", "Lax", "Lonely", "Mild", "Modest", 'Naive', "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy",
            "Serious", "Timid"
        ];
        let ivhp, ivatk, ivdef, ivspa, ivspd, ivspe
        for (let i = 0; i < 6; i++) {
            const ivsToGive = Math.floor(Math.random() * (31 - 1 + 1) + 1)
            switch (i) {
                case 0:
                    ivhp = ivsToGive;
                    break;
                case 1:
                    ivatk = ivsToGive;
                    break;
                case 2:
                    ivdef = ivsToGive;
                    break;
                case 3:
                    ivspa = ivsToGive;
                    break;
                case 4:
                    ivspd = ivsToGive;
                    break;
                case 5:
                    ivspe = ivsToGive;
                    break;
            }
        };
        const nature = natures[Math.floor(Math.random() * natures.length)];
        await new PokemonSchema({
            id: message.author.id,
            pokemon: [{
                owner_id: message.author.id,
                name: name.english,
                id: id,
                nickname: name.english,
                gender: gender,
                level: 1,
                xp: 0,
                friendship: 0,
                ivs: {
                    HP: ivhp,
                    Atk: ivatk,
                    Def: ivdef,
                    SpA: ivspa,
                    SpD: ivspd,
                    Spe: ivspe
                },
                moves: {
                    1: "Tackle",
                    2: "Not Added",
                    3: "Not Added",
                    4: "Not Added"
                },
                holding: null,
                nature: nature
            }],
            pokemon_count: 1,
            pokemon_released: 0,
            shinyPokemonToEncounter: null,
            shinyEncounter_in: 0,
            inTrade: {
                condition: false,
                endsIn: null,
                coins: null,
                pokemons: []
            }
        }).save().catch(err => console.log(err));
        if (id < 10) {
            id = `00${id}`;
        }
        else if (id > 9 && id < 99) {
            id = `0${id}`
        }
        const attachment = new AttachmentBuilder(`${process.cwd()}/src/Game/Assets/Images/Pokemons/${id}.png`, { name: "pokemon.png" })
        const embed = new EmbedBuilder()
            .setTitle(`You have selected ${name.english} as your starter pokémon.`)
            .setThumbnail(`attachment://${attachment.name}`)
            .setColor('Orange');
        return message.channel.send({
            embeds: [embed],
            files: [attachment]
        })
    } else {
        return message.channel.send({
            content: "You have already selected your starter pokémon."
        })
    }
}

module.exports = {
    getStarterPokemon
}