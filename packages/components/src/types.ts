export type ElementProps<El extends keyof JSX.IntrinsicElements> = Omit<JSX.IntrinsicElements[El], 'ref'>;
