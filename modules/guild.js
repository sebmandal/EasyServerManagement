const fs = require('fs-extra');

module.exports = {
  role: (client, msg, prefix, args) => {
    msg.guild.roles.create({
      data: {
        name: args[1],
        color: args[2],
        permissions: parseInt(args[3]),
        mentionable: args[4] == 'true',
      }
    });
    msg.reply('Created role @' + args[1]);
  },
  deleterole: (client, msg, prefix, args) => {
    const role = msg.mentions.roles.first();
    if (role) {
      role.delete();
      msg.channel.send(`Deleted role ${role.name}.`);
    } else {
      msg.channel.send("You didn't enter a role!");
    }
  },
  delete: (client, msg, prefix, args) => {
    args = msg.content.slice(prefix.length).trim().split(/ +/);
    args.shift(); // remove command from message to just get args
    msg.guild.channels
      .resolve(args[0])
      .delete()
      .then(msg.channel.send("Deleted."));
  },
  purge: (client, msg, prefix, args) => {
    if (parseInt(args[1]) < 101 && parseInt(args[1]) > 0) {
      msg.channel.bulkDelete(parseInt(args[1]) + 1);
    } else {
      msg.channel.send('That value is either too high or too low. Choose a value between 1 and 99.');
    }
  },
  steal: (client, msg, prefix, args) => {
    if (args.length > 5)
      return msg.reply("slow down, buckaroo! Only do 5 emoji at a time.");

    // iterate through the added emoji (must be seperated with a space in message)
    msg.guild.emojis
      .create(
        `https://cdn.discordapp.com/emojis/${args[1]
          .split(":")[2]
          .replace(">", "")}${args[1].startsWith("<a:") ? ".gif?v=1" : ".png?v=1"
        }`,
        args[2]
      )
      .then((emoji) => msg.reply(`added ${emoji}`))
      .catch((err) => log.warn(err));
  },
  mute: (client, msg, prefix, args) => {
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
  deaf: (client, msg, prefix, args) => {
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
  kick: (client, msg, prefix, args) => {
    const user = msg.mentions.users.first();

    if (user) {
      const member = msg.guild.member(user);

      if (member) {
        // sending a DM to the victim
        msg.mentions.users.first().send('You have been kicked from ' + msg.guild.name + 'for ' + args.slice(2));
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
  ban: (client, msg, prefix, args) => {
    const user = msg.mentions.users.first();

    // If we have a user mentioned
    if (user) {
      // sending a DM to the victim
      msg.mentions.users.first().send('You have been banned from ' + msg.guild.name + 'for ' + args.slice(2));

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
            // sending a DM to the victim
            msg.guild.members.resolve(msg.mentions.users.first()).send('You have been banned from ' + msg.guild.name + 'for ' + args.slice(2));
            
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
  add: (client, msg, prefix, args) => {
    // for people
    person = msg.mentions.users.first() || msg.guild.members.resolve(args[1]);
    msg.channel.createOverwrite(person,
      {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      });
    // for roles
    role = msg.mentions.roles.first() || msg.guild.roles.resolve(args[1]);
    msg.channel.createOverwrite(role,
      {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      });
  },
  remove: (client, msg, prefix, args) => {
    // for people
    person = msg.mentions.users.first() || msg.guild.members.resolve(args[1]);
    if (person) {
      msg.channel.permissionOverwrites.get(person.id).delete()
    }
    // for roles
    role = msg.mentions.roles.first() || msg.guild.roles.resolve(args[1]);
    if (role) {
      msg.channel.permissionOverwrites.get(role.id).delete()
    }
  },
  // roleReaction: (client, msg, prefix, args) {
    
  // },
  ticket: (client, msg, prefix, args) => {
    var db = fs.readJSONSync('./guilds.json');
    db.map(guild => {
      if (guild.id === msg.guild.id) {
        if (guild.tickets) {
          if (!guild.tickets.includes(msg.channel.id)) {
            guild.tickets.push(msg.channel.id);
          } else {
            return msg.channel.send('There is already a ticket going on in this channel.');
          }
        } else {
          guild.tickets = [msg.channel.id];
        }
      }
    });
    fs.writeJSONSync('./guilds.json', db);
    return msg.channel.send(`Ticket ${msg.channel.id} created. Send ` + '`🔒`' + `to close this ticket.`);
  },
  // giverole: (client, msg, prefix, args) => {
  //   // to give a person a role
  // }
};