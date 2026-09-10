import checkboxSlateIcon from '../../assets/icons/checkbox-slate.svg';
import checkboxWhiteIcon from '../../assets/icons/checkbox-white.svg';
import linesSlateIcon from '../../assets/icons/lines-slate.svg';
import linesWhiteIcon from '../../assets/icons/lines-white.svg';
import radioSlateIcon from '../../assets/icons/radio-slate.svg';
import radioWhiteIcon from '../../assets/icons/radio-white.svg';
import { QUESTION_TYPES } from '../../constants';

export const QUESTION_LABEL = 'Question';

export const QUESTION_PLACEHOLDER = 'Type your question';

export const TEXT_ANSWER_HINT = 'Candidate answers in a free-text box';

export const REMOVE_QUESTION_TITLE = 'Remove question';

export const REMOVE_OPTION_TITLE = 'Remove option';

export const TYPE_OPTIONS = [
    {
        type: QUESTION_TYPES.TEXT,
        label: 'Text',
        activeIcon: linesWhiteIcon,
        inactiveIcon: linesSlateIcon
    },
    {
        type: QUESTION_TYPES.CHECKBOX,
        label: 'Multi',
        activeIcon: checkboxWhiteIcon,
        inactiveIcon: checkboxSlateIcon
    },
    {
        type: QUESTION_TYPES.RADIO,
        label: 'Single',
        activeIcon: radioWhiteIcon,
        inactiveIcon: radioSlateIcon
    }
];
