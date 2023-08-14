import dotenv = require('dotenv');

dotenv.config();

const hasValue = (configValue: string | undefined) : string => {
    if (!configValue) {
        throw new Error('Config has to be defined');
    }
    return configValue;
};

export const BOT_TOKEN = hasValue(process.env.BOT_TOKEN);
export const MESSAGE_PREFIX = hasValue(process.env.MESSAGE_PREFIX);
