const { Client } = require("discord.js");
const client = new Client();

// prefix and importing commands
const fs = require('fs-extra')
var prefix = fs.readJsonSync('./prefix.json').prefix;
var commands = {
  ...require("./modules/guild"),
  ...require("./modules/info"),
  ...require("./modules/restricted")
};

// just a simple log for when the bot goes online
client.once("ready", () => {
  console.log("EasyServerManagement is ready!");
  client.user.setActivity(`${prefix}help`, {
    type: "PLAYING",
  });
});

// Command processor
client.on("message", (msg) => {
  if (msg.content.startsWith(prefix)) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      msg.reply("Nice try bruh");
    } else {
      if (!msg.author.bot && msg.channel.type != 'dm' || msg.author.id === '399596706402009100') {
        const args = msg.content.slice(prefix.length).split(' ');
        try {
          // this is the command processor, it will go through all of my commands and look for a match
          commands[
            args[0]
          ](client, msg, prefix, args);
        } catch (err) {
          // msg.channel.send('That command is either not supported yet or it does not exist. `command[args[n]]` is fine');
          msg.channel.send('`'+err+'`'+'\n`contact @sebmandal#1337 for assistance.`');
        }
      }
    }
  }
});

// Connecting
tokenFile = {...require('./token')};
client.login(tokenFile.token);