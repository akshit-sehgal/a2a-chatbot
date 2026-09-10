import { toArray } from '../../utils';

export const getActionLabel = action =>
    typeof action === 'string' ? action : action?.label || '';

export const getActionList = actions => toArray(actions).filter(getActionLabel);
