import { BUTTON_VARIANTS } from '../../../constants';
import { getInitial, isFunction, isNonEmptyString } from '../../../utils';
import Button from '../../shared/Button';
import Chip from '../../shared/Chip';
import { CHIP_VARIANTS } from '../../shared/Chip/constants';
import MessageBubble from '../../MessageBubble';
import {
    DEFAULT_APPLY_LABEL,
    DEFAULT_JOB_TITLE,
    DEFAULT_REFERRAL_LABEL,
    DEFAULT_STATUS
} from './constants';
import { getMetaRows, getVisibleSkills } from './utils';
import styles from './styles.module.scss';

const JobOpeningCard = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const applyLabel = data?.applyLabel || DEFAULT_APPLY_LABEL;
    const referralLabel = data?.referralLabel || DEFAULT_REFERRAL_LABEL;

    const onCTAClick = label => {
        if (!isFunction(onAction)) return;

        onAction({ label, userText: label }, { jobTitle: data?.title });
    };

    const renderHeader = () => (
        <header className={styles['job-opening-card__header']}>
            <span className={styles['job-opening-card__logo']}>
                {getInitial(data?.company)}
            </span>
            <span className={styles['job-opening-card__identity']}>
                <span className={styles['job-opening-card__title']}>
                    {data?.title || DEFAULT_JOB_TITLE}
                </span>
                <span className={styles['job-opening-card__company']}>{data?.company}</span>
            </span>
            <span className={styles['job-opening-card__status']}>
                <span className={styles['job-opening-card__status-dot']} />
                {data?.status || DEFAULT_STATUS}
            </span>
        </header>
    );

    const renderMeta = () => (
        <ul className={styles['job-opening-card__meta']}>
            {getMetaRows(data).map(row => (
                <li className={styles['job-opening-card__meta-row']} key={row.id}>
                    <img src={row.icon} alt="" />
                    {row.value}
                </li>
            ))}
        </ul>
    );

    const renderDescription = () => {
        if (!isNonEmptyString(data?.description)) return null;

        return <p className={styles['job-opening-card__description']}>{data.description}</p>;
    };

    const renderSkills = () => {
        const skills = getVisibleSkills(data);

        if (!skills.length) return null;

        return (
            <div className={styles['job-opening-card__skills']}>
                {skills.map(skill => (
                    <Chip key={skill} label={skill} variant={CHIP_VARIANTS.STATIC} />
                ))}
            </div>
        );
    };

    const renderFooter = () => (
        <footer className={styles['job-opening-card__footer']}>
            <Button
                label={referralLabel}
                variant={BUTTON_VARIANTS.GHOST}
                onClick={() => onCTAClick(referralLabel)}
            />
            <Button
                label={applyLabel}
                variant={BUTTON_VARIANTS.PRIMARY}
                onClick={() => onCTAClick(applyLabel)}
            />
        </footer>
    );

    return (
        <section className={styles['job-opening-card-wrapper']}>
            <MessageBubble author={author} html={text} />
            <article className={styles['job-opening-card']}>
                {renderHeader()}
                {renderMeta()}
                {renderDescription()}
                {renderSkills()}
                <div className={styles['job-opening-card__divider']} />
                {renderFooter()}
            </article>
        </section>
    );
};

export default JobOpeningCard;
