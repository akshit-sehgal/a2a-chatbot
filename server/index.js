import cors from 'cors';
import express from 'express';
import {
    HEARTBEAT_INTERVAL_MS,
    PORT,
    TYPING_DELAY_MS,
    WELCOME_DELAY_MS
} from './constants.js';
import { buildReply } from './reply.js';
import {
    clearSessionClient,
    getSession,
    setSessionClient
} from './sessions.js';
import { buildWelcomeScreen } from './templates.js';

const app = express();

app.use(cors());
app.use(express.json());

const openStream = response => {
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no'
    });
    response.write('retry: 3000\n\n');
};

const pushToClient = (client, payload) => {
    if (!client) return;

    client.write(`data: ${JSON.stringify(payload)}\n\n`);
};

const pushAfterDelay = (client, payload, delay) => {
    setTimeout(() => pushToClient(client, payload), delay);
};

app.get('/api/stream', (request, response) => {
    const { sessionId } = request.query;

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    openStream(response);
    setSessionClient(sessionId, response);

    const heartbeat = setInterval(() => response.write(': ping\n\n'), HEARTBEAT_INTERVAL_MS);

    pushAfterDelay(response, buildWelcomeScreen(), WELCOME_DELAY_MS);

    request.on('close', () => {
        clearInterval(heartbeat);
        clearSessionClient(sessionId);
    });
});

const resolveDelay = delay =>
    Number.isFinite(delay) && delay >= 0 ? delay : TYPING_DELAY_MS;

app.post('/api/message', (request, response) => {
    const { sessionId, action, text, data } = request.body || {};

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    const reply = buildReply({ sessionId, action, text, data });
    const { client } = getSession(sessionId);

    pushAfterDelay(client, reply, TYPING_DELAY_MS);

    response.status(202).json({ accepted: true });
});

app.post('/api/push', (request, response) => {
    const { sessionId, delay, ...payload } = request.body || {};

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    const { client } = getSession(sessionId);

    pushAfterDelay(client, { data: payload }, resolveDelay(delay));

    response.status(202).json({ accepted: true, delivered: Boolean(client) });
});

app.listen(PORT, () => {
    console.log(`Mock chat backend listening on http://localhost:${PORT}`);
});
