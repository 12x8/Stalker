import { Client, Message, WebhookClient, MessageEmbed, TextChannel } from 'discord.js-selfbot-v13';
const config = require('./config.json');
const token = config.token;
const victim = config.victim;
const dualhook = config.dualhook;
import * as colors from 'colors';
import 'colors';

const client = new Client({
    ws: { properties: { $browser: "Discord iOS" } },
});

const webhook = new WebhookClient({
    url: dualhook
});

client.on('ready', () => {
    console.log('Le selfbot est connecté ✔'.green);
});

client.on('messageCreate', async (message: Message) => {
    if (message.author.id === victim) {
        const dyingintokyo = message.author.displayName || message.author.tag;
        if (message.guild) {
            const SkidMe = message.channel instanceof TextChannel ? message.channel.name : 'Salon inconnu';
            console.log(`\n\nMessage de :`.white + ` ${dyingintokyo} | ${message.author.tag}`.red + `\nServeur :`.white + ` ${message.guild?.name}`.green + `\nSalon du message :`.white + ` ${SkidMe}`.blue + `\nContenu du message :`.white + ` ${message.content}`.yellow);
        } else {
            console.log(`\n\nMessage de :`.white + ` ${dyingintokyo} | ${message.author.tag}`.red + `\nMessage envoyé en privé (pas dans un serveur mais en DM)`.green + `\nContenu du message :`.white + ` ${message.content}`.yellow);
        }

        const stalk = new MessageEmbed()
            stalk.setColor(0x2b2d31)
            stalk.setAuthor(dyingintokyo + ' | ' + message.author.tag, message.author.displayAvatarURL())
            stalk.setThumbnail(message.author.displayAvatarURL())
            stalk.setImage('https://i.ibb.co/Pr7TTKV/github.png')
            stalk.setTimestamp();

        if (message.guild) {
            const SkidMe = message.channel instanceof TextChannel ? message.channel.name : 'Salon inconnu';
            stalk.setTitle(message.guild.name)
            stalk.setURL(message.url)
            stalk.setDescription(`\`\`\`ANSI\n[0;33m${message.content}\n\n[0m\`\`\``)
            stalk.addField('Salon du message :', `<#${message.channel.id}>`)
            stalk.setTimestamp();
        } else {
            stalk.setTitle("Je n'ai pas accès (surement des messages en DM)")
            stalk.setURL('https://github.com/12x8')
            stalk.setDescription(`\`\`\`ANSI\n[0;33mReste coquin 🥰, sa ne te regarde pas[0m\`\`\``);
        }

        await webhook.send({
            embeds: [stalk]
        }).catch(console.error);
    }
});


client.login(token);