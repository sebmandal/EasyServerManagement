/*jshint esversion: 9 */
const {
  Client,
  MessageEmbed
} = require("discord.js");

const client = new Client();

// To use my json parser. I have my token stored in auth.json, so it would be harder (if it's even possible) to crack my token
const fs = require("fs-extra");
const filepath = require("path");
const {
  clear
} = require("console");
const YAML = require("yaml");

// self explanatory
const prefix = "!";
var commands = {
  ...require("./commands"),
};

// just a simple log for when the bot goes online
client.once("ready", () => {
  console.log("EasyServerManagement is ready!");
  client.user.setActivity("!help", {
    type: "PLAYING",
  });
});

// Command processor
client.on("message", (msg) => {
  if (
    !msg.content.startsWith(prefix) ||
    msg.channel.type === "dm" ||
    msg.author.bot
  )
    return;
  try {
    commands[
      Object.keys(commands).find(
        (key) => msg.content.trim().substr(1).split(/ +/)[0] === key
      )
    ](msg);
  } catch (err) {
    !(err instanceof TypeError) && log.warn(err);
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