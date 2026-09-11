export const APP_NAME = 'Recruiter Assist';

export const MESSAGE_AUTHORS = {
    USER: 'user',
    BOT: 'bot'
};

export const TEMPLATE_TYPES = {
    WELCOME_SCREEN: 'welcomeScreen',
    JOB_POSTING_FORM: 'jobPostingForm',
    QUESTIONS_BUILDER: 'questionsBuilder',
    JOB_CARD: 'jobCard',
    PROFILE_UPDATE_FORM: 'profileUpdateForm',
    APPLICATION_STATUS_LIST: 'applicationStatusList',
    JOB_OPENING_CARD: 'jobOpeningCard',
    REFERRAL_APPROVAL_CARD: 'referralApprovalCard',
    TEXT_NODE: 'textNode'
};

export const TEMPLATE_FALLBACK_TEXT = {
    [TEMPLATE_TYPES.WELCOME_SCREEN]: 'What should we do first?',
    [TEMPLATE_TYPES.JOB_POSTING_FORM]: 'Fill in the details below to post your job.',
    [TEMPLATE_TYPES.QUESTIONS_BUILDER]: 'Add screening questions to get better shortlists.',
    [TEMPLATE_TYPES.JOB_CARD]: 'Your job is live.',
    [TEMPLATE_TYPES.PROFILE_UPDATE_FORM]: 'Update the fields below to refresh your profile.',
    [TEMPLATE_TYPES.APPLICATION_STATUS_LIST]: 'Here is where things stand on your applications.',
    [TEMPLATE_TYPES.JOB_OPENING_CARD]: 'A new role matches your profile.',
    [TEMPLATE_TYPES.REFERRAL_APPROVAL_CARD]: 'A candidate is asking for a referral.',
    [TEMPLATE_TYPES.TEXT_NODE]: 'Here is what I have for you.'
};

export const QUESTION_TYPES = {
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    RADIO: 'radio'
};

export const API_ROUTES = {
    MESSAGE: '/sse/message',
    STREAM: '/sse/stream'
};

export const CONNECTION_STATUS = {
    CONNECTING: 'connecting',
    OPEN: 'open',
    CLOSED: 'closed'
};

export const QUERY_PARAMS = {
    ENC_USER_ID: 'encUserId',
    APP_TYPE: 'type'
};

export const APP_TYPES = {
    JOB_SEEKER: 'js',
    RECRUITER: 'rec'
};

export const APP_NAME_BY_TYPE = {
    [APP_TYPES.JOB_SEEKER]: 'Job seeker assist',
    [APP_TYPES.RECRUITER]: 'Recruiter Assist'
};

export const BUTTON_VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DASHED: 'dashed',
    GHOST: 'ghost'
};

export const COMMON_LABELS = {
    ADD_OPTION: 'Add option',
    ADD_QUESTION: 'Add question',
    CONTINUE: 'Continue',
    OPTION: 'Option',
    SEND: 'Send',
    SHARE_LINK: 'Share link',
    SKIP: 'Skip',
    SAVE_AND_PUBLISH: 'Save & publish',
    SAVE_PROFILE: 'Save profile'
};

export const ERROR_MESSAGE_TEXT = 'Something went wrong while reaching the server. Please try again.';
