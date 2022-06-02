module.exports = {
  extends: ['react-app'],
  rules: {
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useIsomorphicLayoutEffect)' }],
  },
  overrides: [
    {
      extends: ['react-app', 'react-app/jest', 'plugin:testing-library/react'],
      files: ['**/*.test.ts', '**/*.test.tsx'],
    },
    {
      extends: ['plugin:cypress/recommended'],
      plugins: ['cypress'],
      files: ['**/*.spec.ts', 'cypress/**/*'],
    },
  ],
};
