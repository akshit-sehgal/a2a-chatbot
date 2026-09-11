import { randomUUID } from 'crypto';
import cors from 'cors';
import express from 'express';
import { HEARTBEAT_INTERVAL_MS, PORT, TYPING_DELAY_MS } from './constants.js';
import { buildReply } from './reply.js';
import {
    clearSessionClient,
    getSession,
    setSessionClient
} from './sessions.js';

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

app.get('/sse/stream', (request, response) => {
    const { sessionId } = request.query;

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    openStream(response);
    setSessionClient(sessionId, response);

    const heartbeat = setInterval(() => response.write(': ping\n\n'), HEARTBEAT_INTERVAL_MS);

    request.on('close', () => {
        clearInterval(heartbeat);
        clearSessionClient(sessionId);
    });
});

const resolveDelay = delay =>
    Number.isFinite(delay) && delay >= 0 ? delay : TYPING_DELAY_MS;

app.post('/sse/message', (request, response) => {
    const { sessionId, action, text, data, threadId } = request.body || {};

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    const resolvedThreadId = threadId || randomUUID();
    const reply = buildReply({ sessionId, action, text, data });
    const { client } = getSession(sessionId);

    pushAfterDelay(client, { threadId: resolvedThreadId, ...reply }, TYPING_DELAY_MS);

    response.status(202).json({ accepted: true });
});

app.post('/sse/push', (request, response) => {
    const { sessionId, data, delay, threadId = null } = request.body || {};

    if (!sessionId) {
        response.status(400).json({ error: 'sessionId is required' });
        return;
    }

    const { client } = getSession(sessionId);

    pushAfterDelay(client, { threadId, data }, resolveDelay(delay));

    response.status(202).json({ accepted: true, delivered: Boolean(client) });
});

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});
