const { inspect } = require('util');

// Note: the eval command allows to interact with the entire bot's infrastructure and because of that it can be very dangerous, therefore the ownerOnly property in the config should be set to true
exports.run = async (client, message, args) => {
    const content = args.join(' ').replace(/client\.token/gmi, '\'nope\'');

    try {
        let result = await eval(content);
        if (typeof result !== 'string') {
          result = inspect(result, {
            depth: 0,
          });
        }
        
        if (result.includes(client.config.token)) result = result.replace(client.config.token, 'nope');

        if (result.length > 2048) {
            console.log(result);
            
            result = 'Result too long to be printed (check the console)';
            const embed = {
                title: 'Eval - Output',
                description: `\`\`\`js\n${result}\n\`\`\``,
                color: 'GOLD'
            };
            return message.channel.send({ embed });
        }

        const resultEmbed = {
            title: 'Eval - Output',
            description: `\`\`\`js\n${result}\n\`\`\``,
            color: client.config.defaultEmbedColor
        };
        message.channel.send({ embed: resultEmbed });

    } catch (err) {
        const error = err.toString().replace(client.config.token, 'nope');
        const errorEmbed = {
            title: 'Eval- Error',
            description: `\`\`\`js\n${error}\n\`\`\``,
            color: 'RED',
        };
        message.channel.send({ embed: errorEmbed }).then(() => {
            console.error(err);
        });
    }
};

exports.info = {
    name: 'eval', // Command name
    description: 'Evaluates arbitrary JavaScript', // Command description
    category: 'system',
    icon: '⌨️',
    usage: '<expression>' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['ev', 'js'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: true // Whether this command should only be available to the bot owner or not
};