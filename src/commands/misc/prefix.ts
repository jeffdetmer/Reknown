import type { PermissionString } from 'discord.js';
import type ReknownClient from '../../structures/client';
import { tables } from '../../Constants';
import type { GuildMessage, HelpObj } from 'ReknownBot';

export async function run (client: ReknownClient, message: GuildMessage, args: string[]) {
  if (!args[1]) {
    const prefix = await client.functions.getPrefix(client, message.guild.id);
    return message.channel.send(`The prefix for **${client.escMD(message.guild.name)}** is: \`\`${client.escInline(prefix)}\`\``);
  }

  if (!message.member.hasPermission('ADMINISTRATOR')) return client.functions.noPerms(message, [ 'ADMINISTRATOR' ]);
  const prefix = args.slice(1).join(' ');
  if (prefix.length > 15) return client.functions.badArg(message, 1, 'The prefix length must be lower than 16.');
  client.functions.updateRow(client, tables.PREFIX, {
    customprefix: prefix,
    guildid: message.guild.id
  }, {
    guildid: message.guild.id
  });

  message.channel.send(`Successfully updated the prefix to \`\`${client.escInline(prefix)}\`\`.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Displays the prefix of the server.',
  togglable: true,
  usage: 'prefix [New Prefix]'
};

export const memberPerms: PermissionString[] = [];

export const permissions: PermissionString[] = [];
