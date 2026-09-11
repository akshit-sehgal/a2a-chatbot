import { useState } from 'react';
import { BUTTON_VARIANTS, COMMON_LABELS } from '../../../constants';
import { isFunction, removeAtIndex } from '../../../utils';
import Button from '../../shared/Button';
import { ICON_POSITIONS } from '../../shared/Button/constants';
import Chip from '../../shared/Chip';
import { CHIP_VARIANTS } from '../../shared/Chip/constants';
import TextField from '../../shared/TextField';
import MessageBubble from '../../MessageBubble';
import arrowRightIcon from '../../../assets/icons/arrow-right-white.svg';
import closeIcon from '../../../assets/icons/close-indigo.svg';
import editIcon from '../../../assets/icons/edit-white.svg';
import {
    ENTER_KEY,
    FIELD_LABELS,
    FIELD_NAMES,
    FIELD_PLACEHOLDERS,
    FORM_TITLE
} from './constants';
import {
    appendSkill,
    buildFormSummary,
    getInitialFields,
    getInitialSkills,
    isFormIncomplete
} from './utils';
import styles from './styles.module.scss';

const ProfileUpdateForm = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const [fields, setFields] = useState(() => getInitialFields(data));
    const [keySkills, setKeySkills] = useState(() => getInitialSkills(data));
    const [skillDraft, setSkillDraft] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitLabel = data?.submitLabel || COMMON_LABELS.SAVE_PROFILE;

    const onFieldChange = fieldName => value => {
        setFields(previousFields => ({ ...previousFields, [fieldName]: value }));
    };

    const onSkillRemove = skillIndex => {
        setKeySkills(previousSkills => removeAtIndex(previousSkills, skillIndex));
    };

    const onSkillDraftAdd = () => {
        setKeySkills(previousSkills => appendSkill(previousSkills, skillDraft));
        setSkillDraft('');
    };

    const onSkillKeyDown = event => {
        if (event.key !== ENTER_KEY) return;

        event.preventDefault();
        onSkillDraftAdd();
    };

    const onSubmitClick = () => {
        if (!isFunction(onAction)) return;

        setIsSubmitted(true);
        onAction(
            { label: submitLabel, userText: buildFormSummary(fields) },
            { fields, keySkills }
        );
    };

    const renderHeader = () => (
        <header className={styles['profile-form__header']}>
            <span className={styles['profile-form__header-icon']}>
                <img src={editIcon} alt="" />
            </span>
            <h2 className={styles['profile-form__header-title']}>
                {data?.title || FORM_TITLE}
            </h2>
        </header>
    );

    const renderNameField = () => (
        <TextField
            label={FIELD_LABELS.NAME}
            name={FIELD_NAMES.NAME}
            value={fields[FIELD_NAMES.NAME]}
            placeholder={FIELD_PLACEHOLDERS.NAME}
            isDisabled={isSubmitted}
            onChange={onFieldChange(FIELD_NAMES.NAME)}
        />
    );

    const renderRoleAndLocationFields = () => (
        <div className={styles['profile-form__row']}>
            <TextField
                label={FIELD_LABELS.PREFERRED_ROLE}
                name={FIELD_NAMES.PREFERRED_ROLE}
                value={fields[FIELD_NAMES.PREFERRED_ROLE]}
                placeholder={FIELD_PLACEHOLDERS.PREFERRED_ROLE}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.PREFERRED_ROLE)}
            />
            <TextField
                label={FIELD_LABELS.PREFERRED_LOCATION}
                name={FIELD_NAMES.PREFERRED_LOCATION}
                value={fields[FIELD_NAMES.PREFERRED_LOCATION]}
                placeholder={FIELD_PLACEHOLDERS.PREFERRED_LOCATION}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.PREFERRED_LOCATION)}
            />
        </div>
    );

    const renderExpectedCtcField = () => (
        <TextField
            label={FIELD_LABELS.EXPECTED_CTC}
            name={FIELD_NAMES.EXPECTED_CTC}
            value={fields[FIELD_NAMES.EXPECTED_CTC]}
            placeholder={FIELD_PLACEHOLDERS.EXPECTED_CTC}
            isDisabled={isSubmitted}
            onChange={onFieldChange(FIELD_NAMES.EXPECTED_CTC)}
        />
    );

    const renderKeySkills = () => (
        <div className={styles['profile-form__skills']}>
            <span className={styles['profile-form__skills-label']}>
                {FIELD_LABELS.KEY_SKILLS}
            </span>
            <div className={styles['profile-form__skills-list']}>
                {keySkills.map((skill, skillIndex) => (
                    <Chip
                        key={skill}
                        label={skill}
                        variant={CHIP_VARIANTS.REMOVABLE}
                        iconSrc={closeIcon}
                        onClick={() => onSkillRemove(skillIndex)}
                    />
                ))}
                <input
                    className={styles['profile-form__skills-input']}
                    value={skillDraft}
                    placeholder={FIELD_PLACEHOLDERS.SKILL}
                    disabled={isSubmitted}
                    onChange={event => setSkillDraft(event.target.value)}
                    onKeyDown={onSkillKeyDown}
                />
            </div>
        </div>
    );

    const renderFooter = () => (
        <Button
            label={submitLabel}
            variant={BUTTON_VARIANTS.PRIMARY}
            iconSrc={arrowRightIcon}
            iconPosition={ICON_POSITIONS.END}
            isFullWidth
            isDisabled={isSubmitted || isFormIncomplete(fields)}
            onClick={onSubmitClick}
        />
    );

    return (
        <section className={styles['profile-form-wrapper']}>
            <MessageBubble author={author} html={text} />
            <form
                className={styles['profile-form']}
                onSubmit={event => event.preventDefault()}
            >
                {renderHeader()}
                <div className={styles['profile-form__divider']} />
                {renderNameField()}
                {renderRoleAndLocationFields()}
                {renderExpectedCtcField()}
                {renderKeySkills()}
                {renderFooter()}
            </form>
        </section>
    );
};

export default ProfileUpdateForm;
