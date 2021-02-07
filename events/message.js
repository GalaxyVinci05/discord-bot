// message event
module.exports = async (client, message) => {
    // Return if the message doesn't start with the bot prefix or the message author is a bot
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    // Defining the arguments: arguments in a message start after the prefix and on every space there is a new argument
    const args = message.content.slice(client.config.prefix.length).split(/ +/g);
    // The command name will be the part after the prefix, therefore we shift the args to read the command name (we push it forwards in the message)
    const commandName = args.shift().toLowerCase();

    // Getting the command in the commands collection from the "commandName"
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.config.aliases.includes(commandName));

    // If the given command doesn't exist or the command is disabled, return
    if (!command || command.config.disabled) return;

    // If the command has the ownerOnly property set to "true" and the user ID is not equal to the config.ownerID, advice the user
    if (command.config.ownerOnly && message.author.id !== client.config.ownerID) return message.reply('you are not allowed to use this command.');

    // If the command's guildOnly property is true and the command isn't ran in a guild, advice the user
    if (command.config.guildOnly && !message.guild) {
        return message.reply('This command is only executable inside a guild.');
    }

    // If the command's args property is true and the user didn't give any arguments, advice the user
    if (command.config.args && !args.length) {
        let msg = 'incorrect usage.';
        // If the command has a usage, add this text to the message
        if (command.info.usage) msg += `\nUse \`${client.config.prefix}${command.info.name} ${command.info.usage}\`.`;
        
        // Sending the message
        return message.reply(msg);
    }

    // Finally, run the command and catch errors
    await command.run(client, message, args).catch(err => {
        message.channel.send(`There has been an error while executing command: \`${command.info.name}\`.`);
        console.error(err);
    });
};
