import { useId } from 'react';
import cx from 'classnames';
import { isFunction } from '../../../utils';
import { DEFAULT_ROWS } from './constants';
import { getFieldId } from './utils';
import styles from './styles.module.scss';

const TextArea = props => {
    const {
        label,
        name,
        value,
        placeholder,
        rows = DEFAULT_ROWS,
        isDisabled = false,
        customCSS,
        onChange
    } = props;

    const generatedId = useId();
    const fieldId = getFieldId(name, generatedId);

    const textAreaCSS = cx(styles['text-area'], {
        [customCSS]: Boolean(customCSS)
    });

    const onTextAreaChange = event => {
        if (isFunction(onChange)) {
            onChange(event.target.value);
        }
    };

    const renderLabel = () => {
        if (!label) return null;

        return (
            <label className={styles['text-area__label']} htmlFor={fieldId}>
                {label}
            </label>
        );
    };

    return (
        <div className={textAreaCSS}>
            {renderLabel()}
            <textarea
                className={styles['text-area__input']}
                id={fieldId}
                name={name}
                value={value}
                rows={rows}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={onTextAreaChange}
            />
        </div>
    );
};

export default TextArea;
