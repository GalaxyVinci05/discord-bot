const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message) => {
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    const embed = {
        title: 'Statistics',
        fields: [
            {
                name: 'Memory Usage:',
                value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``,
                inline: true
            },
            {
                name: 'Uptime:',
                value: `\`${duration}\``,
                inline: true
            },
            {
                name: 'Users:',
                value: `\`${client.users.cache.size.toLocaleString()}\``,
                inline: true
            },
            {
                name: 'Guilds:',
                value: `\`${client.guilds.cache.size.toLocaleString()}\``,
                inline: true
            },
            {
                name: 'Discord.js:',
                value: `\`v${client.version}\``,
                inline: true
            },
            {
                name: 'Node:',
                value: `\`${process.version}\``,
                inline: true
            }
        ],
        color: client.config.defaultEmbedColor
    };
    message.channel.send({ embed: embed });
};

exports.info = {
    name: 'stats', // Command name
    description: 'Displays useful bot statistics', // Command description
    category: 'system',
    icon: '📊'
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['statistics'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};