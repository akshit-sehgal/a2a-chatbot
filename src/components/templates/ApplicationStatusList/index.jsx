import cx from 'classnames';
import MessageBubble from '../../MessageBubble';
import recruiterIcon from '../../../assets/icons/user-slate.svg';
import { LIST_TITLE } from './constants';
import { getApplications, getMetaTuple, getStatusVariant } from './utils';
import styles from './styles.module.scss';

const ApplicationStatusList = props => {
    const { message } = props;

    const { author, text, data } = message;

    const applications = getApplications(data);

    const renderHeader = () => (
        <h2 className={styles['application-status__title']}>
            {data?.title || LIST_TITLE}
        </h2>
    );

    const renderRow = application => {
        const statusCSS = cx(
            styles['application-status__status'],
            styles[`application-status__status--${getStatusVariant(application.status)}`]
        );

        return (
            <li key={application.id} className={styles['application-status__row']}>
                <span className={styles['application-status__avatar']}>
                    <img src={recruiterIcon} alt="" />
                </span>
                <span className={styles['application-status__identity']}>
                    <span className={styles['application-status__job-title']}>
                        {application.jobTitle}
                    </span>
                    <span className={styles['application-status__meta']}>
                        {getMetaTuple(application)}
                    </span>
                </span>
                <span className={statusCSS}>{application.status}</span>
            </li>
        );
    };

    const renderRows = () => {
        if (!applications.length) return null;

        return (
            <ul className={styles['application-status__list']}>
                {applications.map(renderRow)}
            </ul>
        );
    };

    return (
        <section className={styles['application-status-wrapper']}>
            <MessageBubble author={author} html={text} />
            <article className={styles['application-status']}>
                {renderHeader()}
                {renderRows()}
            </article>
        </section>
    );
};

export default ApplicationStatusList;
