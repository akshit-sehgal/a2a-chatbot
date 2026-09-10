import {
    ERROR_MESSAGE_TEXT,
    MESSAGE_AUTHORS,
    QUERY_PARAMS,
    TEMPLATE_TYPES
} from '../../constants';
import {
    generateId,
    getQueryParam,
    isNonEmptyString,
    toArray
} from '../../utils';

export const getSessionId = () => getQueryParam(QUERY_PARAMS.ENC_USER_ID);

export const createUserMessage = text => ({
    id: generateId(),
    author: MESSAGE_AUTHORS.USER,
    type: TEMPLATE_TYPES.TEXT_NODE,
    text,
    actions: [],
    data: {}
});

export const normalizeBotMessage = payload => ({
    id: payload?.id || generateId(),
    author: MESSAGE_AUTHORS.BOT,
    type: payload?.type || TEMPLATE_TYPES.TEXT_NODE,
    text: isNonEmptyString(payload?.text) ? payload.text : '',
    actions: toArray(payload?.actions),
    data: payload?.data || {}
});

export const createErrorMessage = () =>
    normalizeBotMessage({ type: TEMPLATE_TYPES.TEXT_NODE, text: ERROR_MESSAGE_TEXT });

export const getActionLabel = action =>
    typeof action === 'string' ? action : action?.label || '';

export const getActionUserText = action =>
    typeof action === 'string' ? action : action?.userText || action?.label || '';
