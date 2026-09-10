import { MESSAGE_AUTHORS } from '../../constants';

export const isUserMessage = message => message?.author === MESSAGE_AUTHORS.USER;

export const scrollToBottom = element => {
    if (!element) return;

    element.scrollTop = element.scrollHeight;
};
