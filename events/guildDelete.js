module.exports = async (client, guild) => {
    client.db.delete(guild.id);
    
    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help | ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });

    console.log(`The bot left a guild. (${guild.name})`);
};