import { isNonEmptyString, toArray } from '../../../utils';
import { FIELD_NAMES, REQUIRED_FIELDS, SUMMARY_SEPARATOR } from './constants';

export const getInitialFields = data => ({
    [FIELD_NAMES.TITLE]: data?.fields?.title || '',
    [FIELD_NAMES.DESCRIPTION]: data?.fields?.description || '',
    [FIELD_NAMES.LOCATION]: data?.fields?.location || '',
    [FIELD_NAMES.EXPERIENCE]: data?.fields?.experience || '',
    [FIELD_NAMES.SALARY]: data?.fields?.salary || ''
});

export const getInitialSkills = data => toArray(data?.skills);

export const isFormIncomplete = fields =>
    REQUIRED_FIELDS.some(fieldName => !isNonEmptyString(fields[fieldName]));

export const buildFormSummary = fields =>
    [
        fields[FIELD_NAMES.TITLE],
        fields[FIELD_NAMES.LOCATION],
        fields[FIELD_NAMES.SALARY]
    ]
        .filter(isNonEmptyString)
        .join(SUMMARY_SEPARATOR);

export const appendSkill = (skills, skill) => {
    const trimmedSkill = skill.trim();

    if (!isNonEmptyString(trimmedSkill) || skills.includes(trimmedSkill)) {
        return skills;
    }

    return skills.concat([trimmedSkill]);
};
