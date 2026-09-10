import { INTENTS } from './constants.js';
import { resolveIntent } from './intent.js';
import { getSession, updateSessionDraft } from './sessions.js';
import {
    buildApplicantsList,
    buildFallback,
    buildJobCard,
    buildJobPostingForm,
    buildJobsList,
    buildQuestionsBuilder,
    buildShareLink,
    buildWelcomeScreen
} from './templates.js';

const applyFormPayload = (sessionId, payload) => {
    if (!payload?.fields) return;

    updateSessionDraft(sessionId, {
        fields: { ...getSession(sessionId).draft.fields, ...payload.fields },
        skills: Array.isArray(payload.skills)
            ? payload.skills
            : getSession(sessionId).draft.skills
    });
};

const applyQuestionsPayload = (sessionId, payload) => {
    if (!Array.isArray(payload?.questions)) return;

    updateSessionDraft(sessionId, { questions: payload.questions });
};

const REPLY_BUILDERS = {
    [INTENTS.WELCOME]: () => buildWelcomeScreen(),
    [INTENTS.POST_JOB]: draft => buildJobPostingForm(draft),
    [INTENTS.BUILD_QUESTIONS]: () => buildQuestionsBuilder(),
    [INTENTS.PUBLISH_JOB]: draft => buildJobCard(draft),
    [INTENTS.LIST_JOBS]: () => buildJobsList(),
    [INTENTS.LIST_APPLICANTS]: () => buildApplicantsList(),
    [INTENTS.SHARE_LINK]: draft => buildShareLink(draft),
    [INTENTS.FALLBACK]: () => buildFallback()
};

export const buildReply = ({ sessionId, action, text, data }) => {
    const intent = resolveIntent({ action, text });

    applyFormPayload(sessionId, data);
    applyQuestionsPayload(sessionId, data);

    const buildReplyForIntent = REPLY_BUILDERS[intent] || REPLY_BUILDERS[INTENTS.FALLBACK];

    return buildReplyForIntent(getSession(sessionId).draft);
};
