const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    let prefix = '';
    if (message.guild && message.guild.settings) prefix = message.guild.settings.prefix;
    else prefix = client.config.prefix;

    const cmdCategories = require('../utils/categories.js')(client);

    // Yes, very not professional
    Object.entries(cmdCategories).forEach(categories => {
        categories.filter(c => c.cmds).forEach(category => {
            category.cmds.forEach(cmd => {
                category.list += `\n${cmd.icon} ${cmd.name}`;
            });
        });
    });
    
    if (!args.length) {
        const embed = new MessageEmbed()
        .setTitle('Commands List')
        .setColor(client.config.defaultEmbedColor)
        .setFooter(`Use ${prefix}help <command name> to get info for a specific command.`);

        for (let i = 0; i < Object.keys(cmdCategories).length; i++) {
            // This looks ugly, I know
            embed.addField(Object.values(Object.entries(cmdCategories)[i])[1].name, Object.values(Object.entries(cmdCategories)[i])[1].list || 'Empty', true);
        }

        return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = client.commands.get(name) || client.commands.find(c => c.config.aliases && c.config.aliases.includes(name));

    if (!command || command.unlisted) {
        return message.reply('invalid command.');
    } else if (command.disabled) {
        return message.reply('this command is disabled');
    }

    const embed = new MessageEmbed()
    .setTitle(`${command.info.icon} ${command.info.name}`)
    .setColor(client.config.defaultEmbedColor);
    
    if (command.info.description) embed.addField('**Description:**', command.info.description);
    if (command.info.icon) embed.addField('**Icon:**', command.info.icon);
    if (command.config.aliases) embed.addField('**Aliases:**', command.config.aliases.join(', '));
    if (command.info.usage) embed.addField('**Usage:**', `${prefix}${command.info.name} ${command.info.usage}`);
    if (command.config.permissions && command.config.permissions.user) embed.addField('**Required User permissions:**', `\`${command.config.permissions.user.join('`, `')}\``);
    if (command.config.permissions && command.config.permissions.bot) embed.addField('**Required Bot permissions:**', `\`${command.config.permissions.bot.join('`, `')}\``);

    message.channel.send(embed);
};

exports.info = {
    name: 'help', // Command name
    description: 'Shows a complete list of commands or searches for a specific one', //Command description
    category: 'start',
    icon: '❓',
    usage: '(command name)' // Command usage
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['commands'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};