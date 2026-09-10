import cx from 'classnames';
import { BUTTON_VARIANTS } from '../../../constants';
import { isFunction } from '../../../utils';
import { BUTTON_TYPES, ICON_POSITIONS } from './constants';
import { isIconAtEnd, isIconAtStart } from './utils';
import styles from './styles.module.scss';

const Button = props => {
    const {
        label,
        variant = BUTTON_VARIANTS.PRIMARY,
        iconSrc,
        iconAlt = '',
        iconPosition = ICON_POSITIONS.START,
        isFullWidth = false,
        isDisabled = false,
        type = BUTTON_TYPES.BUTTON,
        customCSS,
        onClick
    } = props;

    const buttonCSS = cx(styles['btn'], styles[`btn--${variant}`], {
        [styles['btn--full-width']]: isFullWidth,
        [customCSS]: Boolean(customCSS)
    });

    const onButtonClick = event => {
        if (isFunction(onClick)) {
            onClick(event);
        }
    };

    const renderIcon = () => {
        if (!iconSrc) return null;

        return <img className={styles['btn__icon']} src={iconSrc} alt={iconAlt} />;
    };

    return (
        <button
            className={buttonCSS}
            type={type}
            disabled={isDisabled}
            onClick={onButtonClick}
        >
            {isIconAtStart(iconPosition) ? renderIcon() : null}
            {label ? <span className={styles['btn__label']}>{label}</span> : null}
            {isIconAtEnd(iconPosition) ? renderIcon() : null}
        </button>
    );
};

export default Button;
