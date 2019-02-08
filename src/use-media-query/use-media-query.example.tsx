import * as React from 'react';
import { useMediaQuery } from './';

const UseMediaQueryExample = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 375px)');
  const isTablet = useMediaQuery('(min-width: 376px) and (max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 769px)');

  return (
    <ul>
      <li>Is mobile: {isMobile ? '✅' : '🚫'}</li>
      <li>Is tablet: {isTablet ? '✅' : '🚫'}</li>
      <li>Is desktop: {isDesktop ? '✅' : '🚫'}</li>
    </ul>
  );
};

export { UseMediaQueryExample };
