// Importing the required modules for this command
const { inspect } = require('util');

// Note: the eval command allows to interact with the entire bot's infrastructure and because of that it can be very dangerous, therefore we set the ownerOnly option below to "true" in order to allow only the bot owner to use this command
exports.run = async (client, message, args) => {
    // This will replace the result content with "nope" if it includes the client.token
    const content = args.join(' ').replace(/client\.token/gmi, '\'nope\'');

    // Trying to execute this code
    try {
        // The eval function is a function to execute any JavaScript code, in this case we are executing what we send within the command
        let result = await eval(content);
        // If the result is not a string, the inspect method will turn it into one in order to send the content as a message
        if (typeof result !== 'string') {
          result = inspect(result, {
            depth: 0,
          });
        }
        // If the result includes the bot token, censore it
        if (result.includes(client.config.token)) result = result.replace(client.config.token, 'nope');

        // The characters limit for an embed description is 2048 characters. If the result exceeds this limit, log it into the console
        if (result.length > 2048) {
            // Logging the actual result into the console
            console.log(result);
            
            result = 'Result too long to be printed (check the console)';
            // We use the embed object because since there isn't much to put into the embed, it's more convenient to use an embed object instead of the MessageEmbed constructor, however you can use whatever you like the most
            const embed = {
                title: 'Eval - Output',
                description: `\`\`\`js\n${result}\n\`\`\``,
                color: 'GOLD'
            };
            // Sending the embed with the new result
            return message.channel.send({ embed });
        }

        const resultEmbed = {
            title: 'Eval - Output',
            description: `\`\`\`js\n${result}\n\`\`\``,
            color: client.config.defaultEmbedColor
        };
        // Sending the embed containing the result
        message.channel.send({ embed: resultEmbed });

    // Catching errors, if there are any
    } catch (err) {
        // If the error should include the bot token, censore it
        const error = err.toString().replace(client.config.token, 'nope');
        const errorEmbed = {
            title: 'Eval- Error',
            description: `\`\`\`js\n${error}\n\`\`\``,
            color: 'RED',
        };
        // Sending the error embed and then logging the error into the console
        message.channel.send({ embed: errorEmbed }).then(() => {
            console.error(err);
        });
    }
};

exports.info = {
    name: 'eval', // Command name
    description: 'Evaluates arbitrary JavaScript', // Command description
    icon: '⌨️',
    usage: '<expression>' // Command usage
};

exports.config = {
    args: true, // Whether this command should require one or more arguments to work
    guildOnly: false, // Whether the command should be used in a guild or not
    aliases: ['ev', 'js'], // Aliases
    disabled: false, // Whether this command is disabled or not
    ownerOnly: true // Whether this command should only be available to the bot owner or not
};