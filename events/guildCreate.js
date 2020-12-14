// guild create event
module.exports = async (client, guild) => {
    // When the bot joins a new guild, we want them to update their presence, so we simply update it by rewriting it
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help on ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });
    // Logging into the console that the bot joined a new guild
    console.log(`The bot just joined a new guild! (${guild.name})`);
};