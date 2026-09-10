import { QUESTION_TYPES } from '../../constants';
import { toArray } from '../../utils';

export const isTextQuestion = type => type === QUESTION_TYPES.TEXT;

export const hasOptions = type => !isTextQuestion(type);

export const getQuestionOptions = question => toArray(question?.options);

export const getTypeIcon = (typeOption, isActive) =>
    isActive ? typeOption.activeIcon : typeOption.inactiveIcon;
