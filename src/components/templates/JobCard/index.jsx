import { BUTTON_VARIANTS, COMMON_LABELS } from '../../../constants';
import { getInitial, isFunction, isNonEmptyString } from '../../../utils';
import Button from '../../shared/Button';
import Chip from '../../shared/Chip';
import { CHIP_VARIANTS } from '../../shared/Chip/constants';
import MessageBubble from '../../MessageBubble';
import { DEFAULT_JOB_TITLE, DEFAULT_STATUS } from './constants';
import { getMetaRows, getVisibleSkills } from './utils';
import styles from './styles.module.scss';

const JobCard = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const shareLabel = data?.shareLabel || COMMON_LABELS.SHARE_LINK;

    const onShareClick = () => {
        if (!isFunction(onAction)) return;

        onAction({ label: shareLabel, userText: shareLabel }, { jobTitle: data?.title });
    };

    const renderHeader = () => (
        <header className={styles['job-card__header']}>
            <span className={styles['job-card__logo']}>
                {getInitial(data?.company)}
            </span>
            <span className={styles['job-card__identity']}>
                <span className={styles['job-card__title']}>
                    {data?.title || DEFAULT_JOB_TITLE}
                </span>
                <span className={styles['job-card__company']}>{data?.company}</span>
            </span>
            <span className={styles['job-card__status']}>
                <span className={styles['job-card__status-dot']} />
                {data?.status || DEFAULT_STATUS}
            </span>
        </header>
    );

    const renderMeta = () => (
        <ul className={styles['job-card__meta']}>
            {getMetaRows(data).map(row => (
                <li className={styles['job-card__meta-row']} key={row.id}>
                    <img src={row.icon} alt="" />
                    {row.value}
                </li>
            ))}
        </ul>
    );

    const renderDescription = () => {
        if (!isNonEmptyString(data?.description)) return null;

        return <p className={styles['job-card__description']}>{data.description}</p>;
    };

    const renderSkills = () => {
        const skills = getVisibleSkills(data);

        if (!skills.length) return null;

        return (
            <div className={styles['job-card__skills']}>
                {skills.map(skill => (
                    <Chip key={skill} label={skill} variant={CHIP_VARIANTS.STATIC} />
                ))}
            </div>
        );
    };

    const renderFooter = () => (
        <footer className={styles['job-card__footer']}>
            <span className={styles['job-card__note']}>{data?.questionsNote}</span>
            <Button
                label={shareLabel}
                variant={BUTTON_VARIANTS.GHOST}
                onClick={onShareClick}
            />
        </footer>
    );

    return (
        <section className={styles['job-card-wrapper']}>
            <MessageBubble author={author} html={text} />
            <article className={styles['job-card']}>
                {renderHeader()}
                {renderMeta()}
                {renderDescription()}
                {renderSkills()}
                <div className={styles['job-card__divider']} />
                {renderFooter()}
            </article>
        </section>
    );
};

export default JobCard;
