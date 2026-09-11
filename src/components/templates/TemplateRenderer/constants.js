import { TEMPLATE_TYPES } from '../../../constants';
import ApplicationStatusList from '../ApplicationStatusList';
import JobCard from '../JobCard';
import JobOpeningCard from '../JobOpeningCard';
import JobPostingForm from '../JobPostingForm';
import ProfileUpdateForm from '../ProfileUpdateForm';
import QuestionsBuilder from '../QuestionsBuilder';
import TextNode from '../TextNode';
import WelcomeScreen from '../WelcomeScreen';

export const TEMPLATE_COMPONENTS = {
    [TEMPLATE_TYPES.WELCOME_SCREEN]: WelcomeScreen,
    [TEMPLATE_TYPES.JOB_POSTING_FORM]: JobPostingForm,
    [TEMPLATE_TYPES.QUESTIONS_BUILDER]: QuestionsBuilder,
    [TEMPLATE_TYPES.JOB_CARD]: JobCard,
    [TEMPLATE_TYPES.PROFILE_UPDATE_FORM]: ProfileUpdateForm,
    [TEMPLATE_TYPES.APPLICATION_STATUS_LIST]: ApplicationStatusList,
    [TEMPLATE_TYPES.JOB_OPENING_CARD]: JobOpeningCard,
    [TEMPLATE_TYPES.TEXT_NODE]: TextNode
};
