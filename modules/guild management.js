/*jshint esversion: 9 */
const { MessageEmbed, Client } = require("discord.js");

const client = new Client();

module.exports = {
  eval: (msg, prefix) => {
    var message = msg.content.slice(prefix.length + 4 + 1);
    console.log(message)
    eval(message)
  },
  createrole: (msg, prefix) => {
		var args = msg.content.slice(prefix.length + 10 + 1).split("; ");

		if (args.length != 4) {
			return;
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
		console.log(args.length);

		if (args.length != 3) {
			if (args.length != 2) {
				return;
			} else if (args.length === 2) {
				msg.guild.channels
					.create(args[0], {
						type: args[1],
					})
					.then((channel) => {
						msg.channel.send(
							"Category/channel creation executed successfully."
						);
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
						msg.channel.send(
							"Category/channel creation executed successfully."
						);
					})
					.catch(console.error);
			}
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
	purge: (msg, prefix) => {
		const args = msg.content.split(" ");
		var amount = parseInt(args[1]);

		if (args.length != 2) {
			msg.channel.send("Usage: " + prefix + "purge <amount>");
			return;
		}
		if (amount > 99) {
			msg.channel.send("Cannot delete more than 99 messages at once.");
		} else {
			msg.channel.bulkDelete(amount + 1);
		}
  }
};