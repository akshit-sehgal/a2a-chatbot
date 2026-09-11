import useAppType from '../../hooks/useAppType';
import useChat from '../../hooks/useChat';
import ChatComposer from '../ChatComposer';
import ChatWindow from '../ChatWindow';
import Navbar from '../Navbar';
import { CHAT_LABEL } from './constants';
import { getLatestActions } from './utils';
import styles from './styles.module.scss';

const ChatApp = () => {
    const { appName, isJobSeeker } = useAppType();

    const {
        activeThreadNumber,
        goToNextThread,
        hasNewThread,
        isTyping,
        sendAction,
        sendMessage,
        threadMessages,
        totalThreads
    } = useChat();

    const quickActions = getLatestActions(threadMessages);

    const onTemplateAction = (action, data) => sendAction(action, data);

    const onQuickActionClick = action => sendAction(action);

    return (
        <main className={styles['chat-app']} aria-label={CHAT_LABEL}>
            <Navbar
                appName={appName}
                activeThreadNumber={activeThreadNumber}
                totalThreads={totalThreads}
                hasNewThread={hasNewThread}
                onNextThread={goToNextThread}
            />
            <ChatWindow
                messages={threadMessages}
                isTyping={isTyping}
                onAction={onTemplateAction}
            />
            <ChatComposer
                actions={quickActions}
                isJobSeeker={isJobSeeker}
                onSendMessage={sendMessage}
                onActionClick={onQuickActionClick}
            />
        </main>
    );
};

export default ChatApp;
