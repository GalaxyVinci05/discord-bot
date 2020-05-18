const Discord = require('discord.js');               //This is needed to include the discord.js library in our main file
const {prefix, token} = require('./config.json');    //Here we define the bot prefix and the token that are located in the config.json file

const client = new Discord.Client();                 //This string creates a new Discord client

//This is the "ready event", this event executes once when you run the bot, it's needed to actually "turn the bot on"
client.once('ready', ready => {
    console.log('The bot\'s ready!');    //This will print in the command prompt the following text as we run the bot to show that the bot is up and functional
});

/* Here we have the "message event", this is always active. It is needed to run commands on Discord.
For example if you want to make a command that responds "pasta" when you type "pizza", you'll have to create that command in this event */
client.on('message', message => {
    /* In this case there is an if statement, it says that *if the content of the message sent by an user is "prefix ping", send the message "pong".*
    Where "prefix" indicates the bot prefix located in the config file */
    if (message.content === prefix+'ping') {
        message.channel.send('pong.');
    } 
    /* And this is another example where we use exactly the same code as before, the only different thing is the else statement.
    If and else are always put together and else must always come after if, even though else is not actually needed in this code, it's basically used for other things where it can be useful */
    else if (message.content === prefix+'beep') {
        message.channel.send('boop.');
    }
    /* Of course you can put plenty more methods than just the message.channel.send one, there are many methods and properties to execute different actions.
    You can find all the discord.js methods and properties at https://discord.js.org/#/docs/main/stable/general/welcome */
});

//finally, we log in to Discord with the bot token that we put in the config.json file
client.login(token);
