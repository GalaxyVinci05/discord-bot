const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const { commands } = client;
    const data = commands.map(cmd => cmd.info);

    if (!args.length) {
        const embed = new MessageEmbed()
        .setTitle('Commands List')
        .setColor(client.config.defaultEmbedColor)
        .setFooter(`Use ${client.config.prefix}help <command name> to get info for a specific command.`);
        for (const command of data) {
            embed.addField(`${command.icon} ${command.name}`, command.description || 'No description provided');
        }
        return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.config.aliases && c.config.aliases.includes(name));

    if (!command) {
        return message.reply('invalid command.');
    }

    const embed = new MessageEmbed()
    .setTitle(`${command.info.icon} ${command.info.name}`)
    .setColor(client.config.defaultEmbedColor);
    
    if (command.info.description) embed.addField('**Description:**', command.info.description);
    if (command.info.icon) embed.addField('**Icon:**', command.info.icon);
    if (command.config.aliases) embed.addField('**Aliases:**', command.config.aliases.join(', '));
    if (command.info.usage) embed.addField('**Usage:**', `${client.config.prefix}${command.info.name} ${command.info.usage}`);

    message.channel.send(embed);
};

exports.info = {
    name: 'help', // Command name
    description: 'Shows a complete list of commands or searches for a specific one', //Command description
    icon: '❓',
    usage: '(command name)' // Command usage
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['commands'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};