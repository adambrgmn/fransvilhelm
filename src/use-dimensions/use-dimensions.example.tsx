import * as React from 'react';

import { useDimensions } from './';
import { useInput } from '../use-input';

const Input = ({ label, id, ...props }: any): JSX.Element => (
  <React.Fragment>
    <label htmlFor={id}>{label}</label>
    <input
      type="number"
      id={id}
      min="150"
      max="500"
      step="50"
      style={{ marginRight: '1rem' }}
      {...props}
    />
  </React.Fragment>
);

const UseDimensionsExample = (): JSX.Element => {
  const widthInput = useInput('300');
  const heightInput = useInput('300');
  const ref = React.useRef<HTMLDivElement>(null);
  const rect = useDimensions(ref);
  const { width, height } = rect || { width: 0, height: 0 };

  return (
    <div>
      <div>
        <Input label="width:" id="width" {...widthInput} />
        <Input label="height:" id="height" {...heightInput} />
      </div>
      <div
        ref={ref}
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: widthInput.value + 'px',
          height: heightInput.value + 'px',
          backgroundColor: 'lightgrey',
        }}
      >
        <code style={{ textAlign: 'center' }}>
          {width}px / {height} px
        </code>
      </div>
    </div>
  );
};

export { UseDimensionsExample };
