/*jshint esversion: 9 */
const {
  Client,
  MessageEmbed
} = require("discord.js");

const UsageEmbed = require('./modules/UsageEmbed');

const client = new Client();

// To use my json parser. I have my token stored in auth.json, so it would be harder (if it's even possible) to crack my token
const fs = require("fs-extra");
const filepath = require("path");
const {
  clear
} = require("console");
const YAML = require("yaml");

// self explanatory
const prefix = "?";
var commands = {
  ...require("./modules/guild management"),
  ...require("./modules/member management"),
  ...require("./modules/info"),
  ...require("./modules/fun")
};

// silenced channels
var SILENCED = [];

// just a simple log for when the bot goes online
client.once("ready", () => {
  console.log("EasyServerManagement is ready!");
  client.user.setActivity("?help", {
    type: "PLAYING",
  });
});

// Command processor
client.on("message", (msg) => {
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (
    // if the person is a bot, the command doesn't start with a prefix, the person doesn't have administrator right or it's a dm, it should return.
    !msg.content.startsWith(prefix) ||
    msg.channel.type === "dm" ||
    msg.author.bot ||
    !msg.member.hasPermission("ADMINISTRATOR")
  ) {
    if (msg.content.startsWith(prefix)) {
      if (command != "help") {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.reply("Unable to send command. You are not an administrator.");
          return;
        }
      }
    } else {
      return;
    }
  }

  try {
    // this is the command processor, it will go through all of my commands and look for a match
    commands[
      Object.keys(commands).find(
        (key) => msg.content.trim().substr(1).split(/ +/)[0] === key
      )
    ](msg, prefix);
  } catch (err) {
    return; // this is here temporarily
    // !(err instanceof TypeError) && log(err);
  }
});

// to write and read json, currently using for admin permissions
function readJson(path) {
  return fs.readJsonSync(filepath.join(__dirname, path));
}

function writeJson(path, json) {
  return fs.writeJsonSync(filepath.join(__dirname, path), json, {
    spaces: "\t",
  });
}

// Joining the server
client.login(readJson("token.json").token);

module.exports = {
  prefix: prefix
};