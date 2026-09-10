import { MESSAGE_AUTHORS } from '../../constants';
import { isNonEmptyArray } from '../../utils';

export const getLatestBotMessage = messages =>
    [...messages].reverse().find(message => message.author === MESSAGE_AUTHORS.BOT);

export const getLatestActions = messages => {
    const latestBotMessage = getLatestBotMessage(messages);

    return isNonEmptyArray(latestBotMessage?.actions) ? latestBotMessage.actions : [];
};
