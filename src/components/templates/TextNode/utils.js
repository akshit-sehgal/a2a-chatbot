import { isNonEmptyString } from '../../../utils';
import { EMPTY_TEXT_FALLBACK } from './constants';

export const getTextNodeHtml = text =>
    isNonEmptyString(text) ? text : EMPTY_TEXT_FALLBACK;
