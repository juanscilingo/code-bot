import dotenv from "dotenv";
import Discord from "discord.js";
import configureCommands from "./configureCommands";

dotenv.config();

const { DISCORD_BOT_TOKEN } = process.env;

console.log(`Discord bot token: ${DISCORD_BOT_TOKEN}`);

const client = new Discord.Client();

configureCommands(client);

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  // List servers the bot is connected to
  console.log("Servers:");
  client.guilds.forEach(guild => {
    console.log(" - " + guild.name);
  });
});

client.login(DISCORD_BOT_TOKEN);
