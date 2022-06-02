// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, naughtyStudents } = require('./config.json');

// 全部的句的檔案在 quotes.json 裡
// naughtyStudents 是特別調皮的同學們的 Discord IDs
const { scoldings, motivation, extra } = require('./quotes.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// 隨機選一個句子的函式
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];
  return item;
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'scold') {
    if (naughtyStudents.includes(interaction.user.id)) {
      // 給特別的同學們特別的「關照」
      await interaction.reply(getRandomItem(extra));
    }
    else {
    // 給其他的同學們一般的「關照」
      await interaction.reply(getRandomItem(scoldings));
    }

  }
  else if (commandName === 'motivate') {
    // 鼓勵學生
    await interaction.reply(getRandomItem(motivation));
  }
});

// Login to Discord with your client's token
client.login(token);
