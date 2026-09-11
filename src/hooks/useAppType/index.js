import { useEffect, useMemo } from 'react';
import { THEME_ATTRIBUTE } from './constants';
import { getAppName, getAppType, isJobSeekerType } from './utils';

const useAppType = () => {
    const appType = useMemo(() => getAppType(), []);
    const isJobSeeker = isJobSeekerType(appType);
    const appName = getAppName(appType);

    useEffect(() => {
        if (isJobSeeker) {
            document.documentElement.setAttribute(THEME_ATTRIBUTE, appType);
        } else {
            document.documentElement.removeAttribute(THEME_ATTRIBUTE);
        }
    }, [appType, isJobSeeker]);

    return { appName, isJobSeeker };
};

export default useAppType;
