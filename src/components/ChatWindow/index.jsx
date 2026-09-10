import { useEffect, useRef } from 'react';
import MessageBubble from '../MessageBubble';
import TypingLoader from '../TypingLoader';
import TemplateRenderer from '../templates/TemplateRenderer';
import { MESSAGES_LABEL } from './constants';
import { isUserMessage, scrollToBottom } from './utils';
import styles from './styles.module.scss';

const ChatWindow = props => {
    const { messages, isTyping, onAction } = props;

    const scrollRef = useRef(null);

    useEffect(() => {
        scrollToBottom(scrollRef.current);
    }, [messages, isTyping]);

    const renderMessage = message => {
        if (isUserMessage(message)) {
            return (
                <MessageBubble
                    key={message.id}
                    author={message.author}
                    html={message.text}
                />
            );
        }

        return (
            <TemplateRenderer
                key={message.id}
                message={message}
                onAction={onAction}
            />
        );
    };

    const renderTypingLoader = () => {
        if (!isTyping) return null;

        return <TypingLoader />;
    };

    return (
        <section
            className={styles['chat-window']}
            ref={scrollRef}
            aria-label={MESSAGES_LABEL}
        >
            {messages.map(renderMessage)}
            {renderTypingLoader()}
        </section>
    );
};

export default ChatWindow;
