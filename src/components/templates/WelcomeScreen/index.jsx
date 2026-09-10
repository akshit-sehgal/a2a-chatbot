import cx from 'classnames';
import { isFunction } from '../../../utils';
import MessageBubble from '../../MessageBubble';
import chevronIcon from '../../../assets/icons/chevron-right-white.svg';
import { DEFAULT_GREETING } from './constants';
import { getOptionIcon, getOptions, isPrimaryOption } from './utils';
import styles from './styles.module.scss';

const WelcomeScreen = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const options = getOptions(data);

    const onOptionClick = option => {
        if (!isFunction(onAction)) return;

        onAction({ label: option.label, userText: option.label }, { optionId: option.id });
    };

    const renderGreeting = () => (
        <MessageBubble
            author={author}
            heading={data?.greeting || DEFAULT_GREETING}
            html={text}
        />
    );

    const renderOption = option => {
        const isPrimary = isPrimaryOption(option.variant);

        const optionCSS = cx(styles['welcome__option'], {
            [styles['welcome__option--primary']]: isPrimary,
            [styles['welcome__option--secondary']]: !isPrimary
        });

        return (
            <button
                key={option.id}
                className={optionCSS}
                type="button"
                onClick={() => onOptionClick(option)}
            >
                <span className={styles['welcome__option-icon']}>
                    <img src={getOptionIcon(option.icon)} alt="" />
                </span>
                <span className={styles['welcome__option-copy']}>
                    <span className={styles['welcome__option-label']}>
                        {option.label}
                    </span>
                    <span className={styles['welcome__option-description']}>
                        {option.description}
                    </span>
                </span>
                {isPrimary ? (
                    <img
                        className={styles['welcome__option-chevron']}
                        src={chevronIcon}
                        alt=""
                    />
                ) : null}
            </button>
        );
    };

    const renderOptions = () => {
        if (!options.length) return null;

        return (
            <nav className={styles['welcome__options']}>
                {options.map(renderOption)}
            </nav>
        );
    };

    return (
        <section className={styles['welcome']}>
            {renderGreeting()}
            {renderOptions()}
        </section>
    );
};

export default WelcomeScreen;
