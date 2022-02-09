module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['react', 'react-native', 'import'],
  extends: ['airbnb'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'no-unsafe-optional-chaining': 0,
  },
};
