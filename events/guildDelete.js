module.exports = async (client, guild) => {
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help on ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });
    console.log(`The bot left a guild. (${guild.name})`);
};