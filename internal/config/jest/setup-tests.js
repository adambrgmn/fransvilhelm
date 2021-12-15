const failOnConsole = require('jest-fail-on-console');

if (process.env.CI === 'true') {
  failOnConsole();
}

if (process.env.REACT_VERSION) {
  jest.mock('react', () => {
    let packages = {
      18: 'react-18',
      17: 'react',
    };

    let version = process.env.REACT_VERSION || '17';
    return jest.requireActual(packages[version]);
  });

  jest.mock('react-dom', () => {
    let packages = {
      18: 'react-dom-18',
      17: 'react-dom',
    };

    let version = process.env.REACT_VERSION || '17';
    return jest.requireActual(packages[version]);
  });
}
