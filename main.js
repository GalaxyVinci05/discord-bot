// Including the required libraries for our main file
const Discord = require('discord.js');
const fs = require('fs');

//
require('dotenv').config();

// Here we are defining our config to access the variables in the config.js file
const config = require('./config.js');

// Now we create a new Discord client
const client = new Discord.Client();

// This will allow us to access our config file from everywhere
client.config = config;
//Simply the installed discord.js version
client.version = Discord.version;

//- Event handler -
// For the event and command handler, we use the fs module which allows to read files and directories inside the project
// Filtering files that end with ".js" which are in the ./events/ directory
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

// For each event file:
eventFiles.forEach(file => {
    // Name of the file
    const fileName = `./events/${file}`;
    // Event name: the file name until the "."
    const eventName = file.split('.')[0];
    // Getting the event by the fileName
    const event = require(fileName);
    // Loading the events by their name and binding the properties specified in the event file
    client.on(eventName, event.bind(null, client));
    console.log(`Loading ${file.length} events.`);
});

// Creating new collection for the commands
client.commands = new Discord.Collection();

// - Command handler -
// Filtering files that end with ".js" which are in the ./commands/ directory
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// For each command file:
commandFiles.forEach(file => {
    // Name of the file
    const fileName = `./commands/${file}`;
    // Command name: the file name until the "."
    const commandName = file.split('.')[0];
    // Getting the command by the fileName
    const command = require(fileName);
    // Setting our commands collection
    client.commands.set(commandName, command);
    console.log(`Loading ${file.length} commands.`);
});

// Finally, we log in to Discord with the bot token that we put in the config.json file
client.login(client.config.token);
