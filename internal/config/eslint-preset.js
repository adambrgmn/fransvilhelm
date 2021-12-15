module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:testing-library/react'],
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
};
