export const pushToClient = (client, payload) => {
    if (!client) return;

    client.write(`data: ${JSON.stringify(payload)}\n\n`);
};

export const pushAfterDelay = (client, payload, delay) => {
    setTimeout(() => pushToClient(client, payload), delay);
};
