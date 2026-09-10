import { useCallback, useEffect, useRef, useState } from 'react';
import { CONNECTION_STATUS } from '../../constants';
import { openChatStream, postChatMessage } from '../../services/chatService';
import { isNonEmptyString } from '../../utils';
import {
    createErrorMessage,
    createUserMessage,
    getActionLabel,
    getActionUserText,
    getSessionId,
    normalizeBotMessage
} from './utils';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(
        CONNECTION_STATUS.CONNECTING
    );

    const sessionIdRef = useRef(getSessionId());

    const appendMessage = useCallback(message => {
        setMessages(previousMessages => previousMessages.concat([message]));
    }, []);

    const onStreamOpen = useCallback(() => {
        setConnectionStatus(CONNECTION_STATUS.OPEN);
    }, []);

    const onStreamError = useCallback(() => {
        setConnectionStatus(CONNECTION_STATUS.CLOSED);
        setIsTyping(false);
    }, []);

    const onStreamMessage = useCallback(
        payload => {
            setIsTyping(false);
            appendMessage(normalizeBotMessage(payload));
        },
        [appendMessage]
    );

    const publishToServer = useCallback(
        async body => {
            setIsTyping(true);

            try {
                await postChatMessage({ sessionId: sessionIdRef.current, ...body });
            } catch {
                setIsTyping(false);
                appendMessage(createErrorMessage());
            }
        },
        [appendMessage]
    );

    const sendMessage = useCallback(
        text => {
            if (!isNonEmptyString(text)) return;

            const trimmedText = text.trim();

            appendMessage(createUserMessage(trimmedText));
            publishToServer({ text: trimmedText });
        },
        [appendMessage, publishToServer]
    );

    const sendAction = useCallback(
        (action, data) => {
            const label = getActionLabel(action);

            if (!isNonEmptyString(label)) return;

            appendMessage(createUserMessage(getActionUserText(action)));
            publishToServer({ action: label, data });
        },
        [appendMessage, publishToServer]
    );

    useEffect(() => {
        const closeStream = openChatStream({
            sessionId: sessionIdRef.current,
            onOpen: onStreamOpen,
            onMessage: onStreamMessage,
            onError: onStreamError
        });

        return closeStream;
    }, [onStreamOpen, onStreamMessage, onStreamError]);

    return {
        connectionStatus,
        isTyping,
        messages,
        sendAction,
        sendMessage
    };
};

export default useChat;
