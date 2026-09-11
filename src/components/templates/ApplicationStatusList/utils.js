import { toArray } from '../../../utils';
import { DEFAULT_STATUS_VARIANT, META_SEPARATOR, STATUS_VARIANT_BY_LABEL } from './constants';

export const getApplications = data => toArray(data?.applications);

export const getStatusVariant = status =>
    STATUS_VARIANT_BY_LABEL[status] || DEFAULT_STATUS_VARIANT;

export const getMetaTuple = application =>
    [application?.location, application?.ctc].filter(Boolean).join(META_SEPARATOR);
