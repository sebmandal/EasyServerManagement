const { MessageEmbed } = require("discord.js");

module.exports = {
  dave: (client, msg, prefix, args) => {
    return msg.channel.send('https://davecode.me/other/' + args[1] + '.mp4')
  },
  github: (client, msg, prefix, args) => {
    return msg.channel.send(`https://github.com/${args[1]}/${args[2]}`);
  },
  google: (client, msg, prefix, args) => {
    return msg.channel.send(`https://www.google.com/search?q=${(args.slice(1).join('%20'))}`);
  },
  avatar: (client, msg, prefix, args) => {
    const user = msg.mentions.users.first() || msg.author;
    return msg.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=4096`);
  }
};