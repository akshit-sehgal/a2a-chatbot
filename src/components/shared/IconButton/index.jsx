import cx from 'classnames';
import { isFunction } from '../../../utils';
import { ICON_BUTTON_VARIANTS } from './constants';
import { getAccessibleLabel } from './utils';
import styles from './styles.module.scss';

const IconButton = props => {
    const {
        iconSrc,
        title,
        variant = ICON_BUTTON_VARIANTS.GLASS,
        customCSS,
        onClick
    } = props;

    const iconButtonCSS = cx(
        styles['icon-btn'],
        styles[`icon-btn--${variant}`],
        {
            [customCSS]: Boolean(customCSS)
        }
    );

    const onIconButtonClick = event => {
        if (isFunction(onClick)) {
            onClick(event);
        }
    };

    return (
        <button
            className={iconButtonCSS}
            type="button"
            title={title}
            aria-label={getAccessibleLabel(title, 'Action')}
            onClick={onIconButtonClick}
        >
            <img className={styles['icon-btn__icon']} src={iconSrc} alt="" />
        </button>
    );
};

export default IconButton;
