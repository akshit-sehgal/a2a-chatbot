import { isNonEmptyString, toArray } from '../../../utils';
import { FIELD_NAMES, REQUIRED_FIELDS, SUMMARY_SEPARATOR } from './constants';

export const getInitialFields = data => ({
    [FIELD_NAMES.NAME]: data?.fields?.name || '',
    [FIELD_NAMES.PREFERRED_ROLE]: data?.fields?.preferredRole || '',
    [FIELD_NAMES.PREFERRED_LOCATION]: data?.fields?.preferredLocation || '',
    [FIELD_NAMES.EXPERIENCE]: data?.fields?.experience || '',
    [FIELD_NAMES.EXPECTED_CTC]: data?.fields?.expectedCtc || ''
});

export const getInitialSkills = data => toArray(data?.keySkills);

export const isFormIncomplete = fields =>
    REQUIRED_FIELDS.some(fieldName => !isNonEmptyString(fields[fieldName]));

export const buildFormSummary = fields =>
    [
        fields[FIELD_NAMES.NAME],
        fields[FIELD_NAMES.PREFERRED_ROLE],
        fields[FIELD_NAMES.PREFERRED_LOCATION]
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
