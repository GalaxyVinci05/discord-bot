module.exports = async (client, channel) => {
    if (channel.guild && (channel.guild.settings.muteRole && channel.guild.roles.cache.get(channel.guild.settings.muteRole))) {
        channel.createOverwrite(channel.guild.settings.muteRole, {
            SEND_MESSAGES: false
        });
    }
};