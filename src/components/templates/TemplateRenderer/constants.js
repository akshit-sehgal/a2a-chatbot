import { TEMPLATE_TYPES } from '../../../constants';
import JobCard from '../JobCard';
import JobPostingForm from '../JobPostingForm';
import QuestionsBuilder from '../QuestionsBuilder';
import TextNode from '../TextNode';
import WelcomeScreen from '../WelcomeScreen';

export const TEMPLATE_COMPONENTS = {
    [TEMPLATE_TYPES.WELCOME_SCREEN]: WelcomeScreen,
    [TEMPLATE_TYPES.JOB_POSTING_FORM]: JobPostingForm,
    [TEMPLATE_TYPES.QUESTIONS_BUILDER]: QuestionsBuilder,
    [TEMPLATE_TYPES.JOB_CARD]: JobCard,
    [TEMPLATE_TYPES.TEXT_NODE]: TextNode
};
