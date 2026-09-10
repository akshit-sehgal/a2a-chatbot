export const isFunction = value => typeof value === 'function';

export const isNonEmptyArray = value => Array.isArray(value) && value.length > 0;

export const isNonEmptyString = value =>
    typeof value === 'string' && value.trim().length > 0;

export const noop = () => {};

export const generateId = () => {
    if (typeof crypto !== 'undefined' && isFunction(crypto.randomUUID)) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getQueryParam = name => {
    if (typeof window === 'undefined') return '';

    const params = new URLSearchParams(window.location.search);

    return params.get(name) || '';
};

export const reloadPage = () => window.location.reload();

export const getInitial = value =>
    isNonEmptyString(value) ? value.trim().charAt(0).toUpperCase() : '';

export const toArray = value => (Array.isArray(value) ? value : []);

export const replaceAtIndex = (list, index, value) =>
    toArray(list).map((item, itemIndex) => (itemIndex === index ? value : item));

export const removeAtIndex = (list, index) =>
    toArray(list).filter((item, itemIndex) => itemIndex !== index);
