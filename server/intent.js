import { INTENTS } from './constants.js';

const normalize = value => (typeof value === 'string' ? value.trim().toLowerCase() : '');

const includesAny = (value, keywords) =>
    keywords.some(keyword => value.includes(keyword));

const resolveFromAction = action => {
    if (action === 'continue') return INTENTS.BUILD_QUESTIONS;
    if (action === 'save & publish' || action === 'skip') return INTENTS.PUBLISH_JOB;
    if (action === 'share link') return INTENTS.SHARE_LINK;

    return null;
};

const resolveFromText = text => {
    if (includesAny(text, ['applicant', 'candidate', 'shortlist'])) {
        return INTENTS.LIST_APPLICANTS;
    }

    if (
        includesAny(text, ['post a job', 'post another job', 'new job', 'create a job']) ||
        (text.includes('job') && includesAny(text, ['post', 'new', 'create', 'draft']))
    ) {
        return INTENTS.POST_JOB;
    }

    if (includesAny(text, ['my jobs', 'view jobs', 'roles', 'openings'])) {
        return INTENTS.LIST_JOBS;
    }

    return INTENTS.FALLBACK;
};

export const resolveIntent = ({ action, text }) => {
    if (!action && !text) return INTENTS.WELCOME;

    return resolveFromAction(normalize(action)) || resolveFromText(normalize(action || text));
};
