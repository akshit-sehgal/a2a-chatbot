import { API_ROUTES } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const buildUrl = (route, queryParams = {}) => {
    const query = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.set(key, value);
        }
    });

    const queryString = query.toString();

    return `${API_BASE_URL}${route}${queryString ? `?${queryString}` : ''}`;
};

export const getStreamUrl = (sessionId, appType) =>
    buildUrl(API_ROUTES.STREAM, { sessionId, type: appType });

const parseEventData = rawData => {
    try {
        return JSON.parse(rawData);
    } catch {
        return null;
    }
};

const postJson = async (route, body) => {
    const response = await fetch(buildUrl(route, { type: body.type }), {
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

export const openChatStream = ({ sessionId, appType, onOpen, onMessage, onError }) => {
    const eventSource = new EventSource(getStreamUrl(sessionId, appType));

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
