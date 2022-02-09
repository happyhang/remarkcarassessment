/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 module.exports = {
  resolver: {
    /* resolver options */
    /* even we don't use ts but react-navigation requires it */
    sourceExts: ['jsx', 'js', 'ts', 'tsx'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
