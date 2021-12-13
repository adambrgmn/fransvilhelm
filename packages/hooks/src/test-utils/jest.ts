import { act } from '@testing-library/react';

export function runOnlyPendingTimers() {
  act(() => {
    jest.runOnlyPendingTimers();
  });
}

export function advanceTimersByTime(time: number): void {
  act(() => {
    jest.advanceTimersByTime(time);
  });
}
