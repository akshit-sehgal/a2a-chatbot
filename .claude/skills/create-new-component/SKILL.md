---
name: create-new-component
description: This skill should be used whenever the user asks to create a new react component, hook, page, or route.
---

## Folder Structure

-   Create a new folder using **CamelCase naming**
    -   Examples: `InterviewWidget`, `EmployeeSection`

Inside the folder, create the following files:

    <ComponentName>/
    │
    ├── index.jsx
    ├── constants.js
    ├── utils.js
    └── styles.module.scss


## Coding Conventions

### General Rules

For all these rules, refer to the ["Example implementation" section below](#example-implementation) to understand the pattern.

- Create a new component folder in camel case. Eg: InterviewWidget, EmployeeSection etc.
- Strictly use semantic html tags.
- Create an index.jsx file, export the component using default export - Use arrow functions only.
- Ensure that all the constants/static strings/text/labels local to a component should be added to `./constants.js` and constants/static strings/text/labels which can be re-used should be added to `src/constants.js` file
- Don`t have long jsx renders in the component return statement, instead split the jsx into smaller render functions like renderHeader, renderBody, renderLeft etc. and all these should be called in the final return statement 
- Always check `src/utils` for existing utility functions and re-use the function otherwise, create a new function in `./utils.js` file within the same component folder if it is a utility which is local to a component. If it is a utility which can be re-used across components, define it in `src/utils`.
- Create a styles.module.scss file and import in the index.jsx file and use rem instead of px values.
- Always follow BEM naming conventions to name css classes.
- For colors, refer the `src/styles/_theme.scss` file and use css variables.
- While writing functional/logical code ensure that each function is responsible only for a single task. 
- For optionally concatenating css classes, use classnames module imported as `import cx from "classnames"`
- Always keep state/ref, useMemo, useCallbacks, props, variable declarations on the top followed by event functions like onClick, onChange etc. followed by side effect hook - useEffect, this should be followed by leaner render functions and then the final return statement
- Always destructure props in a separate line
- Always re-use base components like inputs, select, dropdown, modals etc. from the `src/components/shared` folder or create new base components if not available.

## Example Implementation

### `index.jsx`

``` jsx
import React, { Fragment, useEffect, useState } from 'react';
import cx from 'classnames';
import { isBrowser, isFunction } from '@/utils/helpers';
import { ACTION_TYPES, RENDER_PHASES } from './constants';
import styles from './styles.module.scss';

const Modal = props => {
    const {
        customStyles,
        heading,
        content,
        actions,
        onCloseCallback,
        onActionClickCallback,
        allowPageScroll,
        disableCloseOnOutsideClick,
        hideBackdrop,
        show,
        customPhase,
        renderCustomCrossIcon
    } = props;

    const {
        customContainerCSS,
        customMainCSS,
        customHeadingCSS,
        customBodyCSS,
        customFooterCSS,
        customBackdropCSS,
        customCloseIconCSS
    } = customStyles || {};

    const [phase, setPhase] = useState(customPhase || RENDER_PHASES.NONE);

    const onCloseClick = isOutsideClick => {
        if (isFunction(onCloseCallback)) {
            onCloseCallback(isOutsideClick);
        }
    };

    const onCTAClick = item => {
        if (isFunction(onActionClickCallback)) {
            onActionClickCallback(item);
        }
    };

    const renderHeader = () => {
        const headingCSS = cx(styles['mc__heading'], {
            [customHeadingCSS]: Boolean(customHeadingCSS)
        });

        const closeIconCSS = cx('ni-icon-cross-icon', {
            [customCloseIconCSS]: Boolean(customCloseIconCSS)
        });

        return (
            <div className={styles['mc__header']}>
                {heading ? <h1 className={headingCSS}>{heading}</h1> : null}
                {typeof renderCustomCrossIcon === 'function' ? (
                    <span onClick={() => onCloseClick(false)}>
                        {renderCustomCrossIcon()}
                    </span>
                ) : (
                    <i
                        className={closeIconCSS}
                        onClick={() => onCloseClick(false)}
                    ></i>
                )}
            </div>
        );
    };

    const renderBody = () => {
        const bodyCSS = cx(styles['mc__body'], {
            [customBodyCSS]: Boolean(customBodyCSS)
        });

        return <div className={bodyCSS}>{content}</div>;
    };

    useEffect(() => {
        if (!show) return;

        if (isBrowser() && !allowPageScroll) {
            document.body.classList.add('ni-modal-hide-scroll-bar');
        }

        return () => {
            if (isBrowser()) {
                document.body.classList.remove('ni-modal-hide-scroll-bar');
            }
        };
    }, [show]);

    if (phase === RENDER_PHASES.NONE) return null;

    return (
        <Fragment>
            <div className={styles['modal-container']}>
                {renderHeader()}
                {renderBody()}
            </div>
        </Fragment>
    );
};

export default Modal;
```


### `constants.js`

``` js
export const ACTION_TYPES = {
    TEXT: 'text',
    OUTLINED: 'outlined',
    CONTAINED: 'contained'
};

export const RENDER_PHASES = {
    NONE: 'none',
    HIDE: 'hide',
    SHOW: 'show'
};
```


### `utils.js`

``` js
export const isEmptyArray = arr => Array.isArray(arr) && arr.length === 0;

export const noop = () => {};
```


### `styles.module.scss`

``` scss
.modal-container {
    position: fixed;

    .mc__ {
        &header {
            display: flex;
            justify-content: space-between;
        }

        &heading {
            font-size: 1.8rem;
            font-weight: 600;
        }

        &body {
            padding: 1.6rem;
            background: var(--N100);
        }
    }
}
```

