exports.run = async (client, message) => {
    message.channel.send('Pinging...').then(msg => {
        const responseTime = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`🏓 Pong! Response took: \`${responseTime}ms\`.\nBot latency: \`${Math.round(client.ws.ping)}ms\`.`);
    });
};

exports.info = {
    name: 'ping', // Command name
    description: 'Shows the bot latency', // Command description
    icon: '🏓'
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['pong'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};