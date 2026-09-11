import {
    ERROR_MESSAGE_TEXT,
    MESSAGE_AUTHORS,
    QUERY_PARAMS,
    TEMPLATE_FALLBACK_TEXT,
    TEMPLATE_TYPES
} from '../../constants';
import {
    generateId,
    getQueryParam,
    isNonEmptyString,
    toArray
} from '../../utils';

export const getSessionId = () => getQueryParam(QUERY_PARAMS.ENC_USER_ID);

export const getAppType = () => getQueryParam(QUERY_PARAMS.APP_TYPE);

export const createUserMessage = (text, threadId = null) => ({
    id: generateId(),
    author: MESSAGE_AUTHORS.USER,
    type: TEMPLATE_TYPES.TEXT_NODE,
    text,
    actions: [],
    data: {},
    threadId
});

const getBotMessageType = payload => payload?.type || TEMPLATE_TYPES.TEXT_NODE;

const getFallbackText = type =>
    TEMPLATE_FALLBACK_TEXT[type] || TEMPLATE_FALLBACK_TEXT[TEMPLATE_TYPES.TEXT_NODE];

const getBotMessageText = (payload, type) =>
    isNonEmptyString(payload?.text) ? payload.text : getFallbackText(type);

export const normalizeBotMessage = (payload, threadId = null) => {
    const type = getBotMessageType(payload);

    return {
        id: payload?.id || generateId(),
        author: MESSAGE_AUTHORS.BOT,
        type,
        text: getBotMessageText(payload, type),
        actions: toArray(payload?.actions),
        data: payload?.data || {},
        threadId
    };
};

export const createErrorMessage = threadId =>
    normalizeBotMessage(
        { type: TEMPLATE_TYPES.TEXT_NODE, text: ERROR_MESSAGE_TEXT },
        threadId
    );

export const getActionLabel = action =>
    typeof action === 'string' ? action : action?.label || '';

export const getActionUserText = action =>
    typeof action === 'string' ? action : action?.userText || action?.label || '';

export const getThreadIds = messages => [...new Set(messages.map(message => message.threadId))];

export const getThreadMessages = (messages, threadId) =>
    messages.filter(message => message.threadId === threadId);

export const hasUnvisitedThread = (threadIds, visitedThreadIds) =>
    threadIds.some(threadId => !visitedThreadIds.has(threadId));
