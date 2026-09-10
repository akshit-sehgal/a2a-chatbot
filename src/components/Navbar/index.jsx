import cx from 'classnames';
import { APP_NAME, APP_STATUS_LABEL, CONNECTION_STATUS } from '../../constants';
import IconButton from '../shared/IconButton';
import { ICON_BUTTON_VARIANTS } from '../shared/IconButton/constants';
import refreshIcon from '../../assets/icons/refresh.svg';
import sparkleIcon from '../../assets/icons/sparkle-white.svg';
import { CONNECTION_LABELS, RESTART_TITLE } from './constants';
import { getConnectionLabel, isConnectionOnline } from './utils';
import styles from './styles.module.scss';

const Navbar = props => {
    const { connectionStatus = CONNECTION_STATUS.CONNECTING, onRestartClick } = props;

    const isOnline = isConnectionOnline(connectionStatus);

    const statusDotCSS = cx(styles['navbar__status-dot'], {
        [styles['navbar__status-dot--offline']]: !isOnline
    });

    const renderBrand = () => (
        <div className={styles['navbar__brand']}>
            <img className={styles['navbar__logo-icon']} src={sparkleIcon} alt="" />
        </div>
    );

    const renderDetails = () => (
        <div className={styles['navbar__details']}>
            <h1 className={styles['navbar__title']}>{APP_NAME}</h1>
            <p className={styles['navbar__status']}>
                <span className={statusDotCSS} />
                {getConnectionLabel(
                    connectionStatus,
                    APP_STATUS_LABEL,
                    CONNECTION_LABELS.OFFLINE
                )}
            </p>
        </div>
    );

    const renderActions = () => (
        <div className={styles['navbar__actions']}>
            <IconButton
                iconSrc={refreshIcon}
                title={RESTART_TITLE}
                variant={ICON_BUTTON_VARIANTS.GLASS}
                onClick={onRestartClick}
            />
        </div>
    );

    return (
        <header className={styles['navbar']}>
            {renderBrand()}
            {renderDetails()}
            {renderActions()}
        </header>
    );
};

export default Navbar;
