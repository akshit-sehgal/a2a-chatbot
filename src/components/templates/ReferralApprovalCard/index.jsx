import cx from 'classnames';
import { BUTTON_VARIANTS } from '../../../constants';
import { getInitial, isFunction } from '../../../utils';
import Button from '../../shared/Button';
import MessageBubble from '../../MessageBubble';
import {
    DEFAULT_APPROVE_LABEL,
    DEFAULT_CANDIDATE_NAME,
    DEFAULT_JOB_TITLE,
    DEFAULT_REJECT_LABEL,
    DEFAULT_TITLE,
    JOB_SECTION_LABEL
} from './constants';
import { getCandidateMetaRows, getJobMetaRows, getScoreLabel, getScoreVariant } from './utils';
import styles from './styles.module.scss';

const ReferralApprovalCard = props => {
    const { message, onAction } = props;

    const { author, text, data } = message;

    const candidate = data?.candidate;
    const job = data?.job;
    const matchScore = data?.matchScore;

    const approveLabel = data?.approveLabel || DEFAULT_APPROVE_LABEL;
    const rejectLabel = data?.rejectLabel || DEFAULT_REJECT_LABEL;

    const onDecisionClick = label => {
        if (!isFunction(onAction)) return;

        onAction(
            { label, userText: label },
            { candidateName: candidate?.name, jobTitle: job?.title }
        );
    };

    const renderHeader = () => {
        const scoreCSS = cx(
            styles['referral-approval-card__score'],
            styles[`referral-approval-card__score--${getScoreVariant(matchScore)}`]
        );

        return (
            <header className={styles['referral-approval-card__header']}>
                <span className={styles['referral-approval-card__avatar']}>
                    {getInitial(candidate?.name)}
                </span>
                <span className={styles['referral-approval-card__identity']}>
                    <span className={styles['referral-approval-card__name']}>
                        {candidate?.name || DEFAULT_CANDIDATE_NAME}
                    </span>
                    <span className={styles['referral-approval-card__subtitle']}>
                        {data?.title || DEFAULT_TITLE}
                    </span>
                </span>
                <span className={scoreCSS}>{getScoreLabel(matchScore)}</span>
            </header>
        );
    };

    const renderCandidateMeta = () => (
        <ul className={styles['referral-approval-card__meta']}>
            {getCandidateMetaRows(candidate).map(row => (
                <li className={styles['referral-approval-card__meta-row']} key={row.id}>
                    <img src={row.icon} alt="" />
                    {row.value}
                </li>
            ))}
        </ul>
    );

    const renderJobSection = () => (
        <div className={styles['referral-approval-card__job']}>
            <span className={styles['referral-approval-card__job-label']}>
                {JOB_SECTION_LABEL}
            </span>
            <span className={styles['referral-approval-card__job-title']}>
                {job?.title || DEFAULT_JOB_TITLE}
            </span>
            <ul className={styles['referral-approval-card__meta']}>
                {getJobMetaRows(job).map(row => (
                    <li className={styles['referral-approval-card__meta-row']} key={row.id}>
                        <img src={row.icon} alt="" />
                        {row.value}
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderFooter = () => (
        <footer className={styles['referral-approval-card__footer']}>
            <Button
                label={rejectLabel}
                variant={BUTTON_VARIANTS.GHOST}
                customCSS={styles['referral-approval-card__reject-btn']}
                onClick={() => onDecisionClick(rejectLabel)}
            />
            <Button
                label={approveLabel}
                variant={BUTTON_VARIANTS.PRIMARY}
                onClick={() => onDecisionClick(approveLabel)}
            />
        </footer>
    );

    return (
        <section className={styles['referral-approval-card-wrapper']}>
            <MessageBubble author={author} html={text} />
            <article className={styles['referral-approval-card']}>
                {renderHeader()}
                {renderCandidateMeta()}
                <div className={styles['referral-approval-card__divider']} />
                {renderJobSection()}
                {renderFooter()}
            </article>
        </section>
    );
};

export default ReferralApprovalCard;
