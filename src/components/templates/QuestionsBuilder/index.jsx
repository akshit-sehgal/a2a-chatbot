import { useState } from 'react';
import { BUTTON_VARIANTS, COMMON_LABELS } from '../../../constants';
import { isFunction } from '../../../utils';
import Button from '../../shared/Button';
import { ICON_POSITIONS } from '../../shared/Button/constants';
import MessageBubble from '../../MessageBubble';
import QuestionCard from '../../QuestionCard';
import checkIcon from '../../../assets/icons/check-white.svg';
import clipboardIcon from '../../../assets/icons/clipboard-check-white.svg';
import plusIcon from '../../../assets/icons/plus-indigo-lg.svg';
import { BUILDER_TITLE, SKIP_USER_TEXT } from './constants';
import {
    addQuestionOption,
    createEmptyQuestion,
    getInitialQuestions,
    getOptionsForType,
    patchQuestion,
    removeQuestionOption,
    setQuestionOption
} from './utils';
import styles from './styles.module.scss';

const QuestionsBuilder = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const [questions, setQuestions] = useState(() => getInitialQuestions(data));
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onLabelChange = (questionId, value) => {
        setQuestions(previousQuestions =>
            patchQuestion(previousQuestions, questionId, { label: value })
        );
    };

    const onTypeChange = (questionId, type) => {
        setQuestions(previousQuestions =>
            previousQuestions.map(question =>
                question.id === questionId
                    ? { ...question, type, options: getOptionsForType(question, type) }
                    : question
            )
        );
    };

    const onQuestionRemove = questionId => {
        setQuestions(previousQuestions =>
            previousQuestions.filter(question => question.id !== questionId)
        );
    };

    const onOptionChange = (questionId, optionIndex, value) => {
        setQuestions(previousQuestions =>
            setQuestionOption(previousQuestions, questionId, optionIndex, value)
        );
    };

    const onOptionRemove = (questionId, optionIndex) => {
        setQuestions(previousQuestions =>
            removeQuestionOption(previousQuestions, questionId, optionIndex)
        );
    };

    const onOptionAdd = questionId => {
        setQuestions(previousQuestions =>
            addQuestionOption(previousQuestions, questionId)
        );
    };

    const onQuestionAdd = () => {
        setQuestions(previousQuestions =>
            previousQuestions.concat([createEmptyQuestion()])
        );
    };

    const submitBuilder = (label, userText, submittedQuestions) => {
        if (!isFunction(onAction)) return;

        setIsSubmitted(true);
        onAction({ label, userText }, { questions: submittedQuestions });
    };

    const onSaveClick = () =>
        submitBuilder(
            COMMON_LABELS.SAVE_AND_PUBLISH,
            COMMON_LABELS.SAVE_AND_PUBLISH,
            questions
        );

    const onSkipClick = () =>
        submitBuilder(COMMON_LABELS.SKIP, SKIP_USER_TEXT, []);

    const renderHeader = () => (
        <header className={styles['builder__header']}>
            <span className={styles['builder__header-icon']}>
                <img src={clipboardIcon} alt="" />
            </span>
            <h2 className={styles['builder__header-title']}>
                {data?.title || BUILDER_TITLE}
            </h2>
            <span className={styles['builder__header-step']}>{data?.step}</span>
        </header>
    );

    const renderQuestions = () =>
        questions.map((question, questionIndex) => (
            <QuestionCard
                key={question.id}
                question={question}
                position={questionIndex + 1}
                isDisabled={isSubmitted}
                onLabelChange={onLabelChange}
                onTypeChange={onTypeChange}
                onRemove={onQuestionRemove}
                onOptionChange={onOptionChange}
                onOptionAdd={onOptionAdd}
                onOptionRemove={onOptionRemove}
            />
        ));

    const renderFooter = () => (
        <footer className={styles['builder__footer']}>
            <Button
                label={COMMON_LABELS.SKIP}
                variant={BUTTON_VARIANTS.SECONDARY}
                isDisabled={isSubmitted}
                onClick={onSkipClick}
            />
            <Button
                label={COMMON_LABELS.SAVE_AND_PUBLISH}
                variant={BUTTON_VARIANTS.PRIMARY}
                iconSrc={checkIcon}
                iconPosition={ICON_POSITIONS.END}
                isFullWidth
                isDisabled={isSubmitted}
                onClick={onSaveClick}
            />
        </footer>
    );

    return (
        <section className={styles['builder-wrapper']}>
            <MessageBubble author={author} html={text} />
            <div className={styles['builder']}>
                {renderHeader()}
                <div className={styles['builder__divider']} />
                {renderQuestions()}
                <Button
                    label={COMMON_LABELS.ADD_QUESTION}
                    variant={BUTTON_VARIANTS.DASHED}
                    iconSrc={plusIcon}
                    isFullWidth
                    isDisabled={isSubmitted}
                    onClick={onQuestionAdd}
                />
                {renderFooter()}
            </div>
        </section>
    );
};

export default QuestionsBuilder;
