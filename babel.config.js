module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          common: './src/common',
          context: './src/context',
          assets: './src/assets',
        },
      },
    ],
  ],
};
