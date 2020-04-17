import 'source-map-support/register'
import Discord from "discord.js";
import "./boot.js";
import configureCommands from "./configureCommands";

const { DISCORD_BOT_TOKEN } = process.env;

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
