import {
    APPLICANTS,
    APPLICATION_STATUS_SUMMARY,
    CANDIDATE_NAME,
    COMPANY_NAME,
    DEFAULT_QUESTIONS,
    JOB_APPLICATIONS,
    NEW_OPENINGS_COUNT,
    PAST_JOBS,
    PROFILE_VIEWS_COUNT,
    RECRUITER_NAME,
    TEMPLATE_TYPES
} from './constants.js';

const buildKeySkillsNote = keySkillCount => {
    if (!keySkillCount) return 'No key skills added';

    const suffix = keySkillCount === 1 ? 'key skill' : 'key skills';

    return `${keySkillCount} ${suffix} listed`;
};

const buildMessage = (type, text, actions, data) => ({
    data: { type, text, actions, data }
});

export const buildWelcomeScreen = () =>
    buildMessage(
        TEMPLATE_TYPES.WELCOME_SCREEN,
        `You have <strong>12 live roles</strong> at ${COMPANY_NAME} and 34 new applicants since Friday. What should we do first?`,
        ['Post a job', 'View my jobs', 'Review applicants', 'Draft an outreach note'],
        {
            greeting: `Good morning, ${RECRUITER_NAME}.`,
            company: COMPANY_NAME,
            options: [
                {
                    id: 'post-job',
                    label: 'Post a job',
                    description: 'Draft, screen and publish in a minute',
                    icon: 'plus',
                    variant: 'primary'
                },
                {
                    id: 'view-jobs',
                    label: 'View my jobs',
                    description: '12 live · 3 closing this week',
                    icon: 'briefcase',
                    variant: 'secondary'
                },
                {
                    id: 'review-applicants',
                    label: 'Review applicants',
                    description: '34 new, 9 shortlist-ready',
                    icon: 'user',
                    variant: 'secondary'
                }
            ]
        }
    );

export const buildJobSeekerWelcomeScreen = () =>
    buildMessage(
        TEMPLATE_TYPES.WELCOME_SCREEN,
        `<strong>${PROFILE_VIEWS_COUNT} recruiters</strong> viewed your profile this week and ${NEW_OPENINGS_COUNT} new job openings match your skills. What should we do first?`,
        ['Update your profile', 'View openings', 'Application status'],
        {
            greeting: `Welcome back, ${CANDIDATE_NAME}.`,
            options: [
                {
                    id: 'update-profile',
                    label: 'Update your profile',
                    description: 'Keep your skills and resume current',
                    icon: 'edit',
                    variant: 'primary'
                },
                {
                    id: 'view-openings',
                    label: 'View openings',
                    description: `${NEW_OPENINGS_COUNT} new roles match your profile`,
                    icon: 'briefcase',
                    variant: 'secondary'
                },
                {
                    id: 'application-status',
                    label: 'Application status',
                    description: APPLICATION_STATUS_SUMMARY,
                    icon: 'clipboard',
                    variant: 'secondary'
                }
            ]
        }
    );

export const buildProfileUpdateForm = profileDraft =>
    buildMessage(
        TEMPLATE_TYPES.PROFILE_UPDATE_FORM,
        "Let's keep things current. Update anything that's changed and I'll refresh your matches.",
        [],
        {
            title: 'Update your profile',
            submitLabel: 'Save profile',
            fields: profileDraft.fields,
            keySkills: profileDraft.keySkills
        }
    );

export const buildProfileUpdated = profileDraft => {
    const { fields, keySkills } = profileDraft;

    return buildMessage(
        TEMPLATE_TYPES.TEXT_NODE,
        `Profile updated. I'll match you against <strong>${fields.preferredRole}</strong> roles in ${fields.preferredLocation} — ${buildKeySkillsNote(keySkills.length)}.`,
        ['View openings', 'Application status'],
        {}
    );
};

export const buildApplicationStatusList = () =>
    buildMessage(
        TEMPLATE_TYPES.APPLICATION_STATUS_LIST,
        `Here's where things stand across your <strong>${JOB_APPLICATIONS.length} active applications</strong>.`,
        ['View openings', 'Update your profile'],
        {
            title: 'Application status',
            applications: JOB_APPLICATIONS
        }
    );

export const buildJobPostingForm = draft =>
    buildMessage(
        TEMPLATE_TYPES.JOB_POSTING_FORM,
        "Let's build it. I pre-filled what I know from your last SDE hire — edit anything.",
        [],
        {
            title: 'New job posting',
            step: 'Step 1 of 2',
            submitLabel: 'Continue',
            fields: draft.fields,
            skills: draft.skills
        }
    );

export const buildQuestionsBuilder = () =>
    buildMessage(
        TEMPLATE_TYPES.QUESTIONS_BUILDER,
        'Want to add a screening questionnaire? Roles with 3 questions get <strong>2.4× better shortlists</strong>.',
        [],
        {
            title: 'Screening questionnaire',
            step: 'Step 2 of 2',
            questions: DEFAULT_QUESTIONS
        }
    );

const buildQuestionsNote = questionCount => {
    if (!questionCount) return 'No screening questions';

    const suffix = questionCount === 1 ? 'screening question' : 'screening questions';

    return `${questionCount} ${suffix} attached`;
};

export const buildJobCard = draft => {
    const { fields, skills, questions } = draft;

    return buildMessage(
        TEMPLATE_TYPES.JOB_CARD,
        `Published. <strong>${fields.title}</strong> is live on 4 boards — I'll surface matches here as they land.`,
        ['Post another job', 'View my jobs', 'Invite candidates', 'Boost this post'],
        {
            title: fields.title,
            company: COMPANY_NAME,
            status: 'Live',
            location: fields.location,
            experience: fields.experience,
            salary: fields.salary,
            description: fields.description,
            skills,
            questionsNote: buildQuestionsNote(questions.length),
            shareLabel: 'Share link'
        }
    );
};

export const buildTextNode = (text, actions = []) =>
    buildMessage(TEMPLATE_TYPES.TEXT_NODE, text, actions, {});

export const buildJobsList = () => {
    const rows = PAST_JOBS.map(
        job =>
            `<li><strong>${job.title}</strong> — ${job.meta} · ${job.status}</li>`
    ).join('');

    return buildTextNode(
        `Your 3 most recent roles:<ul>${rows}</ul>`,
        ['Post a job', 'Review applicants']
    );
};

export const buildApplicantsList = () => {
    const rows = APPLICANTS.map(
        applicant =>
            `<li><strong>${applicant.name}</strong> — ${applicant.role} · match ${applicant.score}</li>`
    ).join('');

    return buildTextNode(
        `Top matches this week:<ul>${rows}</ul>`,
        ['Post a job', 'View my jobs']
    );
};

export const buildShareLink = draft =>
    buildTextNode(
        `Here is the public link for <strong>${draft.fields.title}</strong>: <a href="#">astranova.jobs/sde-1</a>`,
        ['Post another job', 'View my jobs']
    );

export const buildFallback = () =>
    buildTextNode(
        'I can post a job, pull up your live roles, or review new applicants. Which one should we start with?',
        ['Post a job', 'View my jobs', 'Review applicants']
    );
