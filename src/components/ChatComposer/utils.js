import { isNonEmptyString } from '../../utils';
import micIcon from '../../assets/icons/mic-indigo.svg';
import micIconAmber from '../../assets/icons/mic-amber.svg';
import { ENTER_KEY } from './constants';

export const isSubmitKey = event => event.key === ENTER_KEY && !event.shiftKey;

export const canSubmit = value => isNonEmptyString(value);

export const getMicIcon = isJobSeeker => (isJobSeeker ? micIconAmber : micIcon);
