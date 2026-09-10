import { toArray } from '../../../utils';
import { OPTION_ICONS, OPTION_VARIANTS } from './constants';

export const getOptionIcon = icon => OPTION_ICONS[icon] || OPTION_ICONS.briefcase;

export const isPrimaryOption = variant => variant === OPTION_VARIANTS.PRIMARY;

export const getOptions = data => toArray(data?.options);
