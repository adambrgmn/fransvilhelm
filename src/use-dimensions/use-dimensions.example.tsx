import { useRef, Fragment } from 'react';

import { useDimensions } from './';
import { useInput } from '../use-input';

const Input: React.FC<any> = ({ label, id, ...props }) => (
  <Fragment>
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
  </Fragment>
);

const UseDimensionsExample: React.FC = () => {
  const widthInput = useInput('300');
  const heightInput = useInput('300');
  const ref = useRef<HTMLDivElement>(null);
  const rect = useDimensions(ref, true);
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
