module.exports = async (client, message) => {
    // Ignoring messages that don't start with the bot prefix or sent by bots
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    if (message.guild) {
        message.guild.settings = client.db.get(message.guild.id);

        if (!message.guild.settings) {
            const dbStructure = {
                guildName: message.guild.name,
                prefix: client.config.prefix,
                muteRole: ''
            };

            client.db.set(message.guild.id, dbStructure);
        }
    }

    const args = message.content.slice(client.config.prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.config.aliases.includes(commandName));

    if (!command || command.config.disabled || command.config.unlisted) return;

    // Owner only
    if (command.config.ownerOnly && message.author.id !== client.config.ownerID) return message.reply('you are not allowed to use this command.');

    // Guild only
    if (command.config.guildOnly && !message.guild) {
        return message.reply('This command is only executable inside a guild.');
    }

    // Command permissions
    if (command.config.permissions) {
        const perms = {
            user: command.config.permissions.user?.filter(perm => !message.channel.permissionsFor(message.member).has(perm)),
            bot: command.config.permissions.bot?.filter(perm => !message.channel.permissionsFor(message.guild.me).has(perm))
        };

        if (perms.user.length) return message.reply(`you don't have the following permissions: \`${perms.user.join('`, `')}\``);
        else if (perms.bot.length) return message.reply(`I don't have the following permissions: \`${perms.bot.join('`, `')}\``);
    }

    // Command arguments
    if (command.config.args && !args.length) {
        let msg = 'incorrect usage.';

        if (command.info.usage) msg += `\nUse \`${client.config.prefix}${command.info.name} ${command.info.usage}\`.`;

        return message.reply(msg);
    }

    // Run command
    await command.run(client, message, args).catch(err => {
        message.channel.send(`There has been an error while executing command: \`${command.info.name}\`.`);
        console.error(err);
    });
};
