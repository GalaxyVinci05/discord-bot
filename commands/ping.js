exports.run = async (client, message, args) => {
    // Sending the message
    message.channel.send('Pinging...').then(msg => {
        let responseTime = msg.createdTimestamp - message.createdTimestamp;

        // Editing the message showing the time it took to edit it and the Websocket latency
        msg.edit(`🏓 Pong! Response took: \`${responseTime}ms\`.\nBot latency: \`${Math.round(client.ws.ping)}ms\`.`);
    });
};

exports.info = {
    name: 'ping', // Command name
    description: 'Shows the bot latency' // Command description
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['pong'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: false // Whether this command should only be available to the bot owner or not
};