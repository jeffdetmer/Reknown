const obj = {
  blacklistmsg: ['misc', 'blacklist'],
  cmdnotfound: ['misc', 'togglemsg'],
  deleteinvite: ['mod', 'minvite'],
  goodbyemsg: ['misc', 'welcome'],
  logchannel: ['mod', 'log'],
  prefix: ['misc', 'prefix'],
  starchannel: ['misc', 'star'],
  ticketcategory: ['ticket', 'category'],
  togglelevel: ['level', 'options'],
  togglelog: ['mod', 'log'],
  togglestar: ['misc', 'star'],
  toggletickets: ['ticket', 'toggle'],
  togglewelcome: ['misc', 'welcome'],
  updatechannel: ['misc', 'update'],
  welcomechannel: ['misc', 'welcome'],
  welcomemsg: ['misc', 'welcome']
};

const options = {
  blacklistmsg: 'Toggles the blacklisted message.',
  cmdnotfound: 'Toggles the unknown command message.',
  deleteinvite: 'Deletes all invites by users without the `misc.invite` permission.',
  goodbyemsg: 'Sets the message sent when someone leaves the server.',
  logchannel: 'Sets the channel to send logs in.',
  prefix: 'Sets the prefix for the bot.',
  starchannel: 'Sets the channel for starboard messages.',
  ticketcategory: 'Sets the category for ticket channels.',
  togglelevel: 'Toggles the entire leveling system.',
  togglelog: 'Toggles the action log.',
  togglestar: 'Toggles starboard.',
  toggletickets: 'Toggles the ticket system.',
  togglewelcome: 'Toggles welcoming messages.',
  updatechannel: 'Sets the channel to send messages when using `?serverupdate`.',
  welcomechannel: 'Sets the channel to send welcoming and goodbye messages.',
  welcomemsg: 'Sets the message sent when someone joins the server.'
};

module.exports = async (Client, message, args) => {
  const option = args[1] ? args[1].toLowerCase() : null;
  if (!option) {
    const info = Object.keys(options).map(key => {
      const value = options[key];
      return `\`${key}\` ${value}`;
    });
    if (!message.channel.permissionsFor(Client.bot.user).has('EMBED_LINKS')) return message.channel.send(info);

    const embed = new Client.Discord.MessageEmbed()
      .setTitle('Available config options')
      .setColor(0x00FF00)
      .setDescription(info)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

    return message.channel.send(embed);
  }
  if (!Object.keys(obj).includes(option)) return message.reply('That option is not valid. Use `?help config` to see all the options.');
  if (!await Client.checkPerms(option, obj[option][1], message.member)) return message.reply(`:x: Sorry, but you do not have the \`${obj[option][0]}.${obj[option][1]}\` permission.`);

  const value = args[2] ? args[2].toLowerCase() : null;
  if (!value) return message.reply('You have to provide a value for the option!');
  const bool = value === 'true' ? 1 : 0;

  switch (option) {
    case 'blacklistmsg': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM blacklistmsg WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 1) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO blacklistmsg (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE blacklistmsg SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'cmdnotfound': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM cmdnotfound WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO cmdnotfound (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE cmdnotfound SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'deleteinvite': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM deleteinvite WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO deleteinvite (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE deleteinvite SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'goodbyemsg': {
      const msg = args.slice(2).join(' ');
      if (msg.length >= 1000) return message.reply('Please keep the message length less than a thousand characters.');

      const row = (await Client.sql.query('SELECT goodbyemessage FROM goodbyemessages WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO goodbyemessages (guildid, custommessage) VALUES ($1, $2)', [message.guild.id, msg]);
      else Client.sql.query('UPDATE goodbyemessages SET custommessage = $1 WHERE guildid = $2', [msg, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${Client.escMD(msg)}\`.`);
    }
    case 'logchannel': {
      const channel = Client.getObj(value, { guild: message.guild, type: 'channel' });
      if (!channel) return message.reply('That channel is invalid!');
      if (channel.type !== 'text') return message.reply('The channel you provided wasn\'t a text channel!');

      const row = (await Client.sql.query('SELECT * FROM logchannel WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO logchannel (guildid, channelid) VALUES ($1, $2)', [message.guild.id, channel.id]);
      else Client.sql.query('UPDATE logchannel SET channelid = $1 WHERE guildid = $2', [channel.id, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to ${channel}.`);
    }
    case 'prefix': {
      const prefix = args.slice(2).join(' ');
      if (prefix.length > 15) return message.reply('Please keep the prefix length under 16 characters.');

      const row = (await Client.sql.query('SELECT customprefix FROM prefix WHERE guildid = $1', [message.guild.id])).rows[0];
      if (prefix === (row ? row.customprefix : '?')) return message.reply('The prefix is already set to that!');

      if (!row) Client.sql.query('INSERT INTO prefix (guildid, customprefix) VALUES ($1, $2)', [message.guild.id, prefix]);
      else Client.sql.query('UPDATE prefix SET customprefix = $1 WHERE guildid = $2', [prefix, message.guild.id]);

      Client.prefixes[message.guild.id] = prefix;

      return message.channel.send(`Successfully updated \`${option}\` to \`${Client.escMD(prefix)}\`.`);
    }
    case 'starchannel': {
      const channel = Client.getObj(value, { guild: message.guild, type: 'channel' });
      if (!channel) return message.reply('That channel is invalid!');

      const row = (await Client.sql.query('SELECT * FROM starchannel WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO starchannel (guildid, channelid) VALUES ($1, $2)', [message.guild.id, channel.id]);
      else Client.sql.query('UPDATE starchannel SET channelid = $1 WHERE guildid = $2', [channel.id, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to ${channel}.`);
    }
    case 'ticketcategory': {
      const channel = Client.getObj(value, { guild: message.guild, type: 'channel', filter: 'category' });
      if (!channel) return message.reply('That channel is invalid!');
      if (channel.type !== 'category') return message.reply('The channel needs to be a category!');

      const row = (await Client.sql.query('SELECT * FROM ticketcategory WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO ticketcategory (guildid, channelid) VALUES ($1, $2)', [message.guild.id, channel.id]);
      else Client.sql.query('UPDATE starchannel SET channelid = $1 WHERE guildid = $2', [channel.id, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to ${Client.escMD(channel.name)}.`);
    }
    case 'togglelevel': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM togglelevel WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO togglelevel (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE togglelevel SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'togglelog': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM actionlog WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO actionlog (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE actionlog SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'togglestar': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM togglestar WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO togglestar (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE togglestar SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'toggletickets': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM toggletickets WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO toggletickets (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE toggletickets SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'togglewelcome': {
      if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
      const row = (await Client.sql.query('SELECT bool FROM togglewelcome WHERE guildid = $1', [message.guild.id])).rows[0];
      if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

      if (!row) Client.sql.query('INSERT INTO togglewelcome (guildid, bool) VALUES ($1, $2)', [message.guild.id, bool]);
      else Client.sql.query('UPDATE togglewelcome SET bool = $1 WHERE guildid = $2', [bool, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${value}\`.`);
    }
    case 'updatechannel': {
      const channel = Client.getObj(value, { guild: message.guild, type: 'channel' });
      if (!channel) return message.reply('That channel is invalid!');

      const row = (await Client.sql.query('SELECT * FROM updatechannel WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO updatechannel (guildid, channelid) VALUES ($1, $2)', [message.guild.id, channel.id]);
      else Client.sql.query('UPDATE updatechannel SET channelid = $1 WHERE guildid = $2', [channel.id, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to ${channel}.`);
    }
    case 'welcomechannel': {
      const channel = Client.getObj(value, { guild: message.guild, type: 'channel' });
      if (!channel) return message.reply('That channel is invalid!');

      const row = (await Client.sql.query('SELECT * FROM welcomechannel WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO welcomechannel (guildid, channel) VALUES ($1, $2)', [message.guild.id, channel.id]);
      else Client.sql.query('UPDATE welcomechannel SET channel = $1 WHERE guildid = $2', [channel.id, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to ${channel}.`);
    }
    case 'welcomemsg': {
      const msg = args.slice(2).join(' ');
      if (msg.length >= 1000) return message.reply('Please keep the message length less than a thousand characters.');

      const row = (await Client.sql.query('SELECT custommessage FROM custommessages WHERE guildid = $1', [message.guild.id])).rows[0];
      if (!row) Client.sql.query('INSERT INTO custommessages (guildid, custommessage) VALUES ($1, $2)', [message.guild.id, msg]);
      else Client.sql.query('UPDATE custommessages SET custommessage = $1 WHERE guildid = $2', [msg, message.guild.id]);
      return message.channel.send(`Successfully updated \`${option}\` to \`${Client.escMD(msg)}\`.`);
    }
  }
};

module.exports.help = {
  name: 'config',
  desc: 'Sets up config settings.',
  category: 'util',
  usage: '?config <Option> <Value>',
  aliases: ['settings']
};
