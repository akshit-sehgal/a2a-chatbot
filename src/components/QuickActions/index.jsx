import { isFunction } from '../../utils';
import Chip from '../shared/Chip';
import { CHIP_VARIANTS } from '../shared/Chip/constants';
import { QUICK_ACTIONS_LABEL } from './constants';
import { getActionLabel, getActionList } from './utils';
import styles from './styles.module.scss';

const QuickActions = props => {
    const { actions, onActionClick } = props;

    const actionList = getActionList(actions);

    const onChipClick = action => {
        if (!isFunction(onActionClick)) return;

        onActionClick(action);
    };

    if (!actionList.length) return null;

    return (
        <nav className={styles['quick-actions']} aria-label={QUICK_ACTIONS_LABEL}>
            {actionList.map(action => (
                <Chip
                    key={getActionLabel(action)}
                    label={getActionLabel(action)}
                    variant={CHIP_VARIANTS.ACTION}
                    onClick={() => onChipClick(action)}
                />
            ))}
        </nav>
    );
};

export default QuickActions;
