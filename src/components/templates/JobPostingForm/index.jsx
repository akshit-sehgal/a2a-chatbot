import { useState } from 'react';
import { BUTTON_VARIANTS, COMMON_LABELS } from '../../../constants';
import { isFunction, removeAtIndex } from '../../../utils';
import Button from '../../shared/Button';
import { ICON_POSITIONS } from '../../shared/Button/constants';
import Chip from '../../shared/Chip';
import { CHIP_VARIANTS } from '../../shared/Chip/constants';
import TextArea from '../../shared/TextArea';
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

const JobPostingForm = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const [fields, setFields] = useState(() => getInitialFields(data));
    const [skills, setSkills] = useState(() => getInitialSkills(data));
    const [skillDraft, setSkillDraft] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitLabel = data?.submitLabel || COMMON_LABELS.CONTINUE;

    const onFieldChange = fieldName => value => {
        setFields(previousFields => ({ ...previousFields, [fieldName]: value }));
    };

    const onSkillRemove = skillIndex => {
        setSkills(previousSkills => removeAtIndex(previousSkills, skillIndex));
    };

    const onSkillDraftAdd = () => {
        setSkills(previousSkills => appendSkill(previousSkills, skillDraft));
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
            { fields, skills }
        );
    };

    const renderHeader = () => (
        <header className={styles['job-form__header']}>
            <span className={styles['job-form__header-icon']}>
                <img src={editIcon} alt="" />
            </span>
            <h2 className={styles['job-form__header-title']}>
                {data?.title || FORM_TITLE}
            </h2>
            <span className={styles['job-form__header-step']}>{data?.step}</span>
        </header>
    );

    const renderPrimaryFields = () => (
        <>
            <TextField
                label={FIELD_LABELS.TITLE}
                name={FIELD_NAMES.TITLE}
                value={fields[FIELD_NAMES.TITLE]}
                placeholder={FIELD_PLACEHOLDERS.TITLE}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.TITLE)}
            />
            <TextArea
                label={FIELD_LABELS.DESCRIPTION}
                name={FIELD_NAMES.DESCRIPTION}
                value={fields[FIELD_NAMES.DESCRIPTION]}
                placeholder={FIELD_PLACEHOLDERS.DESCRIPTION}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.DESCRIPTION)}
            />
        </>
    );

    const renderMetaFields = () => (
        <div className={styles['job-form__row']}>
            <TextField
                label={FIELD_LABELS.LOCATION}
                name={FIELD_NAMES.LOCATION}
                value={fields[FIELD_NAMES.LOCATION]}
                placeholder={FIELD_PLACEHOLDERS.LOCATION}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.LOCATION)}
            />
            <TextField
                label={FIELD_LABELS.EXPERIENCE}
                name={FIELD_NAMES.EXPERIENCE}
                value={fields[FIELD_NAMES.EXPERIENCE]}
                placeholder={FIELD_PLACEHOLDERS.EXPERIENCE}
                isDisabled={isSubmitted}
                onChange={onFieldChange(FIELD_NAMES.EXPERIENCE)}
            />
        </div>
    );

    const renderSkills = () => (
        <div className={styles['job-form__skills']}>
            <span className={styles['job-form__skills-label']}>
                {FIELD_LABELS.SKILLS}
            </span>
            <div className={styles['job-form__skills-list']}>
                {skills.map((skill, skillIndex) => (
                    <Chip
                        key={skill}
                        label={skill}
                        variant={CHIP_VARIANTS.REMOVABLE}
                        iconSrc={closeIcon}
                        onClick={() => onSkillRemove(skillIndex)}
                    />
                ))}
                <input
                    className={styles['job-form__skills-input']}
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
        <section className={styles['job-form-wrapper']}>
            <MessageBubble author={author} html={text} />
            <form className={styles['job-form']} onSubmit={event => event.preventDefault()}>
                {renderHeader()}
                <div className={styles['job-form__divider']} />
                {renderPrimaryFields()}
                {renderMetaFields()}
                {renderSkills()}
                <TextField
                    label={FIELD_LABELS.SALARY}
                    name={FIELD_NAMES.SALARY}
                    value={fields[FIELD_NAMES.SALARY]}
                    placeholder={FIELD_PLACEHOLDERS.SALARY}
                    isDisabled={isSubmitted}
                    onChange={onFieldChange(FIELD_NAMES.SALARY)}
                />
                {renderFooter()}
            </form>
        </section>
    );
};

export default JobPostingForm;
