/*jshint esversion: 9 */
const {
  MessageEmbed,
  Client
} = require("discord.js");

const client = new Client();

module.exports = {
  send: (msg, prefix) => {
    var args = msg.content.split(" ");
    args.shift(); // to remove command part

    if (args.length === 0) {
      return;
    } else if (args[0] === "here") {
      var message = msg.content.slice(prefix.length + 4 + 1 + 4);
      msg.channel.send(message);
      msg.delete();
    } else {
      var message = msg.content.slice(prefix.length + 4 + 1 + args[0].length);
      msg.guild.channels.cache.get(args[0]).send(message);
      msg.delete();
    }
  },

  vote: (msg, prefix) => {
    let command = "vote";
    let args = msg.content.slice(prefix.length + command.length + 1);

    msg.delete();

    msg.channel
      .send(
        new MessageEmbed()
        .setTitle("Vote now!")
        .setDescription(msg.content.slice(prefix.length + command.length + 1))
      )
      .then((sentMessage) => {
        const emoji = ["👍", "👎"];
        emoji.forEach((curEmoji) => {
          sentMessage.react(curEmoji);
        });
      });
  },

  steal: (msg, prefix) => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    args.shift(); // Remove command from args

    if (args.length > 5)
      return msg.reply("slow down, buckaroo! Only do 5 emoji at a time.");

    // iterate through the added emoji (must be seperated with a space in message)
    for (let arg of args)
      msg.guild.emojis
      .create(
        `https://cdn.discordapp.com/emojis/${arg
						.split(":")[2]
						.replace(">", "")}${
						arg.startsWith("<a:") ? ".gif?v=1" : ".png?v=1"
					}`,
        arg.split(":")[1]
      )
      .then((emoji) => msg.reply(`added ${emoji}`))
      .catch((err) => log.warn(err));
  },
};

/* OUTTAKES

nothing right now

*/

/* TODO

Add invite command.
Add deletechannel command.
Maybe add confirmation for deleting roles, channels, categories?

*/