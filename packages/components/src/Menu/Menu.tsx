import { forwardRefWithAs } from '../utils/forward-ref';

export interface MenuProps {
  children: React.ReactNode;
}

export const Menu = forwardRefWithAs<MenuProps, 'div'>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}
