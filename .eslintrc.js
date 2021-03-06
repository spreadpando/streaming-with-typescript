module.exports = {
  extends: ['eslint:recommended',
    'plugin:react/recommended', 'standard-with-typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all' }],
    'no-void': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
