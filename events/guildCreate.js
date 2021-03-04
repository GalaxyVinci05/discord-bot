module.exports = async (client, guild) => {
    const dbStructure = {
        guildName: guild.name,
        prefix: client.config.prefix,
        muteRole: ''
    };

    client.db.set(guild.id, dbStructure);

    client.user.setPresence({
        activity: {
            name: `${client.config.prefix}help | ${client.guilds.cache.size} servers`,
        },
        status: 'online'
    });

    console.log(`The bot just joined a new guild! (${guild.name})`);
};