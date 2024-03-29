/**
 * 
 * @param {import('discord.js').Client} client 
 * @param {import('discord.js').Message} message 
 * @param {string} args 
 */
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first();
    const muteRole = message.guild.settings.muteRole;

    if (!muteRole) return message.reply('the mute role for this server isn\'t set up');
    else if (!message.guild.roles.cache.get(muteRole)) return message.reply('the currently set up mute role isn\'t available anymore');

    const reason = args.slice(1).join(' ');

    if (!member) return message.reply('invalid user mention');
    if (member.roles.cache.has(muteRole)) return message.reply('this user is already muted');

    try {
        if (!member.manageable) return message.reply(`I can't mute **${member.user.tag}**`);

        member.roles.add(muteRole, reason).then(() => {
            message.channel.send(`Muted user: **${member.user.tag}**\nFor reason: ${reason || 'Not specified'}`);
        });
    } catch (e) {
        message.channel.send('An error occurred trying to mute that user');
        console.log(e);
    }
};

exports.info = {
    name: 'mute', // Command name
    description: 'Mutes a user in the server', // Command description
    category: 'mod',
    icon: '🔇',
    usage: '<user> (reason)' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments
    guildOnly: true, // Whether the command should be used in a guild or not
    permissions: {
        user: ['MUTE_MEMBERS'], // Required guild permissions for the user to use this command (must be a valid permission flag)
        bot: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], // Required guild permissions for the bot to run this command (must be a valid permission flag)
    },
    aliases: ['muteuser', 'shutup'], // Aliases
    disabled: false, // Whether this command is disabled or not
};