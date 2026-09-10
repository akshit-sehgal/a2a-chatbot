import cx from 'classnames';
import { BUTTON_VARIANTS, COMMON_LABELS, QUESTION_TYPES } from '../../constants';
import Button from '../shared/Button';
import IconButton from '../shared/IconButton';
import { ICON_BUTTON_VARIANTS } from '../shared/IconButton/constants';
import TextField from '../shared/TextField';
import { TEXT_FIELD_SIZES } from '../shared/TextField/constants';
import closeIcon from '../../assets/icons/close-slate.svg';
import plusIcon from '../../assets/icons/plus-indigo.svg';
import trashIcon from '../../assets/icons/trash-red.svg';
import {
    QUESTION_LABEL,
    QUESTION_PLACEHOLDER,
    REMOVE_OPTION_TITLE,
    REMOVE_QUESTION_TITLE,
    TEXT_ANSWER_HINT,
    TYPE_OPTIONS
} from './constants';
import { getQuestionOptions, getTypeIcon, hasOptions, isTextQuestion } from './utils';
import styles from './styles.module.scss';

const QuestionCard = props => {
    const {
        question,
        position,
        isDisabled = false,
        onLabelChange,
        onTypeChange,
        onRemove,
        onOptionChange,
        onOptionAdd,
        onOptionRemove
    } = props;

    const { id, type, label } = question;

    const options = getQuestionOptions(question);

    const onQuestionLabelChange = value => onLabelChange(id, value);

    const onQuestionRemove = () => onRemove(id);

    const renderHeader = () => (
        <header className={styles['question__header']}>
            <span className={styles['question__number']}>{position}</span>
            <span className={styles['question__caption']}>{QUESTION_LABEL}</span>
            <IconButton
                iconSrc={trashIcon}
                title={REMOVE_QUESTION_TITLE}
                variant={ICON_BUTTON_VARIANTS.DANGER}
                customCSS={styles['question__remove']}
                onClick={onQuestionRemove}
            />
        </header>
    );

    const renderTypeOption = typeOption => {
        const isActive = typeOption.type === type;

        const typeButtonCSS = cx(styles['question__type'], {
            [styles['question__type--active']]: isActive
        });

        return (
            <button
                key={typeOption.type}
                className={typeButtonCSS}
                type="button"
                disabled={isDisabled}
                onClick={() => onTypeChange(id, typeOption.type)}
            >
                <img src={getTypeIcon(typeOption, isActive)} alt="" />
                {typeOption.label}
            </button>
        );
    };

    const renderTypeSwitcher = () => (
        <div className={styles['question__types']}>
            {TYPE_OPTIONS.map(renderTypeOption)}
        </div>
    );

    const renderTextHint = () => {
        if (!isTextQuestion(type)) return null;

        return <p className={styles['question__hint']}>{TEXT_ANSWER_HINT}</p>;
    };

    const renderOption = (option, optionIndex) => {
        const markCSS = cx(styles['question__mark'], {
            [styles['question__mark--round']]: type === QUESTION_TYPES.RADIO
        });

        return (
            <div className={styles['question__option']} key={`${id}-option-${optionIndex}`}>
                <span className={markCSS} />
                <TextField
                    value={option}
                    placeholder={COMMON_LABELS.OPTION}
                    size={TEXT_FIELD_SIZES.COMPACT}
                    isDisabled={isDisabled}
                    customCSS={styles['question__option-field']}
                    onChange={value => onOptionChange(id, optionIndex, value)}
                />
                <IconButton
                    iconSrc={closeIcon}
                    title={REMOVE_OPTION_TITLE}
                    variant={ICON_BUTTON_VARIANTS.SUBTLE}
                    onClick={() => onOptionRemove(id, optionIndex)}
                />
            </div>
        );
    };

    const renderOptions = () => {
        if (!hasOptions(type)) return null;

        return (
            <div className={styles['question__options']}>
                {options.map(renderOption)}
                <Button
                    label={COMMON_LABELS.ADD_OPTION}
                    variant={BUTTON_VARIANTS.DASHED}
                    iconSrc={plusIcon}
                    isDisabled={isDisabled}
                    customCSS={styles['question__add-option']}
                    onClick={() => onOptionAdd(id)}
                />
            </div>
        );
    };

    return (
        <article className={styles['question']}>
            {renderHeader()}
            <TextField
                value={label}
                placeholder={QUESTION_PLACEHOLDER}
                isDisabled={isDisabled}
                onChange={onQuestionLabelChange}
            />
            {renderTypeSwitcher()}
            {renderTextHint()}
            {renderOptions()}
        </article>
    );
};

export default QuestionCard;
