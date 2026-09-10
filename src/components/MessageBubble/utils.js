import { MESSAGE_AUTHORS } from '../../constants';
import { BUBBLE_TONES } from './constants';

export const getBubbleTone = author =>
    author === MESSAGE_AUTHORS.USER ? BUBBLE_TONES.USER : BUBBLE_TONES.BOT;

export const createMarkup = html => ({ __html: html });
