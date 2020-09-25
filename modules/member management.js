/*jshint esversion: 9 */
const {
  MessageEmbed,
  Client
} = require("discord.js");

const UsageEmbed = require("./UsageEmbed");

const client = new Client();

module.exports = {
  mute: (msg, prefix) => {
    const user = msg.mentions.users.first();

    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);

      // If the member is in the guild
      if (member) {
        /**
         * Mute the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.voice
          .setMute(!member.voice.mute)
          .then(() => {
            // We let the message author know we were able to mute the person
            msg.reply(
              member.voice.mute ?
              `Successfully muted @${user.username}.` :
              `Successfully unmuted @${user.username}.`
            );
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to mute the member,
            // either due to missing permissions or role hierarchy
            msg.reply(
              "I was unable to mute the member or user is not in voice chat."
            );
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        msg.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  deaf: (msg, prefix) => {
    const user = msg.mentions.users.first();

    if (user) {
      const member = msg.guild.member(user);
      console.log("Fetched user");

      if (member) {
        console.log("Fetched member");
        console.log(member.voice.deaf);
        member.voice
          .setDeaf(!member.voice.deaf)
          .then(() => {
            msg.reply(
              member.voice.mute ?
              `Successfully deafened @${user.username}.` :
              `Successfully undeafened @${user.username}.`
            );
            console.log("Deafened member");
          })
          .catch((err) => {
            msg.reply(
              "I was unable to deafen the member or user is not in voice chat."
            );
            console.error(err);
          });
      } else {
        msg.reply("That user isn't in this guild!");
      }
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  kick: (msg, prefix) => {
    const user = msg.mentions.users.first();

    if (user) {
      const member = msg.guild.member(user);

      if (member) {
        member
          .kick()
          .then(() => {
            msg.reply(`Successfully kicked ${user}.`);
          })
          .catch((err) => {
            msg.reply("I was unable to kick the member");
            console.error(err);
          });
      } else {
        msg.reply("That user isn't in this guild!");
      }
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  ban: (msg, prefix) => {
    const user = msg.mentions.users.first();

    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);

      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .ban()
          .then(() => {
            // We let the message author know we were able to ban the person
            msg.reply(`Successfully banned @${user.username}.`);
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            msg.reply("I was unable to ban the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        msg.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  createrole: (msg, prefix) => {
    var args = msg.content.slice(prefix.length + 10 + 1).split("; ");

    if (args.length != 4) {
      msg.channel.send(
        new UsageEmbed(
          "createrole",
          "; ",
          false,
          ["name", "color", "permissions", "mentionable"],
          [
            "String. Can have spaces.",
            "Must be a [ColorResolvable](https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable)",
            "Must be `NONE` or a [PermissionResolvable](https://discord.js.org/#/docs/main/stable/typedef/PermissionResolvable)",
            "Boolean",
          ]
        )
      );
    } else {
      msg.guild.roles.create({
        data: {
          name: args[0],
          color: args[1],
          permissions: /\d/g.test(args[2]) ? parseInt(args[2]) : args[2],
          mentionable: args[3] == "true",
        },
      });
      msg.reply("Created role " + args[0]);
    }
  },

  deleterole: (msg, prefix) => {
    const role = msg.mentions.roles.first();

    if (role) {
      role.delete();
      msg.channel.send(`Deleted role ${role.name}.`);
    } else {
      msg.channel.send("You didn't enter a role!");
    }
  },

  create: (msg, prefix) => {
    let command = "create";
    let args = msg.content
      .slice(prefix.length + command.length + 1)
      .split(/; +/);
    console.log(args);

    if (args.length > 3 || args.length < 2) {
      msg.channel.send(
        new UsageEmbed(
          "create",
          " ",
          false,
          ["name", "type", "category"],
          [
            "String. Can have spaces.",
            "String. text/voice/category",
            "Number. No spaces. Category ID. Leave empty for no category.",
          ],
          (notes = ["if type is category, leave category ID blank"])
        )
      );
    } else if (args.length === 2) {
      msg.guild.channels
        .create(args[0], {
          type: args[1],
        })
        .then((channel) => {
          msg.channel.send("Category/channel creation executed successfully.");
        })
        .catch(console.error);
    } else {
      // Create a new text channel
      msg.guild.channels
        .create(args[0], {
          type: args[1],
        })
        .then((channel) => {
          channel.setParent(args[2]);
          msg.channel.send("Category/channel creation executed successfully.");
        })
        .catch(console.error);
    }
  },

  delete: (msg, prefix) => {
    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    args.shift(); // remove command from message to just get args

    msg.guild.channels
      .resolve(args[0])
      .delete()
      .then(msg.channel.send("Deleted."))
      .catch(console.error);
  },
};