import { isNonEmptyString } from '../../utils';
import { ENTER_KEY } from './constants';

export const isSubmitKey = event => event.key === ENTER_KEY && !event.shiftKey;

export const canSubmit = value => isNonEmptyString(value);
