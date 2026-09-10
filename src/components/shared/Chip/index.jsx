import cx from 'classnames';
import { isFunction } from '../../../utils';
import { CHIP_VARIANTS } from './constants';
import { isInteractiveChip } from './utils';
import styles from './styles.module.scss';

const Chip = props => {
    const { label, variant = CHIP_VARIANTS.ACTION, iconSrc, onClick } = props;

    const chipCSS = cx(styles['chip'], styles[`chip--${variant}`]);

    const onChipClick = () => {
        if (isFunction(onClick)) {
            onClick(label);
        }
    };

    const renderIcon = () => {
        if (!iconSrc) return null;

        return <img className={styles['chip__icon']} src={iconSrc} alt="" />;
    };

    if (!isInteractiveChip(variant)) {
        return <span className={chipCSS}>{label}</span>;
    }

    return (
        <button className={chipCSS} type="button" onClick={onChipClick}>
            {label}
            {renderIcon()}
        </button>
    );
};

export default Chip;
