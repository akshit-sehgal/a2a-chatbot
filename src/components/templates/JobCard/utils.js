import briefcaseIcon from '../../../assets/icons/briefcase-muted.svg';
import currencyIcon from '../../../assets/icons/currency-muted.svg';
import locationIcon from '../../../assets/icons/location-muted.svg';
import { toArray } from '../../../utils';
import { MAX_VISIBLE_SKILLS, META_FALLBACKS } from './constants';

export const getMetaRows = data => [
    { id: 'location', icon: locationIcon, value: data?.location || META_FALLBACKS.LOCATION },
    {
        id: 'experience',
        icon: briefcaseIcon,
        value: data?.experience || META_FALLBACKS.EXPERIENCE
    },
    { id: 'salary', icon: currencyIcon, value: data?.salary || META_FALLBACKS.SALARY }
];

export const getVisibleSkills = data =>
    toArray(data?.skills).slice(0, MAX_VISIBLE_SKILLS);
