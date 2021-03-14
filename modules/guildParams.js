module.exports = {
  role: (client, msg, prefix, args) => {
    msg.channel.send('`1: name: string", \n2: hex (1100ff): string", \n3: permissions: integer", \n4: mentionable: boolean"`')
  },
  deleterole: (client, msg, prefix, args) => {
    msg.channel.send('`1: @rolename (tag the role)`');
  },
  delete: (client, msg, prefix, args) => {
    msg.channel.send('`1: channel/category id`');
  },
  purge: (client, msg, prefix, args) => {
    msg.channel.send('`1: amount of messages to delete: integer`');
  },
  steal: (client, msg, prefix, args) => {
    msg.channel.send('`1: emote (:emoteName:) \n2: name in this server (with no colons)`')
  },
  add: (client, msg, prefix, args) => {
    msg.channel.send('`1: Person (@tag)`');
  },
  remove: (client, msg, prefix, args) => {
    msg.channel.send('`1: Person (@tag)`');
  },
}