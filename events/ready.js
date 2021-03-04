module.exports = (client) => {
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help | ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });

    console.log('The bot\'s ready!');
};