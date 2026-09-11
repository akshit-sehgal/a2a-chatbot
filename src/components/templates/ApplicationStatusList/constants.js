export const LIST_TITLE = 'Application status';

export const STATUS_VARIANTS = {
    SHORTLISTED: 'shortlisted',
    INTERVIEW_SCHEDULED: 'interview-scheduled',
    UNDER_REVIEW: 'under-review',
    NOT_SELECTED: 'not-selected'
};

export const STATUS_VARIANT_BY_LABEL = {
    Shortlisted: STATUS_VARIANTS.SHORTLISTED,
    'Interview scheduled': STATUS_VARIANTS.INTERVIEW_SCHEDULED,
    'Under review': STATUS_VARIANTS.UNDER_REVIEW,
    'Not selected': STATUS_VARIANTS.NOT_SELECTED
};

export const DEFAULT_STATUS_VARIANT = STATUS_VARIANTS.UNDER_REVIEW;

export const META_SEPARATOR = ' · ';
