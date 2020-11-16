//This will include the discord.js library in our main file
const Discord = require('discord.js');

//Here we are importing our bot prefix and token that we put in the config.json file
const { prefix, token } = require('./config.json');

//Now we create a new Discord client
const client = new Discord.Client();

//This is the "ready event", this event executes when the bot starts, therefore we put "client.once" because this event will only run once in our case
client.once('ready', () => {
    //The console.log method is used to print text into the console, in this case we are printing this text as soon as the bot is up and running
    console.log('The bot\'s ready!');
});

//The "message event" will run each time a message is sent in a channel, because of that if we'd put "client.once" the event will only run once
client.on('message', message => {
    //It's always good to check if a user is a bot user or not to prevent our bot from responding to other bots
    if (message.author.bot) return;

    //If a user sends a message containing the following, the bot will respond with "pong." 
    if (message.content == `${prefix}ping`) {
        message.channel.send('pong.');
    }
    //Same case as before but with different conditions (the "else" means that if the condition above isn't true, THEN it will check this one)
    else if (message.content == `${prefix}beep`) {
        message.channel.send('boop.');
    }
    //You can find the official Discord.js documentation at https://discord.js.org/#/docs/main/stable/general/welcome
});

//Finally, we log in to Discord with the bot token that we put in the config.json file
client.login(token);
