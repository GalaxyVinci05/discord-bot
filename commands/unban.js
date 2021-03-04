exports.run = async (client, message, args) => {
    let stopped = false;

    const user = await client.users.fetch(args[0]).catch(() => {
        message.reply('invalid user ID');
        stopped = true;
    });

    if (stopped) return;
    const reason = args.slice(1).join(' ');

    const isBanned = await message.guild.fetchBans().then(bans => bans.find(ban => ban.user == user.id));
    if (!isBanned) return message.reply('this user is not banned');

    try {
        message.guild.members.unban(user, reason).then(() => {
            message.channel.send(`Unbanned user: **${user.tag}**\nFor reason: ${reason || 'Not specified'}`);
        });
    } catch (e) {
        message.channel.send('An error occurred trying to unban that user');
        console.log(e);
    }
};

exports.info = {
    name: 'unban', // Command name
    description: 'Unbans a user from the server', // Command description
    category: 'mod',
    icon: '🟢',
    usage: '<user> (reason)' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments
    guildOnly: true, // Whether the command should be used in a guild or not
    permissions: {
        user: ['BAN_MEMBERS'], // Required guild permissions for the user to use this command (must be a valid permission flag)
        bot: ['BAN_MEMBERS'], // Required guild permissions for the bot to run this command (must be a valid permission flag)
    },
    aliases: ['unbanuser', 'pardon'], // Aliases
    disabled: false, // Whether this command is disabled or not
};