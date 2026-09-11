import { MESSAGE_AUTHORS } from '../../constants';

export const isUserMessage = message => message?.author === MESSAGE_AUTHORS.USER;

export const scrollToBottom = element => {
    if (!element) return;

    element.scrollTop = element.scrollHeight;
};

export const scrollToElementTop = element => {
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const shouldRevealMessageTop = (message, isTyping) =>
    !isTyping && Boolean(message) && !isUserMessage(message);

export const scrollToLatestMessage = (container, latestMessage, isTyping) => {
    if (shouldRevealMessageTop(latestMessage, isTyping)) {
        scrollToElementTop(container?.lastElementChild);
        return;
    }

    scrollToBottom(container);
};
