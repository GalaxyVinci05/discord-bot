// Importing the required modules for this command
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    // Instead of using client.commands, for this command we are only using "commands" by importing it from the client
    const { commands } = client;
    // This will map all of our commands by their info
    const data = commands.map(cmd => cmd.info);

    // If there are no arguments:
    if (!args.length) {
        // This time we are using the MessageEmbed constructor because we are using a function that has to add fields into the embed for each command
        const embed = new MessageEmbed()
        .setTitle('Commands List')
        .setFooter(`Use ${client.config.prefix}help <command name> to get info of a specific command.`);
        // Now for every command mapped in the "data" variable, we are adding one field with the command data into the embed
        for (const command of data) {
            embed.addField(command.name, command.description || 'No description provided');
        }
        // Sending our embed, this time without the {} because we are using the MessageEmbed constructor and not an embed object
        return message.channel.send(embed);
    }

    // The name of the command that will be the first argument given by the user (the .toLowerCase() will read the argument with all characters in lower case)
    const name = args[0].toLowerCase();
    // Getting the command from the given "name" by their name or an alias
    const command = commands.get(name) || commands.find(c => c.config.aliases && c.config.aliases.includes(name));

    // If there is no command with the given name, give an error message
    if (!command) {
        return message.reply('invalid command.');
    }

    // Again, we are using the MessageEmbed constructor for the same reason as before: basing on various conditions we need to add one field into the embed
    const embed = new MessageEmbed()
    .setTitle(command.info.name || 'No name specified (I guess???)');
    // If the command has a description, add a field with that. The same goes for the conditions below
    if (command.info.description) embed.addField(`**Description:**`, command.info.description);
    // Since "aliases" is an array, we put the .join() method to list the strings in that array in a specific way
    if (command.config.aliases) embed.addField(`**Aliases:**`, command.config.aliases.join(', '));
    if (command.info.usage) embed.addField(`**Usage:**`, `${client.config.prefix}${command.info.name} ${command.info.usage}`);

    // Sending our embed
    message.channel.send(embed);
};

exports.info = {
    name: 'help', // Command name
    description: 'Shows a complete list of commands or searches for a specific one', //Command description
    usage: '<command name>' // Command usage
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['commands'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};