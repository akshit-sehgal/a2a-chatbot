import { useId } from 'react';
import cx from 'classnames';
import { isFunction } from '../../../utils';
import { TEXT_FIELD_SIZES } from './constants';
import { getFieldId } from './utils';
import styles from './styles.module.scss';

const TextField = props => {
    const {
        label,
        name,
        value,
        placeholder,
        size = TEXT_FIELD_SIZES.DEFAULT,
        isDisabled = false,
        customCSS,
        onChange,
        onKeyDown
    } = props;

    const generatedId = useId();
    const fieldId = getFieldId(name, generatedId);

    const fieldCSS = cx(styles['text-field'], {
        [customCSS]: Boolean(customCSS)
    });

    const inputCSS = cx(styles['text-field__input'], {
        [styles['text-field__input--compact']]: size === TEXT_FIELD_SIZES.COMPACT
    });

    const onInputChange = event => {
        if (isFunction(onChange)) {
            onChange(event.target.value);
        }
    };

    const onInputKeyDown = event => {
        if (isFunction(onKeyDown)) {
            onKeyDown(event);
        }
    };

    const renderLabel = () => {
        if (!label) return null;

        return (
            <label className={styles['text-field__label']} htmlFor={fieldId}>
                {label}
            </label>
        );
    };

    return (
        <div className={fieldCSS}>
            {renderLabel()}
            <input
                className={inputCSS}
                id={fieldId}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
            />
        </div>
    );
};

export default TextField;
