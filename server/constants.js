export const PORT = process.env.PORT || 4000;

export const TEMPLATE_TYPES = {
    WELCOME_SCREEN: 'welcomeScreen',
    JOB_POSTING_FORM: 'jobPostingForm',
    QUESTIONS_BUILDER: 'questionsBuilder',
    JOB_CARD: 'jobCard',
    TEXT_NODE: 'textNode'
};

export const INTENTS = {
    WELCOME: 'welcome',
    POST_JOB: 'postJob',
    BUILD_QUESTIONS: 'buildQuestions',
    PUBLISH_JOB: 'publishJob',
    LIST_JOBS: 'listJobs',
    LIST_APPLICANTS: 'listApplicants',
    SHARE_LINK: 'shareLink',
    FALLBACK: 'fallback'
};

export const TYPING_DELAY_MS = 750;

export const HEARTBEAT_INTERVAL_MS = 25000;

export const APP_TYPES = {
    JOB_SEEKER: 'js',
    RECRUITER: 'rec'
};

export const RECRUITER_NAME = 'Meera';

export const COMPANY_NAME = 'Astranova Mobility';

export const CANDIDATE_NAME = 'Rhea';

export const PROFILE_VIEWS_COUNT = 4;

export const NEW_OPENINGS_COUNT = 12;

export const APPLICATION_STATUS_SUMMARY = '2 in review · 1 interview scheduled';

export const DEFAULT_JOB_DRAFT = {
    fields: {
        title: 'SDE-1',
        description:
            'Build and ship customer-facing features across our rider and driver apps. You will own services end to end with a small, senior team and pair closely with design.',
        location: 'Hybrid — Gurugram',
        experience: '1-3 Yrs',
        salary: '₹12–18 LPA'
    },
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    questions: []
};

export const DEFAULT_QUESTIONS = [
    {
        id: 'question-1',
        type: 'radio',
        label: 'How many years of production React have you shipped?',
        options: ['0–1 years', '1–3 years', '3+ years']
    }
];

export const PAST_JOBS = [
    { title: 'Senior Backend Engineer', meta: 'Gurugram · ₹28–40 LPA · 18 applicants', status: 'Live' },
    { title: 'Product Designer', meta: 'Remote (India) · ₹18–26 LPA · 42 applicants', status: 'Live' },
    { title: 'QA Automation Lead', meta: 'Bengaluru · ₹22–30 LPA · 7 applicants', status: 'Closing' }
];

export const APPLICANTS = [
    { name: 'Rhea Kapoor', role: 'SDE-2 · 4 yrs · React, Node', score: '94%' },
    { name: 'Arjun Verma', role: 'Frontend Engineer · 2 yrs · TypeScript', score: '88%' },
    { name: 'Sara Nair', role: 'Full-stack · 3 yrs · Next.js, Go', score: '81%' }
];
