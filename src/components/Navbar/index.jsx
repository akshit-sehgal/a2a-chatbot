import { APP_NAME } from '../../constants';
import IconButton from '../shared/IconButton';
import { ICON_BUTTON_VARIANTS } from '../shared/IconButton/constants';
import chevronRightIcon from '../../assets/icons/chevron-right-grey.svg';
import sparkleIcon from '../../assets/icons/sparkle-white.svg';
import { NEXT_THREAD_TITLE } from './constants';
import { getThreadIndicatorLabel, hasThreads } from './utils';
import styles from './styles.module.scss';

const Navbar = props => {
    const {
        activeThreadNumber = 0,
        totalThreads = 0,
        hasNewThread = false,
        onNextThread
    } = props;

    const renderBrand = () => (
        <div className={styles['navbar__brand']}>
            <img className={styles['navbar__logo-icon']} src={sparkleIcon} alt="" />
        </div>
    );

    const renderDetails = () => (
        <div className={styles['navbar__details']}>
            <h1 className={styles['navbar__title']}>{APP_NAME}</h1>
        </div>
    );

    const renderThreadSwitcher = () => {
        if (!hasThreads(totalThreads)) return null;

        return (
            <div className={styles['navbar__thread-switcher']}>
                <span className={styles['navbar__thread-count']}>
                    {getThreadIndicatorLabel(activeThreadNumber, totalThreads)}
                </span>
                <div className={styles['navbar__next-thread']}>
                    <IconButton
                        iconSrc={chevronRightIcon}
                        title={NEXT_THREAD_TITLE}
                        variant={ICON_BUTTON_VARIANTS.CIRCLE}
                        onClick={onNextThread}
                    />
                    {hasNewThread && <span className={styles['navbar__new-thread-dot']} />}
                </div>
            </div>
        );
    };

    return (
        <header className={styles['navbar']}>
            {renderBrand()}
            {renderDetails()}
            {renderThreadSwitcher()}
        </header>
    );
};

export default Navbar;
