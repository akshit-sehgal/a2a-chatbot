import { QUESTION_TYPES } from '../../../constants';
import { generateId, removeAtIndex, replaceAtIndex, toArray } from '../../../utils';
import { DEFAULT_OPTIONS } from './constants';

export const getInitialQuestions = data => toArray(data?.questions);

export const createEmptyQuestion = () => ({
    id: generateId(),
    type: QUESTION_TYPES.TEXT,
    label: '',
    options: []
});

export const patchQuestion = (questions, questionId, patch) =>
    questions.map(question =>
        question.id === questionId ? { ...question, ...patch } : question
    );

export const getOptionsForType = (question, type) => {
    if (type === QUESTION_TYPES.TEXT) return [];

    return toArray(question.options).length ? question.options : DEFAULT_OPTIONS;
};

export const setQuestionOption = (questions, questionId, optionIndex, value) =>
    patchQuestion(questions, questionId, {
        options: replaceAtIndex(
            questions.find(question => question.id === questionId)?.options,
            optionIndex,
            value
        )
    });

export const removeQuestionOption = (questions, questionId, optionIndex) =>
    patchQuestion(questions, questionId, {
        options: removeAtIndex(
            questions.find(question => question.id === questionId)?.options,
            optionIndex
        )
    });

export const addQuestionOption = (questions, questionId) =>
    patchQuestion(questions, questionId, {
        options: toArray(
            questions.find(question => question.id === questionId)?.options
        ).concat([''])
    });
