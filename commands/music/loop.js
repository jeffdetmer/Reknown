module.exports = async (Client, message, args) => {
    // If the member doesn't have permissions to use the command
    if (!await Client.checkPerms('loop', 'music', message.member))
        // Send a message
        return message.reply(':x: Sorry, but you do not have the `music.loop` permission.');

    const guild = Client.musicfn.guilds[message.guild.id];

    // If the bot is not playing anything
    if (!message.guild.me.voice.channel || !guild.isPlaying)
        return message.reply('I am not playing anything!');
    
    // If the member is not in a voice channel
    if (!message.member.voice.channel)
        return message.reply('You have to be in a voice channel to use this command!');

    // If the member's voice channel is different than the one the bot is in
    if (message.member.voice.channel !== message.guild.me.voice.channel)
        return message.reply('You have to be in the same voice channel as me to use that command!');

        // If there is no args
        if (!args[1])
            // Send a message
            return message.reply('Please include `true` or `false` depending on what you want.');

    // Defines "bool" as the user input lowercased
    let bool = args[1].toLowerCase();

    // If none of the choices were called
    if (bool !== 'true' && bool !== 'false')
        // Send a message
        return message.reply('Invalid argument. Please use `true` or `false`.');

    // Updates "bool" to a boolean type
    bool = bool === 'true' ? true : false;

    // If the value is already set
    if (bool === guild.looping)
        // Send a message
        return message.reply('The value is already set to that!');

    // Updates the value
    Client.musicfn.guilds[message.guild.id].loop = bool;

    // Send a message
    return message.reply(`Successfully set looping to ${bool}.`);
}

module.exports.help = {
    name: 'loop',
    desc: 'Enables / Disables loop for music.',
    category: 'music',
    usage: '?loop <True or False>',
    aliases: []
}