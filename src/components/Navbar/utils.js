export const getThreadIndicatorLabel = (activeThreadNumber, totalThreads) =>
    `${activeThreadNumber}/${totalThreads}`;

export const hasThreads = totalThreads => totalThreads > 0;
