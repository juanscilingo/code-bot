import dotenv from "dotenv";

dotenv.config();

const { DISCORD_BOT_TOKEN } = process.env;

console.log(`Discord bot token: ${DISCORD_BOT_TOKEN}`);
