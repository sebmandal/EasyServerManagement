var commandParams = {
  ...require("./guildParams"),
  ...require("./openParams"),
  ...require("./restrictedParams"),
};

var commands = {
  ...require("./guild"),
  ...require("./open"),
  ...require("./restricted"),
};

const { MessageEmbed } = require("discord.js");

module.exports = {
  help: (client, msg, prefix, args) => {
    if (args.length > 1) {
      try {
        commandParams[args[1]](client, msg, prefix, args);
      } catch {
        msg.channel.send('Unfortunately that command is not supported for the help command or it does not exist.');
      }
    } else {
      // msg.channel.send(Object.keys(commandParams));
      // msg.channel.send(Object.keys(commands));

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
            Object.keys(commands).join(",\n")
          ],
        }, {
          name: "Example",
          value: ` > ${prefix}help`,
        })
        .setTimestamp()
        .setFooter(
          'Discord bot "EasyServerManagement", made by Sebastian Mandal.'
        );

      msg.reply(help_embed);
    }
  }
};
