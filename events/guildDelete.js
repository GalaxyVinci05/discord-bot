// guild delete event
module.exports = async (client, guild) => {
    // Just as in the guildCreate event, when the bot leaves a guild we want to update their presence, so we rewrite the presence
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help on ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });
    // Logging into the console that the bot left a guild
    console.log(`The bot left a guild. (${guild.name})`);
};