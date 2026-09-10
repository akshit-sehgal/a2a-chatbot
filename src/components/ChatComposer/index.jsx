import { useState } from 'react';
import { isFunction } from '../../utils';
import IconButton from '../shared/IconButton';
import { ICON_BUTTON_VARIANTS } from '../shared/IconButton/constants';
import QuickActions from '../QuickActions';
import micIcon from '../../assets/icons/mic-indigo.svg';
import sendIcon from '../../assets/icons/send-white.svg';
import { INPUT_PLACEHOLDER, SEND_TITLE, VOICE_TITLE } from './constants';
import { canSubmit, isSubmitKey } from './utils';
import styles from './styles.module.scss';

const ChatComposer = props => {
    const { actions, onSendMessage, onActionClick } = props;

    const [draft, setDraft] = useState('');

    const onDraftChange = event => setDraft(event.target.value);

    const onSendClick = () => {
        if (!canSubmit(draft) || !isFunction(onSendMessage)) return;

        onSendMessage(draft);
        setDraft('');
    };

    const onInputKeyDown = event => {
        if (!isSubmitKey(event)) return;

        event.preventDefault();
        onSendClick();
    };

    const renderInput = () => (
        <div className={styles['composer__field']}>
            <input
                className={styles['composer__input']}
                value={draft}
                placeholder={INPUT_PLACEHOLDER}
                aria-label={INPUT_PLACEHOLDER}
                onChange={onDraftChange}
                onKeyDown={onInputKeyDown}
            />
            <IconButton
                iconSrc={sendIcon}
                title={SEND_TITLE}
                variant={ICON_BUTTON_VARIANTS.PRIMARY}
                onClick={onSendClick}
            />
        </div>
    );

    const renderVoiceButton = () => (
        <IconButton
            iconSrc={micIcon}
            title={VOICE_TITLE}
            customCSS={styles['composer__voice']}
        />
    );

    return (
        <footer className={styles['composer']}>
            <QuickActions actions={actions} onActionClick={onActionClick} />
            <div className={styles['composer__row']}>
                {renderInput()}
                {renderVoiceButton()}
            </div>
        </footer>
    );
};

export default ChatComposer;
