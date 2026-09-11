import { APP_TYPES, INTENTS, REFERRAL_APPROVAL_SESSION_ID } from './constants.js';
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
    buildJobApplied,
    buildJobCard,
    buildJobOpeningCard,
    buildJobPostingForm,
    buildJobSeekerWelcomeScreen,
    buildJobsList,
    buildProfileUpdateForm,
    buildProfileUpdated,
    buildQuestionsBuilder,
    buildReferralApprovalCard,
    buildReferralApproved,
    buildReferralRejected,
    buildReferralRequested,
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
    [INTENTS.VIEW_OPENINGS]: () => buildJobOpeningCard(),
    [INTENTS.APPLY_JOB]: (session, type, data) => buildJobApplied(data?.jobTitle),
    [INTENTS.ASK_REFERRAL]: (session, type, data) => buildReferralRequested(data?.jobTitle),
    [INTENTS.REVIEW_REFERRAL]: () => buildReferralApprovalCard(),
    [INTENTS.APPROVE_REFERRAL]: (session, type, data) =>
        buildReferralApproved(data?.candidateName, data?.jobTitle),
    [INTENTS.REJECT_REFERRAL]: (session, type, data) =>
        buildReferralRejected(data?.candidateName, data?.jobTitle),
    [INTENTS.FALLBACK]: () => buildFallback()
};

const buildSideEffects = intent => {
    if (intent !== INTENTS.ASK_REFERRAL) return [];

    return [{ sessionId: REFERRAL_APPROVAL_SESSION_ID, ...buildReferralApprovalCard() }];
};

export const buildReply = ({ sessionId, action, text, data, type }) => {
    const intent = resolveIntent({ action, text });

    if (intent === INTENTS.BUILD_QUESTIONS) applyFormPayload(sessionId, data);
    if (intent === INTENTS.PUBLISH_JOB) applyQuestionsPayload(sessionId, data);
    if (intent === INTENTS.SAVE_PROFILE) applyProfilePayload(sessionId, data);

    const buildReplyForIntent = REPLY_BUILDERS[intent] || REPLY_BUILDERS[INTENTS.FALLBACK];
    const reply = buildReplyForIntent(getSession(sessionId), type, data);

    return { reply, sideEffects: buildSideEffects(intent) };
};
