const { Client } = require("discord.js");
const client = new Client();

// prefix and importing commands
const fs = require('fs-extra')
const schedule = require('node-schedule');
var prefix = fs.readJsonSync('./prefix.json').prefix;

var openCommands = {
  ...require("./modules/open")
};
var commands = {
  ...require("./modules/open"),
  ...require("./modules/guild"),
  ...require("./modules/restricted")
};

// just a simple log for when the bot goes online
client.once("ready", () => {
  console.log("EasyServerManagement is ready!");
  client.user.setActivity(`${prefix}help`, {
    type: "PLAYING",
  });
  client.guilds.resolve("809384279171661894").channels.resolve("813823581950836746").send("Bot restarted.");
});

// Command processor
client.on("message", (msg) => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      try {
        openCommands[
          args[0]
        ](client, msg, prefix, args);
      } catch (err) { }
    } else {
      if (!msg.author.bot && msg.channel.type != 'dm' || msg.author.id === '399596706402009100') {
        try {
          // this is the command processor, it will go through all of my commands and look for a match
          commands[
            args[0]
          ](client, msg, prefix, args);
        } catch (err) {
          // msg.channel.send('That command is either not supported yet or it does not exist. `command[args[n]]` is fine');
          msg.channel.send('`' + err + '`' + '\n`contact @sebmandal#1337 for assistance.`');
        }
      }
    }
  }
});

// ESM Community Server - Information channel updates.
client.once("ready", () => {
  const guild = client.guilds.cache.get("809384279171661894");

  var j = schedule.scheduleJob('*/10 * * * *', function () {
    guild.channels.resolve("809499645683433534").setName("┗-Members: " + guild.memberCount);
  });

  // Adding Member role
  guild.channels.resolve("809386542673559572").messages.fetch("809506387892633630")
    .then(message => {
      let collector = message.createReactionCollector((reaction, user) => reaction.emoji.name == "mcheart");
      collector.on('collect', (reaction, user) => {
        reaction.message.reactions.resolve(reaction).users.remove(user.id);
        reaction.message.guild.members.resolve(user).roles.add(["809427002331365376", "809420740490559490"]);
      });
    });
});

// Connecting
tokenFile = { ...require('./token') };
client.login(tokenFile.token);