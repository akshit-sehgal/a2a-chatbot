import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CONNECTION_STATUS } from '../../constants';
import { openChatStream, postChatMessage } from '../../services/chatService';
import { isNonEmptyString } from '../../utils';
import {
    createErrorMessage,
    createUserMessage,
    getActionLabel,
    getActionUserText,
    getAppType,
    getSessionId,
    getThreadIds,
    getThreadMessages,
    hasUnvisitedThread,
    normalizeBotMessage
} from './utils';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(
        CONNECTION_STATUS.CONNECTING
    );
    const [selectedThreadId, setSelectedThreadId] = useState();
    const [visitedThreadIds, setVisitedThreadIds] = useState(() => new Set());
    const [lastSeenThreadId, setLastSeenThreadId] = useState();

    const sessionIdRef = useRef(getSessionId());
    const appTypeRef = useRef(getAppType());
    const hasRequestedWelcomeRef = useRef(false);

    const threadIds = useMemo(() => getThreadIds(messages), [messages]);
    const activeThreadId =
        selectedThreadId === undefined ? threadIds[0] : selectedThreadId;
    const threadMessages = useMemo(
        () => getThreadMessages(messages, activeThreadId),
        [messages, activeThreadId]
    );
    const activeThreadNumber = threadIds.indexOf(activeThreadId) + 1;
    const totalThreads = threadIds.length;

    if (activeThreadId !== undefined && activeThreadId !== lastSeenThreadId) {
        setLastSeenThreadId(activeThreadId);
        setVisitedThreadIds(new Set(visitedThreadIds).add(activeThreadId));
    }

    const hasNewThread = hasUnvisitedThread(threadIds, visitedThreadIds);

    const appendMessage = useCallback(message => {
        setMessages(previousMessages => previousMessages.concat([message]));
    }, []);

    const goToNextThread = useCallback(() => {
        if (threadIds.length <= 1) return;

        const currentIndex = threadIds.indexOf(activeThreadId);
        const nextIndex = (currentIndex + 1) % threadIds.length;

        setSelectedThreadId(threadIds[nextIndex]);
    }, [threadIds, activeThreadId]);

    const publishToServer = useCallback(
        async body => {
            setIsTyping(true);

            try {
                await postChatMessage({
                    sessionId: sessionIdRef.current,
                    threadId: activeThreadId ?? null,
                    type: appTypeRef.current,
                    ...body
                });
            } catch {
                setIsTyping(false);
                appendMessage(createErrorMessage(activeThreadId));
            }
        },
        [appendMessage, activeThreadId]
    );

    const onStreamOpen = useCallback(() => {
        setConnectionStatus(CONNECTION_STATUS.OPEN);

        if (hasRequestedWelcomeRef.current) return;

        hasRequestedWelcomeRef.current = true;
        publishToServer({});
    }, [publishToServer]);

    const onStreamError = useCallback(() => {
        setConnectionStatus(CONNECTION_STATUS.CLOSED);
        setIsTyping(false);
    }, []);

    const onStreamMessage = useCallback(
        (data, threadId) => {
            setIsTyping(false);
            appendMessage(normalizeBotMessage(data, threadId));
        },
        [appendMessage]
    );

    const sendMessage = useCallback(
        text => {
            if (!isNonEmptyString(text)) return;

            const trimmedText = text.trim();

            appendMessage(createUserMessage(trimmedText, activeThreadId));
            publishToServer({ text: trimmedText });
        },
        [appendMessage, publishToServer, activeThreadId]
    );

    const sendAction = useCallback(
        (action, data) => {
            const label = getActionLabel(action);

            if (!isNonEmptyString(label)) return;

            appendMessage(
                createUserMessage(getActionUserText(action), activeThreadId)
            );
            publishToServer({ action: label, data });
        },
        [appendMessage, publishToServer, activeThreadId]
    );

    useEffect(() => {
        const closeStream = openChatStream({
            sessionId: sessionIdRef.current,
            appType: appTypeRef.current,
            onOpen: onStreamOpen,
            onMessage: onStreamMessage,
            onError: onStreamError
        });

        return closeStream;
    }, [onStreamOpen, onStreamMessage, onStreamError]);

    return {
        activeThreadNumber,
        connectionStatus,
        goToNextThread,
        hasNewThread,
        isTyping,
        sendAction,
        sendMessage,
        threadMessages,
        totalThreads
    };
};

export default useChat;
