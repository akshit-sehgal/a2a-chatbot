import { APP_TYPES, INTENTS } from './constants.js';
import { resolveIntent } from './intent.js';
import {
    getSession,
    updateSessionDraft,
    updateSessionProfileDraft
} from './sessions.js';
import {
    buildApplicantsList,
    buildApplicationStatusList,
    buildFallback,
    buildJobCard,
    buildJobPostingForm,
    buildJobSeekerWelcomeScreen,
    buildJobsList,
    buildProfileUpdateForm,
    buildProfileUpdated,
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

const applyProfilePayload = (sessionId, payload) => {
    if (!payload?.fields) return;

    updateSessionProfileDraft(sessionId, {
        fields: { ...getSession(sessionId).profileDraft.fields, ...payload.fields },
        keySkills: Array.isArray(payload.keySkills)
            ? payload.keySkills
            : getSession(sessionId).profileDraft.keySkills
    });
};

const buildWelcomeReply = (session, type) =>
    type === APP_TYPES.JOB_SEEKER ? buildJobSeekerWelcomeScreen() : buildWelcomeScreen();

const REPLY_BUILDERS = {
    [INTENTS.WELCOME]: buildWelcomeReply,
    [INTENTS.POST_JOB]: session => buildJobPostingForm(session.draft),
    [INTENTS.BUILD_QUESTIONS]: () => buildQuestionsBuilder(),
    [INTENTS.PUBLISH_JOB]: session => buildJobCard(session.draft),
    [INTENTS.LIST_JOBS]: () => buildJobsList(),
    [INTENTS.LIST_APPLICANTS]: () => buildApplicantsList(),
    [INTENTS.SHARE_LINK]: session => buildShareLink(session.draft),
    [INTENTS.UPDATE_PROFILE]: session => buildProfileUpdateForm(session.profileDraft),
    [INTENTS.SAVE_PROFILE]: session => buildProfileUpdated(session.profileDraft),
    [INTENTS.APPLICATION_STATUS]: () => buildApplicationStatusList(),
    [INTENTS.FALLBACK]: () => buildFallback()
};

export const buildReply = ({ sessionId, action, text, data, type }) => {
    const intent = resolveIntent({ action, text });

    if (intent === INTENTS.BUILD_QUESTIONS) applyFormPayload(sessionId, data);
    if (intent === INTENTS.PUBLISH_JOB) applyQuestionsPayload(sessionId, data);
    if (intent === INTENTS.SAVE_PROFILE) applyProfilePayload(sessionId, data);

    const buildReplyForIntent = REPLY_BUILDERS[intent] || REPLY_BUILDERS[INTENTS.FALLBACK];

    return buildReplyForIntent(getSession(sessionId), type);
};
