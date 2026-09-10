import useChat from '../../hooks/useChat';
import { reloadPage } from '../../utils';
import ChatComposer from '../ChatComposer';
import ChatWindow from '../ChatWindow';
import Navbar from '../Navbar';
import { CHAT_LABEL } from './constants';
import { getLatestActions } from './utils';
import styles from './styles.module.scss';

const ChatApp = () => {
    const { connectionStatus, isTyping, messages, sendAction, sendMessage } =
        useChat();

    const quickActions = getLatestActions(messages);

    const onTemplateAction = (action, data) => sendAction(action, data);

    const onQuickActionClick = action => sendAction(action);

    const onRestartClick = () => reloadPage();

    return (
        <main className={styles['chat-app']} aria-label={CHAT_LABEL}>
            <Navbar connectionStatus={connectionStatus} onRestartClick={onRestartClick} />
            <ChatWindow
                messages={messages}
                isTyping={isTyping}
                onAction={onTemplateAction}
            />
            <ChatComposer
                actions={quickActions}
                onSendMessage={sendMessage}
                onActionClick={onQuickActionClick}
            />
        </main>
    );
};

export default ChatApp;
