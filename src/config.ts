import dotenv = require('dotenv');
dotenv.config();

export const { BOT_TOKEN, MESSAGE_PREFIX }: { BOT_TOKEN: string; MESSAGE_PREFIX: string } = process.env as any;