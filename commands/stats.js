// Importing the required modules for this command
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
    // Normally, the bot uptime is displayed in timestamp value, but with this we can make it look a bit better
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    // In this case we are using an embed object but there's no difference between using an embed object or the MessageEmbed constructor
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
    // Sending our embed object as a message
    message.channel.send({ embed: embed });
};

exports.info = {
    name: 'stats', // Command name
    description: 'Displays useful bot statistics', // Command description
    icon: '📊'
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['statistics'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};