module.exports = {
  extends: 'standard-with-typescript',
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '[I]\\w+'
      }],
    'no-void': 'off'
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
