import { createElement } from 'react';
import { getTemplateComponent } from './utils';

const TemplateRenderer = props => {
    const { message, onAction } = props;

    if (!message) return null;

    return createElement(getTemplateComponent(message.type), { message, onAction });
};

export default TemplateRenderer;
