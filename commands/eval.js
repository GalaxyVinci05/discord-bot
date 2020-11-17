//Importing the required modules for this command
const { inspect } = require('util');

//Note: the eval command allows to interact with the entire bot's infrastructure and because of that it can be very dangerous, therefore we set the ownerOnly option below to "true" in order to allow only the bot owner to use this command
exports.run = async (client, message, args) => {
    //This will replace the result content with "nope" if it includes the client.token
    const content = args.join(' ').replace(/client\.token/gmi, '\'nope\'');

    //Trying to execute this code
    try {
        //The eval function is a function to execute any JavaScript code, in this case we are executing what we send in our message
        let result = await eval(content);
        //If the result is not a string, the inspect method will turn it into one
        if (typeof result !== 'string') {
          result = inspect(result, {
            depth: 0,
          });
        }
        //If the result includes the bot token, censore it
        if (result.includes(client.config.token)) result = result.replace(client.config.token, 'nope');

        //The characters limit for an embed description is 2048 characters. If the result exceeds this limit, logging it into the console
        if (result.length > 2048) {
            result = 'Result too long to be printed (check the console)';
            //We use the embed object because since there isn't much to put into the embed, it's more convenient to use an embed object instead of the MessageEmbed constructor, however you can use whatever you like most
            const embed = {
              title: 'Eval - Output',
              description: `\`\`\`js\n${result}\n\`\`\``,
            };
            //Sending the embed and THEN logging the result into the console
            return message.channel.send({ embed }).then(() => {
                console.log(result);
            });
        }

        const resultEmbed = {
            title: 'Eval - Output',
            description: `\`\`\`js\n${result}\n\`\`\``,
        };
        //Sending the embed containing the result
        message.channel.send({ embed: resultEmbed });

    //Catching errors
    } catch (err) {
        //If the error should include the bot token, censore it
        const error = err.toString().replace([client.config.token], 'nope');
        const errorEmbed = {
            title: 'Eval- Error',
            description: `\`\`\`js\n${error}\n\`\`\``,
            color: 'ff1c1c',
        };
        //Sending the error embed and THEN logging the error into the console
        message.channel.send({ embed: errorEmbed }).then(() => {
            console.error(err);
        });
    }
};

exports.info = {
    name: 'eval', //Command name
    description: 'Evaluates arbitrary JavaScript', //Command description
    usage: '<expression>' //Command usage
};

exports.config = {
    args: true, //Whenever this command should require one or more arguments to work
    guildOnly: false, //Whenever the command should be used in a guild or not
    aliases: ['ev', 'js'], //Aliases
    disabled: false, //Whenever this command is disabled or not
    ownerOnly: true //Whenever this command should only be available to the bot owner or not
};