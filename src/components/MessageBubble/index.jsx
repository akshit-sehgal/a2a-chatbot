import cx from 'classnames';
import { MESSAGE_AUTHORS } from '../../constants';
import { isNonEmptyString } from '../../utils';
import { createMarkup, getBubbleTone } from './utils';
import styles from './styles.module.scss';

const MessageBubble = props => {
    const { author = MESSAGE_AUTHORS.BOT, html, heading, children } = props;

    const tone = getBubbleTone(author);

    const bubbleCSS = cx(styles['bubble'], styles[`bubble--${tone}`]);

    const renderHeading = () => {
        if (!isNonEmptyString(heading)) return null;

        return <h2 className={styles['bubble__heading']}>{heading}</h2>;
    };

    const renderHtml = () => {
        if (!isNonEmptyString(html)) return null;

        return (
            <div
                className={styles['bubble__body']}
                dangerouslySetInnerHTML={createMarkup(html)}
            />
        );
    };

    return (
        <article className={bubbleCSS}>
            {renderHeading()}
            {renderHtml()}
            {children}
        </article>
    );
};

export default MessageBubble;
