import MessageBubble from '../../MessageBubble';
import { getTextNodeHtml } from './utils';

const TextNode = props => {
    const { message } = props;

    const { author, text } = message;

    return <MessageBubble author={author} html={getTextNodeHtml(text)} />;
};

export default TextNode;
