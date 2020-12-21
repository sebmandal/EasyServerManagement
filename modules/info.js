/*jshint esversion: 9 */
const {
  MessageEmbed,
  Client
} = require("discord.js");

const client = new Client();

module.exports = {
  source: (msg, prefix) => {
    const source_embed = new MessageEmbed()
      .setTitle("Source code")
      .setURL("https://github.com/sebastianmandal/EasyServerManagement")
      .setColor(0xff0000);
    msg.channel.send(source_embed);
  },

  help: (msg, prefix) => {

    var commands = {
      ...require("./guild management"),
      ...require("./member management"),
      ...require("./info"),
      ...require("./fun")
    };
    // Sends embed containing Github, personal info, commands for bot, example, prefix, etc. in chat.
    const help_embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Sebastian Mandal > EasyServerManagement")
      .setDescription(
        "Click the link above to get redirected to my personal Github!"
      )
      .setURL("https://github.com/sebastianmandal/easyservermanagement")
      .setAuthor(
        "Sebastian Mandal",
        "https://i.imgur.com/PHqQPNm.jpg",
        "https://github.com/sebastianmandal"
      )
      .addFields({
        name: "Prefix",
        value: `${prefix}`,
      }, {
        name: "Commands",
        value: [
          // this command is the most efficient way to display all of the commands, no need for manually adding commands
          Object.keys(commands).join("\n")
        ],
      }, {
        name: "Example",
        value: ` > ${prefix}help`,
      })
      .setTimestamp()
      .setFooter(
        'Discord bot "EasyServerManagement", made by Sebastian Mandal.'
      );

    msg.channel.send(help_embed);
  }
};