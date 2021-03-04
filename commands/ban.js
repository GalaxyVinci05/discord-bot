exports.run = async (client, message, args) => {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

    if (!member) return message.reply('invalid user mention');

    try {
        if (!member.bannable) return message.reply(`I can't ban **${member.user.tag}**`);

        member.ban({ reason }).then(() => {
            message.channel.send(`Banned user: **${member.user.tag}**\nFor reason: ${reason || 'Not specified'}`);
        });
    } catch (e) {
        message.channel.send('An error occurred trying to ban that user');
        console.log(e);
    }
};

exports.info = {
    name: 'ban', // Command name
    description: 'Bans a user from the server', // Command description
    category: 'mod',
    icon: '🔴',
    usage: '<user> (reason)' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments
    guildOnly: true, // Whether the command should be used in a guild or not
    permissions: {
        user: ['BAN_MEMBERS'], // Required guild permissions for the user to use this command (must be a valid permission flag)
        bot: ['BAN_MEMBERS'], // Required guild permissions for the bot to run this command (must be a valid permission flag)
    },
    aliases: ['banuser', 'banhammer'], // Aliases
    disabled: false, // Whether this command is disabled or not
};