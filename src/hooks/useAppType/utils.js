import { APP_NAME, APP_NAME_BY_TYPE, APP_TYPES, QUERY_PARAMS } from '../../constants';
import { getQueryParam } from '../../utils';

export const getAppType = () => getQueryParam(QUERY_PARAMS.APP_TYPE);

export const isJobSeekerType = appType => appType === APP_TYPES.JOB_SEEKER;

export const getAppName = appType => APP_NAME_BY_TYPE[appType] || APP_NAME;
