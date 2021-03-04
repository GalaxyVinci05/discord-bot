const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
require('dotenv').config();
const config = require('./config.js');
// Some useful tools to help you when coding
const tools = require('./utils/tools.js');

// Initializing new client and database
const client = new Discord.Client();
const db = new Enmap({ name: 'settings' });

client.config = config;
client.db = db;
client.tools = tools;
client.version = Discord.version;

// - Event handler -
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
const evtCount = [];

eventFiles.forEach(file => {
    const fileName = `./events/${file}`;
    const eventName = file.split('.')[0];
    const event = require(fileName);

    client.on(eventName, event.bind(null, client));
    console.log(`Loading ${eventName} event`);
    evtCount.push(eventName);
});
console.log(`Loaded ${evtCount.length} events.\n`);

client.commands = new Discord.Collection();

// - Command handler -
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const cmdCount = [];

commandFiles.forEach(file => {
    const fileName = `./commands/${file}`;
    const commandName = file.split('.')[0];
    const command = require(fileName);

    client.commands.set(commandName, command);
    console.log(`Loading ${commandName} command`);
    cmdCount.push(commandName);
});
console.log(`Loaded ${cmdCount.length} commands.\n`);

// Log in to Discord
client.login(client.config.token);