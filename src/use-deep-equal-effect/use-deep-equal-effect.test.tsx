import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDeepEqualEffect, useDeepEqualLayoutEffect } from './';
import { useInput } from '../use-input';

describe('useDeepEqualEffect', () => {
  it('should only run effect if dependencies are on deeply equal', () => {
    const effect = jest.fn();
    const TestComponent: React.FC = () => {
      const input = useInput('');
      const [, forceUpdate] = React.useState<any>();

      useDeepEqualEffect(() => effect(), [{ value: input.value }]);

      return (
        <div>
          <input {...input} />
          <button onClick={() => forceUpdate({})}>Force update</button>
        </div>
      );
    };

    render(<TestComponent />);

    let input = screen.getByRole('textbox');
    let force = screen.getByRole('button');

    userEvent.click(force);
    userEvent.click(force);
    expect(effect).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('will run on all renders without dependecies', () => {
    const effect = jest.fn();
    const TestComponent: React.FC = () => {
      const [, forceUpdate] = React.useState<any>();

      useDeepEqualEffect(() => effect());

      return (
        <div>
          <button onClick={() => forceUpdate({})}>Force update</button>
        </div>
      );
    };

    render(<TestComponent />);

    let force = screen.getByRole('button');

    userEvent.click(force);
    userEvent.click(force);

    expect(effect).toHaveBeenCalledTimes(3);
  });
});

describe('useDeepEqualLayoutEffect', () => {
  it('should only run effect if dependencies are on deeply equal', () => {
    const effect = jest.fn();
    const TestComponent: React.FC = () => {
      const input = useInput('');
      const [, forceUpdate] = React.useState<any>();

      useDeepEqualLayoutEffect(() => effect(), [{ value: input.value }]);

      return (
        <div>
          <input {...input} />
          <button onClick={() => forceUpdate({})}>Force update</button>
        </div>
      );
    };

    render(<TestComponent />);

    let input = screen.getByRole('textbox');
    let force = screen.getByRole('button');

    userEvent.click(force);
    userEvent.click(force);
    expect(effect).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('will run on all renders without dependecies', () => {
    const effect = jest.fn();
    const TestComponent: React.FC = () => {
      const [, forceUpdate] = React.useState<any>();

      useDeepEqualLayoutEffect(() => effect());

      return (
        <div>
          <button onClick={() => forceUpdate({})}>Force update</button>
        </div>
      );
    };

    render(<TestComponent />);

    let force = screen.getByRole('button');

    userEvent.click(force);
    userEvent.click(force);

    expect(effect).toHaveBeenCalledTimes(3);
  });
});
