import React, { createContext, forwardRef, useContext } from 'react';

export interface IconProps {
  baseline?: boolean;
}

const styles: Record<'span' | 'svg' | 'baseline', React.CSSProperties> = {
  span: {
    position: 'relative',
    display: 'inline-flex',
    alignSelf: 'center',
    width: '1em',
    height: '1em',
  },
  svg: {
    width: '1em',
    height: '1em',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  baseline: {
    position: 'absolute',
    bottom: '-0.150em',
  },
};

export const Icon = forwardRef<HTMLSpanElement, React.PropsWithChildren<IconProps>>(({ baseline, children }, ref) => {
  const ctx = useContext(IconContext);

  let testProps: undefined | Record<string, string> = undefined;
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'test') {
    testProps = { 'data-testid': 'icon' };
  }

  return (
    <span ref={ref} style={styles.span}>
      <svg
        aria-hidden
        focusable={false}
        {...ctx}
        {...testProps}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          ...styles.svg,
          ...(baseline ? styles.baseline : null),
          ...ctx.style,
        }}
      >
        {children}
      </svg>
    </span>
  );
});

type OmittedProps = 'className' | 'width' | 'height' | 'viewBox' | 'xmlns';

type TIconContext = Omit<React.SVGProps<SVGSVGElement>, OmittedProps>;

const defaultContext: TIconContext = {};

const IconContext = createContext<TIconContext>(defaultContext);

export const IconProvider = IconContext.Provider;
