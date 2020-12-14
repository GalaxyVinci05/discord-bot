// ready event
module.exports = (client) => {
    // Here we set the bot's rich presence
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help on ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });
    // Logging into the console when the bot is up and running
    console.log('The bot\'s ready!');
};