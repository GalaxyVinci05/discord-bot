exports.run = async (client, message, args) => {
    if (!message.guild.settings) return message.reply('the settings for this server have just been set up, please try again');

    switch (args[0]) {
        case 'prefix': {
            if (!args[1]) return message.reply('you must specify a prefix to set');

            client.db.set(message.guild.id, args[1], 'prefix');
            message.channel.send(`Prefix successfully set to \`${args[1]}\` for this server`);
            break;
        }

        case 'muteRole': {
            const roleID = message.mentions.roles.first() ? args[1].replace(/\D/gmi, '') : args[1];
            if (!roleID) return message.reply('you must specify a mute role');

            const role = message.guild.roles.cache.get(roleID);
            if (!role) return message.reply('invalid role');

            if (message.guild.me.hasPermission('MANAGE_CHANNELS')) {
                message.guild.channels.cache.array().forEach(channel => {
                    channel.createOverwrite(role, {
                        SEND_MESSAGES: false
                    });
                });
            } else {
                return message.reply('I need permission to Manage Channels in order to set up the mute role');
            }

            client.db.set(message.guild.id, role.id, 'muteRole');
            message.channel.send('Mute role successfully set up for this server');
            break;
        }

        default: {
            const embed = {
                title: 'Settings',
                color: client.config.defaultEmbedColor,
                fields: [
                    {
                        name: 'Prefix:',
                        value: message.guild.settings.prefix,
                        inline: true
                    },
                    {
                        name: 'Mute Role:',
                        value: message.guild.roles.cache.get(message.guild.settings.muteRole) || 'Not set',
                        inline: true
                    }
                ]
            };
    
            return message.channel.send({ embed });
        }
    }
};

exports.info = {
    name: 'settings', // Command name
    description: 'Shows or edits the server settings', // Command description
    icon: '⚙️',
    usage: '(setting *case-sentitive*)' // Command usage
};

exports.config = {
    args: false, // Whether this command should require one or more arguments
    guildOnly: true, // Whether the command should be used in a guild or not
    permissions: {
        user: ['MANAGE_GUILD'], // Required guild permissions for the user to use this command (must be a valid permission flag)
        bot: ['MANAGE_GUILD'], // Required guild permissions for the bot to run this command (must be a valid permission flag)
    },
    aliases: ['set'], // Aliases
    disabled: false, // Whether this command is disabled or not
};