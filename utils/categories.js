module.exports = (client) => ({
    start: {
        name: 'Start',
        cmds: client.commands.filter(c => c.info.category == 'start' && !c.config.unlisted).map(cmd => cmd.info),
        list: ''
    },
    info: {
        name: 'Info',
        cmds: client.commands.filter(c => c.info.category == 'info' && !c.config.unlisted).map(cmd => cmd.info),
        list: '',
    },
    mod: {
        name: 'Moderation',
        cmds: client.commands.filter(c => c.info.category == 'mod' && !c.config.unlisted).map(cmd => cmd.info),
        list: ''
    },
    system: {
        name: 'System',
        cmds: client.commands.filter(c => c.info.category == 'system' && !c.config.unlisted).map(cmd => cmd.info),
        list: ''
    },
    various: {
        name: 'Various',
        cmds: client.commands.filter(c => (c.info.category == 'various' || !c.info.category) && !c.config.unlisted).map(cmd => cmd.info),
        list: ''
    }
    // The "list" property should always be an empty string
    
    // To add more categories, just copy and paste one of the elements above except the "various" one
});