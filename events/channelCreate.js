
/**
 * 
 * @param {import('discord.js').Client} client 
 * @param {import('discord.js').Channel} channel 
 */module.exports = async (client, channel) => {
    if (channel.guild && (channel.guild.settings.muteRole && channel.guild.roles.cache.get(channel.guild.settings.muteRole))) {
        channel.permissionOverwrites.create(channel.guild.settings.muteRole, {
            SEND_MESSAGES: false
        });
    }
};