import { TYPING_DOTS, TYPING_LABEL } from './constants';
import { getDotKey } from './utils';
import styles from './styles.module.scss';

const TypingLoader = () => {
    const renderDot = (dot, index) => (
        <span
            key={getDotKey(dot, index)}
            className={styles[`typing__dot--${dot}`]}
        />
    );

    return (
        <div className={styles['typing']} role="status" aria-label={TYPING_LABEL}>
            {TYPING_DOTS.map(renderDot)}
        </div>
    );
};

export default TypingLoader;
