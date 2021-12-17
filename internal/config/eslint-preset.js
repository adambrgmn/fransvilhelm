module.exports = {
  extends: ['react-app'],
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: '(useIsomorphicLayoutEffect)' },
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
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
