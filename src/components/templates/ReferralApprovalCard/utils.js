import {
    CANDIDATE_META_FALLBACKS,
    JOB_META_FALLBACKS,
    SCORE_THRESHOLDS,
    SCORE_VARIANTS
} from './constants';
import briefcaseIcon from '../../../assets/icons/briefcase-muted.svg';
import currencyIcon from '../../../assets/icons/currency-muted.svg';
import locationIcon from '../../../assets/icons/location-muted.svg';

export const getCandidateMetaRows = candidate => [
    {
        id: 'experience',
        icon: briefcaseIcon,
        value: candidate?.experience || CANDIDATE_META_FALLBACKS.EXPERIENCE
    },
    {
        id: 'location',
        icon: locationIcon,
        value: candidate?.location || CANDIDATE_META_FALLBACKS.LOCATION
    }
];

export const getJobMetaRows = job => [
    { id: 'location', icon: locationIcon, value: job?.location || JOB_META_FALLBACKS.LOCATION },
    { id: 'ctc', icon: currencyIcon, value: job?.ctc || JOB_META_FALLBACKS.CTC }
];

export const getScoreVariant = score => {
    if (score >= SCORE_THRESHOLDS.HIGH) return SCORE_VARIANTS.HIGH;
    if (score >= SCORE_THRESHOLDS.MEDIUM) return SCORE_VARIANTS.MEDIUM;

    return SCORE_VARIANTS.LOW;
};

export const isValidScore = score => typeof score === 'number' && Number.isFinite(score);

export const getScoreLabel = score => (isValidScore(score) ? `${score}% match` : 'Not scored');
