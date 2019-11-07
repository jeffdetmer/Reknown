CREATE TABLE IF NOT EXISTS biography (email TEXT, summary TEXT, twitter TEXT, userid TEXT);
CREATE TABLE IF NOT EXISTS blacklist (executor TEXT, guildid TEXT, reason TEXT, userid TEXT);
CREATE TABLE IF NOT EXISTS blacklistmsg (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS cmdnotfound (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS cooldownmsg (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS daily (endsat BIGINT, userid TEXT);
CREATE TABLE IF NOT EXISTS deleteinvite (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS economy (balance INTEGER, userid TEXT);
CREATE TABLE IF NOT EXISTS gblacklist (memberid TEXT, reason TEXT);
CREATE TABLE IF NOT EXISTS guildtag (guildid TEXT, tagcontent TEXT, tagname TEXT);
CREATE TABLE IF NOT EXISTS goodbyemsg (guildid TEXT, msg TEXT);
CREATE TABLE IF NOT EXISTS levelblock (bool BOOLEAN, channelid TEXT);
CREATE TABLE IF NOT EXISTS levelmodifier (modifier SMALLINT, guildid TEXT);
CREATE TABLE IF NOT EXISTS levelmsg (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS levelrole (guildid TEXT, roleid TEXT, lvl INTEGER);
CREATE TABLE IF NOT EXISTS logchannel (guildid TEXT, channelid TEXT);
CREATE TABLE IF NOT EXISTS logwebhook (channelid TEXT, guildid TEXT, webhookid TEXT);
CREATE TABLE IF NOT EXISTS mute (endsat TEXT, guildid TEXT, userid TEXT);
CREATE TABLE IF NOT EXISTS prefix (customprefix TEXT, guildid TEXT);
CREATE TABLE IF NOT EXISTS rules (guildid TEXT, rule TEXT);
CREATE TABLE IF NOT EXISTS scores (guildid TEXT, lvl INTEGER, points INTEGER, userid TEXT);
CREATE TABLE IF NOT EXISTS star (editid TEXT, msgid TEXT);
CREATE TABLE IF NOT EXISTS starchannel (channelid TEXT, guildid TEXT);
CREATE TABLE IF NOT EXISTS ticketcategory (channelid TEXT, guildid TEXT);
CREATE TABLE IF NOT EXISTS togglelevel (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS togglelog (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS togglestar (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS toggletickets (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS togglewelcome (bool BOOLEAN, guildid TEXT);
CREATE TABLE IF NOT EXISTS updatechannel (channelid TEXT, guildid TEXT);
CREATE TABLE IF NOT EXISTS usertag (userid TEXT, tagcontent TEXT, tagname TEXT);
CREATE TABLE IF NOT EXISTS warnings (guildid TEXT, userid TEXT, warnedby TEXT, warnreason TEXT);
CREATE TABLE IF NOT EXISTS welcomechannel (guildid TEXT, channelid TEXT);
CREATE TABLE IF NOT EXISTS welcomemsg (guildid TEXT, msg TEXT);
CREATE TABLE IF NOT EXISTS work (endsat BIGINT, userid TEXT);
