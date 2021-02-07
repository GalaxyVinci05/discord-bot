const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const config = require('./config.js');

const client = new Discord.Client();

client.config = config;
client.version = Discord.version;

// - Event handler -
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
let evtCount = [];

eventFiles.forEach(file => {
    const fileName = `./events/${file}`;
    const eventName = file.split('.')[0];
    const event = require(fileName);

    client.on(eventName, event.bind(null, client));
    console.log(`Loading ${eventName} event`);
    evtCount.push(eventName);
});
console.log(`Loaded ${evtCount.length} events.\n`);
delete evtCount;

// Commands collection
client.commands = new Discord.Collection();

// - Command handler -
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let cmdCount = [];

commandFiles.forEach(file => {
    const fileName = `./commands/${file}`;
    const commandName = file.split('.')[0];
    const command = require(fileName);

    client.commands.set(commandName, command);
    console.log(`Loading ${commandName} command`);
    cmdCount.push(commandName);
});
console.log(`Loaded ${cmdCount.length} commands.\n`);
delete cmdCount;

// Log in to Discord
client.login(client.config.token);