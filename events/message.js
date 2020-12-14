// message event
module.exports = async (client, message) => {
    // Check if a user is a bot user or not to prevent the bot from responding to other bots
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    // Defining the arguments: arguments in a message start after the prefix and on every space there is a new argument
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    // The command name will come after the prefix, therefore we shift the args (we push it forwards in the message)
    const commandName = args.shift().toLowerCase();

    // Getting the command from the "commandName"
    const command = client.commands.get(commandName) 
    || client.commands.find(cmd => cmd.config.aliases.includes(commandName));

    // If the given command doesn't exist, ignore it
    if (!command) return;
    // Else if the command is disabled, ignore it too
    else if (command.config.disabled) return;

    // If the command has the ownerOnly option set to "true" AND the user ID does NOT equal to the config.ownerID, send an error message
    if (command.config.ownerOnly && message.author.id !== client.config.ownerID) return message.reply('you are not allowed to use this command.');

    // If the command's guildOnly option is true AND the channel where the command is ran, is a DM channel, send an error message
    if (command.config.guildOnly && message.channel.type == 'dm') {
        return message.reply('I can\'t run that command inside DMs.');
    }

    // If the command's args option is true AND the user didn't give any arguments, send an error message
    if (command.config.args && !args.length) {
        let msg = `incorrect usage.`;
        // If the command has a usage, add this text to the message
        if (command.info.usage) {
            msg += `\nUse \`${client.config.prefix}${command.info.name} ${command.info.usage}\`.`;
        }
        // Sending the message
        return message.reply(msg);
    }

    // Finally, run the command and catch errors
    await command.run(client, message, args).catch(err => {
        message.channel.send(`There has been an error while executing command: \`${command.info.name}\`.`);
        console.error(err);
    });
};
