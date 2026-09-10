import { DEFAULT_JOB_DRAFT } from './constants.js';

const sessions = new Map();

const createSession = () => ({
    client: null,
    draft: structuredClone(DEFAULT_JOB_DRAFT)
});

export const getSession = sessionId => {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, createSession());
    }

    return sessions.get(sessionId);
};

export const setSessionClient = (sessionId, client) => {
    getSession(sessionId).client = client;
};

export const clearSessionClient = sessionId => {
    const session = sessions.get(sessionId);

    if (session) {
        session.client = null;
    }
};

export const updateSessionDraft = (sessionId, patch) => {
    const session = getSession(sessionId);

    session.draft = { ...session.draft, ...patch };

    return session.draft;
};
