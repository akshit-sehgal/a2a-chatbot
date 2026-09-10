import { TEMPLATE_COMPONENTS } from './constants';
import { TEMPLATE_TYPES } from '../../../constants';

export const getTemplateComponent = type =>
    TEMPLATE_COMPONENTS[type] || TEMPLATE_COMPONENTS[TEMPLATE_TYPES.TEXT_NODE];
