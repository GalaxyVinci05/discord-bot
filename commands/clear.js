exports.run = async (client, message, args) => {
    const count = args[0];
    
    if (isNaN(count)) return message.reply('invalid number');
    else if (count < 2 || count > 100) return message.reply('specify a number between `2` and `100`');
    
    await message.delete();
    
    message.channel.bulkDelete(count, true).catch(e => {
        message.channel.send('An error occurred while trying to clear messages');
        console.log(e);
    });

    message.channel.send(`Cleared \`${count}\` messages`).then(msg => {
        setTimeout(() => {
            msg.delete();
        }, 2000);
    });
};

exports.info = {
    name: 'clear', // Command name
    description: 'Clears a specific amount of messages in a channel', // Command description
    category: 'mod',
    icon: '🧹',
    usage: '<count>' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments
    guildOnly: true, // Whether the command should be used in a guild or not
    permissions: {
        user: ['MANAGE_MESSAGES'], // Required guild permissions for the user to use this command (must be a valid permission flag)
        bot: ['MANAGE_MESSAGES'], // Required guild permissions for the bot to run this command (must be a valid permission flag)
    },
    aliases: ['clean', 'purge'], // Aliases
    disabled: false, // Whether this command is disabled or not
};