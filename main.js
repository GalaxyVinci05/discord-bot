// Including the required libraries for our main file
const Discord = require('discord.js');
const fs = require('fs');

// Requiring the dotenv package's config in order to insert the token into the process environment variables
require('dotenv').config();

// Defining our config to access the variables in it
const config = require('./config.js');

// Now we create a new Discord client
const client = new Discord.Client();

// This will allow us to access our config file from everywhere
client.config = config;
// Just defining the installed Discord.js version into the client, 'cause ya never know
client.version = Discord.version;

// - Event handler -
// For the event and command handler, we use the fs module which allows to read files and directories inside the project
// Filtering files that end with ".js" located in the ./events/ directory
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

// Logging the length of the evtCount array, which is the loaded events count
let evtCount = [];
// For each event file:
eventFiles.forEach(file => {
    // Name of the file
    const fileName = `./events/${file}`;
    // Event name: the file name until the "."
    const eventName = file.split('.')[0];
    // Getting the event by the fileName
    const event = require(fileName);
    // Loading the event by its name and binding the properties specified in the event file
    client.on(eventName, event.bind(null, client));
    // Logging the event name
    console.log(`Loading ${eventName} event`);
    // Pushing the event name in the evtCount array
    evtCount.push(eventName);
});
// Logging the loaded events count
console.log(`Loaded ${evtCount.length} events.\n`);
// Deleting the evtCount array as we don't need it anymore
delete evtCount;

// Creating a new collection for the bot commands
client.commands = new Discord.Collection();

// - Command handler -
// Filtering files that end with ".js" located in the ./commands/ directory
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Creating an array in order to count the loaded commands
let cmdCount = [];
// For each command file:
commandFiles.forEach(file => {
    // Name of the file
    const fileName = `./commands/${file}`;
    // Command name: the file name until the "."
    const commandName = file.split('.')[0];
    // Getting the command by the fileName
    const command = require(fileName);
    // Setting the command in our commands collection
    client.commands.set(commandName, command);
    // Logging the command name
    console.log(`Loading ${commandName} command`);
    // Pushing the command name in the cmdCount array
    cmdCount.push(commandName);
});
// Logging the length of the cmdCount array, which is the loaded commands count
console.log(`Loaded ${cmdCount.length} commands.\n`);
// Deleting the cmdCount array as we don't need it anymore
delete cmdCount;

// Finally, we log in to Discord with the bot token located in our config file
client.login(client.config.token);