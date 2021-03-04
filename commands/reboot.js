exports.run = async (client, message) => {
    try {
        message.channel.send('✅ Rebooted').then(async () => {
            await console.log(`${message.author.tag} rebooted`);
            process.exit();
        });
    } catch (err) {
        message.channel.send('There has been an error while rebooting, check the console for further information');
        console.error(err);
    }
};

exports.info = {
    name: 'reboot', // Command name
    description: 'If running with PM2, restarts the Bot', // Command description
    category: 'system',
    icon: '🔄'
};

exports.config = {
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['restart'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: true // Whether this command should only be available to the bot owner or not
};