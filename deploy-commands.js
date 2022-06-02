const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('scold').setDescription('讓小精靈罵罵你幫你提神'),
  new SlashCommandBuilder().setName('motivate').setDescription('讓小精靈激勵你幫你提神')
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
