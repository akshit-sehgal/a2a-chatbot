import { API_ROUTES } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const buildUrl = route => `${API_BASE_URL}${route}`;

export const getStreamUrl = sessionId =>
    `${buildUrl(API_ROUTES.STREAM)}?sessionId=${encodeURIComponent(sessionId)}`;

const parseEventData = rawData => {
    try {
        return JSON.parse(rawData);
    } catch {
        return null;
    }
};

const postJson = async (route, body) => {
    const response = await fetch(buildUrl(route), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Request to ${route} failed with status ${response.status}`);
    }

    return response.json();
};

export const postChatMessage = body => postJson(API_ROUTES.MESSAGE, body);

export const openChatStream = ({ sessionId, onOpen, onMessage, onError }) => {
    const eventSource = new EventSource(getStreamUrl(sessionId));

    eventSource.onopen = () => onOpen();

    eventSource.onmessage = event => {
        const payload = parseEventData(event.data);

        if (payload?.data) {
            onMessage(payload.data, payload.threadId ?? null);
        }
    };

    eventSource.onerror = () => onError();

    return () => eventSource.close();
};
