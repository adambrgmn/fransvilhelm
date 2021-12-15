export {};

jest.mock('react', () => {
  let packages: Record<string, string> = {
    '18': 'react-18',
    '17': 'react',
  };

  let version = process.env.REACT_VERSION || '17';
  return jest.requireActual(packages[version]);
});

jest.mock('react-dom', () => {
  let packages: Record<string, string> = {
    18: 'react-dom-18',
    17: 'react-dom',
  };

  let version = process.env.REACT_VERSION || '17';
  return jest.requireActual(packages[version]);
});
