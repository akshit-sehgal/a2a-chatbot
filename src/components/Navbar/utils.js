import { CONNECTION_STATUS } from '../../constants';

export const isConnectionOnline = connectionStatus =>
    connectionStatus === CONNECTION_STATUS.OPEN;

export const getConnectionLabel = (connectionStatus, onlineLabel, offlineLabel) =>
    isConnectionOnline(connectionStatus) ? onlineLabel : offlineLabel;
